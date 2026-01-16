import React, { useState, useEffect, useRef, useMemo } from "react";
import { Box, Container, Typography, Grid, Button, Divider, CircularProgress, Alert } from "@mui/material";
import lucknowlogo from "../../assets/lucknowlogo.png";
import store from "../../assets/store.png";
import store1 from "../../assets/store1.png";
import contact from "../../assets/contact.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useBranches } from "../../hooks/useBranches";

export const Store = () => {
    const [visibleSections, setVisibleSections] = useState({});
    const sectionRefs = {
        hero: useRef(null),
        categories: useRef(null),
        blogs: useRef(null),
    };

    useEffect(() => {
        const observers = Object.keys(sectionRefs).map((key) => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setVisibleSections((prev) => ({ ...prev, [key]: true }));
                        }
                    });
                }, { threshold: 0.1 }
            );
            if (sectionRefs[key].current) observer.observe(sectionRefs[key].current);
            return observer;
        });
        return () => observers.forEach((observer) => observer.disconnect());
    }, []);

    const navigate = useNavigate();
    const [selectedCity, setSelectedCity] = useState(null);

    // Fetch branches from API
    const { branches, loading, error } = useBranches();

    // Extract unique cities from branches
    const categories = useMemo(() => {
        if (!branches || branches.length === 0) return [];

        // Normalize city names: trim whitespace, handle case differences
        const cityMap = new Map();
        branches.forEach(branch => {
            if (branch?.city) {
                const normalizedCity = branch.city.trim();
                if (normalizedCity) {
                    // Use title case for consistency (first letter uppercase, rest lowercase)
                    const titleCaseCity = normalizedCity.charAt(0).toUpperCase() + normalizedCity.slice(1).toLowerCase();
                    // Store original city for filtering, but use normalized for display
                    if (!cityMap.has(titleCaseCity)) {
                        cityMap.set(titleCaseCity, normalizedCity);
                    }
                }
            }
        });

        // Convert to array and sort alphabetically
        const uniqueCities = Array.from(cityMap.keys()).sort();
        console.log('Extracted cities:', uniqueCities);
        return uniqueCities;
    }, [branches]);

    // Filter branches by selected city (show all if no city selected)
    const filteredBranches = useMemo(() => {
        if (!branches || branches.length === 0) return [];
        if (!selectedCity) return branches;

        // Filter by city (case-insensitive comparison)
        return branches.filter(branch => {
            if (!branch?.city) return false;
            const branchCity = branch.city.trim();
            const selectedCityNormalized = selectedCity.trim();
            // Case-insensitive comparison
            return branchCity.toLowerCase() === selectedCityNormalized.toLowerCase();
        });
    }, [branches, selectedCity]);

    return (
        <div>
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                    <CircularProgress sx={{ color: "var(--themeColor)" }} />
                </Box>
            ) : error ? (
                <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, py: 4 }}>
                    <Alert severity="error" sx={{ borderRadius: 2 }}>
                        {error}
                    </Alert>
                </Box>
            ) : (
                <Box sx={{ width: "100%", overflowX: "hidden", background: "#fff", pb: { xs: 8, md: 10 } }}>
                    <Box
                        ref={sectionRefs?.hero}
                        sx={{
                            height: { xs: 120, sm: 160, md: 230 },
                            backgroundImage: `url(${store1})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "start",
                            px: { xs: 2, sm: 4, md: 8 },
                            pt: { xs: 2, sm: 3 },
                            transition: "0.8s ease-out",
                            transform: visibleSections.hero ? "translateY(0)" : "translateY(30px)"
                        }}
                    >
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}>
                                <ArrowBackIosNew sx={{ fontSize: 16, color: "#fff" }} />
                                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#fff" }}>
                                    Back
                                </Typography>
                            </Box>
                        </Link>
                    </Box>

                    <Box sx={{ textAlign: "center", mt: { xs: 2, md: 3 } }}>
                        <img src={lucknowlogo} alt="logo" style={{ width: "auto" }} />
                    </Box>
                    <Box
                        sx={{
                            height: { xs: 140, sm: 180, md: 240 },
                            backgroundImage: `url(${store})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                    </Box>

                    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
                        <Box ref={sectionRefs.categories}>
                            <Box sx={{
                                opacity: visibleSections.categories ? 1 : 0,
                                transform: visibleSections.categories ? "translateY(0)" : "translateY(20px)",
                                transition: "0.8s"
                            }}>
                                <Divider sx={{ borderColor: "#000", borderBottomWidth: 2, mb: 2 }} />

                                <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                                    {categories?.map((cat, i) => (
                                        <Box key={i}
                                            sx={{ px: { xs: 1, sm: 2 }, borderRight: i !== categories.length - 1 ? "2px solid #000" : "none" }}>
                                            <Button disableRipple
                                                onClick={() => setSelectedCity(selectedCity === cat ? null : cat)}
                                                sx={{
                                                    fontSize: { xs: 11, sm: 13 }, fontWeight: 500,
                                                    color: selectedCity === cat ? "#ED7D2B" : "#000",
                                                    "&:hover": { color: "#ED7D2B", bg: "transparent" }
                                                }}>
                                                {cat}
                                            </Button>
                                        </Box>
                                    ))}
                                </Box>

                                <Divider sx={{ borderColor: "#000", borderBottomWidth: 2, mt: 2 }} />
                            </Box>
                        </Box>
                        {filteredBranches?.length > 0 ? (
                            filteredBranches?.map((branch, index) => (
                                <Grid container key={branch?.poscode || index} sx={{ mt: index === 0 ? { xs: 4, md: 6 } : 3, alignItems: "stretch", p: { xs: "11px" } }}>
                                    <Grid item size={{ xs: 12, md: 4 }}>
                                        <Box sx={{ borderRadius: 3, overflow: "hidden" }}>
                                            <img src={contact} alt={branch?.name || "store"}
                                                style={{ width: "100%", height: "300px", objectFit: "contain" }} />
                                        </Box>
                                    </Grid>
                                    <Grid item size={{ xs: 12, md: 8 }}>
                                        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                            <Box>
                                                <Typography sx={{ fontSize: { xs: 20, md: 26 }, fontWeight: 700, mb: 2 }}>
                                                    {branch?.name || `${branch?.city} – ${branch?.brandname || branch?.compname || "Danbro by Mr Brown Stores"}`}
                                                </Typography>

                                                <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
                                                    <span style={{ fontSize: 20 }}>📍</span>
                                                    <Typography sx={{ fontSize: { xs: 14, md: 15 } }}>
                                                        {branch?.address || "Address not available"}, {branch?.city}
                                                    </Typography>
                                                </Box>

                                                {branch?.phone && (
                                                    <Box sx={{ display: "flex", gap: 1 }}>
                                                        <span style={{ fontSize: 18 }}>📞</span>
                                                        <Typography sx={{ fontSize: { xs: 14, md: 15 } }}>
                                                            {branch?.phone}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>

                                            <Button variant="contained"
                                                onClick={() => {
                                                    if (branch?.lat && branch?.long) {
                                                        window.open(`https://www.google.com/maps?q=${branch?.lat},${branch?.long}`, '_blank');
                                                    }
                                                }}
                                                sx={{
                                                    mt: 3, alignSelf: "flex-start", px: { xs: 3, md: 4 }, py: 1.1, fontWeight: 600,
                                                    background: "#FF9472", "&:hover": { background: "#F2709C" }
                                                }}>
                                                {branch?.lat && branch?.long ? "View on Map" : "Contact Now"}
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            ))
                        ) : (
                            <Box sx={{ textAlign: "center", py: 8, mt: { xs: 4, md: 6 } }}>
                                <Typography sx={{ fontSize: { xs: 16, md: 20 }, color: "#999" }}>
                                    No branches found
                                </Typography>
                            </Box>
                        )}
                    </Container>
                </Box>
            )}
        </div>
    );
};
