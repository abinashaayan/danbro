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
  if (!categoryName) return "Category";

  const name = categoryName.toUpperCase();

  // Cakes mapping
  if (name === "CAKES WEB AND APP") return "Birthday Cakes";
  if (name === "CAKES") return "Beautiful Cakes";
  if (name === "SNB CREAMLESS CAKES") return "Creamless Cakes";
  if (name === "DRY CAKES AND MUFFINS") return "Dry Cakes and Muffins";
  if (name === "BAKED SWEETS" || name.includes("BAKED SWEETS")) return "Baked Sweets";

  // Convert uppercase to title case, otherwise return as is
  if (categoryName === categoryName.toUpperCase()) {
    return categoryName
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Return original if already in proper case
  return categoryName;
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

  // Show empty state if no data yet (but still render the popover)
  const hasData = dropdownData?.columns && dropdownData?.columns.length > 0;

  if (!isOpen) {
    return null;
  }

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
  const columnCount = hasData ? dropdownData?.columns.length : 0;
  const maxProducts = hasData ? Math.max(...dropdownData?.columns.map(col => col.varieties.length), 0) : 0;
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
      sx={{
        mt: 1.5,
        pointerEvents: "auto",
        "& .MuiBackdrop-root": {
          display: "none", // Remove backdrop for instant display
        },
        "& .MuiPaper-root": {
          borderRadius: 2.5,
          boxShadow: "0 12px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(255,148,114,0.1)",
          width: "auto",
          minWidth: { xs: "240px", sm: "260px" },
          maxWidth: { xs: "90vw", sm: `${estimatedWidth}px` },
          maxHeight: "65vh",
          overflowY: "auto",
          overflowX: "hidden",
          background: "linear-gradient(135deg, #ffffff 0%, #fff8f5 100%)",
          border: "1.5px solid rgba(255,148,114,0.25)",
          position: "absolute",
          margin: 0,
          backdropFilter: "blur(10px)",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255,148,114,0.05)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,148,114,0.3)",
            borderRadius: "10px",
            "&:hover": {
              background: "rgba(255,148,114,0.5)",
            },
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: "10px solid #fff8f5",
            zIndex: 1,
            filter: "drop-shadow(0 -2px 4px rgba(0,0,0,0.05))",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: "-11px",
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "11px solid transparent",
            borderRight: "11px solid transparent",
            borderBottom: "11px solid rgba(255,148,114,0.25)",
            zIndex: 0,
          },
        },
      }}
      transitionDuration={0}
      slotProps={{
        root: {
          style: {
            position: "fixed",
          },
        },
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
        data-navbar-dropdown
        data-dropdown-for={category}
        sx={{
          py: { xs: 1.5, md: 2 },
          px: { xs: 2, sm: 2.5, md: 3 },
          width: "100%",
          minHeight: hasData ? "auto" : "80px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,248,245,0.95) 100%)",
        }}
      >
        {hasData ? (
          dropdownData?.columns.map((column, index) => {
            const firstColumnColor = dropdownData?.columns[0]?.color || column?.color;
            return (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  mb: index < dropdownData?.columns.length - 1 ? 1.5 : 0,
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
                    fontSize: { xs: 14, sm: 15, md: 16 },
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${firstColumnColor} 0%, ${firstColumnColor}dd 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textTransform: "none",
                    letterSpacing: "0.5px",
                    cursor: "pointer",
                    position: "relative",
                    display: "inline-block",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "-4px",
                      left: 0,
                      width: "0%",
                      height: "2px",
                      background: `linear-gradient(90deg, ${firstColumnColor}, ${firstColumnColor}88)`,
                      transition: "width 0.3s ease",
                    },
                    "&:hover": {
                      transform: "translateX(4px)",
                      "&::after": {
                        width: "100%",
                      },
                    },
                  }}
                >
                  {column?.heading}
                </CustomText>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, pl: 0, mt: 0.5 }}>
                  {column?.varieties?.map((variety, varietyIndex) => (
                    <CustomText
                      key={varietyIndex}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleVarietyClick(variety, column?.categoryId);
                      }}
                      sx={{
                        fontSize: { xs: 13, sm: 14, md: 14 },
                        color: "#444",
                        cursor: "pointer",
                        py: 0.75,
                        px: 1.25,
                        borderRadius: 1.5,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textTransform: "none",
                        fontWeight: 500,
                        position: "relative",
                        transformOrigin: "top center",
                        animation: "navbarDropdownTranslateX 300ms ease-in-out forwards",
                        animationDelay: `${varietyIndex * 60}ms`,
                        background: "linear-gradient(90deg, transparent 0%, rgba(255,148,114,0.05) 50%, transparent 100%)",
                        borderLeft: `3px solid ${column?.color}`,
                        transition: "background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: "0%",
                          background: `linear-gradient(90deg, ${column?.color}15, ${column?.color}08)`,
                          transition: "width 0.3s ease",
                          borderRadius: "0 4px 4px 0",
                        },
                        "&:hover": {
                          color: column?.color,
                          backgroundColor: `${column?.color}12`,
                          transform: "translateX(8px) scale(1.02)",
                          fontWeight: 600,
                          boxShadow: `0 2px 8px ${column?.color}25`,
                          "&::before": { width: "100%" },
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

