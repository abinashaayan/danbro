import { Box, Button, IconButton, useMediaQuery, useTheme, Avatar, Badge } from "@mui/material";
import { NearMe, ShoppingCart, Favorite } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { DeliveryCheckDialog } from "./DeliveryCheckDialog";
import { BusinessDialog } from "./BusinessDialog";
import { getAccessToken } from "../../utils/cookies";
import api from "../../utils/api";
import { getWishlist } from "../../utils/wishlist";
import { getCart } from "../../utils/cart";
import { getStoredLocation } from "../../utils/location";


export const TopHeader = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();
    const location = useLocation();
    const [openDeliveryDialog, setOpenDeliveryDialog] = useState(false);
    const [openBusinessDialog, setOpenBusinessDialog] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    // Check if on profile page to add bottom border
    const isProfilePage = location.pathname === "/profile" || location.pathname === "/user-profile";

    // Check if user is logged in and fetch profile
    useEffect(() => {
        const token = getAccessToken();
        const loggedIn = !!token;
        setIsLoggedIn(loggedIn);

        // Fetch user profile if logged in
        if (loggedIn) {
            api.get('/user/getById')
                .then((response) => {
                    if (response.data && response.data.user) {
                        setUserProfile(response.data.user);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user profile:", error);
                });
        } else {
            setUserProfile(null);
            setWishlistCount(0);
        }
    }, [location.pathname]);

    // Fetch wishlist count
    useEffect(() => {
        const fetchWishlistCount = async () => {
            if (!isLoggedIn) {
                setWishlistCount(0);
                return;
            }

            try {
                // lat and long are automatically added via API interceptor
                const wishlistData = await getWishlist();
                if (wishlistData && wishlistData.data && Array.isArray(wishlistData.data)) {
                    setWishlistCount(wishlistData.data.length);
                } else {
                    setWishlistCount(0);
                }
            } catch (error) {
                console.error("Error fetching wishlist count:", error);
                setWishlistCount(0);
            }
        };

        fetchWishlistCount();
    }, [isLoggedIn, location.pathname]);

    // Fetch cart count
    useEffect(() => {
        const fetchCartCount = async () => {
            if (!isLoggedIn) {
                setCartCount(0);
                return;
            }

            try {
                const cartData = await getCart();
                // Handle different response structures
                let items = [];
                if (cartData && Array.isArray(cartData.data)) {
                    items = cartData.data;
                } else if (cartData && cartData.data && Array.isArray(cartData.data)) {
                    items = cartData.data;
                } else if (cartData && cartData.data?.data && Array.isArray(cartData.data.data)) {
                    items = cartData.data.data;
                } else if (Array.isArray(cartData)) {
                    items = cartData;
                }
                
                // Calculate total quantity
                const totalQuantity = items.reduce((sum, item) => {
                    return sum + (item.quantity || 0);
                }, 0);
                setCartCount(totalQuantity);
            } catch (error) {
                console.error("Error fetching cart count:", error);
                setCartCount(0);
            }
        };

        fetchCartCount();
    }, [isLoggedIn, location.pathname]);

    // Listen for cart updates
    useEffect(() => {
        const handleCartUpdate = async () => {
            if (!isLoggedIn) {
                setCartCount(0);
                return;
            }

            try {
                const cartData = await getCart();
                // Handle different response structures
                let items = [];
                if (cartData && Array.isArray(cartData.data)) {
                    items = cartData.data;
                } else if (cartData && cartData.data && Array.isArray(cartData.data)) {
                    items = cartData.data;
                } else if (cartData && cartData.data?.data && Array.isArray(cartData.data.data)) {
                    items = cartData.data.data;
                } else if (Array.isArray(cartData)) {
                    items = cartData;
                }
                
                // Calculate total quantity
                const totalQuantity = items.reduce((sum, item) => {
                    return sum + (item.quantity || 0);
                }, 0);
                setCartCount(totalQuantity);
            } catch (error) {
                console.error("Error fetching cart count:", error);
            }
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, [isLoggedIn]);

    // Listen for wishlist updates from custom event
    useEffect(() => {
        const handleWishlistUpdate = async () => {
            if (!isLoggedIn) {
                setWishlistCount(0);
                return;
            }

            try {
                const userLocation = getStoredLocation();
                const wishlistData = await getWishlist(userLocation.lat, userLocation.long);
                if (wishlistData && wishlistData.data) {
                    setWishlistCount(wishlistData.data.length);
                } else {
                    setWishlistCount(0);
                }
            } catch (error) {
                console.error("Error fetching wishlist count:", error);
            }
        };

        // Listen for custom event when wishlist is updated
        window.addEventListener('wishlistUpdated', handleWishlistUpdate);

        return () => {
            window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
        };
    }, [isLoggedIn]);

    const handleWishlistClick = () => {
        if (isLoggedIn) {
            navigate("/profile", { state: { activeTab: "wishlist" } });
        } else {
            navigate("/login");
        }
    };

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
                borderBottom: isProfilePage ? "2px solid #fbc7b5" : "none",
                boxShadow: isProfilePage ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
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
                    alignItems: "center",
                }}
            >
                <IconButton
                    size="small"
                    sx={{
                        color: "var(--themeColor)",
                        padding: { xs: 0.5, md: 0.75 },
                        width: { xs: 36, md: 40 },
                        height: { xs: 36, md: 40 },
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                            transform: "translateY(-3px) scale(1.1)",
                            backgroundColor: "rgba(95,41,48,0.08)",
                            color: "var(--themeColor)",
                        },
                    }}
                >
                    <SearchIcon sx={{ fontSize: { xs: 22, md: 24 } }} />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={handleWishlistClick}
                    sx={{
                        color: "var(--themeColor)",
                        padding: { xs: 0.5, md: 0.75 },
                        width: { xs: 36, md: 40 },
                        height: { xs: 36, md: 40 },
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        "&:hover": {
                            transform: "translateY(-3px) scale(1.1)",
                            backgroundColor: "rgba(95,41,48,0.08)",
                            color: "#f44336",
                        },
                    }}
                >
                    <Badge
                        badgeContent={wishlistCount}
                        color="error" >
                        <Favorite sx={{ fontSize: { xs: 22, md: 24 } }} />
                    </Badge>
                </IconButton>

                {isLoggedIn && userProfile ? (
                    <IconButton
                        size="small"
                        onClick={() => navigate("/profile")}
                        sx={{
                            padding: { xs: 0.5, md: 0.75 },
                            width: { xs: 36, md: 40 },
                            height: { xs: 36, md: 40 },
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            cursor: "pointer",
                            "&:hover": {
                                transform: "translateY(-3px) scale(1.1)",
                                backgroundColor: "rgba(95,41,48,0.08)",
                            },
                        }}
                    >
                        <Avatar
                            sx={{
                                width: { xs: 24, md: 28 },
                                height: { xs: 24, md: 28 },
                                bgcolor: "var(--themeColor)",
                                fontSize: { xs: 12, md: 14 },
                                fontWeight: 600,
                                border: "2px solid #fff",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            }}
                            src={userProfile.avatar || userProfile.profilePicture}
                        >
                            {userProfile.name
                                ? userProfile.name.charAt(0).toUpperCase()
                                : userProfile.email
                                    ? userProfile.email.charAt(0).toUpperCase()
                                    : "U"}
                        </Avatar>
                    </IconButton>
                ) : (
                    <IconButton
                        size="small"
                        onClick={() => navigate("/login")}
                        sx={{
                            color: "var(--themeColor)",
                            padding: { xs: 0.5, md: 0.75 },
                            width: { xs: 36, md: 40 },
                            height: { xs: 36, md: 40 },
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            cursor: "pointer",
                            "&:hover": {
                                transform: "translateY(-3px) scale(1.1)",
                                backgroundColor: "rgba(95,41,48,0.08)",
                                color: "var(--themeColor)",
                            },
                        }}
                    >
                        <PersonOutlineIcon sx={{ fontSize: { xs: 22, md: 24 } }} />
                    </IconButton>
                )}
                <Link to="/cart">
                    <IconButton
                        size="small"
                        sx={{
                            color: "var(--themeColor)",
                            padding: { xs: 0.5, md: 0.75 },
                            width: { xs: 36, md: 40 },
                            height: { xs: 36, md: 40 },
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            position: "relative",
                            "&:hover": {
                                transform: "translateY(-3px) scale(1.1)",
                                backgroundColor: "rgba(95,41,48,0.08)",
                                color: "var(--themeColor)",
                            },
                        }}
                    >
                        <Badge
                            badgeContent={cartCount}
                            color="error" >
                            <ShoppingCart sx={{ fontSize: { xs: 22, md: 24 } }} />
                        </Badge>
                    </IconButton>
                </Link>
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

