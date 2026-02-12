import { Box } from "@mui/material";
import { ProductDetailsSkeleton } from "../../../components/comman/Skeletons";

export const ProductDetailsLoading = () => (
  <Box sx={{ pt: { xs: 8, sm: 7 } }}>
    <ProductDetailsSkeleton />
  </Box>
);
