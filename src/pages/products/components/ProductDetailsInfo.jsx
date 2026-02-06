import {
  Box,
  Button,
  TextField,
  Grid,
  IconButton,
  Alert,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Add, Remove, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { CustomText } from "../../../components/comman/CustomText";

export const ProductDetailsInfo = ({
  productData,
  weightOptions,
  productWeight,
  onWeightChange,
  showCakeMessage = false,
  cakeMessage,
  onCakeMessageChange,
  hasSavedLocation,
  deliveryLocationLabel,
  quantity,
  onQuantityChange,
  onAddToCart,
  addingToCart,
  product,
  cartMessage,
  onDismissCartMessage,
  inWishlist,
  wishlistLoading,
  onWishlistToggle,
  isProductInCart = false,
  onGoToCart,
}) => (
  <Box sx={{ minWidth: 0 }}>
    <CustomText
      variant="h3"
      autoTitleCase
      sx={{
        fontSize: { xs: 20, sm: 26, md: 32 },
        fontWeight: 600,
        fontFamily: "'Inter', sans-serif",
        color: "#2c2c2c",
        mb: 1,
        wordBreak: "break-word",
      }}
    >
      {productData?.name}
    </CustomText>
    <Box sx={{ mb: 0.5 }}>
      <Box >
        {productData?.mrp != null && productData?.rate != null && (
          <>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
              <CustomText sx={{ fontSize: { xs: 20, sm: 26, md: 32 }, fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#F31400" }}>
                ₹{productData?.rate}
              </CustomText>
              <Box component="span" sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 400, color: "#666" }}>
                / {productData?.weight || "—"}
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CustomText sx={{ fontSize: { xs: 12, sm: 13 }, fontWeight: 500, color: "#666", fontFamily: "'Inter', sans-serif" }}>MRP</CustomText>
              <CustomText
                component="span"
                sx={{
                  fontSize: { xs: 16, sm: 18 },
                  fontWeight: 500,
                  color: "#666",
                  fontFamily: "'Inter', sans-serif",
                  textDecoration: productData?.mrp > productData?.rate ? "line-through" : "none",
                }}
              >
                ₹{productData?.mrp}
              </CustomText>
            </Box>
          </>
        )}
        {((productData?.mrp == null && productData?.rate == null) || productData?.mrp == null || productData?.rate == null) && (
          <CustomText sx={{ fontSize: { xs: 20, sm: 26, md: 32 }, fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#F31400" }}>
            {productData?.price}
          </CustomText>
        )}
      </Box>
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, flexWrap: "wrap" }}>
      <Rating
        value={Math.min(5, Math.max(0, Number(product?.avgRating ?? productData?.avgRating) || 0))}
        precision={0.1}
        readOnly
        size="small"
        max={5}
        sx={{ color: "#FF643A", "& .MuiRating-iconFilled": { color: "#FF643A" }, "& .MuiRating-iconEmpty": { color: "rgba(255, 100, 58, 0.5)" } }}
      />
      <CustomText sx={{ fontSize: { xs: 13, sm: 14 }, fontWeight: 500, fontFamily: "'Inter', sans-serif", color: "#333" }}>
        {(Number(product?.avgRating ?? productData?.avgRating) || 0).toFixed(1)}
      </CustomText>
      <CustomText sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 400, fontFamily: "'Inter', sans-serif", color: "#777" }}>
        ({Number(product?.totalReviews ?? productData?.totalReviews) || 0} Review{(Number(product?.totalReviews ?? productData?.totalReviews) || 0) !== 1 ? "s" : ""})
      </CustomText>
    </Box>
    <CustomText
      variant="body1"
      autoTitleCase
      sx={{
        color: "#666",
        lineHeight: 1.7,
        mb: 1,
        fontSize: { xs: 14, sm: 15 },
        fontWeight: 400,
        fontFamily: "'Inter', sans-serif",
        wordBreak: "break-word",
      }}
    >
      {productData?.description}
    </CustomText>

    {weightOptions.length > 0 && (
      <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <CustomText sx={{ fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#2c2c2c", fontSize: 14 }}>Select Weight</CustomText>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {weightOptions?.map((w) => (
            <Chip
              key={w}
              label={w}
              clickable
              onClick={() => onWeightChange(w)}
              size="small"
              sx={{
                fontSize: 13,
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
                borderRadius: "999px",
                px: 1.8,
                py: 0.6,
                border: productWeight === w ? "2px solid #F31400" : "1px solid #ddd",
                backgroundColor: productWeight === w ? "#FFE9E3" : "#fff",
                color: productWeight === w ? "#F31400" : "#333",
                transition: "all 0.2s ease",
                "&:hover": { backgroundColor: productWeight === w ? "#FFE9E3" : "#fafafa" },
              }}
            />
          ))}
        </Box>
      </Box>
    )}

    {showCakeMessage && (
      <Box sx={{ mb: 0.5 }}>
        <CustomText sx={{ fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#2c2c2c", fontSize: 14, mb: 1 }}>Cake Message</CustomText>
        <TextField
          fullWidth
          placeholder="Write a sweet wish!"
          value={cakeMessage}
          onChange={(e) => onCakeMessageChange(e.target.value.slice(0, 25))}
          size="small"
          inputProps={{ maxLength: 25 }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1, fontFamily: "'Inter', sans-serif" } }}
          helperText={`${cakeMessage.length}/25`}
        />
      </Box>
    )}

    <Box sx={{ mb: 0, p: 1, borderRadius: 1, border: "1px solid #e0e0e0", backgroundColor: "#fafafa" }}>
      <CustomText sx={{ fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#2c2c2c", fontSize: 14 }}>Delivery Location</CustomText>
      {hasSavedLocation ? (
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", gap: 1.5, alignItems: { xs: "flex-start", sm: "center" } }}>
          <Box>
            <CustomText sx={{ fontSize: 12, fontFamily: "'Inter', sans-serif", color: "#2c2c2c" }}>{deliveryLocationLabel}</CustomText>
            <CustomText sx={{ fontSize: 13, fontWeight: 400, fontFamily: "'Inter', sans-serif", color: "#1B9C3F", mt: 0.5 }}>Awesome, we deliver to this location.</CustomText>
          </Box>
          <Button
            variant="outlined"
            size="small"
            onClick={() => window.dispatchEvent(new Event("openLocationDialog"))}
            sx={{
              borderRadius: 1,
              textTransform: "none",
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              px: 2,
              borderColor: "#F31400",
              color: "#F31400",
              "&:hover": { borderColor: "#C22A00", backgroundColor: "rgba(255, 148, 114, 0.08)" },
            }}
          >
            Change
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.5, alignItems: { xs: "stretch", sm: "center" } }}>
          <TextField
            fullWidth
            placeholder="Enter area / locality / pincode"
            size="small"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1, fontFamily: "'Inter', sans-serif" } }}
            onFocus={() => window.dispatchEvent(new Event("openLocationDialog"))}
            onClick={() => window.dispatchEvent(new Event("openLocationDialog"))}
          />
          <Button
            variant="contained"
            size="small"
            onClick={() => window.dispatchEvent(new Event("openLocationDialog"))}
            sx={{
              borderRadius: 1,
              textTransform: "none",
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              px: 2.5,
              backgroundColor: "#F31400",
              "&:hover": { backgroundColor: "#C22A00" },
            }}
          >
            Set Location
          </Button>
        </Box>
      )}
      {/* Availability based on courier (N = store pickup only, Y = courier delivery available) */}
      {product?.courier != null && (
        <Box sx={{ mt: 1.5, pt: 1.5, borderTop: "1px solid #eee" }}>
          <CustomText sx={{ fontSize: 12, fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#2c2c2c", mb: 0.5 }}>Availability</CustomText>
          <CustomText sx={{ fontSize: 13, fontFamily: "'Inter', sans-serif", color: product?.courier === "Y" ? "#1B9C3F" : "#666" }}>
            {product?.courier === "Y" ? "Available for courier delivery" : "Store pickup only (not available for courier delivery)"}
          </CustomText>
        </Box>
      )}
    </Box>

    <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mt: 2 }}>
      <Grid size={{ xs: 4, sm: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 1,
            border: "1px solid #ddd",
            p: { xs: 0.75, sm: 1 },
            backgroundColor: "#fff",
          }}
        >
          <Box onClick={() => onQuantityChange(Math.max(1, quantity - 1))} sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
            <Remove sx={{ color: "#2c2c2c", fontSize: 20 }} />
          </Box>
          <CustomText sx={{ fontWeight: 500, fontFamily: "'Inter', sans-serif", color: "#2c2c2c", fontSize: 14 }}>{quantity}</CustomText>
          <Box onClick={() => onQuantityChange(quantity + 1)} sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
            <Add sx={{ color: "#2c2c2c", fontSize: 20 }} />
          </Box>
        </Box>
      </Grid>
      <Grid size={{ xs: 6, sm: 7 }}>
        <Button
          onClick={isProductInCart ? onGoToCart : onAddToCart}
          disabled={!isProductInCart && (addingToCart || !product)}
          fullWidth
          sx={{
            backgroundColor: isProductInCart ? "#1B9C3F" : "#FF9472",
            color: "#fff",
            py: { xs: 1, sm: 1.2 },
            borderRadius: 1,
            fontSize: { xs: 13, sm: 15 },
            fontWeight: 500,
            fontFamily: "'Inter', sans-serif",
            textTransform: "none",
            transition: "all 0.25s ease",
            "&:hover": {
              backgroundColor: isProductInCart ? "#148A37" : "#F2709C",
            },
            "&:disabled": {
              backgroundColor: "#ccc",
              color: "#999",
            },
          }}
        >
          {addingToCart && !isProductInCart ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CircularProgress size={20} sx={{ color: "#fff" }} />
              <CustomText sx={{ fontFamily: "'Inter', sans-serif" }}>
                Adding...
              </CustomText>
            </Box>
          ) : isProductInCart ? (
            "Go to Cart"
          ) : (
            "Add to Cart"
          )}
        </Button>
      </Grid>
      <Grid size={{ xs: 2, sm: 2 }}>
        <IconButton
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          onClick={onWishlistToggle}
          disabled={wishlistLoading}
          sx={{
            backgroundColor: inWishlist ? "rgba(244, 67, 54, 0.08)" : "#f5f5f5",
            borderRadius: 1,
            "&:hover": { backgroundColor: inWishlist ? "rgba(244, 67, 54, 0.15)" : "#e0e0e0" },
          }}
        >
          {wishlistLoading ? (
            <CircularProgress size={20} sx={{ color: "var(--themeColor)" }} />
          ) : inWishlist ? (
            <Favorite sx={{ color: "#f44336", fontSize: 20 }} />
          ) : (
            <FavoriteBorder sx={{ color: "#2c2c2c", fontSize: 20 }} />
          )}
        </IconButton>
      </Grid>
    </Grid>

    {cartMessage && (
      <Alert severity={cartMessage.type} sx={{ mt: 1, borderRadius: 1 }} onClose={onDismissCartMessage}>
        {cartMessage.text}
      </Alert>
    )}
  </Box>
);
