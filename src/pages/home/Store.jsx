import React, { useState, useEffect, useRef, useMemo } from "react";
import { Box, Container,  Grid, Button, Divider, CircularProgress, Alert } from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
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

    // Fetch branches from API
    const { branches, loading, error } = useBranches();

    // Only Lucknow store for now – filter to Lucknow or show single default
    const LUCKNOW_STORE_DEFAULT = {
        name: "Lucknow Store",
        city: "Lucknow",
        address: "Cyber Heights, Vibhuti Khand, Lucknow",
        phone: "",
        lat: "",
        long: "",
    };

    const filteredBranches = useMemo(() => {
        if (!branches || branches.length === 0) return [LUCKNOW_STORE_DEFAULT];
        const lucknowOnly = branches.filter(
            (branch) => branch?.city && String(branch.city).trim().toLowerCase() === "lucknow"
        );
        return lucknowOnly.length > 0 ? lucknowOnly : [LUCKNOW_STORE_DEFAULT];
    }, [branches]);

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
                        <Link to="/" className="link-no-decoration">
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}>
                                <ArrowBackIosNew sx={{ fontSize: 16, color: "#fff" }} />
                                <CustomText variant="body1" sx={{ fontWeight: "bold", color: "#fff" }}>
                                    Back
                                </CustomText>
                            </Box>
                        </Link>
                    </Box>

                    <Box sx={{ textAlign: "center", mt: { xs: 2, md: 3 } }}>
                        <img src={lucknowlogo} alt="logo" style={{ width: "auto" }} />
                    </Box>
                    <Box sx={{ height: { xs: 140, sm: 180, md: 240 }, backgroundImage: `url(${store})`, backgroundSize: "cover", backgroundPosition: "center", display: "flex", justifyContent: "center", alignItems: "center" }}></Box>

                    <Container  sx={{ py: { xs: 3, md: 5 } }}>
                        <Box ref={sectionRefs.categories}>
                            <Box sx={{
                                opacity: visibleSections.categories ? 1 : 0,
                                transform: visibleSections.categories ? "translateY(0)" : "translateY(20px)",
                                transition: "0.8s"
                            }}>
                                <Divider sx={{ borderColor: "#000", borderBottomWidth: 2, mb: 2 }} />
                                <CustomText sx={{ textAlign: "center", fontSize: { xs: 18, md: 22 }, fontWeight: 700, mb: 2 }}>
                                    OUR STORES
                                </CustomText>
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
                                                <CustomText sx={{ fontSize: { xs: 20, md: 26 }, fontWeight: 700, mb: 2 }}>
                                                    {branch?.name || `${branch?.city} – ${branch?.brandname || branch?.compname || "Danbro by Mr Brown Stores"}`}
                                                </CustomText>

                                                <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
                                                    <span style={{ fontSize: 20 }}>📍</span>
                                                    <CustomText sx={{ fontSize: { xs: 14, md: 15 } }}>
                                                        {branch?.address || "Address not available"}, {branch?.city}
                                                    </CustomText>
                                                </Box>

                                                {branch?.phone && (
                                                    <Box sx={{ display: "flex", gap: 1 }}>
                                                        <span style={{ fontSize: 18 }}>📞</span>
                                                        <CustomText sx={{ fontSize: { xs: 14, md: 15 } }}>
                                                            {branch?.phone}
                                                        </CustomText>
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
                                <CustomText sx={{ fontSize: { xs: 16, md: 20 }, color: "#999" }}>
                                    No branches found
                                </CustomText>
                            </Box>
                        )}
                    </Container>
                </Box>
            )}
        </div>
    );
};
