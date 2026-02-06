import { Box, Button, IconButton, useMediaQuery, useTheme, Avatar, Badge, CircularProgress, Tooltip, TextField, InputAdornment, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { NearMe, ShoppingCart, Favorite, Search as SearchIcon, Menu as MenuIcon } from "@mui/icons-material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { PrefetchLink } from "./PrefetchLink";
import { useState, useEffect, useRef } from "react";
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


export const TopHeader = ({ onOpenMobileMenu }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [openSearchDialog, setOpenSearchDialog] = useState(false);
    const [mobileSearchQuery, setMobileSearchQuery] = useState("");
    const isTablet = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [openDeliveryDialog, setOpenDeliveryDialog] = useState(false);
    const [openBusinessDialog, setOpenBusinessDialog] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!getAccessToken());
    const [userProfile, setUserProfile] = useState(null);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [locationLabel, setLocationLabel] = useState("Location...?");
    const [fullLocationLabel, setFullLocationLabel] = useState("Location...?");
    const [cartIconLoading, setCartIconLoading] = useState(false);
    const [wishlistIconLoading, setWishlistIconLoading] = useState(false);
    const [headerSearchQuery, setHeaderSearchQuery] = useState("");
    const guestCart = useAppSelector(getGuestCart);
    const guestWishlist = useAppSelector(getGuestWishlist);

    // Check if on profile page to add bottom border
    const isProfilePage = location.pathname === "/profile" || location.pathname === "/user-profile";
    const isProfileMobile = useMediaQuery(theme.breakpoints.down("md"));

    // Sync header search input with URL on search page; clear when on any other page
    const searchQFromUrl = searchParams.get("q") ?? "";
    useEffect(() => {
        if (location.pathname === "/search") {
            setHeaderSearchQuery(searchQFromUrl);
        } else {
            setHeaderSearchQuery("");
        }
    }, [location.pathname, searchQFromUrl]);

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

    // Sync location label from localStorage (used on mount and after payment redirect / pageshow)
    const syncLocationFromStorage = () => {
        const storedLocation = getStoredLocation();
        const label = storedLocation?.label?.trim() || (storedLocation?.lat != null ? "Delivery location set" : null);
        if (label) {
            const displayLabel = label.length > 28 ? `${label.slice(0, 28)}...` : label;
            setLocationLabel(displayLabel);
            setFullLocationLabel(label);
        }
    };

    // Initialize and listen for delivery location changes
    useEffect(() => {
        syncLocationFromStorage();

        // Re-sync when page is shown (e.g. after Razorpay redirect to payment success – full page load)
        const onPageShow = () => syncLocationFromStorage();
        window.addEventListener("pageshow", onPageShow);

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
            window.removeEventListener("pageshow", onPageShow);
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

    // Helper to get cart items array from API response (logged-in cart can be data, data.data, data.items, items)
    const getCartItemsFromResponse = (cartData) => {
        if (!cartData) return [];
        if (Array.isArray(cartData)) return cartData;
        if (Array.isArray(cartData.data)) return cartData.data;
        if (Array.isArray(cartData.items)) return cartData.items;
        if (cartData?.data && Array.isArray(cartData.data.data)) return cartData.data.data;
        if (cartData?.data && Array.isArray(cartData.data.items)) return cartData.data.items;
        return [];
    };

    // Fetch cart count = number of line items (guest: from Redux; logged-in: API)
    useEffect(() => {
        if (!isLoggedIn) {
            setCartCount((guestCart ?? []).length);
            return;
        }
        let cancelled = false;
        const timeoutId = setTimeout(async () => {
            try {
                const cartData = await getCart();
                if (cancelled) return;
                const items = getCartItemsFromResponse(cartData);
                const count = items.reduce((sum, it) => sum + (Number(it?.quantity) || 1), 0);
                setCartCount(count);
            } catch (error) {
                if (!cancelled) {
                    console.error("Error fetching cart count:", error);
                    setCartCount(0);
                }
            }
        }, 300);
        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
        };
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

    // Listen for cart updates (badge = total item count / quantity sum)
    useEffect(() => {
        const handleCartUpdate = async (e) => {
            const explicitCount = e?.detail?.cartCount;
            if (typeof explicitCount === "number") {
                setCartCount(explicitCount);
                return;
            }
            if (!getAccessToken()) {
                const guestCartItems = store.getState().guest?.guestCart ?? [];
                const guestCount = guestCartItems.reduce((s, it) => s + (Number(it?.quantity) || 1), 0);
                setCartCount(guestCount);
                return;
            }
            try {
                const cartData = await getCart();
                const items = getCartItemsFromResponse(cartData);
                const count = items.reduce((sum, it) => sum + (Number(it?.quantity) || 1), 0);
                setCartCount(count);
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

    // Listen for "Business" opened from mobile menu (Android view)
    useEffect(() => {
        const handleOpenBusiness = () => setOpenBusinessDialog(true);
        window.addEventListener("openBusinessDialog", handleOpenBusiness);
        return () => window.removeEventListener("openBusinessDialog", handleOpenBusiness);
    }, []);

    const handleWishlistClick = () => {
        if (isLoggedIn) {
            navigate("/profile", { state: { activeTab: "wishlist" } });
        } else {
            navigate("/wishlist");
        }
    };

    // Debounced navigate to search page on change (only when user has typed something)
    const searchDebounceRef = useRef(null);
    useEffect(() => {
        if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
        const q = (headerSearchQuery || "").trim();
        if (!q) return;
        searchDebounceRef.current = setTimeout(() => {
            navigate(`/search?q=${encodeURIComponent(q)}`, { replace: true });
        }, 500);
        return () => {
            if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
        };
    }, [headerSearchQuery, navigate]);

    const handleHeaderSearch = (e) => {
        e?.preventDefault?.();
        const q = (headerSearchQuery || "").trim();
        navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search", { replace: true });
    };

    return (
        <Box
            className="container-fluid"
            sx={{
                display: { xs: "flex", md: "grid" },
                gridTemplateColumns: { md: "1fr auto 1fr" },
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
            {/* Left - Location + Business (no overlap, logo stays center via grid) */}
            <Box
                sx={{
                    display: { xs: "none", md: "flex" },
                    gap: 1,
                    alignItems: "center",
                    minWidth: 0,
                    justifyContent: "flex-start",
                }}
            >
                <Tooltip
                    title={
                        fullLocationLabel && fullLocationLabel !== "Location...?"
                            ? fullLocationLabel
                            : "Allow location to see delivery area"
                    }
                    arrow
                    placement="bottom"
                >
                    <Box sx={{ minWidth: 0, maxWidth: 200, flexShrink: 1 }}>
                        <AnimatedButton
                            startIcon={<NearMe />}
                            onClick={() => setOpenDeliveryDialog(true)}
                            sx={{
                                textTransform: 'none',
                                justifyContent: 'flex-start',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                maxWidth: '100%',
                            }}
                        >
                            <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
                                {locationLabel}
                            </Box>
                        </AnimatedButton>
                    </Box>
                </Tooltip>

                <Box sx={{ flexShrink: 0 }}>
                    <AnimatedButton
                        onClick={() => setOpenBusinessDialog(true)}
                    >
                        Business +
                    </AnimatedButton>
                </Box>
            </Box>

            {/* Mobile Left Buttons - Compact (Menu + Location); on profile page: profile menu icon left of location */}
            <Box
                sx={{
                    display: { xs: "flex", md: "none" },
                    gap: 0.5,
                    order: 1,
                    minWidth: 0,
                    maxWidth: 160,
                    flexShrink: 1,
                    alignItems: "center",
                }}
            >
                {isProfilePage && isProfileMobile ? (
                    <IconButton
                        size="small"
                        onClick={() => window.dispatchEvent(new CustomEvent("openProfileMenu"))}
                        sx={{
                            color: "var(--themeColor)",
                            padding: 0.5,
                            width: 36,
                            height: 36,
                            "&:hover": { backgroundColor: "rgba(95,41,48,0.08)" },
                        }}
                        aria-label="Open profile menu"
                    >
                        <MenuIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                ) : onOpenMobileMenu ? (
                    <IconButton
                        size="small"
                        onClick={onOpenMobileMenu}
                        sx={{
                            color: "var(--themeColor)",
                            padding: 0.5,
                            width: 36,
                            height: 36,
                            "&:hover": { backgroundColor: "rgba(95,41,48,0.08)" },
                        }}
                        aria-label="Open menu"
                    >
                        <MenuIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                ) : null}
                <Tooltip
                    title={fullLocationLabel && fullLocationLabel !== "Location...?" ? fullLocationLabel : "Allow location to see delivery area"}
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
                            textTransform: 'none',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '100%',
                        }}
                    >
                        <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
                            {locationLabel}
                        </Box>
                    </AnimatedButton>
                </Tooltip>
            </Box>

            {/* Logo + Search - Center (grid center column) */}
            <Box
                sx={{
                    py: { xs: 0.5, md: 1 },
                    bgcolor: "transparent",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    order: { xs: 3, md: 2 },
                    width: { xs: "100%", md: "auto" },
                    minWidth: 0,
                    gap: { xs: 0.5, md: 1 },
                }}
            >
                <PrefetchLink to="/home">
                    <Box component="img" src={logo} alt="logo" sx={{ height: isMobile ? 30 : isTablet ? 35 : 40, maxWidth: "100%", cursor: "pointer", }} />
                </PrefetchLink>
            </Box>

            {/* Right Icons */}
            <Box
                sx={{
                    display: "flex",
                    gap: { xs: 0.5, md: 1 },
                    order: { xs: 2, md: 3 },
                    alignItems: "center",
                    justifyContent: { md: "flex-end" },
                }}
            >
                {/* Desktop: search form; Mobile: search icon opens dialog */}
                {!isMobile && (
                    <Box
                        component="form"
                        onSubmit={handleHeaderSearch}
                        sx={{
                            width: { sm: 220, md: 260 },
                            maxWidth: "100%",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "24px",
                                backgroundColor: "#fff",
                                boxShadow: "0 2px 12px rgba(124, 52, 27, 0.08)",
                                transition: "all 0.25s ease",
                                "& fieldset": {
                                    borderColor: "#7c341b",
                                    borderWidth: "1.5px",
                                    borderRadius: "24px",
                                },
                                "&:hover": {
                                    boxShadow: "0 4px 16px rgba(124, 52, 27, 0.12)",
                                    "& fieldset": { borderColor: "#7c341b", borderWidth: "2px" },
                                },
                                "&.Mui-focused": {
                                    boxShadow: "0 4px 20px rgba(124, 52, 27, 0.15)",
                                    "& fieldset": { borderColor: "#7c341b", borderWidth: "2px" },
                                },
                                "& input": {
                                    py: { sm: 0.9, md: 1.1 },
                                    px: 1.5,
                                    fontSize: { sm: 13, md: 14 },
                                },
                            },
                        }}
                    >
                        <TextField
                            size="small"
                            placeholder="Search products..."
                            value={headerSearchQuery}
                            onChange={(e) => setHeaderSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleHeaderSearch(e);
                            }}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" sx={{ mr: 0.5 }}>
                                        <SearchIcon sx={{ color: "#7c341b", fontSize: 22 }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                )}
                {isMobile && (
                    <IconButton
                        size="small"
                        onClick={() => {
                            setMobileSearchQuery(headerSearchQuery || "");
                            setOpenSearchDialog(true);
                        }}
                        sx={{
                            color: "var(--themeColor)",
                            padding: 0.5,
                            width: 36,
                            height: 36,
                            "&:hover": { backgroundColor: "rgba(95,41,48,0.08)" },
                        }}
                        aria-label="Search products"
                    >
                        <SearchIcon sx={{ fontSize: 22 }} />
                    </IconButton>
                )}
                {/* Wishlist: hide on profile page mobile (already in profile menu) */}
                {!(isProfilePage && isProfileMobile) && (
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
                )}

                {isLoggedIn && userProfile ? (
                    <PrefetchLink to="/profile" className="link-no-decoration">
                        <IconButton
                            size="small"
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
                    </PrefetchLink>
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
                {/* Cart: hide on profile page mobile (shown in profile menu) */}
                {!(isProfilePage && isProfileMobile) && (
                    <PrefetchLink to="/cart">
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
                    </PrefetchLink>
                )}
            </Box>
            {/* Mobile search dialog / popup */}
            <Dialog
                open={openSearchDialog}
                onClose={() => { setOpenSearchDialog(false); setMobileSearchQuery(""); }}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        maxWidth: { xs: "calc(100vw - 32px)", sm: 400 },
                        mx: 1,
                        top: { xs: "15vh", sm: "20vh" },
                        m: 0,
                    },
                }}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ pb: 0, fontSize: 18, fontWeight: 600, color: "var(--themeColor)" }}>
                    Search products
                </DialogTitle>
                <DialogContent sx={{ pt: 2 }}>
                    <TextField
                        autoFocus
                        fullWidth
                        size="small"
                        placeholder="Type to search..."
                        value={mobileSearchQuery}
                        onChange={(e) => setMobileSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                const q = (mobileSearchQuery || "").trim();
                                setHeaderSearchQuery(q);
                                setOpenSearchDialog(false);
                                setMobileSearchQuery("");
                                navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search", { replace: true });
                            }
                        }}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        onClick={() => {
                                            const q = (mobileSearchQuery || "").trim();
                                            setHeaderSearchQuery(q);
                                            setOpenSearchDialog(false);
                                            setMobileSearchQuery("");
                                            navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search", { replace: true });
                                        }}
                                        sx={{ color: "var(--themeColor)" }}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: {
                                borderRadius: 2,
                                backgroundColor: "#fafafa",
                                "& fieldset": { borderColor: "rgba(124, 52, 27, 0.3)" },
                            },
                        }}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                </DialogContent>
            </Dialog>
            <DeliveryCheckDialog
                open={openDeliveryDialog}
                onClose={() => setOpenDeliveryDialog(false)}
                initialLocationLabel={fullLocationLabel && fullLocationLabel !== "Location...?" ? fullLocationLabel : ""}
            />
            <BusinessDialog
                open={openBusinessDialog}
                onClose={() => setOpenBusinessDialog(false)}
            />
        </Box>
    );
};

