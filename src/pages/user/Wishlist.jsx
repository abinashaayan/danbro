import { Box, Container } from "@mui/material";
import { WishlistTab } from "../../components/user/WishlistTab";

export const Wishlist = () => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
      <WishlistTab />
    </Container>
  );
};


