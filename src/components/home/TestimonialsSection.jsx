import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect, useRef } from "react";
import user1 from "../../assets/174fadede8628f65c914092552741f716b9b8039.jpg";
import user2 from "../../assets/174fadede8628f65c914092552741f716b9b8039.jpg";
import user3 from "../../assets/174fadede8628f65c914092552741f716b9b8039.jpg";
import user4 from "../../assets/174fadede8628f65c914092552741f716b9b8039.jpg";
import user5 from "../../assets/174fadede8628f65c914092552741f716b9b8039.jpg";

// ⭐ Decorative Images
import topLeftIcon from "../../assets/arrowtopbottom.png";
import bottomRightIcon from "../../assets/arrowtopbottom.png";
import cardTopRightDots from "../../assets/Ornament1.png";
import cardBottomLeftDots from "../../assets/Ornament1.png";

const testimonialsList = [
    {
        name: "Tom",
        title: "It was a very good experience",
        message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris...",
        img: user1,
    },
    {
        name: "Sarah",
        title: "Amazing service, super fast delivery!",
        message: "Suspendisse sed magna eget nibh in turpis.",
        img: user2,
    },
    {
        name: "Daniel",
        title: "Loved the packaging & taste!",
        message: "Faucibus venenatis felis id augue sit cursus pellentesque.",
        img: user3,
    },
    {
        name: "Emily",
        title: "Best bakery experience ever!",
        message: "Nunc elementum felis magna pretium.",
        img: user4,
    },
    {
        name: "Andrew",
        title: "Highly recommended!",
        message: "Suspendisse sed magna eget nibh in turpis.",
        img: user5,
    },
];

export const TestimonialsSection = () => {
    const [active, setActive] = useState(0);
    const cardRef = useRef(null);
    const sectionRef = useRef(null);

    const nextTestimonial = () =>
        setActive((prev) => (prev + 1) % testimonialsList.length);

    const prevTestimonial = () =>
        setActive((prev) =>
            prev === 0 ? testimonialsList.length - 1 : prev - 1
        );

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
                    cardRef.current.style.transition = "all 0.5s ease";
                    cardRef.current.style.opacity = "1";
                    cardRef.current.style.transform = "scale(1)";
                }
            }, 50);
        }
    }, [active]);

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

            <Typography
                sx={{
                    fontSize: { xs: 22, sm: 26, md: 32 },
                    fontWeight: 800,
                    color: "var(--themeColor)",
                    mb: { xs: 4, md: 6 },
                    px: { xs: 2, md: 0 },
                }}
            >
                Here is what our Clients are saying About us
            </Typography>
            <IconButton
                onClick={prevTestimonial}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: { xs: "5%", md: "15%" },
                    transform: "translateY(-50%)",
                    color: "var(--themeColor)",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.3) inset",
                    width: { xs: 40, md: 50 },
                    height: { xs: 40, md: 50 },
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 1)",
                        transform: "translateY(-50%) scale(1.15) translateX(-5px)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
                    },
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
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.3) inset",
                    width: { xs: 40, md: 50 },
                    height: { xs: 40, md: 50 },
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 1)",
                        transform: "translateY(-50%) scale(1.15) translateX(5px)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
                    },
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
                    maxWidth: 850,
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
                    <Typography
                        sx={{
                            fontSize: { xs: 18, sm: 20, md: 24 },
                            fontWeight: 700,
                            mb: { xs: 1.5, md: 2 },
                            color: "var(--themeColor)",
                        }}
                    >
                        {testimonialsList[active].title}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: { xs: 14, md: 16 },
                            color: "#555",
                            lineHeight: 1.8,
                            px: { xs: 1, md: 2 },
                        }}
                    >
                        {testimonialsList[active].message}
                    </Typography>
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
                            transform: active === i ? "scale(1.2)" : "scale(1)",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            opacity: active === i ? 1 : 0.5,
                            border:
                                active === i
                                    ? "4px solid var(--themeColor)"
                                    : "4px solid transparent",
                            borderRadius: "50%",
                            padding: "4px",
                            boxShadow:
                                active === i
                                    ? "0 4px 15px rgba(95,41,48,0.3)"
                                    : "0 2px 8px rgba(0,0,0,0.1)",
                            "&:hover": {
                                opacity: active === i ? 1 : 0.8,
                                transform: active === i ? "scale(1.25)" : "scale(1.1)",
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src={t.img}
                            alt={t.name}
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
            <Typography
                sx={{
                    mt: { xs: 2, md: 3 },
                    fontSize: { xs: 18, md: 22 },
                    fontWeight: 700,
                    color: "var(--themeColor)",
                }}
            >
                {testimonialsList[active].name}
            </Typography>
        </Box >
    );
};
