import { Box, Container } from "@mui/material";
import { WishlistTab } from "../../components/user/WishlistTab";

export const Wishlist = () => {
  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 }, pt: { xs: 1, sm: 2, md: 3 }, maxWidth: "100%", overflowX: "hidden" }}>
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 }, maxWidth: "100%" }}>
        <WishlistTab />
      </Container>
    </Box>
  );
};


