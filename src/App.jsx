import { Box } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Footer } from "./components/comman/Footer";
import AppRoutes from "./routes/AppRoutes";
import { Navbar } from "./components/comman/Navbar";
import { TopHeader } from "./components/comman/TopHeader";


function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          width: "100%",
          maxWidth: "100vw",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        <TopHeader />
        <Navbar />
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <AppRoutes />
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;
