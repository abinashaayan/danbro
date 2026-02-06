import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { CustomText } from "../comman/CustomText";
import {
  DeleteOutline as DeleteOutlineIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import blankImage from "../../assets/blankimage.png";

const getItemPrice = (item) => {
  if (item?.lineTotal != null && item.lineTotal > 0) return Number(item.lineTotal).toFixed(2);
  if (Array.isArray(item?.price) && item.price.length > 0)
    return (Number(item.price[0].rate) || Number(item.price[0].mrp) || 0).toFixed(2);
  if (item?.price && typeof item.price === "object" && (item.price.rate != null || item.price.mrp != null))
    return (Number(item.price.rate) || Number(item.price.mrp) || 0).toFixed(2);
  return (typeof item?.price === "number" ? item.price : 0).toFixed(2);
};

const getItemImage = (item) =>
  (item.images && Array.isArray(item.images) && item.images.length > 0 && (item.images[0].url || item.images[0])) ||
  item.image ||
  item.product?.image ||
  blankImage;

const getItemName = (item) => item?.name || item?.product?.name || "Product";
const getItemUnit = (item) => {
  const weight = item?.weight ?? item?.product?.weight;
  return weight != null && weight !== "" ? weight : null;
};

export const CartItem = ({
  item,
  updatingItems,
  updatingAction,
  getItemKey,
  updateQuantity,
  removeItem,
  compact = false,
  showDivider = true,
}) => {
  const productId = item.productId || item._id || item.id;
  const itemKey = getItemKey(productId, item.rawWeight ?? item.weight);
  const isUpdatingIncrease = updatingItems.has(itemKey) && updatingAction[itemKey] === "increase";
  const isUpdatingDecrease = updatingItems.has(itemKey) && updatingAction[itemKey] === "decrease";
  const isUpdatingRemove = updatingItems.has(itemKey) && updatingAction[itemKey] === "remove";
  const isUpdating = isUpdatingIncrease || isUpdatingDecrease || isUpdatingRemove;

  if (compact) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 1.5, md: 2 },
          py: { xs: 1.5, sm: 2 },
          borderBottom: showDivider ? "1px dotted #ddd" : "none",
          "&:last-of-type": { borderBottom: "none" },
          minWidth: 0,
          maxWidth: "100%",
        }}
      >
        <Box
          component={Link}
          to={`/products/${productId}`}
          sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 }, flex: 1, minWidth: 0, textDecoration: "none", color: "inherit", overflow: "hidden" }}
        >
          <Box sx={{ width: { xs: 52, sm: 64 }, height: { xs: 52, sm: 64 }, borderRadius: 1.5, overflow: "hidden", flexShrink: 0 }}>
            <img src={getItemImage(item)} alt={getItemName(item)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Box>
          <Box sx={{ width: { xs: 20, sm: 24 }, height: { xs: 20, sm: 24 }, borderRadius: 0.5, bgcolor: "#0d8c2d", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Box sx={{ width: { xs: 8, sm: 10 }, height: { xs: 8, sm: 10 }, borderRadius: "50%", border: "1.5px solid #fff", bgcolor: "transparent" }} />
          </Box>
          <Box sx={{ minWidth: 0, overflow: "hidden" }}>
            <CustomText sx={{ fontSize: { xs: 13, sm: 14, md: 15 }, fontWeight: 600, color: "#2c2c2c", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {getItemName(item)}
            </CustomText>
            {getItemUnit(item) && (
              <CustomText sx={{ fontSize: { xs: 11, sm: 12 }, color: "#666", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                ({getItemUnit(item)})
              </CustomText>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 }, flexShrink: 0 }}>
          <IconButton
            size="small"
            onClick={() => updateQuantity(productId, -1, item.rawWeight ?? item.weight)}
            disabled={isUpdating}
            sx={{ color: "#666", bgcolor: "#f0f0f0", p: { xs: 0.4, sm: 0.5 }, "&:hover": { bgcolor: "#e0e0e0" }, "&:disabled": { opacity: 0.5 } }}
          >
            {isUpdatingDecrease ? <CircularProgress size={14} /> : <RemoveIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
          </IconButton>
          <CustomText sx={{ minWidth: 24, textAlign: "center", fontSize: { xs: 13, sm: 14 }, fontWeight: 600 }}>
            {item.quantity}
          </CustomText>
          <IconButton
            size="small"
            onClick={() => updateQuantity(productId, 1, item.rawWeight ?? item.weight)}
            disabled={isUpdating}
            sx={{ color: "var(--themeColor)", bgcolor: "rgba(230,120,80,0.12)", p: { xs: 0.4, sm: 0.5 }, "&:hover": { bgcolor: "rgba(230,120,80,0.2)" }, "&:disabled": { opacity: 0.5 } }}
          >
            {isUpdatingIncrease ? <CircularProgress size={14} /> : <AddIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
          </IconButton>
        </Box>
        <CustomText sx={{ fontSize: { xs: 12, sm: 14, md: 15 }, fontWeight: 600, color: "#2c2c2c", minWidth: { xs: 56, sm: 70, md: 80 }, textAlign: "right", flexShrink: 0 }}>
          INR {getItemPrice(item)}
        </CustomText>
        <IconButton
          size="small"
          onClick={() => removeItem(productId, item.rawWeight ?? item.weight)}
          disabled={isUpdating}
          sx={{ color: "#d32f2f", p: { xs: 0.4, sm: 0.5 }, "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.1)" }, "&:disabled": { opacity: 0.5 } }}
          aria-label="Remove item"
        >
          <DeleteOutlineIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
        </IconButton>
      </Box>
    );
  }

  return (
    <Card
      key={productId || item.id}
      sx={{
        borderRadius: { xs: 2, md: 2.5 },
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.12)" },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", gap: { xs: 2, md: 3 }, flexDirection: { xs: "column", sm: "row" } }}>
          <Box component={Link} to={`/products/${productId}`} sx={{ display: "flex", flex: 1, minWidth: 0, textDecoration: "none", color: "inherit", cursor: "pointer" }}>
            <Box component="span" sx={{ display: "flex", gap: { xs: 2, md: 3 }, flex: 1, minWidth: 0, flexDirection: { xs: "column", sm: "row" }, "&:hover": { opacity: 0.9 } }}>
              <Box sx={{ width: { xs: "100%", sm: 110 }, height: { xs: 180, sm: 110 }, borderRadius: 2, overflow: "hidden", flexShrink: 0 }}>
                <img src={getItemImage(item)} alt={getItemName(item)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <CustomText sx={{ fontSize: { xs: 16, md: 18 }, fontWeight: 600, color: "#2c2c2c", mb: 0.5 }}>
                  {getItemName(item)}
                </CustomText>
                {getItemUnit(item) && (
                  <CustomText sx={{ fontSize: { xs: 12, md: 14 }, color: "#666", mb: { xs: 1, md: 1.5 } }}>
                    Weight: {getItemUnit(item)}
                  </CustomText>
                )}
                <CustomText sx={{ fontSize: { xs: 18, md: 20 }, fontWeight: 700, color: "var(--themeColor)" }}>
                  ₹{getItemPrice(item)}
                </CustomText>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flexShrink: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: { xs: 2, sm: 0 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, border: "1px solid #ddd", borderRadius: 2, p: 0.5 }}>
                <IconButton size="small" onClick={() => updateQuantity(productId, -1, item.rawWeight ?? item.weight)} disabled={isUpdating} sx={{ color: "var(--themeColor)", "&:hover": { backgroundColor: "rgba(95, 41, 48, 0.1)" }, "&:disabled": { opacity: 0.5 } }}>
                  {isUpdatingDecrease ? <CircularProgress size={16} /> : <RemoveIcon sx={{ fontSize: { xs: 18, md: 20 } }} />}
                </IconButton>
                <CustomText sx={{ minWidth: { xs: 30, md: 40 }, textAlign: "center", fontSize: { xs: 14, md: 16 }, fontWeight: 600 }}>{item.quantity}</CustomText>
                <IconButton size="small" onClick={() => updateQuantity(productId, 1, item.rawWeight ?? item.weight)} disabled={isUpdating} sx={{ color: "var(--themeColor)", "&:hover": { backgroundColor: "rgba(95, 41, 48, 0.1)" }, "&:disabled": { opacity: 0.5 } }}>
                  {isUpdatingIncrease ? <CircularProgress size={16} /> : <AddIcon sx={{ fontSize: { xs: 18, md: 20 } }} />}
                </IconButton>
              </Box>
              <IconButton onClick={() => removeItem(productId, item.rawWeight ?? item.weight)} disabled={isUpdating} sx={{ color: "#d32f2f", "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.1)" }, "&:disabled": { opacity: 0.5 } }}>
                <DeleteOutlineIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
