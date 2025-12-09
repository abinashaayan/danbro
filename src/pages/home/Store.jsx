import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Typography, Grid, Button, Divider } from "@mui/material";
import lucknowlogo from "../../assets/lucknowlogo.png";
import createevents1 from "../../assets/createevents1.png";
import store from "../../assets/store.png";
import store1 from "../../assets/store1.png";
import contact from "../../assets/contact.jpg";
import { useNavigate } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";

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

    const categories = ["Lucknow", "Aliganj", "Hazratganj", "Indira Nagar", "Gomti Nagar", "Kanpur", "Delhi"];

    return (
        <Box sx={{ width: "100%", overflowX: "hidden", background: "#fff", pb: { xs: 8, md: 10 } }}>

            {/* TOP HERO SECTION */}
            <Box
                ref={sectionRefs.hero}
                sx={{
                    height: { xs: 120, sm: 160, md: 230 },
                    backgroundImage: `url(${store1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    px: { xs: 2, sm: 4, md: 8 },
                    pt: { xs: 2, sm: 3 },
                    transition: "0.8s ease-out",
                    transform: visibleSections.hero ? "translateY(0)" : "translateY(30px)"
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
                    onClick={() => window.history.back()}>
                    <ArrowBackIosNew sx={{ fontSize: 16, color: "#000" }} />
                    <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: "bold", color: "#000" }}>
                        Back
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ textAlign: "center", py: { xs: 2, md: 3 } }}>
                <img src={lucknowlogo} alt="logo" style={{ width: "auto"}} />
            </Box>

            {/* SECOND HERO SECTION */}
            <Box
                sx={{
                    height: { xs: 140, sm: 180, md: 240 },
                    backgroundImage: `url(${store})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    px: { xs: 2, md: 6 }
                }}>
                <Typography sx={{ fontSize: { xs: 14, sm: 16 }, fontWeight: "bold", color: "#000" }}>Back</Typography>
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
                            {categories.map((cat, i) => (
                                <Box key={i}
                                    sx={{ px: { xs: 1, sm: 2 }, borderRight: i !== categories.length - 1 ? "2px solid #000" : "none" }}>
                                    <Button disableRipple
                                        sx={{
                                            fontSize: { xs: 11, sm: 13 }, fontWeight: 500, color: "#000",
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

                {/* STORE SECTION */}
                <Grid container spacing={3} sx={{ mt: { xs: 4, md: 6 }, alignItems: "stretch" }}>

                    {/* IMAGE */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Box sx={{ width: "100%", height: "100%", borderRadius: 3, overflow: "hidden" }}>
                            <img src={contact} alt="store"
                                style={{ width: "100%", height: "400px", objectFit: "cover" }} />
                        </Box>
                    </Grid>

                    {/* CONTENT */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <Box>
                                <Typography sx={{ fontSize: { xs: 20, md: 26 }, fontWeight: 700, mb: 2 }}>
                                    Aliganj, Lucknow – Danbro by Mr Brown Stores
                                </Typography>

                                <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
                                    <span style={{ fontSize: 20 }}>📍</span>
                                    <Typography sx={{ fontSize: { xs: 14, md: 15 } }}>B-35, Sector-P, Aliganj, Lucknow</Typography>
                                </Box>

                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <span style={{ fontSize: 18 }}>📞</span>
                                    <Typography sx={{ fontSize: { xs: 14, md: 15 } }}>
                                        0522-4113205, +91 7309032611
                                    </Typography>
                                </Box>
                            </Box>

                            <Button variant="contained"
                                sx={{
                                    mt: 3, alignSelf: "flex-start", px: { xs: 3, md: 4 }, py: 1.1, fontWeight: 600,
                                    background: "#FF9472", "&:hover": { background: "#F2709C" }
                                }}>
                                Contact Now
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
