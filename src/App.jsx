import { Box } from "@mui/material";
import { BrowserRouter, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Footer } from "./components/comman/Footer";
import AppRoutes from "./routes/AppRoutes";
import { Navbar } from "./components/comman/Navbar";
import { TopHeader } from "./components/comman/TopHeader";
import { SplashScreen } from "./components/comman/SplashScreen";
import { DeliveryCheckDialog } from "./components/comman/DeliveryCheckDialog";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);

  const handleSplashFinish = () => {
    setShowSplash(false);
    
    // Check if delivery dialog has been shown before
    const hasSeenDialog = localStorage.getItem("deliveryDialogShown");
    if (!hasSeenDialog) {
      // Show dialog after a short delay
      setTimeout(() => {
        setShowDeliveryDialog(true);
      }, 500);
    }
  };

  const handleCloseDeliveryDialog = () => {
    setShowDeliveryDialog(false);
    localStorage.setItem("deliveryDialogShown", "true");
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <DeliveryCheckDialog open={showDeliveryDialog} onClose={handleCloseDeliveryDialog} />
      <Box
        sx={{
          width: "100%",
          maxWidth: "100vw",
          overflowX: "hidden",
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          opacity: showSplash ? 0 : 1,
          visibility: showSplash ? "hidden" : "visible",
          pointerEvents: showSplash ? "none" : "auto",
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <TopHeader />
        <Navbar />
        <Box sx={{ flex: 1, mb: { xs: 8, md: 12 } }}>
          <AppRoutes />
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;
