import { Box,  IconButton, Drawer, useMediaQuery, useTheme, Collapse, List, ListItem } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useHomeLayout } from "../../hooks/useHomeLayout";
import { NavbarDropdown } from "./NavbarDropdown";
import { prefetchRoute } from "../../utils/routePrefetch";

export const Navbar = ({ mobileMenuOpen, onMobileMenuClose }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [internalMobileOpen, setInternalMobileOpen] = useState(false);
    const isControlled = typeof onMobileMenuClose === "function";
    const mobileOpen = isControlled ? !!mobileMenuOpen : internalMobileOpen;
    const closeDrawer = isControlled ? onMobileMenuClose : () => setInternalMobileOpen(false);
    const [expandedItems, setExpandedItems] = useState(new Set());
    const [hoveredItem, setHoveredItem] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const navbarRef = useRef(null);
    const { menus } = useHomeLayout();
    
    // Transform menus to navbar items format - memoized to prevent re-renders
    const menuItems = useMemo(() => {
        return menus?.map((menu) => ({
            label: menu.categoryName,
            categoryId: menu.categoryId,
            hasProducts: menu.products && menu.products.length > 0,
        })) || [];
    }, [menus]);
    
    // Add PRODUCTS heading at the beginning - memoized
    const navbarItems = useMemo(() => [
        {
            label: "Track Order",
            categoryId: null,
            hasProducts: false,
            path: "/track-order",
        },
        ...menuItems
    ], [menuItems]);

    // Helper functions for mobile dropdown
    const toggleMobileDropdown = (label) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(label)) {
            newExpanded.delete(label);
        } else {
            newExpanded.add(label);
        }
        setExpandedItems(newExpanded);
    };

    const getProductsForCategory = (categoryId) => {
        const menu = menus?.find((m) => m.categoryId === categoryId);
        return menu?.products?.slice(0, 10) || [];
    };

    const getCategoryDisplayName = (categoryName) => {
        const name = categoryName?.toUpperCase() || "";
        if (name === "CAKES WEB AND APP") return "Birthday Cakes";
        if (name === "CAKES") return "Beautiful Cakes";
        if (name === "SNB CREAMLESS CAKES") return "Creamless Cakes";
        if (name === "DRY CAKES AND MUFFINS") return "Dry Cakes and Muffins";
        return categoryName || "Category";
    };

    // Sticky header with hide/show on scroll + close dropdown on scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 50);
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            lastScrollY.current = currentScrollY;
            // Close hover menu/dropdown when user scrolls
            setHoveredItem(null);
            setAnchorEl(null);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent layout shift when menu is open - keep body scroll enabled
    // Menu uses fixed positioning so it won't affect page layout

    const handleDrawerToggle = () => {
        if (isControlled) onMobileMenuClose?.();
        else setInternalMobileOpen((prev) => !prev);
    };

    return (
        <>
            <Box
                ref={navbarRef}
                sx={{
                    position: "sticky",
                    top: { xs: "50px", md: "57px" },
                    zIndex: 999,
                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease",
                    transform: isVisible ? "translateY(0)" : "translateY(-100%)",
                }}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <Box
                    sx={{
                        display: { xs: "none", md: "flex" },
                        justifyContent: "center",
                        gap: { md: 3, lg: 4 },
                        py: 1,
                        background: "linear-gradient(135deg, #fff5f0 0%, #ffe8e0 50%, #ffddd4 100%)",
                        position: "relative",
                        boxShadow: isScrolled 
                            ? "0 6px 30px rgba(95, 41, 48, 0.15), inset 0 1px 0 rgba(255,255,255,0.8)" 
                            : "0 2px 15px rgba(95, 41, 48, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        borderTop: "1px solid rgba(255,148,114,0.2)",
                        borderBottom: "1px solid rgba(255,148,114,0.15)",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "4px",
                            background: "linear-gradient(90deg, transparent, #FF9472 20%, var(--themeColor) 50%, #FF9472 80%, transparent)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 4s ease-in-out infinite",
                            "@keyframes shimmer": {
                                "0%, 100%": { backgroundPosition: "-200% 0" },
                                "50%": { backgroundPosition: "200% 0" },
                            },
                        },
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "1px",
                            background: "linear-gradient(90deg, transparent, rgba(255,148,114,0.3), transparent)",
                        },
                    }}
                >
                    {navbarItems?.map(({ label, categoryId, hasProducts, path: itemPath }) => {
                        const showDropdown = hasProducts;
                        const path = itemPath || `/products?categoryId=${categoryId}`;
                        
                        return (
                            <Box
                                key={categoryId || label}
                                data-nav-item
                                data-nav-label={label}
                                sx={{
                                    position: "relative",
                                }}
                                onMouseEnter={(e) => {
                                    prefetchRoute(path);
                                    if (showDropdown) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setHoveredItem(label);
                                        setAnchorEl(e.currentTarget);
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!showDropdown) return;
                                    const relatedTarget = e.relatedTarget;
                                    if (!relatedTarget || typeof relatedTarget.closest !== "function") {
                                        setHoveredItem(null);
                                        setAnchorEl(null);
                                        return;
                                    }
                                    // Keep open only if cursor moved into THIS item's dropdown (same label)
                                    const enteredThisDropdown = relatedTarget.closest("[data-navbar-dropdown]")?.getAttribute("data-dropdown-for") === label;
                                    // If cursor moved to another nav title, don't close here – that item's onMouseEnter will set new hover
                                    const enteredAnotherNavItem = relatedTarget.closest("[data-nav-item]");
                                    if (!enteredThisDropdown && !enteredAnotherNavItem) {
                                        setHoveredItem(null);
                                        setAnchorEl(null);
                                    }
                                }}
                            >
                                <CustomText
                                    autoTitleCase={true}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      navigate(path);
                                    }}
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: { xs: 12, sm: 13, md: 14 },
                                        cursor: "pointer",
                                        color: location.pathname === path || (path === "/products" && location.pathname.startsWith("/products")) 
                                            ? "var(--themeColor)" 
                                            : "#7c341b",
                                        whiteSpace: "nowrap",
                                        position: "relative",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        transform: hoveredItem === label ? "translateY(-2px)" : "translateY(0)",
                                        px: 1.2,
                                        py: 0.5,
                                        borderRadius: 2,
                                        backgroundColor: hoveredItem === label ? "rgba(255,148,114,0.15)" : "transparent",
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            bottom: "2px",
                                            left: "50%",
                                            transform: hoveredItem === label ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
                                            width: "70%",
                                            height: "3px",
                                            background: "linear-gradient(90deg, transparent, var(--themeColor), transparent)",
                                            borderRadius: "2px",
                                            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        },
                                        "&:hover": { 
                                            color: "var(--themeColor)",
                                            backgroundColor: "rgba(255,148,114,0.12)",
                                        },
                                    }}
                                >
                                    {label}
                                </CustomText>
                                {showDropdown && (
                                    <NavbarDropdown
                                        category={label}
                                        categoryId={categoryId}
                                        isOpen={hoveredItem === label}
                                        onClose={() => {
                                            setHoveredItem(null);
                                            setAnchorEl(null);
                                        }}
                                        anchorEl={anchorEl}
                                    />
                                )}
                            </Box>
                        );
                    })}
                </Box>

            </Box>

            {/* Mobile Navbar strip - only show when menu is not controlled from TopHeader */}
            {!isControlled && (
                <Box
                    sx={{
                        display: { xs: "flex", md: "none" },
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1,
                        px: 2,
                        background: "linear-gradient(135deg, #fff5f0 0%, #ffe8e0 50%, #ffddd4 100%)",
                        boxShadow: "0 2px 15px rgba(95, 41, 48, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
                        borderTop: "1px solid rgba(255,148,114,0.2)",
                        borderBottom: "1px solid rgba(255,148,114,0.15)",
                    }}
                >
                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{
                            color: "var(--themeColor)",
                            transition: "transform 0.3s ease",
                            "&:active": {
                                transform: "scale(0.95)",
                            },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            )}

            {/* Mobile Drawer */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={closeDrawer}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        width: { xs: "280px", sm: "320px" },
                        background: "linear-gradient(180deg, #fff5f0 0%, #ffe8e0 50%, #ffddd4 100%)",
                        pt: 3,
                        boxShadow: "-4px 0 30px rgba(95, 41, 48, 0.2)",
                        borderRight: "1px solid rgba(255,148,114,0.2)",
                    },
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, mb: 2 }}>
                    <IconButton
                        onClick={closeDrawer}
                        sx={{
                            color: "var(--themeColor)",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        px: 3,
                    }}
                >
                    {/* Business - only in mobile drawer (Android view) */}
                    <Box
                        sx={{
                            display: { xs: "flex", md: "none" },
                            alignItems: "center",
                            cursor: "pointer",
                            pb: 1,
                            borderBottom: "1px solid rgba(255,148,114,0.3)",
                            mb: 0.5,
                        }}
                        onClick={() => {
                            closeDrawer();
                            window.dispatchEvent(new CustomEvent("openBusinessDialog"));
                        }}
                    >
                        <CustomText
                            sx={{
                                fontWeight: 600,
                                fontSize: 14,
                                color: "var(--themeColor)",
                                "&:hover": { opacity: 0.8 },
                            }}
                        >
                            Business +
                        </CustomText>
                    </Box>
                    {navbarItems.map(({ label, categoryId, hasProducts, path: itemPath }, index) => {
                        const path = itemPath || `/products?categoryId=${categoryId}`;
                        const products = getProductsForCategory(categoryId);
                        const isExpanded = expandedItems.has(label);
                        const showExpandable = hasProducts && products.length > 0;
                        
                        return (
                            <Box key={categoryId || label}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        if (showExpandable) {
                                            toggleMobileDropdown(label);
                                        } else {
                                            navigate(path);
                                            closeDrawer();
                                        }
                                    }}
                                >
                                    <CustomText
                                        autoTitleCase={true}
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: 15,
                                            color: "#7c341b",
                                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                            animation: `slideIn 0.3s ease ${index * 0.1}s both`,
                                            px: 1.5,
                                            py: 0.8,
                                            borderRadius: 2,
                                            backgroundColor: "transparent",
                                            "@keyframes slideIn": {
                                                "0%": { opacity: 0, transform: "translateX(20px)" },
                                                "100%": { opacity: 1, transform: "translateX(0)" },
                                            },
                                            "&:hover": {
                                                color: "var(--themeColor)",
                                                backgroundColor: "rgba(255,148,114,0.12)",
                                                transform: "translateX(5px)",
                                            },
                                        }}
                                    >
                                        {label}
                                    </CustomText>
                                    {showExpandable && (
                                        isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
                                    )}
                                </Box>
                                
                                {/* Mobile Products Dropdown */}
                                {showExpandable && (
                                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                        <Box sx={{ pl: 2, mt: 1, borderLeft: "2px solid rgba(255,148,114,0.3)" }}>
                                            <CustomText
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(path);
                                                    closeDrawer();
                                                }}
                                                sx={{
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: "#FF9472",
                                                    mb: 1,
                                                    cursor: "pointer",
                                                    "&:hover": {
                                                        textDecoration: "underline",
                                                    },
                                                }}
                                            >
                                                View All {label}
                                            </CustomText>
                                            {products.map((product, productIndex) => (
                                                <CustomText
                                                    key={product.productId || productIndex}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const productId = product?.productId || product?.id;
                                                        if (productId) {
                                                            navigate(`/products/${productId}`);
                                                        } else {
                                                            navigate(`/products?categoryId=${categoryId}&search=${encodeURIComponent(product.name)}`);
                                                        }
                                                        closeDrawer();
                                                    }}
                                                    sx={{
                                                        fontSize: 13,
                                                        color: "#333",
                                                        cursor: "pointer",
                                                        transition: "all 0.2s ease",
                                                        py: 0.5,
                                                        borderRadius: 1,
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        "&:hover": {
                                                            color: "var(--themeColor)",
                                                            backgroundColor: "rgba(255,148,114,0.1)",
                                                            transform: "translateX(4px)",
                                                            fontWeight: 500,
                                                        },
                                                    }}
                                                    title={product.name}
                                                >
                                                    {product.name}
                                                </CustomText>
                                            ))}
                                        </Box>
                                    </Collapse>
                                )}
                            </Box>
                        );
                    })}

                </Box>
            </Drawer>
        </>
    );
};

