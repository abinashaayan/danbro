import { Box, Button, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { NearMe } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { DeliveryCheckDialog } from "./DeliveryCheckDialog";
import { BusinessDialog } from "./BusinessDialog";


export const TopHeader = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();
    const [openDeliveryDialog, setOpenDeliveryDialog] = useState(false);
    const [openBusinessDialog, setOpenBusinessDialog] = useState(false);

    return (
        <Box
            className="container-fluid"
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: { xs: 1, sm: 2, md: 3 },
                py: { xs: 1, md: 0 },
                backgroundColor: "#fff",
                flexWrap: { xs: "wrap", md: "nowrap" },
                gap: { xs: 1, md: 0 },
            }}
        >
            {/* Left Buttons - Hidden on mobile */}
            <Box
                className="d-none d-md-flex"
                sx={{
                    display: { xs: "none", md: "flex" },
                    gap: 1,
                    flexWrap: "wrap",
                }}
            >
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<NearMe />}
                    onClick={() => setOpenDeliveryDialog(true)}
                    sx={{
                        textTransform: "none",
                        borderRadius: 5,
                        borderColor: "var(--themeColor)",
                        color: "var(--themeColor)",
                        fontWeight: 600,
                        fontSize: { md: 13, lg: 14 },
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                            borderColor: "var(--themeColor)",
                            backgroundColor: "#fbeeee",
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 12px rgba(95,41,48,0.15)",
                        },
                    }}
                >
                    Location
                </Button>

                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setOpenBusinessDialog(true)}
                    sx={{
                        textTransform: "none",
                        borderRadius: 5,
                        borderColor: "var(--themeColor)",
                        color: "var(--themeColor)",
                        fontWeight: 600,
                        fontSize: { md: 13, lg: 14 },
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                            borderColor: "var(--themeColor)",
                            backgroundColor: "#fbeeee",
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 12px rgba(95,41,48,0.15)",
                        },
                    }}
                >
                    Business +
                </Button>
            </Box>

            {/* Mobile Left Buttons - Compact */}
            <Box
                className="d-flex d-md-none"
                sx={{
                    display: { xs: "flex", md: "none" },
                    gap: 0.5,
                    order: 1,
                }}
            >
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<NearMe />}
                    onClick={() => setOpenDeliveryDialog(true)}
                    sx={{
                        textTransform: "none",
                        borderRadius: 5,
                        borderColor: "var(--themeColor)",
                        color: "var(--themeColor)",
                        fontWeight: 600,
                        fontSize: 10,
                        px: 1,
                        minWidth: "auto",
                        "&:hover": {
                            borderColor: "var(--themeColor)",
                            backgroundColor: "#fbeeee",
                        },
                    }}
                >
                    {isMobile ? "" : "Location"}
                </Button>
            </Box>

            {/* Logo - Centered */}
            <Box
                sx={{
                    py: { xs: 0.5, md: 1 },
                    bgcolor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    order: { xs: 3, md: 2 },
                    width: { xs: "100%", md: "auto" },
                }}
            >
                <Link to="/">
                    <img
                        src={logo}
                        alt="logo"
                        style={{
                            height: isMobile ? 30 : isTablet ? 35 : 40,
                            maxWidth: "100%",
                        }}
                    />
                </Link>
            </Box>

            {/* Right Icons */}
            <Box
                sx={{
                    display: "flex",
                    gap: { xs: 0.5, md: 1 },
                    order: { xs: 2, md: 3 },
                }}
            >
                <IconButton
                    sx={{
                        color: "var(--themeColor)",
                        padding: { xs: 0.5, md: 1 },
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                            transform: "translateY(-3px) scale(1.1)",
                            backgroundColor: "rgba(95,41,48,0.08)",
                            color: "var(--themeColor)",
                        },
                    }}
                >
                    <SearchIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                </IconButton>
                <IconButton
                    onClick={() => navigate("/login")}
                    sx={{
                        color: "var(--themeColor)",
                        padding: { xs: 0.5, md: 1 },
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        cursor: "pointer",
                        "&:hover": {
                            transform: "translateY(-3px) scale(1.1)",
                            backgroundColor: "rgba(95,41,48,0.08)",
                            color: "var(--themeColor)",
                        },
                    }}
                >
                    <PersonOutlineIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                </IconButton>
                <IconButton
                    sx={{
                        color: "var(--themeColor)",
                        padding: { xs: 0.5, md: 1 },
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        "&:hover": {
                            transform: "translateY(-3px) scale(1.1)",
                            backgroundColor: "rgba(95,41,48,0.08)",
                            color: "var(--themeColor)",
                        },
                    }}
                >
                    <ShoppingBagOutlinedIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                </IconButton>
            </Box>
            <DeliveryCheckDialog 
                open={openDeliveryDialog} 
                onClose={() => setOpenDeliveryDialog(false)} 
            />
            <BusinessDialog 
                open={openBusinessDialog} 
                onClose={() => setOpenBusinessDialog(false)} 
            />
        </Box>
    );
};

