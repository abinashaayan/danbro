import { Box, Fab } from "@mui/material";
import { BrowserRouter, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Footer } from "./components/comman/Footer";
import AppRoutes from "./routes/AppRoutes";
import { Navbar } from "./components/comman/Navbar";
import { TopHeader } from "./components/comman/TopHeader";
import { DeliveryCheckDialog } from "./components/comman/DeliveryCheckDialog";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use requestAnimationFrame for non-blocking scroll
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const { pathname } = useLocation();
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);

  // Hide Navbar on profile page
  const hideNavbar = pathname === "/profile" || pathname === "/user-profile";
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/verify-otp";
  const isStorePage = pathname === "/store";
  const isEventsPage = pathname === "/events";
  const isNoPaddingPage =
    pathname === "/about-us" ||
    pathname === "/blog" ||
    pathname === "/blog-details" ||
    pathname === "/contact";

  useEffect(() => {
    // Check if location is already set
    const hasLocation = localStorage.getItem('userLocation');
    const hasSeenDialog = localStorage.getItem("deliveryDialogShown");
    
    // Show dialog if location is not set OR if user hasn't seen the dialog
    if (!hasLocation || !hasSeenDialog) {
      setShowDeliveryDialog(true);
    }
  }, []);

  useEffect(() => {
    const openDialog = () => setShowDeliveryDialog(true);
    window.addEventListener("openLocationDialog", openDialog);
    return () => window.removeEventListener("openLocationDialog", openDialog);
  }, []);

  const handleCloseDeliveryDialog = () => {
    setShowDeliveryDialog(false);
    localStorage.setItem("deliveryDialogShown", "true");
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "7309032618";
    const message = encodeURIComponent("Hello! I'd like to know more about your products.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <ScrollToTop />
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
        }}
      >
        <TopHeader />
        {!hideNavbar && <Navbar />}
        <Box 
          sx={{ 
            flex: 1,
            // Add padding-top to account for fixed TopHeader / Navbar on most pages.
            // For auth pages (login/register/verify-otp) we remove this padding so the hero background
            // can sit directly behind the header without extra blank space.
            pt: isAuthPage || isStorePage || isEventsPage || isNoPaddingPage
              ? { xs: "0px", sm: "0px", md: "0px", lg: "0px" }
              : hideNavbar 
                ? { xs: "65px", sm: "70px", md: "65px", lg: "70px" } // Profile page: only TopHeader
                : { xs: "107px", sm: "111px", md: "107px", lg: "111px" } // Other pages
          }}
        >
          <AppRoutes />
        </Box>
        {!hideNavbar && <Footer />}
        
        {/* Floating WhatsApp Button */}
        <Fab
          onClick={handleWhatsAppClick}
          sx={{
            position: "fixed",
            bottom: { xs: 20, md: 30 },
            right: { xs: 20, md: 30 },
            backgroundColor: "#25D366",
            color: "#fff",
            width: { xs: 56, md: 64 },
            height: { xs: 56, md: 64 },
            zIndex: 1000,
            boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              backgroundColor: "#20BA5A",
              transform: "scale(1.1)",
              boxShadow: "0 6px 30px rgba(37, 211, 102, 0.6)",
            },
            "&:active": {
              transform: "scale(0.95)",
            },
            animation: "pulse 2s ease-in-out infinite",
            "@keyframes pulse": {
              "0%, 100%": {
                boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
              },
              "50%": {
                boxShadow: "0 4px 30px rgba(37, 211, 102, 0.7)",
              },
            },
          }}
          aria-label="WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{
              width: "60%",
              height: "60%",
            }}
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </Fab>
      </Box>
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
    </Provider>
  );
}

export default App;
