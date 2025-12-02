import { Box } from "@mui/material";
import banner from "../../assets/banner.png";

export const HeroBanner = () => {
  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <img
        src={banner}
        alt="hero banner"
        style={{
          width: "100%",
          maxWidth: "1400px",       // prevents extra scaling
          height: "auto",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};
