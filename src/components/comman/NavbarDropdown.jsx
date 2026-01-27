import { Box, Popover, Grid } from "@mui/material";
import { CustomText } from "./CustomText";
import { useNavigate } from "react-router-dom";
import { useItemCategories } from "../../hooks/useItemCategories";
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

// Map category groupnames to display names (like home page subtitles)
const getCategoryDisplayName = (groupname) => {
  const name = groupname?.toUpperCase() || "";
  
  // Cakes mapping
  if (name === "CAKES WEB AND APP") return "Birthday Cakes";
  if (name === "CAKES") return "Beautiful Cakes";
  if (name === "SNB CREAMLESS CAKES") return "Creamless Cakes";
  if (name === "DRY CAKES AND MUFFINS") return "Dry Cakes and Muffins";
  
  // Other categories - use formatted groupname
  return groupname || "Category";
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
  
  if (label.includes("BREAD") || label.includes("RUSK")) {
    return [
      { title: "Bread & Rusk", groupnames: ["BREAD & RUSK"], color: "#7b1fa2" },
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

// Get keywords to filter categories
const getCategoryKeywords = (navbarLabel) => {
  const label = navbarLabel?.toUpperCase() || "";
  if (label.includes("CAKE")) {
    return ["CAKE", "MUFFIN", "BROWNIE"];
  }
  if (label.includes("MITHAI") || label.includes("COOKIE")) {
    return ["MITHAI", "COOKIE", "SWEET"];
  }
  if (label.includes("BREAD") || label.includes("RUSK")) {
    return ["BREAD", "RUSK"];
  }
  if (label.includes("GIFT") || label.includes("CHOCOLATE")) {
    return ["GIFT", "CHOCOLATE", "HAMPER"];
  }
  if (label.includes("ADDON")) {
    return ["ADDON", "CELEBRATION", "CANDLE", "BALLOON"];
  }
  return [];
};

export const NavbarDropdown = ({ category, isOpen, onClose, anchorEl }) => {
  const navigate = useNavigate();
  const { categories, loading } = useItemCategories();

  // Get sections and filter categories dynamically
  const dropdownData = useMemo(() => {
    if (!categories || categories.length === 0) {
      return { sections: [] };
    }

    // Get home page sections for this navbar label
    const homePageSections = getHomePageSections(category);
    
    // Get keywords for additional filtering
    const keywords = getCategoryKeywords(category);

    // Create sections with their category items
    const sections = homePageSections.map((section) => {
      // Find categories that match this section's groupnames
      const sectionCategories = categories.filter((cat) => {
        const groupname = (cat.groupname || "").toUpperCase();
        return section.groupnames.some((gn) => groupname === gn.toUpperCase());
      });

      // If no exact match, try keyword matching
      const fallbackCategories = sectionCategories.length === 0
        ? categories.filter((cat) => {
            const groupname = (cat.groupname || cat.name || "").toUpperCase();
            return keywords.some((keyword) => groupname.includes(keyword));
          })
        : [];

      const items = [...sectionCategories, ...fallbackCategories]
        .map((cat) => ({
          name: getCategoryDisplayName(cat.groupname || cat.name),
          originalName: cat.groupname || cat.name,
          id: cat.id,
        }))
        .filter((item) => item.name)
        .filter((item, index, self) => 
          self.findIndex((i) => i.originalName === item.originalName) === index
        ); // Remove duplicates by original name

      return {
        title: section.title,
        color: section.color,
        items: items,
      };
    });

    return { sections: sections.filter((s) => s.items.length > 0) };
  }, [categories, category]);

  if (!isOpen || !dropdownData.sections || dropdownData.sections.length === 0) {
    return null;
  }

  const handleItemClick = (itemName, categoryId, originalName) => {
    if (categoryId) {
      navigate(`/products?category=${categoryId}&groupname=${encodeURIComponent(originalName || itemName)}`);
    } else {
      navigate(`/products?search=${encodeURIComponent(itemName)}`);
    }
    onClose();
  };

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      sx={{
        mt: 1,
        "& .MuiPaper-root": {
          borderRadius: 2,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          maxWidth: { xs: "95vw", sm: "900px", md: "1000px" },
          width: { xs: "95vw", sm: "900px", md: "1000px" },
          maxHeight: "70vh",
          overflowY: "auto",
          overflowX: "hidden",
          backgroundColor: "#e3f2fd",
          border: "1px solid rgba(0,0,0,0.1)",
        },
      }}
      onMouseEnter={(e) => {
        e.stopPropagation();
      }}
      onMouseLeave={(e) => {
        onClose();
      }}
    >
      <Box
        sx={{
          py: 3,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Grid container spacing={3}>
          {dropdownData.sections.map((section, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5, flexWrap: "wrap" }}>
                  <CustomText
                    sx={{
                      fontSize: { xs: 14, sm: 16, md: 18 },
                      fontWeight: 700,
                      color: section.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {section.title}
                  </CustomText>
                  {section.badge && (
                    <Box
                      sx={{
                        backgroundColor: section.badge.color,
                        color: "#fff",
                        px: 1.5,
                        py: 0.3,
                        borderRadius: 1,
                        fontSize: 9,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {section.badge.text}
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.6,
                    pl: 1,
                    borderLeft: `3px solid ${section.color}`,
                  }}
                >
                  {section.items.map((item, itemIndex) => (
                    <CustomText
                      key={itemIndex}
                      onClick={() => handleItemClick(item.name, item.id, item.originalName)}
                      sx={{
                        fontSize: { xs: 13, sm: 14, md: 15 },
                        color: "#333",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        py: 0.5,
                        px: 1,
                        borderRadius: 1,
                        "&:hover": {
                          color: section.color,
                          backgroundColor: `${section.color}10`,
                          transform: "translateX(5px)",
                          fontWeight: 500,
                        },
                      }}
                    >
                      {item.name}
                    </CustomText>
                  ))}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Popover>
  );
};

