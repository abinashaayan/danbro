import { Box, Typography, Button } from "@mui/material";
import { useEffect, useRef } from "react";
import logo from "../../assets/logo.png";
import mens from "../../assets/bbd53846cb92a734a26973d3c7cd83699addf233.png";

export const PersonalisedInstant = () => {
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (contentRef.current) observer.observe(contentRef.current);
        if (imageRef.current) observer.observe(imageRef.current);

        return () => {
            if (contentRef.current) observer.unobserve(contentRef.current);
            if (imageRef.current) observer.unobserve(imageRef.current);
        };
    }, []);

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "100vw",
                background: "linear-gradient(180deg, #EEEEEE 0%, #E0E1DC 100%)",
                borderRadius: { xs: "0 0 20px 20px", md: "0 0 40px 40px" },
                overflow: "hidden",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                boxShadow: "0 -10px 40px rgba(0,0,0,0.05)",
                px: { xs: 1.25, md: 0 },
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(135deg, rgba(251,199,181,0.15) 0%, rgba(255,181,161,0.08) 50%, rgba(251,199,181,0.15) 100%)",
                    pointerEvents: "none",
                },
                "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "radial-gradient(circle at 20% 50%, rgba(255,181,161,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(251,199,181,0.08) 0%, transparent 50%)",
                    pointerEvents: "none",
                },
            }}
        >
            {/* Animated Background Elements */}
            {[...Array(4)].map((_, i) => (
                <Box
                    key={i}
                    sx={{
                        position: "absolute",
                        width: { xs: "120px", md: `${150 + i * 30}px` },
                        height: { xs: "120px", md: `${150 + i * 30}px` },
                        borderRadius: "50%",
                        background: `radial-gradient(circle, rgba(255,181,161,${0.15 - i * 0.03}) 0%, transparent 70%)`,
                        top: i % 2 === 0 ? "-60px" : "auto",
                        bottom: i % 2 === 1 ? "-40px" : "auto",
                        left: i % 2 === 0 ? "auto" : "-40px",
                        right: i % 2 === 1 ? "auto" : "-60px",
                        animation: `floatPersonalised ${8 + i * 2}s ease-in-out infinite`,
                        animationDelay: `${i * 0.5}s`,
                        "@keyframes floatPersonalised": {
                            "0%, 100%": { transform: "translateY(0px) rotate(0deg) scale(1)" },
                            "50%": { transform: `translateY(${-20 - i * 5}px) rotate(${180 + i * 30}deg) scale(1.1)` },
                        },
                        zIndex: 0,
                        pointerEvents: "none",
                    }}
                />
            ))}

            <Box
                ref={imageRef}
                sx={{
                    width: { xs: "100%", md: "50%" },
                    position: "relative",
                    opacity: 0,
                    zIndex: 5,
                    transform: { xs: "translateY(-30px)", md: "translateX(-50px)" },
                    transition: "opacity 1s ease-out, transform 1s ease-out",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: { xs: "300px", md: "700px" },
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(135deg, rgba(255,181,161,0.1) 0%, transparent 50%)",
                        pointerEvents: "none",
                        zIndex: 1,
                    },
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: "-20px",
                        left: "-20px",
                        right: "-20px",
                        bottom: "-20px",
                        background: "radial-gradient(circle, rgba(255,181,161,0.2) 0%, transparent 70%)",
                        borderRadius: "50%",
                        animation: "pulseImage 4s ease-in-out infinite",
                        "@keyframes pulseImage": {
                            "0%, 100%": { transform: "scale(1)", opacity: 0.3 },
                            "50%": { transform: "scale(1.1)", opacity: 0.5 },
                        },
                        zIndex: -1,
                        pointerEvents: "none",
                    },
                }}
            >
                <Box
                    component="img"
                    src={mens}
                    alt="App Banner"
                    sx={{
                        width: "100%",
                        height: { xs: "auto", md: "100%" },
                        maxHeight: { xs: "400px", md: "none" },
                        objectFit: "contain",
                        display: "block",
                        transition: "transform 0.3s ease",
                        position: "relative",
                        zIndex: 0,
                        "&:hover": {
                            transform: "scale(1.02)",
                        },
                    }}
                />
            </Box>
            <Box
                ref={contentRef}
                sx={{
                    px: { xs: 2, md: 6 },
                    py: { xs: 3, md: 5 },
                    textAlign: { xs: "center", md: "left" },
                    position: "relative",
                    zIndex: 2,
                    opacity: 0,
                    transform: { xs: "translateY(30px)", md: "translateX(50px)" },
                    transition: "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
                    width: { xs: "100%", md: "50%" },
                }}
            >
                <Box
                    component="img"
                    src={logo}
                    alt="logo"
                    sx={{
                        height: { xs: 60, sm: 80, md: 100 },
                        width: "auto",
                        mb: { xs: 2, md: 3 },
                        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                            transform: "scale(1.05)",
                        },
                    }}
                />

                <Typography
                    sx={{
                        mt: { xs: 3, md: 4 },
                        fontSize: { xs: 30, sm: 34, md: 42 },
                        fontWeight: 800,
                        mb: { xs: 2, md: 3 },
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            background: "linear-gradient(135deg, #03081F 0%, #1a1f3a 100%)",
                            color: "#fff",
                            borderRadius: { xs: "20px", md: "50px" },
                            px: { xs: 2, sm: 3, md: 4 },
                            py: { xs: "8px", md: "12px" },
                            display: "block",
                            marginLeft: { xs: 0, md: "-170px" },
                            width: { xs: "100%", md: "625px" },
                            maxWidth: { xs: "100%", md: "625px" },
                            textAlign: "center",
                            boxShadow: "0 8px 25px rgba(15,27,64,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            position: "relative",
                            overflow: "hidden",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: "-100%",
                                width: "100%",
                                height: "100%",
                                background: "linear-gradient(90deg, transparent, rgba(255,181,161,0.2), transparent)",
                                transition: "left 0.6s ease",
                            },
                            "&:hover": {
                                transform: "translateY(-4px) scale(1.02)",
                                boxShadow: "0 12px 35px rgba(15,27,64,0.5), 0 0 0 1px rgba(255,255,255,0.15) inset",
                                "&::before": {
                                    left: "100%",
                                },
                            },
                        }}
                    >
                        <Box
                            component="strong"
                            sx={{
                                color: "#FFB5A1",
                                textDecoration: "underline",
                                textDecorationThickness: "3px",
                                textUnderlineOffset: "5px",
                                textDecorationColor: "rgba(255,181,161,0.6)",
                            }}
                        >
                            Personalised
                        </Box>{" "}
                        & Instant
                    </Box>
                </Typography>

                <Typography
                    sx={{
                        mt: { xs: 1.5, md: 2 },
                        fontSize: { xs: 14, sm: 17, md: 19 },
                        color: "#555",
                        mb: { xs: 3, md: 4 },
                        fontWeight: 600,
                        lineHeight: 1.6,
                        textShadow: "0 1px 2px rgba(0,0,0,0.05)",
                        px: { xs: 1, md: 0 },
                    }}
                >
                    Download the DANBRO app for faster ordering
                </Typography>

                <Box
                    sx={{
                        mt: { xs: 2, md: 3 },
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: { xs: 1, md: 1 },
                        justifyContent: { xs: "center", md: "flex-start" },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            background: "linear-gradient(135deg, #000 0%, #1a1a1a 100%)",
                            color: "#fff",
                            px: { xs: 2.5, md: 3 },
                            py: { xs: 1.2, md: 1.4 },
                            borderRadius: { xs: "14px", md: "16px" },
                            cursor: "pointer",
                            width: { xs: "100%", sm: 180 },
                            maxWidth: { xs: "280px", sm: "180px" },
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            boxShadow: "0 6px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset",
                            position: "relative",
                            overflow: "hidden",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: "-100%",
                                width: "100%",
                                height: "100%",
                                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                                transition: "left 0.5s ease",
                            },
                            "&:hover": {
                                transform: "translateY(-4px) scale(1.03)",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.15) inset",
                                background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
                                "&::before": {
                                    left: "100%",
                                },
                            },
                            "&:active": {
                                transform: "translateY(-2px) scale(1.01)",
                            },
                        }}
                    >
                        <svg
                            width="22"
                            height="22"
                            fill="#fff"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M16.365 1.43c0 1.14-.52 2.26-1.29 3.1-.83.9-2.21 1.61-3.47 1.51-.17-1.09.39-2.27 1.23-3.08.83-.83 2.25-1.45 3.5-1.53.02.02.02 0 .02.02zM20.26 17.43c-.49 1.12-.72 1.6-1.35 2.58-.88 1.35-2.13 3.03-3.69 3.06-1.38.03-1.83-.9-3.42-.9-1.61 0-2.11.87-3.43.93-1.38.05-2.43-1.47-3.32-2.8-1.81-2.78-3.2-7.88-1.34-11.33.92-1.65 2.57-2.71 4.37-2.71 1.37 0 2.67.93 3.42.93.7 0 2.37-1.15 3.99-.98.68.03 2.57.27 3.79 2.05-.1.06-2.27 1.33-2.24 3.96.03 3.14 2.75 4.18 2.81 4.21z" />
                        </svg>
                        <Box>
                            <Typography sx={{ fontSize: 10 }}>Download on the</Typography>
                            <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                                App Store
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            background: "linear-gradient(135deg, #000 0%, #1a1a1a 100%)",
                            color: "#fff",
                            px: { xs: 2.5, md: 3 },
                            py: { xs: 1.2, md: 1.4 },
                            borderRadius: { xs: "14px", md: "16px" },
                            cursor: "pointer",
                            width: { xs: "100%", sm: 200 },
                            maxWidth: { xs: "280px", sm: "200px" },
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            boxShadow: "0 6px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset",
                            position: "relative",
                            overflow: "hidden",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: "-100%",
                                width: "100%",
                                height: "100%",
                                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                                transition: "left 0.5s ease",
                            },
                            "&:hover": {
                                transform: "translateY(-4px) scale(1.03)",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.15) inset",
                                background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
                                "&::before": {
                                    left: "100%",
                                },
                            },
                            "&:active": {
                                transform: "translateY(-2px) scale(1.01)",
                            },
                        }}
                    >
                        <svg width="25" height="25" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#34A853" d="M325.3 234.3 98.6 7.6l242 139.7z" />
                            <path fill="#FBBC04" d="m98.6 7.6 0 496.8 226.7-270z" />
                            <path fill="#EA4335" d="M340.6 218.5 505.3 143c18.3-8.8 18.3-36.2 0-45L340.6 23z" />
                            <path fill="#4285F4" d="M340.6 293.5 340.6 489l164.7-87c18.3-8.8 18.3-36.2 0-45z" />
                        </svg>
                        <Box>
                            <Typography sx={{ fontSize: 10 }}>GET IT ON</Typography>
                            <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                                Google Play
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
