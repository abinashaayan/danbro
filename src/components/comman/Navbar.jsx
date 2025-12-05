import { Box, Typography, IconButton, Drawer, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categoryItems = [
    { label: "CAKES & DRY CAKES", path: "/cakes" },
    { label: "MITHAI & COOKIES", path: "/mithai" },
    { label: "BREAD & RUSK", path: "/bread-rusk" },
    { label: "GIFT HAMPERS & CHOCOLATES", path: "/gift-hampers" },
    { label: "ADDONS", path: "/addons" },
    { label: "Products", path: "/products" },
];

export const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = (
        <>
            {categoryItems?.map((item) => (
                <Typography
                    key={item}
                    sx={{
                        fontWeight: 600,
                        fontSize: { xs: 12, sm: 13, md: 14 },
                        cursor: "pointer",
                        color: item === "ADDONS" ? "#fff" : "var(--themeColor)",
                        ...(item === "ADDONS" && {
                            backgroundColor: "#00b53d",
                            borderRadius: 2,
                            px: { xs: 1.5, md: 2 },
                            py: 0.3,
                        }),
                        whiteSpace: "nowrap",
                        "&:hover": {
                            opacity: 0.8,
                        },
                    }}
                >
                    {item}
                </Typography>
            ))}
        </>
    );

    return (
        <>
            <Box
                className="d-none d-md-flex"
                sx={{
                    display: { xs: "none", md: "flex" },
                    justifyContent: "center",
                    gap: { md: 3, lg: 4 },
                    py: 1.5,
                    backgroundColor: "#fbc7b5",
                    position: "relative",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
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
                {categoryItems.map(({ label, path }) => (
                    <Typography
                        key={label}
                        onClick={() => navigate(path)}     // <--- routing added
                        onMouseEnter={() => setHoveredItem(label)}
                        onMouseLeave={() => setHoveredItem(null)}
                        sx={{
                            fontWeight: 600,
                            fontSize: { xs: 12, sm: 13, md: 14 },
                            cursor: "pointer",
                            color: label === "ADDONS" ? "#fff" : "var(--themeColor)",
                            ...(label === "ADDONS" && {
                                backgroundColor: "#00b53d",
                                borderRadius: 2,
                                px: { xs: 1.5, md: 2 },
                                py: 0.5,
                            }),
                            whiteSpace: "nowrap",
                            position: "relative",
                            transition: "all 0.3s ease",
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
                    </Typography>
                ))}

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
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 14,
                        color: "var(--themeColor)",
                    }}
                >
                    Menu
                </Typography>
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
                anchor="right"
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
                        <Typography
                            key={label}
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
                        </Typography>
                    ))}

                </Box>
            </Drawer>
        </>
    );
};

