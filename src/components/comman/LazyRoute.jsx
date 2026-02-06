import { lazy, Suspense, ComponentType, useEffect, useRef } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";

/**
 * Loading fallback - full height, soft so transition feels smooth
 */
const LoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      opacity: 0.96,
      transition: "opacity 0.2s ease",
    }}
  >
    <CircularProgress size={44} sx={{ color: "var(--themeColor)" }} />
  </Box>
);

/**
 * LazyRoute Component
 * Wraps a lazy-loaded component with Suspense and loading fallback
 * 
 * @param {Object} props
 * @param {ComponentType} props.component - The lazy-loaded component
 * @param {React.ReactNode} props.fallback - Optional custom loading fallback
 * @returns {JSX.Element}
 */
export const LazyRoute = ({ 
  component: Component, 
  fallback = <LoadingFallback /> 
}) => {
  const { pathname } = useLocation();
  const hasDispatchedRef = useRef(false);

  useEffect(() => {
    // Only dispatch appReady once, and only if not home page (home page handles it itself)
    if (!hasDispatchedRef.current && !window.__appReadyDispatched) {
      const isHomePage = pathname === "/" || pathname === "/home";
      
      // For non-home pages, dispatch immediately on mount
      // Home page will dispatch when data loads
      if (!isHomePage) {
        window.__appReadyDispatched = true;
        hasDispatchedRef.current = true;
        window.dispatchEvent(new CustomEvent('appReady'));
      }
    }
  }, [pathname]);

  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
};

/**
 * Helper function to create lazy-loaded components
 * Handles both default and named exports
 * 
 * @param {Function} importFn - The import function for lazy loading
 * @param {string} exportName - Optional named export name (if not default)
 * @returns {LazyExoticComponent}
 */
export const createLazyComponent = (importFn, exportName = null) => {
  if (exportName) {
    return lazy(() => importFn().then(module => ({ default: module[exportName] })));
  }
  return lazy(importFn);
};

export default LazyRoute;

