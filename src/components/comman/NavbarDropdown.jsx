import { Box, Popover } from "@mui/material";
import { CustomText } from "./CustomText";
import { useNavigate } from "react-router-dom";
import { useHomeLayout } from "../../hooks/useHomeLayout";
import { useMemo } from "react";

/**
 * NavbarDropdown Component
 * Displays dropdown menu content for navbar items dynamically from API
 * 
 * @param {Object} props
 * @param {string} props.category - Category label
 * @param {boolean} props.isOpen - Whether dropdown is open
 * @param {Function} props.onClose - Close handler
 * @param {Object} props.anchorEl - Anchor element for popover positioning
 */

// Map category groupnames/categoryNames to display names (like home page subtitles)
const getCategoryDisplayName = (categoryName) => {
  const name = categoryName?.toUpperCase() || "";

  // Cakes mapping
  if (name === "CAKES WEB AND APP") return "Birthday Cakes";
  if (name === "CAKES") return "Beautiful Cakes";
  if (name === "SNB CREAMLESS CAKES") return "Creamless Cakes";
  if (name === "DRY CAKES AND MUFFINS") return "Dry Cakes and Muffins";

  // Other categories - use formatted categoryName
  return categoryName || "Category";
};

// Map navbar labels to home page sections with items (like MainLayout.jsx)
const getHomePageSections = (navbarLabel) => {
  const label = navbarLabel?.toUpperCase() || "";

  if (label.includes("CAKE")) {
    return [
      {
        title: "Cakes",
        groupnames: ["CAKES WEB AND APP", "CAKES", "SNB CREAMLESS CAKES", "DRY CAKES AND MUFFINS"],
        color: "#d32f2f"
      },
    ];
  }

  if (label.includes("MITHAI") || label.includes("COOKIE")) {
    return [
      { title: "Mithai", groupnames: ["MITHAI"], color: "#00897b" },
      { title: "Cookies", groupnames: ["COOKIES"], color: "#d32f2f" },
    ];
  }

  if (label.includes("GIFT") || label.includes("CHOCOLATE")) {
    return [
      { title: "Gift Hampers", groupnames: ["GIFT HAMPERS"], color: "#2e7d32" },
      { title: "Chocolates", groupnames: ["CHOCOLATES"], color: "#f57c00" },
    ];
  }

  if (label.includes("ADDON")) {
    return [
      { title: "Addons", groupnames: ["ADDONS"], color: "#00b53d" },
      { title: "Celebration Items", groupnames: ["CELEBRATION ITEMS"], color: "#00b53d" },
    ];
  }

  return [];
};

export const NavbarDropdown = ({ category, categoryId, isOpen, onClose, anchorEl }) => {
  const navigate = useNavigate();
  const { menus } = useHomeLayout();

  // Get category columns with varieties from menus - use cached data immediately
  const dropdownData = useMemo(() => {
    if (!menus || menus.length === 0) {
      return { columns: [] };
    }

    const menu = menus.find((m) => m.categoryId === categoryId);

    if (!menu || !menu.products || menu.products.length === 0) {
      return { columns: [] };
    }

    const homePageSections = getHomePageSections(category);

    const matchingSection = homePageSections.find((section) =>
      section.groupnames.some((gn) =>
        (menu.categoryName || "").toUpperCase().includes(gn.toUpperCase())
      )
    );

    // Create varieties from products
    const varieties = menu.products
      .slice(0, 10) // Limit to 10 products per category
      .map((product) => ({
        name: product.name,
        productId: product.productId,
      }));

    if (varieties.length === 0) {
      return { columns: [] };
    }

    // Return single column with the menu's products
    return {
      columns: [{
        heading: getCategoryDisplayName(menu.categoryName),
        color: matchingSection?.color || "#FF9472",
        categoryId: menu.categoryId,
        varieties: varieties,
      }]
    };
  }, [menus, category, categoryId]);

  if (!isOpen) {
    return null;
  }

  // Show empty state if no data yet (but still render the popover)
  const hasData = dropdownData.columns && dropdownData.columns.length > 0;

  const handleVarietyClick = (variety, categoryId) => {
    // Navigate to product details page (same as home page)
    const productId = variety?.productId || variety?.id;
    const varietyName = variety?.name || variety;

    if (productId) {
      // Navigate to product details page
      navigate(`/products/${productId}`);
    } else {
      // Fallback: Navigate to products page with search query if productId not available
      if (categoryId) {
        navigate(`/products?category=${categoryId}&search=${encodeURIComponent(varietyName)}`);
      } else {
        navigate(`/products?search=${encodeURIComponent(varietyName)}`);
      }
    }
    onClose();
  };

  // Calculate width based on content
  const columnCount = hasData ? dropdownData.columns.length : 0;
  const maxProducts = hasData ? Math.max(...dropdownData.columns.map(col => col.varieties.length), 0) : 0;
  const estimatedWidth = columnCount === 1
    ? Math.min(350, Math.max(250, maxProducts * 20 + 100))
    : columnCount > 0
      ? Math.min(columnCount * 280 + 40, 800)
      : 300;

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      disableRestoreFocus
      disableAutoFocus
      disableEnforceFocus
      disableScrollLock={true}
      slotProps={{
        root: {
          style: {
            position: "fixed",
          },
        },
      }}
      sx={{
        mt: 1.5,
        pointerEvents: "auto",
        "& .MuiBackdrop-root": {
          display: "none", // Remove backdrop for instant display
        },
        "& .MuiPaper-root": {
          borderRadius: 2,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          width: "auto",
          minWidth: { xs: "280px", sm: "300px" },
          maxWidth: { xs: "90vw", sm: `${estimatedWidth}px` },
          maxHeight: "70vh",
          overflowY: "auto",
          overflowX: "hidden",
          backgroundColor: "#fff",
          border: "1px solid rgba(255,148,114,0.2)",
          animation: "none", // Remove any animations
          position: "absolute",
          margin: 0,
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderBottom: "8px solid #fff",
            zIndex: 1,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: "-9px",
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "9px solid transparent",
            borderRight: "9px solid transparent",
            borderBottom: "9px solid rgba(255,148,114,0.2)",
            zIndex: 0,
          },
        },
      }}
      onMouseEnter={(e) => {
        e.stopPropagation();
      }}
      onMouseLeave={(e) => {
        const relatedTarget = e.relatedTarget;
        if (!relatedTarget || !(relatedTarget instanceof Node) || !e.currentTarget.contains(relatedTarget)) {
          onClose();
        }
      }}
      transitionDuration={0}
      slotProps={{
        paper: {
          onMouseEnter: (e) => {
            e.stopPropagation();
          },
          onMouseLeave: (e) => {
            const relatedTarget = e.relatedTarget;
            if (!relatedTarget || !(relatedTarget instanceof Node) || !e.currentTarget.contains(relatedTarget)) {
              onClose();
            }
          },
        },
      }}
    >
      <Box
        sx={{
          py: { xs: 2, md: 2.5 },
          px: { xs: 2, sm: 2.5, md: 3 },
          width: "100%",
          minHeight: hasData ? "auto" : "100px",
        }}
      >
        {hasData ? (
          dropdownData.columns.map((column, index) => {
            const firstColumnColor = dropdownData.columns[0]?.color || column?.color;
            return (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  mb: index < dropdownData.columns.length - 1 ? 2 : 0,
                }}
              >
                <CustomText
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate(`/products?categoryId=${column?.categoryId}`);
                    onClose();
                  }}
                  sx={{
                    fontSize: { xs: 15, sm: 16, md: 17 },
                    fontWeight: 700,
                    color: firstColumnColor,
                    mb: 1,
                    textTransform: "capitalize",
                    letterSpacing: "0.3px",
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {column?.heading}
                </CustomText>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, pl: 1, }}>
                  {column?.varieties.map((variety, varietyIndex) => (
                    <CustomText
                      key={varietyIndex}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleVarietyClick(variety, column?.categoryId);
                      }}
                      sx={{
                        fontSize: { xs: 13, sm: 14, md: 14 },
                        color: "#333",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        py: 0.6,
                        px: 0,
                        borderRadius: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        "&:hover": {
                          color: column?.color,
                          backgroundColor: `${column?.color}15`,
                          transform: "translateX(4px)",
                          fontWeight: 500,
                        },
                      }}
                      title={variety?.name || variety}
                    >
                      {variety?.name || variety}
                    </CustomText>
                  ))}
                </Box>
              </Box>
            );
          })
        ) : (
          <Box sx={{ py: 2, textAlign: "center", color: "#999" }}>
            <CustomText sx={{ fontSize: 14 }}>Loading products...</CustomText>
          </Box>
        )}
      </Box>
    </Popover>
  );
};

