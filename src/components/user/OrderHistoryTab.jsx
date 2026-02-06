import { useMemo, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  IconButton,
  Pagination,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { CustomText } from "../comman/CustomText";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";

const DEFAULT_LIMIT = 5;

export const OrderHistoryTab = ({
  orders = [],
  page = 1,
  totalCount = 0,
  limit = DEFAULT_LIMIT,
  onPageChange,
  loading = false,
}) => {
  const totalPages = Math.max(1, Math.ceil(Number(totalCount) / Number(limit)));
  const handlePageChange = (_, value) => {
    if (typeof onPageChange === "function") onPageChange(value);
  };
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusMeta = (status) => {
    const raw = (status || "").toString().trim();
    const key = raw.toUpperCase();

    const map = {
      PLACED: { label: "Placed", color: "#4caf50" },
      CONFIRMED: { label: "Confirmed", color: "#FF9472" },
      PREPARING: { label: "Preparing", color: "#FFB5A1" },
      READY: { label: "Ready", color: "#1976d2" },
      DISPATCHED: { label: "Dispatched", color: "#FF9472" },
      DELIVERED: { label: "Delivered", color: "#4caf50" },
      CANCELLED: { label: "Cancelled", color: "#d32f2f" },
    };

    if (map[key]) return map[key];
    return { label: raw || "—", color: "#FFB5A1" };
  };

  const normalizedOrders = useMemo(() => {
    const list = Array.isArray(orders) ? orders : [];
    console.log(list, 'list')
    return list.map((o) => {
      const id = o?.orderId || o?._id || o?.id || "—";
      const createdAt = o?.createdAt || o?.created_at || o?.date;
      const itemsCount = Array.isArray(o?.items) ? o?.items.length : (o?.itemsCount || 0);
      const total =
        o?.total_charges ??
        o?.totalAmount ??
        o?.pricing?.grandTotal ??
        o?.amountPaid ??
        o?.amount ??
        o?.total;
      const statusRaw = (o?.order_state || o?.orderStatus || o?.status || "").toString();
      const statusMeta = getStatusMeta(statusRaw);

      let dateLabel = "—";
      if (createdAt) {
        try {
          dateLabel = new Date(createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
        } catch {
          dateLabel = String(createdAt);
        }
      }

      const totalLabel =
        total != null && !Number.isNaN(Number(total)) ? `₹${Number(total).toFixed(2)}` : "—";
      const subtotal = o?.order_subtotal ?? o?.subtotal;
      const subtotalLabel =
        subtotal != null && !Number.isNaN(Number(subtotal)) ? `₹${Number(subtotal).toFixed(2)}` : null;
      const taxVal = o?.order_level_total_taxes ?? o?.item_taxes ?? null;
      const taxLabel =
        taxVal != null && !Number.isNaN(Number(taxVal)) ? `₹${Number(taxVal).toFixed(2)}` : null;
      const discountVal = o?.discount ?? null;
      const discountLabel =
        discountVal != null && !Number.isNaN(Number(discountVal)) ? `₹${Number(discountVal).toFixed(2)}` : null;

      return {
        raw: o,
        idLabel: `#${id}`,
        dateLabel,
        itemsCount,
        totalLabel,
        subtotalLabel,
        taxLabel,
        discountLabel,
        statusRaw,
        statusLabel: statusMeta.label,
        statusColor: statusMeta.color,
      };
    });
  }, [orders]);

  const handleOpen = (o) => {
    setSelectedOrder(o);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  return (
    <Box>
      <CustomText variant="h4" sx={{ fontSize: { xs: 24, md: 32 }, fontWeight: 700, color: "var(--themeColor)", mb: 2, }}>
        Order History
      </CustomText>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress sx={{ color: "var(--themeColor)" }} />
        </Box>
      ) : normalizedOrders.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <CustomText sx={{ color: "#666", fontSize: 14 }}>
            No orders found.
          </CustomText>
        </Box>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", maxHeight: { xs: "62vh", md: "60vh" }, overflowY: "auto" }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: 700, color: "#2c2c2c", fontSize: { xs: 13, md: 14 } }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#2c2c2c", fontSize: { xs: 13, md: 14 } }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#2c2c2c", fontSize: { xs: 13, md: 14 } }}>Items</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#2c2c2c", fontSize: { xs: 13, md: 14 } }}>Total</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#2c2c2c", fontSize: { xs: 13, md: 14 } }}>Status</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: "#2c2c2c", fontSize: { xs: 13, md: 14 } }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {normalizedOrders.map((o, idx) => (
                  <TableRow
                    key={`${o?.idLabel}-${idx}`}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#fafafa",
                      },
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell>
                      <CustomText sx={{ fontWeight: 700, color: "var(--themeColor)", fontSize: { xs: 13, md: 14 } }}>
                        {o?.idLabel}
                      </CustomText>
                    </TableCell>
                    <TableCell>
                      <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
                        {o?.dateLabel}
                      </CustomText>
                    </TableCell>
                    <TableCell>
                      <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
                        {o?.itemsCount || 0} item{o?.itemsCount !== 1 ? "s" : ""}
                      </CustomText>
                    </TableCell>
                    <TableCell>
                      <CustomText sx={{ fontWeight: 600, color: "#2c2c2c", fontSize: { xs: 13, md: 14 } }}>
                        {o?.totalLabel}
                      </CustomText>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "inline-block",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          backgroundColor: o?.statusColor,
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: { xs: 11, md: 12 },
                        }}
                      >
                        {o?.statusLabel}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleOpen(o?.raw)}
                        sx={{
                          color: "var(--themeColor)",
                          "&:hover": {
                            backgroundColor: "rgba(95, 41, 48, 0.1)",
                          },
                        }}
                        title="View Details"
                      >
                        <VisibilityIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3, pb: 2 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root": { fontWeight: 600 },
                }}
              />
            </Box>
          )}
        </>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle sx={{ pr: 6 }}>
          <CustomText sx={{ fontSize: 18, fontWeight: 700, color: "var(--themeColor)" }}>
            Order Details
          </CustomText>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ maxHeight: "70vh" }}>
          {selectedOrder ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
              <CustomText sx={{ fontSize: 14, fontWeight: 700 }}>
                #{selectedOrder?.orderId || selectedOrder?._id || selectedOrder?.id || "—"}
              </CustomText>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Box
                  sx={{
                    display: "inline-block",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    backgroundColor: getStatusMeta(
                      (selectedOrder?.order_state || selectedOrder?.orderStatus || selectedOrder?.status || "").toString()
                    ).color,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  {getStatusMeta(
                    (selectedOrder?.order_state || selectedOrder?.orderStatus || selectedOrder?.status || "").toString()
                  ).label}
                </Box>
                <CustomText sx={{ fontSize: 13, color: "#666" }}>
                  Payment: {selectedOrder?.paymentMode || "—"} / {selectedOrder?.paymentStatus || "—"}
                </CustomText>
              </Box>

              <Divider sx={{ my: 1 }} />

              <CustomText sx={{ fontSize: 13, fontWeight: 700, color: "#333" }}>Delivery Address</CustomText>
              <Box sx={{ bgcolor: "#fafafa", border: "1px solid #eee", borderRadius: 2, p: 1.5 }}>
                <CustomText sx={{ fontSize: 13, fontWeight: 600 }}>
                  {selectedOrder?.deliveryAddress?.name || "—"} {selectedOrder?.deliveryAddress?.phone ? `(${selectedOrder?.deliveryAddress.phone})` : ""}
                </CustomText>
                <CustomText sx={{ fontSize: 13, color: "#666" }}>
                  {[
                    selectedOrder?.deliveryAddress?.houseNumber,
                    selectedOrder?.deliveryAddress?.streetName,
                    selectedOrder?.deliveryAddress?.area,
                    selectedOrder?.deliveryAddress?.landmark,
                  ].filter(Boolean).join(", ") || "—"}
                </CustomText>
                <CustomText sx={{ fontSize: 13, color: "#666" }}>
                  {[
                    selectedOrder?.deliveryAddress?.city,
                    selectedOrder?.deliveryAddress?.state,
                  ].filter(Boolean).join(", ")}
                  {selectedOrder?.deliveryAddress?.zipCode ? ` - ${selectedOrder?.deliveryAddress.zipCode}` : ""}
                </CustomText>
              </Box>

              <Divider sx={{ my: 1 }} />

              <CustomText sx={{ fontSize: 13, fontWeight: 700, color: "#333" }}>Items</CustomText>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {(selectedOrder?.items || []).map((it, i) => (
                  <Box
                    key={`${it.product || it._id || i}`}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 2,
                      bgcolor: "#fff",
                      border: "1px solid #eee",
                      borderRadius: 2,
                      p: 1.25,
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <CustomText sx={{ fontSize: 13, fontWeight: 600 }}>
                        {it.name || "—"}
                      </CustomText>
                      <CustomText sx={{ fontSize: 12, color: "#666" }}>
                        Qty: {it.quantity || 0} × ₹{Number(it.rate ?? 0).toFixed(2)}
                        {it.tax != null && !Number.isNaN(Number(it.tax)) ? ` · Tax: ₹${Number(it.tax).toFixed(2)}` : ""}
                      </CustomText>
                    </Box>
                    <CustomText sx={{ fontSize: 13, fontWeight: 700, color: "var(--themeColor)" }}>
                      ₹{Number(it.total ?? 0).toFixed(2)}
                    </CustomText>
                  </Box>
                ))}
                {(!selectedOrder?.items || selectedOrder?.items.length === 0) && (
                  <CustomText sx={{ fontSize: 13, color: "#666" }}>No items</CustomText>
                )}
              </Box>

              <Divider sx={{ my: 1 }} />

              <CustomText sx={{ fontSize: 13, fontWeight: 700, color: "#333" }}>Totals</CustomText>
              {(() => {
                const items = selectedOrder?.items || [];
                const orderTax =
                  selectedOrder?.order_level_total_taxes ??
                  selectedOrder?.item_taxes ??
                  (items.length ? items.reduce((sum, it) => sum + Number(it.tax ?? 0), 0) : null);
                const hasTax = orderTax != null && !Number.isNaN(Number(orderTax));
                return (
                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 0.5 }}>
                    <CustomText sx={{ fontSize: 13, color: "#666" }}>Subtotal</CustomText>
                    <CustomText sx={{ fontSize: 13, fontWeight: 600 }}>
                      {selectedOrder?.order_subtotal != null ? `₹${Number(selectedOrder?.order_subtotal).toFixed(2)}` : "—"}
                    </CustomText>
                    <CustomText sx={{ fontSize: 13, color: "#666" }}>Tax</CustomText>
                    <CustomText sx={{ fontSize: 13, fontWeight: 600 }}>
                      {hasTax ? `₹${Number(orderTax).toFixed(2)}` : "—"}
                    </CustomText>
                    <CustomText sx={{ fontSize: 13, color: "#666" }}>Discount</CustomText>
                    <CustomText sx={{ fontSize: 13, fontWeight: 600 }}>
                      {selectedOrder?.discount != null ? `₹${Number(selectedOrder?.discount).toFixed(2)}` : "—"}
                    </CustomText>
                    <CustomText sx={{ fontSize: 14, fontWeight: 800 }}>Grand Total</CustomText>
                    <CustomText sx={{ fontSize: 14, fontWeight: 800, color: "var(--themeColor)" }}>
                      {selectedOrder?.total_charges != null ? `₹${Number(selectedOrder?.total_charges).toFixed(2)}` : "—"}
                    </CustomText>
                  </Box>
                );
              })()}

              {selectedOrder?.receipt?.pdfUrl && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <CustomText sx={{ fontSize: 13, fontWeight: 700, color: "#333", mb: 0.5 }}>Receipt</CustomText>
                  {selectedOrder?.receipt.generatedAt && (
                    <CustomText sx={{ fontSize: 12, color: "#666" }}>
                      Generated on{" "}
                      {new Date(selectedOrder?.receipt.generatedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </CustomText>
                  )}
                  <Button
                    component="a"
                    href={selectedOrder?.receipt.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    variant="contained"
                    size="small"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "var(--themeColor)",
                      color: "#fff",
                      width: "fit-content",
                      "&:hover": { backgroundColor: "var(--specialColor)" },
                    }}
                  >
                    Download receipt (PDF)
                  </Button>
                </>
              )}
            </Box>
          ) : (
            <CustomText sx={{ fontSize: 14, color: "#666" }}>No order selected.</CustomText>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

