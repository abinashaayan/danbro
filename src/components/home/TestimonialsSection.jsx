import { Box, IconButton, CircularProgress } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect, useRef } from "react";
import { getAllReviews } from "../../utils/apiService";
import user1 from "../../assets/174fadede8628f65c914092552741f716b9b8039.jpg";

// ⭐ Decorative Images
import topLeftIcon from "../../assets/arrowtopbottom.png";
import bottomRightIcon from "../../assets/arrowtopbottom.png";
import cardTopRightDots from "../../assets/Ornament1.png";
import cardBottomLeftDots from "../../assets/Ornament1.png";

const fallbackTestimonials = [
    { name: "Our Customer", title: "Great experience", message: "We love hearing from you. Share your experience with Danbro products!", img: user1 },
];

const mapReviewToTestimonial = (r) => ({
    name: r?.user?.name ?? "Customer",
    title: r?.product?.name ?? "Product",
    message: r?.review ?? "",
    img: user1,
    rating: r?.rating ?? 5,
});

export const TestimonialsSection = () => {
    const [testimonialsList, setTestimonialsList] = useState(fallbackTestimonials);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(0);
    const cardRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        let cancelled = false;
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const data = await getAllReviews();
                if (cancelled) return;
                const approved = (Array.isArray(data) ? data : [])
                    .filter((r) => (r?.status || "").toLowerCase() === "approved")
                    .map(mapReviewToTestimonial)
                    .filter((t) => t.message?.trim());
                if (approved.length > 0) setTestimonialsList(approved);
            } catch (_) {
                if (!cancelled) setTestimonialsList(fallbackTestimonials);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        fetchReviews();
        return () => { cancelled = true; };
    }, []);

    const listLength = testimonialsList.length;
    const safeActive = listLength ? Math.min(active, listLength - 1) : 0;
    const nextTestimonial = () =>
        setActive((prev) => (listLength ? (prev + 1) % listLength : 0));
    const prevTestimonial = () =>
        setActive((prev) => (listLength ? (prev === 0 ? listLength - 1 : prev - 1) : 0));

    useEffect(() => {
        setActive((prev) => (listLength ? Math.min(prev, listLength - 1) : 0));
    }, [listLength]);

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

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    useEffect(() => {
        if (cardRef.current) {
            cardRef.current.style.opacity = "0";
            cardRef.current.style.transform = "scale(0.9)";
            setTimeout(() => {
                if (cardRef.current) {
                    cardRef.current.style.transition = "all 0.4s ease 0.3s";
                    cardRef.current.style.opacity = "1";
                    cardRef.current.style.transform = "scale(1)";
                }
            }, 2000);
        }
    }, [safeActive]);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
                <CircularProgress sx={{ color: "var(--themeColor)" }} />
            </Box>
        );
    }

    if (listLength === 0) return null;

    return (
        <Box
            ref={sectionRef}
            sx={{
                width: "100%",
                maxWidth: "100vw",
                bgcolor: "#fde5e4",
                py: { xs: 6, md: 10 },
                mt: { xs: 4, md: 8 },
                borderRadius: "30px",
                position: "relative",
                textAlign: "center",
                overflow: "hidden",
                opacity: 0,
                transform: "translateY(30px)",
                transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "radial-gradient(circle at 20% 50%, rgba(255,181,161,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(251,199,181,0.2) 0%, transparent 50%)",
                    pointerEvents: "none",
                },
            }}
        >
            <Box
                component="img"
                src={topLeftIcon}
                alt="decor"
                sx={{
                    position: "absolute",
                    top: { xs: "15%", md: "20%" },
                    left: { xs: "3%", md: "6%" },
                    width: { xs: 50, md: 80 },
                    opacity: 0.6,
                    animation: "float 6s ease-in-out infinite",
                    "@keyframes float": {
                        "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                        "50%": { transform: "translateY(-15px) rotate(10deg)" },
                    },
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />
            <Box
                component="img"
                src={bottomRightIcon}
                alt="decor"
                sx={{
                    position: "absolute",
                    bottom: { xs: "15%", md: "20%" },
                    right: { xs: "3%", md: "5%" },
                    width: { xs: 50, md: 80 },
                    opacity: 0.6,
                    animation: "float 8s ease-in-out infinite reverse",
                    "@keyframes float": {
                        "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                        "50%": { transform: "translateY(-15px) rotate(-10deg)" },
                    },
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />

            <CustomText
                sx={{
                    fontSize: { xs: 22, sm: 26, md: 32 },
                    fontWeight: 800,
                    color: "var(--themeColor)",
                    mb: { xs: 4, md: 6 },
                    px: { xs: 2, md: 0 },
                }}
            >
                Here is what our Clients are saying About us
            </CustomText>
            <IconButton
                onClick={prevTestimonial}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: { xs: "5%", md: "15%" },
                    transform: "translateY(-50%)",
                    color: "var(--themeColor)",
                    backgroundColor: "transparent",
                    backdropFilter: "none",
                    boxShadow: "none",
                    width: { xs: 40, md: 50 },
                    height: { xs: 40, md: 50 },
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
            >
                <ArrowBackIosNewIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
            </IconButton>

            {/* RIGHT ARROW */}
            <IconButton
                onClick={nextTestimonial}
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: { xs: "5%", md: "15%" },
                    transform: "translateY(-50%)",
                    color: "var(--themeColor)",
                    backgroundColor: "transparent",
                    backdropFilter: "none",
                    boxShadow: "none",
                    width: { xs: 40, md: 50 },
                    height: { xs: 40, md: 50 },
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
            >
                <ArrowForwardIosIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
            </IconButton>

              <Box
                component="img"
                src={cardBottomLeftDots}
                alt="decor"
                sx={{
                    position: "absolute",
                    top: "19%",
                    right: { xs: "10%", md: "22%" },
                    animation: "pulse 3s ease-in-out infinite",
                    "@keyframes pulse": {
                        "0%, 100%": { opacity: 0.5, transform: "scale(1)" },
                        "50%": { opacity: 0.8, transform: "scale(1.1)" },
                    },
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />
            <Box
                ref={cardRef}
                sx={{
                    mx: "auto",
                    maxWidth: 1000,
                    width: { xs: "90%", md: "85%" },
                    bgcolor: "#fff",
                    borderRadius: { xs: "20px", md: "30px" },
                    p: { xs: 3.5, md: 5.5 },
                    px: { xs: 3, md: 6 },
                    boxShadow: "0 12px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05) inset",
                    minHeight: { xs: 280, md: 320 },
                    height: { xs: "auto", md: 320 },
                    position: "relative",
                    overflow: "hidden",
                    mb: { xs: 2, md: 3 },
                    zIndex: 1,
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                        boxShadow: "0 16px 50px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,181,161,0.2) inset",
                        transform: "translateY(-5px)",
                    },
                    // Speech bubble tail
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "-20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 0,
                        height: 0,
                        borderLeft: "25px solid transparent",
                        borderRight: "25px solid transparent",
                        borderTop: "25px solid #fff",
                        filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.15))",
                        zIndex: 1,
                    },
                }}
            >
                {/* ⭐ CARD TOP RIGHT DECOR */}
                <Box
                    component="img"
                    src={cardTopRightDots}
                    alt="decor"
                    sx={{
                        position: "absolute",
                        top: "-50px",
                        right: "-50px",
                        width: { xs: "100px", md: "150px" },
                        opacity: 0.25,
                        zIndex: 0,
                        pointerEvents: "none",
                        animation: "rotate 20s linear infinite",
                        "@keyframes rotate": {
                            "0%": { transform: "rotate(0deg)" },
                            "100%": { transform: "rotate(360deg)" },
                        },
                    }}
                />
                <Box sx={{ position: "relative", zIndex: 2 }}>
                    <CustomText
                        sx={{
                            fontSize: { xs: 18, sm: 20, md: 24 },
                            fontWeight: 700,
                            mb: { xs: 1.5, md: 2 },
                            color: "var(--themeColor)",
                        }}
                    >
                        {testimonialsList[safeActive].title}
                    </CustomText>

                    <CustomText
                        sx={{
                            fontSize: { xs: 14, md: 16 },
                            color: "#555",
                            lineHeight: 1.8,
                            px: { xs: 1, md: 2 },
                        }}
                    >
                        {testimonialsList[safeActive].message}
                    </CustomText>
                </Box>
            </Box>

            <Box
                component="img"
                src={cardBottomLeftDots}
                alt="decor"
                sx={{
                    position: "absolute",
                    bottom: { xs: "25%", md: "27%" },
                    left: { xs: "10%", md: "22%" },
                    animation: "pulse 3s ease-in-out infinite",
                    "@keyframes pulse": {
                        "0%, 100%": { opacity: 0.5, transform: "scale(1)" },
                        "50%": { opacity: 0.8, transform: "scale(1.1)" },
                    },
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />
            {/* PROFILE IMAGES */}
            <Box
                sx={{
                    mt: { xs: 4, md: 6 },
                    display: "flex",
                    justifyContent: "center",
                    gap: { xs: 1.5, md: 3 },
                    flexWrap: "wrap",
                    px: { xs: 2, md: 0 },
                }}
            >
                {testimonialsList.map((t, i) => (
                    <Box
                        key={i}
                        onClick={() => setActive(i)}
                        sx={{
                            cursor: "pointer",
                            transform: safeActive === i ? "scale(1.2)" : "scale(1)",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            opacity: safeActive === i ? 1 : 0.5,
                            border:
                                safeActive === i
                                    ? "4px solid var(--themeColor)"
                                    : "4px solid transparent",
                            borderRadius: "50%",
                            padding: "4px",
                            boxShadow:
                                safeActive === i
                                    ? "0 4px 15px rgba(95,41,48,0.3)"
                                    : "0 2px 8px rgba(0,0,0,0.1)",
                            "&:hover": {
                                opacity: safeActive === i ? 1 : 0.8,
                                transform: safeActive === i ? "scale(1.25)" : "scale(1.1)",
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src={t.img}
                            alt={t.name}
                            loading="lazy"
                            sx={{
                                width: { xs: 55, sm: 65, md: 75 },
                                height: { xs: 55, sm: 65, md: 75 },
                                borderRadius: "50%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </Box>
                ))}
            </Box>

            {/* ACTIVE USER NAME */}
            <CustomText
                sx={{
                    mt: { xs: 2, md: 3 },
                    fontSize: { xs: 18, md: 22 },
                    fontWeight: 700,
                    color: "var(--themeColor)",
                }}
            >
                {testimonialsList[safeActive].name}
            </CustomText>
        </Box >
    );
};
