import { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, Button, Alert, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { CustomText } from "../comman/CustomText";
import { getMyAddresses, deleteAddress } from "../../utils/apiService";
import { AddressFormDialog } from "./AddressFormDialog";

export const SavedAddressesTab = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getMyAddresses();
      setAddresses(data || []);
    } catch (err) {
      console.error("Error loading addresses:", err);
      setError(err.message || "Failed to load addresses. Please try again.");
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setDialogOpen(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setDialogOpen(true);
  };

  const handleDeleteClick = (address) => {
    setAddressToDelete(address);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!addressToDelete) return;

    try {
      setDeletingId(addressToDelete._id || addressToDelete.id);
      await deleteAddress(addressToDelete._id || addressToDelete.id);
      await loadAddresses();
      setDeleteConfirmOpen(false);
      setAddressToDelete(null);
    } catch (err) {
      console.error("Error deleting address:", err);
      setError(err.message || "Failed to delete address. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingAddress(null);
  };

  const handleDialogSuccess = () => {
    loadAddresses();
  };

  const formatAddress = (address) => {
    const parts = [];
    if (address.houseNumber) parts.push(address.houseNumber);
    if (address.streetName) parts.push(address.streetName);
    if (address.area) parts.push(address.area);
    if (address.landmark) parts.push(`Near ${address.landmark}`);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.zipCode) parts.push(address.zipCode);
    return parts.join(", ");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
        <CircularProgress sx={{ color: "var(--themeColor)" }} />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
        <CustomText
          variant="h4"
          sx={{
            fontSize: { xs: 24, md: 32 },
            fontWeight: 700,
            color: "var(--themeColor)",
          }}
        >
          Saved Addresses
        </CustomText>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleAddNew}
          sx={{
            backgroundColor: "#FFB5A1",
            color: "black",
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 600,
            px: 3,
            "&:hover": {
              backgroundColor: "#F2709C",
            },
          }}
        >
          Add New Address
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {addresses.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: { xs: 6, md: 8 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CustomText sx={{ fontSize: { xs: 16, md: 18 }, color: "#666" }}>
            No saved addresses yet
          </CustomText>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddNew}
            sx={{
              backgroundColor: "var(--themeColor)",
              color: "#fff",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "var(--specialColor)",
              },
            }}
          >
            Add Your First Address
          </Button>
        </Box>
      ) : (
      <Grid container spacing={{ xs: 2, md: 3 }}>
          {addresses.map((address) => {
            const addressId = address._id || address.id;
            const isDeleting = deletingId === addressId;

            return (
              <Grid size={{ xs: 12, md: 6 }} key={addressId}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    border: address.isDefault ? "2px solid var(--themeColor)" : "1px solid #ddd",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                      <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <CustomText variant="h6" sx={{ fontWeight: 700, color: "var(--themeColor)" }}>
                            {address.addressType || "Address"}
                      </CustomText>
                      {address.isDefault && (
                        <Box
                          sx={{
                            px: 1.5,
                            py: 0.3,
                            borderRadius: 1,
                            backgroundColor: "#FFB5A1",
                            color: "#000",
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        >
                          Default
                        </Box>
                      )}
                    </Box>
                        <CustomText variant="body2" sx={{ color: "#666", lineHeight: 1.6, mb: 1 }}>
                          {formatAddress(address)}
                    </CustomText>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                  <Button
                    startIcon={<EditIcon />}
                    variant="outlined"
                        onClick={() => handleEdit(address)}
                        disabled={isDeleting}
                    sx={{
                      borderColor: "var(--themeColor)",
                      color: "var(--themeColor)",
                      textTransform: "none",
                      borderRadius: 2,
                      "&:hover": {
                        borderColor: "var(--themeColor)",
                        backgroundColor: "#fbeeee",
                      },
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    variant="outlined"
                        onClick={() => handleDeleteClick(address)}
                        disabled={isDeleting}
                    sx={{
                      borderColor: "#f44336",
                      color: "#f44336",
                      textTransform: "none",
                      borderRadius: 2,
                      "&:hover": {
                        borderColor: "#f44336",
                        backgroundColor: "#ffebee",
                      },
                    }}
                  >
                        {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
            );
          })}
      </Grid>
      )}

      {/* Add/Edit Dialog */}
      <AddressFormDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        address={editingAddress}
        onSuccess={handleDialogSuccess}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>
          <CustomText sx={{ fontSize: { xs: 18, md: 20 }, fontWeight: 600 }}>
            Confirm Delete
          </CustomText>
        </DialogTitle>
        <DialogContent>
          <CustomText>
            Are you sure you want to delete this address? This action cannot be undone.
          </CustomText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{ textTransform: "none" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
