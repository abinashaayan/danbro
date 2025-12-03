import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
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

    const nextTestimonial = () =>
        setActive((prev) => (prev + 1) % testimonialsList.length);

    const prevTestimonial = () =>
        setActive((prev) =>
            prev === 0 ? testimonialsList.length - 1 : prev - 1
        );

    return (
        <Box
            sx={{
                bgcolor: "#fde5e4",
                py: 10,
                mt: 8,
                borderRadius: "30px",
                position: "relative",
                textAlign: "center",
                overflow: "hidden",
            }}
        >
            <img
                src={topLeftIcon}
                alt="decor"
                style={{
                    position: "absolute",
                    top: '20%',
                    left: '6%',
                    width: 80,
                }}
            />
            <img
                src={bottomRightIcon}
                alt="decor"
                style={{
                    position: "absolute",
                    bottom: '20%',
                    right: '5%',
                    width: 80,
                }}
            />

            <Typography
                sx={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: "var(--themeColor)",
                    mb: 6,
                }}
            >
                Here is what our Clients are saying About us
            </Typography>
            <IconButton
                onClick={prevTestimonial}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "15%",
                    transform: "translateY(-50%)",
                    color: "var(--themeColor)",
                }}
            >
                <ArrowBackIosNewIcon />
            </IconButton>

            {/* RIGHT ARROW */}
            <IconButton
                onClick={nextTestimonial}
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: "15%",
                    transform: "translateY(-50%)",
                    color: "var(--themeColor)",
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>

            <img
                src={cardTopRightDots}
                alt="decor"
                style={{
                    position: "absolute",
                    top: "19%",
                    right: "22%"
                }}
            />
            <Box
                sx={{
                    mx: "auto",
                    maxWidth: 850,
                    bgcolor: "#fff",
                    borderRadius: "25px",
                    p: 5,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    height: 320,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* ⭐ CARD TOP RIGHT DECOR */}
                <img
                    src={cardTopRightDots}
                    alt="decor"
                    style={{
                        position: "absolute",
                        top: "-50px",
                        right: "-50px",
                        width: "150px",
                        opacity: 0.25,
                        zIndex: 0,
                        pointerEvents: "none",
                    }}
                />
                <Box sx={{ position: "relative", zIndex: 2 }}>
                    <Typography sx={{ fontSize: 24, fontWeight: 700, mb: 2 }}>
                        {testimonialsList[active].title}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 16,
                            color: "#555",
                            lineHeight: 1.6,
                            px: 2,
                        }}
                    >
                        {testimonialsList[active].message}
                    </Typography>
                </Box>
            </Box>

            <img
                src={cardBottomLeftDots}
                alt="decor"
                style={{
                    position: "absolute",
                    bottom: "27%",
                    left: "22%",
                }}
            />
            {/* PROFILE IMAGES */}
            <Box
                sx={{
                    mt: 5,
                    display: "flex",
                    justifyContent: "center",
                    gap: 3,
                }}
            >
                {testimonialsList.map((t, i) => (
                    <Box
                        key={i}
                        onClick={() => setActive(i)}
                        sx={{
                            cursor: "pointer",
                            transform: active === i ? "scale(1.15)" : "scale(1)",
                            transition: "0.3s",
                            opacity: active === i ? 1 : 0.6,
                            border:
                                active === i
                                    ? "3px solid var(--themeColor)"
                                    : "3px solid transparent",
                            borderRadius: "50%",
                            padding: "3px",
                        }}
                    >
                        <img
                            src={t.img}
                            alt={t.name}
                            style={{
                                width: 70,
                                height: 70,
                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                        />
                    </Box>
                ))}
            </Box>

            {/* ACTIVE USER NAME */}
            <Typography sx={{ mt: 2, fontSize: 22, fontWeight: 700 }}>
                {testimonialsList[active].name}
            </Typography>
        </Box >
    );
};
