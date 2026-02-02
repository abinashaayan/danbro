import { Box, Button, IconButton, useMediaQuery, useTheme, Avatar, Badge, CircularProgress, Tooltip } from "@mui/material";
import { NearMe, ShoppingCart, Favorite } from "@mui/icons-material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { DeliveryCheckDialog } from "./DeliveryCheckDialog";
import { BusinessDialog } from "./BusinessDialog";
import { AnimatedButton } from "./AnimatedButton";
import { getAccessToken } from "../../utils/cookies";
import api from "../../utils/api";
import { getWishlist } from "../../utils/wishlist";
import { getCart } from "../../utils/cart";
import { getStoredLocation } from "../../utils/location";
import { useAppSelector } from "../../store/hooks";
import { getGuestCart, getGuestWishlist } from "../../store/guestSlice";
import { store } from "../../store/store";


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
    const [isScrolled, setIsScrolled] = useState(false);
    const [locationLabel, setLocationLabel] = useState("Location...?");
    const [fullLocationLabel, setFullLocationLabel] = useState("Location...?");
    const [cartIconLoading, setCartIconLoading] = useState(false);
    const [wishlistIconLoading, setWishlistIconLoading] = useState(false);
    const guestCart = useAppSelector(getGuestCart);
    const guestWishlist = useAppSelector(getGuestWishlist);

    // Check if on profile page to add bottom border
    const isProfilePage = location.pathname === "/profile" || location.pathname === "/user-profile";

    // Check if user is logged in and fetch profile - optimized to prevent unnecessary calls
    useEffect(() => {
        const token = getAccessToken();
        const loggedIn = !!token;
        setIsLoggedIn(loggedIn);

        // Fetch user profile if logged in (only once, not on every route change)
        if (loggedIn && !userProfile) {
            api.get('/user/getById')
                .then((response) => {
                    if (response.data && response.data.user) {
                        setUserProfile(response.data.user);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user profile:", error);
                });
        } else if (!loggedIn) {
            setUserProfile(null);
        }
    }, []); // Only run once on mount

    // Initialize and listen for delivery location changes
    useEffect(() => {
        // Load stored location on mount
        const storedLocation = getStoredLocation();
        if (storedLocation && storedLocation.label) {
            const displayLabel =
                storedLocation.label.length > 28
                    ? `${storedLocation.label.slice(0, 28)}...`
                    : storedLocation.label;
            setLocationLabel(displayLabel);
            setFullLocationLabel(storedLocation.label);
        }

        // Listen for updates from DeliveryCheckDialog
        const handleLocationUpdated = (event) => {
            const updatedLabel = event?.detail?.label || "Current location";
            const displayLabel =
                updatedLabel.length > 28
                    ? `${updatedLabel.slice(0, 28)}...`
                    : updatedLabel;
            setLocationLabel(displayLabel);
            setFullLocationLabel(updatedLabel);
        };

        window.addEventListener("locationUpdated", handleLocationUpdated);

        return () => {
            window.removeEventListener("locationUpdated", handleLocationUpdated);
        };
    }, []);

    // Fetch wishlist count (guest: from Redux; logged-in: API)
    useEffect(() => {
        if (!isLoggedIn) {
            setWishlistCount(guestWishlist?.length ?? 0);
            return;
        }
        const timeoutId = setTimeout(async () => {
            try {
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
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [isLoggedIn, guestWishlist?.length]);

    // Fetch cart count = number of products/line items (guest: from Redux; logged-in: API)
    useEffect(() => {
        if (!isLoggedIn) {
            setCartCount((guestCart ?? []).length);
            return;
        }
        const timeoutId = setTimeout(async () => {
            try {
                const cartData = await getCart();
                let items = [];
                if (cartData && Array.isArray(cartData.data)) items = cartData.data;
                else if (cartData?.data && Array.isArray(cartData.data)) items = cartData.data;
                else if (cartData?.data?.data && Array.isArray(cartData.data.data)) items = cartData.data.data;
                else if (Array.isArray(cartData)) items = cartData;
                setCartCount(items.length);
            } catch (error) {
                console.error("Error fetching cart count:", error);
                setCartCount(0);
            }
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [isLoggedIn, guestCart]);

    // Listen for header cart icon loading (when add to cart is in progress)
    useEffect(() => {
        const handleCartLoading = (e) => setCartIconLoading(!!e?.detail?.loading);
        window.addEventListener("headerCartLoading", handleCartLoading);
        return () => window.removeEventListener("headerCartLoading", handleCartLoading);
    }, []);

    // Listen for header wishlist icon loading (when add/remove wishlist is in progress)
    useEffect(() => {
        const handleWishlistLoading = (e) => setWishlistIconLoading(!!e?.detail?.loading);
        window.addEventListener("headerWishlistLoading", handleWishlistLoading);
        return () => window.removeEventListener("headerWishlistLoading", handleWishlistLoading);
    }, []);

    // Listen for cart updates (badge = number of products/line items)
    useEffect(() => {
        const handleCartUpdate = async () => {
            if (!getAccessToken()) {
                const guestCartItems = store.getState().guest?.guestCart ?? [];
                setCartCount(guestCartItems.length);
                return;
            }
            try {
                const cartData = await getCart();
                let items = [];
                if (cartData && Array.isArray(cartData.data)) items = cartData.data;
                else if (cartData?.data && Array.isArray(cartData.data)) items = cartData.data;
                else if (cartData?.data?.data && Array.isArray(cartData.data.data)) items = cartData.data.data;
                else if (Array.isArray(cartData)) items = cartData;
                setCartCount(items.length);
            } catch (error) {
                console.error("Error fetching cart count:", error);
            }
        };
        window.addEventListener("cartUpdated", handleCartUpdate);
        return () => window.removeEventListener("cartUpdated", handleCartUpdate);
    }, [isLoggedIn, guestCart]);

    // Listen for wishlist updates
    useEffect(() => {
        const handleWishlistUpdate = async () => {
            if (!isLoggedIn) {
                setWishlistCount(guestWishlist?.length ?? 0);
                return;
            }
            try {
                const wishlistData = await getWishlist();
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
    }, [isLoggedIn, guestWishlist?.length]);

    // Handle scroll detection for sticky header
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsScrolled(scrollTop > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleWishlistClick = () => {
        if (isLoggedIn) {
            navigate("/profile", { state: { activeTab: "wishlist" } });
        } else {
            navigate("/wishlist");
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
                backgroundColor: isScrolled
                    ? "rgba(255, 255, 255, 0.98)"
                    : "#fff",
                background: isScrolled
                    ? "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(251,199,181,0.05) 50%, rgba(255,255,255,0.98) 100%)"
                    : "#fff",
                flexWrap: { xs: "wrap", md: "nowrap" },
                gap: { xs: 1, md: 0 },
                borderBottom: isProfilePage
                    ? "2px solid #fbc7b5"
                    : isScrolled
                        ? "1px solid rgba(255,181,161,0.2)"
                        : "none",
                boxShadow: isProfilePage
                    ? "0 2px 8px rgba(0,0,0,0.05)"
                    : isScrolled
                        ? "0 8px 30px rgba(255,181,161,0.15)"
                        : "none",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                width: "100%",
                zIndex: 1000,
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                backdropFilter: isScrolled ? "blur(15px) saturate(180%)" : "none",
                "&::before": isScrolled ? {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(180deg, rgba(255,181,161,0.08) 0%, transparent 100%)",
                    pointerEvents: "none",
                    zIndex: -1,
                } : {},
                "&:hover": {
                    boxShadow: isScrolled
                        ? "0 12px 40px rgba(255,181,161,0.2)"
                        : "0 2px 12px rgba(0,0,0,0.08)",
                    backgroundColor: isScrolled
                        ? "rgba(255, 255, 255, 1)"
                        : "#fff",
                },
            }}
        >
            {/* Left Buttons - Hidden on mobile */}
            <Box className="d-none d-md-flex" sx={{ display: { xs: "none", md: "flex" }, gap: 1, flexWrap: "wrap", }}>
                <Tooltip
                    title={
                        fullLocationLabel && fullLocationLabel !== "Location...?"
                            ? fullLocationLabel
                            : "Allow location to see delivery area"
                    }
                    arrow
                    placement="bottom"
                >
                    <Box sx={{ position: 'relative' }}>
                        <AnimatedButton
                            startIcon={<NearMe />}
                            onClick={() => setOpenDeliveryDialog(true)}
                        >
                            Location
                        </AnimatedButton>
                    </Box>
                </Tooltip>

                <AnimatedButton
                    onClick={() => setOpenBusinessDialog(true)}
                >
                    Business +
                </AnimatedButton>
            </Box>

            {/* Mobile Left Buttons - Compact */}
            <Box className="d-flex d-md-none" sx={{ display: { xs: "flex", md: "none" }, gap: 0.5, order: 1, }}>
                <Tooltip
                    title={fullLocationLabel}
                    arrow
                    placement="bottom"
                    PopperProps={{
                        sx: {
                            zIndex: 99999,
                        },
                    }}
                    componentsProps={{
                        tooltip: {
                            sx: {
                                backgroundColor: '#333',
                                color: '#fff',
                                fontSize: '12px',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                maxWidth: '250px',
                                wordWrap: 'break-word',
                            },
                        },
                        arrow: {
                            sx: {
                                color: '#333',
                            },
                        },
                    }}
                >
                    <AnimatedButton
                        startIcon={<NearMe />}
                        onClick={() => setOpenDeliveryDialog(true)}
                        sx={{
                            fontSize: 10,
                            px: 1,
                            minWidth: "auto",
                        }}
                    >
                        {isMobile ? "" : "Location"}
                    </AnimatedButton>
                </Tooltip>
            </Box>

            {/* Logo - Centered */}
            <Box sx={{ py: { xs: 0.5, md: 1 }, bgcolor: "transparent", display: "flex", justifyContent: "center", order: { xs: 3, md: 2 }, width: { xs: "100%", md: "auto" }, }}>
                <Link to="/">
                    <Box
                        component="img"
                        src={logo}
                        alt="logo"
                        sx={{
                            height: isMobile ? 30 : isTablet ? 35 : 40,
                            maxWidth: "100%",
                            cursor: "pointer",
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
                    onClick={handleWishlistClick}
                    disabled={wishlistIconLoading}
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
                        {wishlistIconLoading ? (
                            <CircularProgress size={22} sx={{ color: "var(--themeColor)" }} />
                        ) : (
                            <Favorite sx={{ fontSize: { xs: 22, md: 24 } }} />
                        )}
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
                        disabled={cartIconLoading}
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
                            {cartIconLoading ? (
                                <CircularProgress size={22} sx={{ color: "var(--themeColor)" }} />
                            ) : (
                                <ShoppingCart sx={{ fontSize: { xs: 22, md: 24 } }} />
                            )}
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

