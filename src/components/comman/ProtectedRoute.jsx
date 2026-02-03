import { Navigate, useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { checkAuth } from "../../store/authSlice";

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 * Uses Redux for auth state management
 * Redirects to login if user is not authenticated
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The protected component/route
 * @returns {JSX.Element}
 */
export const ProtectedRoute = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, authChecked } = useAppSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    // Check authentication status from Redux store
    dispatch(checkAuth());
  }, [dispatch]);

  // Show loading state until auth check has completed (avoids redirect to login on refresh)
  if (!authChecked || isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "var(--themeColor)" }} />
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location, redirectTo: location.pathname }} 
        replace 
      />
    );
  }

  // Render protected content if authenticated
  return <>{children}</>;
};

