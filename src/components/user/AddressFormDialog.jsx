import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
} from "@mui/material";
import { CustomText } from "../comman/CustomText";
import { addAddress, updateAddress } from "../../utils/apiService";
import { getStoredLocation } from "../../utils/location";
import { getAccessToken } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";

export const AddressFormDialog = ({ open, onClose, address = null, onSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    addressType: "Home",
    zipCode: "",
    houseNumber: "",
    streetName: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    isDefault: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (address) {
      // Edit mode - populate form with existing address
      setFormData({
        addressType: address.addressType || "Home",
        zipCode: address.zipCode || "",
        houseNumber: address.houseNumber || "",
        streetName: address.streetName || "",
        area: address.area || "",
        landmark: address.landmark || "",
        city: address.city || "",
        state: address.state || "",
        isDefault: address.isDefault || false,
      });
    } else {
      // Add mode - reset form
      setFormData({
        addressType: "Home",
        zipCode: "",
        houseNumber: "",
        streetName: "",
        area: "",
        landmark: "",
        city: "",
        state: "",
        isDefault: false,
      });
    }
    setErrors({});
    setError("");
  }, [address, open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.addressType.trim()) {
      newErrors.addressType = "Address type is required";
    }

    if (!formData.houseNumber.trim()) {
      newErrors.houseNumber = "House number is required";
    }

    if (!formData.streetName.trim()) {
      newErrors.streetName = "Street name is required";
    }

    if (!formData.area.trim()) {
      newErrors.area = "Area is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required";
    } else if (!/^\d{6}$/.test(formData.zipCode)) {
      newErrors.zipCode = "Zip code must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is authenticated
    const token = getAccessToken();
    if (!token) {
      setError("Please login to add an address.");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const location = getStoredLocation();
      const addressPayload = {
        ...formData,
        currentAddress: {
          type: "Point",
          coordinates: [location.long, location.lat], // [longitude, latitude]
        },
      };

      if (address) {
        // Update existing address
        await updateAddress(address._id || address.id, addressPayload);
      } else {
        // Add new address
        await addAddress(addressPayload);
      }

      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <CustomText sx={{ fontSize: { xs: 20, md: 24 }, fontWeight: 700, color: "var(--themeColor)" }}>
          {address ? "Edit Address" : "Add New Address"}
        </CustomText>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Address Type</InputLabel>
              <Select
                name="addressType"
                value={formData.addressType}
                onChange={handleChange}
                label="Address Type"
                error={!!errors.addressType}
              >
                <MenuItem value="Home">Home</MenuItem>
                <MenuItem value="Work">Work</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              {errors.addressType && (
                <CustomText sx={{ color: "#d32f2f", fontSize: 12, mt: 0.5 }}>
                  {errors.addressType}
                </CustomText>
              )}
            </FormControl>

            <TextField
              name="houseNumber"
              label="House Number"
              value={formData.houseNumber}
              onChange={handleChange}
              fullWidth
              error={!!errors.houseNumber}
              helperText={errors.houseNumber}
            />

            <TextField
              name="streetName"
              label="Street Name"
              value={formData.streetName}
              onChange={handleChange}
              fullWidth
              error={!!errors.streetName}
              helperText={errors.streetName}
            />

            <TextField
              name="area"
              label="Area"
              value={formData.area}
              onChange={handleChange}
              fullWidth
              error={!!errors.area}
              helperText={errors.area}
            />

            <TextField
              name="landmark"
              label="Landmark"
              value={formData.landmark}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="city"
              label="City"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              error={!!errors.city}
              helperText={errors.city}
            />

            <TextField
              name="state"
              label="State"
              value={formData.state}
              onChange={handleChange}
              fullWidth
              error={!!errors.state}
              helperText={errors.state}
            />

            <TextField
              name="zipCode"
              label="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
              fullWidth
              error={!!errors.zipCode}
              helperText={errors.zipCode}
              inputProps={{ maxLength: 6 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                />
              }
              label="Set as default address"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={loading} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: "var(--themeColor)",
              color: "#fff",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "var(--specialColor)",
              },
            }}
          >
            {loading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} sx={{ color: "#fff" }} />
                Saving...
              </Box>
            ) : (
              address ? "Update" : "Add"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

