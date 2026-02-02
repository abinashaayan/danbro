import React from "react";
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

export const CartItem = ({
  item,
  updatingItems,
  updatingAction,
  getItemKey,
  updateQuantity,
  removeItem,
}) => {
  const productId = item.productId || item._id || item.id;
  const itemKey = getItemKey(productId, item.rawWeight ?? item.weight);
  const isUpdatingIncrease = updatingItems.has(itemKey) && updatingAction[itemKey] === "increase";
  const isUpdatingDecrease = updatingItems.has(itemKey) && updatingAction[itemKey] === "decrease";
  const isUpdating = isUpdatingIncrease || isUpdatingDecrease;

  return (
    <Card
      key={productId || item.id}
      sx={{
        borderRadius: { xs: 2, md: 2.5 },
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
        },
      }}
    >
      <CardContent sx={{ p: { xs: 1.5, md: 2.5 } }}>
        <Box
          sx={{
            display: "flex",
            gap: { xs: 2, md: 3 },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          {/* Product Image */}
          <Box
            sx={{
              width: { xs: "100%", sm: 110 },
              height: { xs: 180, sm: 110 },
              borderRadius: { xs: 2, md: 2 },
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={
                (item.images && Array.isArray(item.images) && item.images.length > 0 && (item.images[0].url || item.images[0])) ||
                item.image ||
                item.product?.image ||
                blankImage
              }
              alt={item.name || item.product?.name || "Product"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* Product Details */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Box>
              <CustomText
                sx={{
                  fontSize: { xs: 16, md: 18 },
                  fontWeight: 600,
                  color: "#2c2c2c",
                  mb: 0.5,
                }}
              >
                {item.name || item.product?.name || "Product"}
              </CustomText>
              <CustomText
                sx={{
                  fontSize: { xs: 12, md: 14 },
                  color: "#666",
                  mb: { xs: 1, md: 1.5 },
                }}
              >
                Weight: {item.weight ?? item.product?.weight ?? "N/A"}
              </CustomText>
              <CustomText
                sx={{
                  fontSize: { xs: 18, md: 20 },
                  fontWeight: 700,
                  color: "var(--themeColor)",
                }}
              >
                ₹{
                  (item.lineTotal != null && item.lineTotal > 0)
                    ? Number(item.lineTotal).toFixed(2)
                    : (Array.isArray(item.price) && item.price.length > 0)
                      ? (Number(item.price[0].rate) || Number(item.price[0].mrp) || 0).toFixed(2)
                      : (item.price && typeof item.price === "object" && (item.price.rate != null || item.price.mrp != null))
                        ? (Number(item.price.rate) || Number(item.price.mrp) || 0).toFixed(2)
                        : (typeof item.price === "number" ? item.price : 0).toFixed(2)
                }
              </CustomText>
            </Box>

            {/* Quantity Controls */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: { xs: 2, sm: 0 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  p: 0.5,
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => updateQuantity(productId, -1, item.rawWeight ?? item.weight)}
                  disabled={isUpdating}
                  sx={{
                    color: "var(--themeColor)",
                    "&:hover": { backgroundColor: "rgba(95, 41, 48, 0.1)" },
                    "&:disabled": { opacity: 0.5 },
                  }}
                >
                  {isUpdatingDecrease ? (
                    <CircularProgress size={16} />
                  ) : (
                    <RemoveIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
                  )}
                </IconButton>
                <CustomText
                  sx={{
                    minWidth: { xs: 30, md: 40 },
                    textAlign: "center",
                    fontSize: { xs: 14, md: 16 },
                    fontWeight: 600,
                  }}
                >
                  {item.quantity}
                </CustomText>
                <IconButton
                  size="small"
                  onClick={() => updateQuantity(productId, 1, item.rawWeight ?? item.weight)}
                  disabled={isUpdating}
                  sx={{
                    color: "var(--themeColor)",
                    "&:hover": { backgroundColor: "rgba(95, 41, 48, 0.1)" },
                    "&:disabled": { opacity: 0.5 },
                  }}
                >
                  {isUpdatingIncrease ? (
                    <CircularProgress size={16} />
                  ) : (
                    <AddIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
                  )}
                </IconButton>
              </Box>

              <IconButton
                onClick={() => removeItem(productId, item.rawWeight ?? item.weight)}
                disabled={isUpdating}
                sx={{
                  color: "#d32f2f",
                  "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.1)" },
                  "&:disabled": { opacity: 0.5 },
                }}
              >
                <DeleteOutlineIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
