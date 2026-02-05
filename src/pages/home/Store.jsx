import React, { useState, useMemo } from "react";
import {
    Box,
    TextField,
    InputAdornment,
    Button,
    CircularProgress,
    Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";
import NearMeIcon from "@mui/icons-material/NearMe";
import { Link } from "react-router-dom";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import { useBranches } from "../../hooks/useBranches";
import { getStoredLocation } from "../../utils/location";
import contact from "../../assets/contact.jpg";

/** Haversine distance in km */
function getDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
}

const LUCKNOW_STORE_DEFAULT = {
    name: "DANBRO by Mr Brown (Cyber Heights)",
    city: "Lucknow",
    address:
        "SHOP NO.-2, Cyber Heights, Vijaipur Colony, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
    phone: "",
    lat: 26.86957,
    long: 81.00935,
};

const DEFAULT_OPEN_UNTIL = "10:30PM";

export const Store = () => {
    const [search, setSearch] = useState("");
    const [selectedBranch, setSelectedBranch] = useState(null);

    const { branches, loading, error } = useBranches();
    const userLocation = useMemo(() => getStoredLocation(), []);

    const filteredBranches = useMemo(() => {
        let list =
            branches && branches.length > 0
                ? branches.filter(
                    (b) =>
                        b?.city &&
                        String(b.city).trim().toLowerCase() === "lucknow"
                )
                : [];
        if (list.length === 0) list = [LUCKNOW_STORE_DEFAULT];

        const withDistance = list.map((branch) => {
            const lat = Number(branch?.lat) || 26.86957;
            const long = Number(branch?.long) || 81.00935;
            const km = getDistanceKm(
                userLocation.lat,
                userLocation.long,
                lat,
                long
            );
            return { ...branch, _lat: lat, _long: long, _distanceKm: km };
        });
        withDistance.sort((a, b) => (a._distanceKm ?? 0) - (b._distanceKm ?? 0));

        const q = search.trim().toLowerCase();
        if (!q) return withDistance;
        return withDistance.filter(
            (b) =>
                (b?.name || "").toLowerCase().includes(q) ||
                (b?.address || "").toLowerCase().includes(q) ||
                (b?.city || "").toLowerCase().includes(q)
        );
    }, [branches, userLocation.lat, userLocation.long, search]);

    const mapCenter = selectedBranch
        ? {
            lat: selectedBranch._lat ?? Number(selectedBranch?.lat) ?? 26.86957,
            long:
                selectedBranch._long ?? Number(selectedBranch?.long) ?? 81.00935,
        }
        : filteredBranches[0]
            ? {
                lat: filteredBranches[0]._lat ?? 26.86957,
                long: filteredBranches[0]._long ?? 81.00935,
            }
            : { lat: 26.86957, long: 81.00935 };

    const osmBbox = (lat, lon, zoomKm = 5) => {
        const d = zoomKm / 111;
        return [
            lon - d,
            lat - d,
            lon + d,
            lat + d,
        ].map((n) => n.toFixed(5)).join(",");
    };

    const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${osmBbox(mapCenter.lat, mapCenter.long, 8)}&layer=mapnik&marker=${mapCenter.lat},${mapCenter.long}`;

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", }}>
                <CircularProgress sx={{ color: "var(--themeColor)" }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, py: 4 }}>
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                    {error}
                </Alert>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                backgroundColor: "#fafafa",
                pt: 10,
                pb: { xs: 12, sm: 14, md: 10 },
                px: { xs: 2, sm: 3, md: 4, lg: 5 },
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    margin: "0 auto",
                    minHeight: { md: "calc(100vh - 48px)" },
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    backgroundColor: "#fff",
                    borderRadius: { xs: 0, md: 3 },
                    overflow: "hidden",
                    boxShadow: { xs: "none", md: "0 4px 20px rgba(0,0,0,0.08)" },
                }}
            >
                {/* Left: Store list */}
                <Box
                    sx={{
                        width: { xs: "100%", md: 400 },
                        minWidth: { md: 560 },
                        maxWidth: { md: 540 },
                        height: { xs: "auto", md: "calc(100vh - 48px)" },
                        maxHeight: { md: "calc(100vh - 48px)" },
                        borderRight: { md: "1px solid #eee" },
                        display: "flex",
                        flexDirection: "column",
                        flexShrink: 0,
                        overflow: "hidden",
                    }}
                >
                    {/* Search Header */}
                    <Box sx={{ p: { xs: 2, sm: 2.5 }, flexShrink: 0 }}>
                        <Link
                            to="/"
                            className="link-no-decoration"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                marginBottom: 10,
                                fontSize: 14,
                                color: "#333",
                            }}
                        >
                            <ArrowBackIosNew sx={{ fontSize: 14 }} /> Back
                        </Link>

                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Search Stores"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: "#888" }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: 2,
                                    bgcolor: "#f5f5f5",
                                },
                            }}
                            sx={{ "& fieldset": { border: "none" } }}
                        />
                    </Box>

                    {/* Title */}
                    <Box sx={{ px: { xs: 2, sm: 2.5 } }}>
                        <Box sx={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a" }}>
                            Stores Near You
                        </Box>
                    </Box>

                    {/* Scrollable Store List */}
                    <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden", px: { xs: 2, sm: 2.5 }, pb: 3, pt: 2, }}>
                        {filteredBranches?.length === 0 ? (
                            <Box sx={{ py: 4, textAlign: "center", color: "#666" }}>
                                No stores match your search.
                            </Box>
                        ) : (
                            filteredBranches?.map((branch, index) => {
                                const img = branch?.image || contact;
                                const lat = branch?._lat ?? branch?.lat;
                                const long = branch?._long ?? branch?.long;

                                return (
                                    <Box
                                        key={index}
                                        onClick={() => setSelectedBranch(branch)}
                                        sx={{
                                            width: "100%",
                                            maxWidth: "100%",
                                            minHeight: 320,
                                            mb: 2.5,
                                            borderRadius: 2,
                                            overflow: "hidden",
                                            border: "1px solid #eee",
                                            cursor: "pointer",
                                            bgcolor: "#fff",
                                            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                                            "&:hover": { bgcolor: "#fafafa", borderColor: "#ddd", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
                                        }}
                                    >
                                        <Box sx={{ width: "100%", height: 140, bgcolor: "#eee", flexShrink: 0 }}>
                                            <img src={img} alt={branch.name} style={{ width: "100%", height: "100%", objectFit: "cover", }} />
                                        </Box>

                                        <Box sx={{ p: 2, pt: 1.75, pb: 2 }}>
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 0.5, }}>
                                                <Box sx={{ fontWeight: 600, fontSize: 15, color: "#1a1a1a" }}>
                                                    {branch.name}
                                                </Box>
                                                <Box
                                                    component="span"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        window.open(
                                                            `https://www.google.com/maps?q=${lat},${long}`,
                                                            "_blank",
                                                            "noopener,noreferrer"
                                                        );
                                                    }}
                                                    sx={{
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        color: "#b87333",
                                                        cursor: "pointer",
                                                        textDecoration: "none",
                                                        "&:hover": {
                                                            textDecoration: "underline",
                                                        },
                                                    }}
                                                >
                                                    Visit store
                                                </Box>
                                            </Box>

                                            <Box sx={{ fontSize: 13, color: "#555", mt: 0.75, lineHeight: 1.4 }}>
                                                {branch.address}
                                            </Box>

                                            <Box sx={{ fontSize: 13, color: "#333", mt: 1, display: "flex", gap: 1, }}>
                                                <span>Open Until {DEFAULT_OPEN_UNTIL}</span>
                                                <span style={{ color: "#999" }}>•</span>
                                                <span>{branch._distanceKm} km away</span>
                                            </Box>

                                            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                                                <Button
                                                    size="small"
                                                    fullWidth
                                                    variant="outlined"
                                                    component={Link}
                                                    to="/products"
                                                    startIcon={<RestaurantMenuRoundedIcon />}
                                                    onClick={(e) => e.stopPropagation()}
                                                    sx={{
                                                        textTransform: "none",
                                                        borderColor: "#fbc7b5",
                                                        color: "#333",
                                                        "&:hover": { borderColor: "#999", bgcolor: "#f5f5f5" },
                                                    }}
                                                >
                                                    Menu
                                                </Button>

                                                <Button
                                                    size="small"
                                                    fullWidth
                                                    variant="outlined"
                                                    startIcon={<NearMeIcon />}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        window.open(
                                                            `https://www.google.com/maps?q=${lat},${long}`,
                                                            "_blank"
                                                        );
                                                    }}
                                                    sx={{
                                                        textTransform: "none",
                                                        borderColor: "#fbc7b5",
                                                        color: "#333",
                                                        "&:hover": { borderColor: "#999", bgcolor: "#f5f5f5" },
                                                    }}
                                                >
                                                    Direction
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                );
                            })
                        )}
                    </Box>
                </Box>

                {/* Right: Map */}
                <Box
                    sx={{
                        flex: 1,
                        position: "relative",
                        minHeight: { xs: 380, md: "calc(100vh - 48px)" },
                    }}
                >
                    <iframe
                        title="Store map"
                        src={mapSrc}
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            border: "none",
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};
