import { Box, Popover, Grid, CircularProgress } from "@mui/material";
import { CustomText } from "./CustomText";
import { useNavigate } from "react-router-dom";
import { useItemCategories } from "../../hooks/useItemCategories";
import { useMemo, useState, useEffect } from "react";
import { fetchProducts } from "../../utils/apiService";

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
  const { categories, loading: categoriesLoading } = useItemCategories();
  const [productsData, setProductsData] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Get home page sections for this navbar label
  const homePageSections = useMemo(() => {
    return getHomePageSections(category);
  }, [category]);

  // Get keywords for additional filtering
  const keywords = useMemo(() => {
    return getCategoryKeywords(category);
  }, [category]);

  // Fetch products for each category to get varieties
  useEffect(() => {
    if (!isOpen || !categories || categories.length === 0 || homePageSections.length === 0) {
      return;
    }

    const loadProducts = async () => {
      setLoadingProducts(true);
      const productsMap = {};

      try {
        // Get all categories for this section
        const allCategoryIds = [];
        homePageSections.forEach((section) => {
          const sectionCategories = categories.filter((cat) => {
            const groupname = (cat.groupname || "").toUpperCase();
            return section.groupnames.some((gn) => groupname === gn.toUpperCase());
          });
          sectionCategories.forEach((cat) => {
            if (cat.id && !allCategoryIds.includes(cat.id)) {
              allCategoryIds.push(cat.id);
            }
          });
        });

        // Fetch products for each category in parallel
        const productPromises = allCategoryIds.map(async (categoryId) => {
          try {
            const response = await fetchProducts(categoryId, 1, 50, ""); // Fetch up to 50 products
            if (response?.success && response?.data && Array.isArray(response.data)) {
              return { categoryId, products: response.data };
            }
            return { categoryId, products: [] };
          } catch (error) {
            console.error(`Error fetching products for category ${categoryId}:`, error);
            return { categoryId, products: [] };
          }
        });

        const results = await Promise.all(productPromises);
        results.forEach(({ categoryId, products }) => {
          productsMap[categoryId] = products;
        });
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoadingProducts(false);
      }

      setProductsData(productsMap);
    };

    loadProducts();
  }, [isOpen, categories, homePageSections]);

  // Get category columns with varieties dynamically
  const dropdownData = useMemo(() => {
    if (!categories || categories.length === 0) {
      return { columns: [] };
    }

    // Flatten all categories into columns (one per category heading)
    const columns = [];
    homePageSections.forEach((section) => {
      section.groupnames.forEach((groupname) => {
        const category = categories.find(
          (cat) => cat.groupname?.toUpperCase() === groupname.toUpperCase()
        );
        
        if (category) {
          const categoryProducts = productsData[category.id] || [];
          const varieties = categoryProducts
            .map((product) => product.name)
            .filter((name) => name)
            .filter((name, index, self) => self.indexOf(name) === index) // Remove duplicates
            .slice(0, 10); // Limit to 10 varieties per category

          if (varieties.length > 0) {
            columns.push({
              heading: getCategoryDisplayName(category.groupname),
              color: section.color,
              categoryId: category.id,
              varieties: varieties,
            });
          }
        }
      });
    });

    return { columns };
  }, [categories, homePageSections, productsData]);

  if (!isOpen) {
    return null;
  }

  if (categoriesLoading || loadingProducts) {
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
            p: 3,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 2 }}>
          <CircularProgress size={24} />
        </Box>
      </Popover>
    );
  }

  if (!dropdownData.columns || dropdownData.columns.length === 0) {
    return null;
  }

  const handleVarietyClick = (varietyName, categoryId) => {
    // Navigate to products page with search query
    if (categoryId) {
      navigate(`/products?category=${categoryId}&search=${encodeURIComponent(varietyName)}`);
    } else {
      navigate(`/products?search=${encodeURIComponent(varietyName)}`);
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
          borderRadius: 3,
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          maxWidth: { xs: "95vw", sm: "1100px", md: "1200px" },
          width: { xs: "95vw", sm: "1100px", md: "1200px" },
          maxHeight: "75vh",
          overflowY: "auto",
          overflowX: "hidden",
          backgroundColor: "#fff",
          border: "1px solid rgba(255,148,114,0.2)",
          transition: "all 0.3s ease",
        },
      }}
      onMouseEnter={(e) => {
        e.stopPropagation();
      }}
      onMouseLeave={(e) => {
        onClose();
      }}
      transitionDuration={200}
    >
      <Box
        sx={{
          py: { xs: 2.5, md: 3.5 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {dropdownData.columns.map((column, index) => {
            const firstColumnColor = dropdownData.columns[0]?.color || column.color;
            return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {/* Category Heading (Not Clickable) */}
                <CustomText
                  sx={{
                    fontSize: { xs: 14, sm: 15, md: 17 },
                    fontWeight: 700,
                    color: firstColumnColor,
                    mb: 1.5,
                    textTransform: "capitalize",
                    letterSpacing: "0.3px",
                  }}
                >
                  {column.heading}
                </CustomText>

                {/* Varieties (Clickable) */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.6,
                    pl: 1.5,
                  }}
                >
                  {column.varieties.map((variety, varietyIndex) => (
                    <CustomText
                      key={varietyIndex}
                      onClick={() => handleVarietyClick(variety, column.categoryId)}
                      sx={{
                        fontSize: { xs: 12, sm: 13, md: 14 },
                        color: "#333",
                        cursor: "pointer",
                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                        py: 0.5,
                        px: 1,
                        borderRadius: 1.5,
                        "&:hover": {
                          color: column.color,
                          backgroundColor: `${column.color}12`,
                          transform: "translateX(6px)",
                          fontWeight: 500,
                          paddingLeft: "12px",
                        },
                      }}
                    >
                      {variety}
                    </CustomText>
                  ))}
                </Box>
              </Box>
            </Grid>
            );
          })}
        </Grid>
      </Box>
    </Popover>
  );
};

