import { Box,  IconButton, Drawer, useMediaQuery, useTheme } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { categoryItems } from "../../utils/navigationItems";
import { NavbarDropdown } from "./NavbarDropdown";

export const Navbar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const navbarRef = useRef(null);

    // Sticky header with hide/show on scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Add shadow when scrolled
            setIsScrolled(currentScrollY > 50);
            
            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false); // Scrolling down - hide
            } else {
                setIsVisible(true); // Scrolling up - show
            }
            
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <Box
                ref={navbarRef}
                sx={{
                    position: "sticky",
                    top: { xs: "50px", md: "60px" },
                    zIndex: 999,
                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease",
                    transform: isVisible ? "translateY(0)" : "translateY(-100%)",
                }}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <Box
                    className="d-none d-md-flex"
                    sx={{
                        display: { xs: "none", md: "flex" },
                        justifyContent: "center",
                        gap: { md: 3, lg: 4 },
                        py: 1.5,
                        backgroundColor: "#fbc7b5",
                        position: "relative",
                        boxShadow: isScrolled 
                            ? "0 4px 20px rgba(0,0,0,0.1)" 
                            : "0 2px 10px rgba(0,0,0,0.05)",
                        transition: "box-shadow 0.3s ease",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "3px",
                            background: "linear-gradient(90deg, transparent, var(--themeColor), transparent)",
                            animation: "shimmer 3s ease-in-out infinite",
                            "@keyframes shimmer": {
                                "0%": { transform: "translateX(-100%)" },
                                "100%": { transform: "translateX(100%)" },
                            },
                        },
                    }}
                >
                    {categoryItems?.map(({ label, path }) => {
                        // Don't show dropdown for PRODUCTS and EVENTS
                        const showDropdown = label !== "PRODUCTS" && label !== "EVENTS";
                        
                        return (
                            <Box
                                key={label}
                                sx={{
                                    position: "relative",
                                }}
                                onMouseEnter={(e) => {
                                    if (showDropdown) {
                                        setHoveredItem(label);
                                        setAnchorEl(e.currentTarget);
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (showDropdown) {
                                        // Close immediately when cursor leaves the label
                                        setHoveredItem(null);
                                        setAnchorEl(null);
                                    }
                                }}
                            >
                                <CustomText
                                    autoTitleCase={true}
                                    onClick={() => navigate(path)}
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: { xs: 12, sm: 13, md: 14 },
                                        cursor: "pointer",
                                        color: label === "ADDONS" ? "#fff" : location.pathname === path ? "var(--themeColor)" : "var(--themeColor)",
                                        ...(label === "ADDONS" && {
                                            backgroundColor: "#00b53d",
                                            borderRadius: 2,
                                            px: { xs: 1.5, md: 2 },
                                            py: 0.5,
                                        }),
                                        whiteSpace: "nowrap",
                                        position: "relative",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        transform: hoveredItem === label ? "translateY(-2px)" : "translateY(0)",
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            bottom: "-5px",
                                            left: "50%",
                                            transform: hoveredItem === label ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
                                            width: "80%",
                                            height: "2px",
                                            backgroundColor: "var(--themeColor)",
                                            transition: "transform 0.3s ease",
                                        },
                                        "&:hover": { opacity: 0.9 },
                                    }}
                                >
                                    {label}
                                </CustomText>
                                {showDropdown && hoveredItem === label && (
                                    <NavbarDropdown
                                        category={label}
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

            {/* Mobile Navbar */}
            <Box
                className="d-flex d-md-none"
                sx={{
                    display: { xs: "flex", md: "none" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1.5,
                    px: 2,
                    backgroundColor: "#fbc7b5",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
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

            {/* Mobile Drawer */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        width: { xs: "280px", sm: "320px" },
                        backgroundColor: "#fbc7b5",
                        pt: 3,
                        boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
                    },
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, mb: 2 }}>
                    <IconButton
                        onClick={handleDrawerToggle}
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
                        gap: 3,
                        px: 3,
                    }}
                >
                    {categoryItems.map(({ label, path }, index) => (
                        <CustomText
                            key={label}
                            autoTitleCase={true}
                            onClick={() => {
                                navigate(path);
                                handleDrawerToggle();  // close drawer after navigating
                            }}
                            sx={{
                                fontWeight: 600,
                                fontSize: 14,
                                cursor: "pointer",
                                color: label === "ADDONS" ? "#fff" : "var(--themeColor)",
                                ...(label === "ADDONS" && {
                                    backgroundColor: "#00b53d",
                                    borderRadius: 2,
                                    px: 2,
                                    py: 0.8,
                                    textAlign: "center",
                                }),
                                transition: "all 0.3s ease",
                                animation: `slideIn 0.3s ease ${index * 0.1}s both`,
                                "@keyframes slideIn": {
                                    "0%": { opacity: 0, transform: "translateX(20px)" },
                                    "100%": { opacity: 1, transform: "translateX(0)" },
                                },
                                "&:hover": {
                                    opacity: 0.8,
                                    transform: "translateX(5px)",
                                },
                            }}
                        >
                            {label}
                        </CustomText>
                    ))}

                </Box>
            </Drawer>
        </>
    );
};

