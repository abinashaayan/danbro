import { Box, Typography, IconButton, Grid, Container } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import img1 from "../../assets/cakeimg.png";
import img2 from "../../assets/cakeimg.png";
import img3 from "../../assets/cakeimg.png";
import img4 from "../../assets/cakeimg.png";
import img5 from "../../assets/cakeimg.png";
import img6 from "../../assets/cakeimg.png";
// ⭐ Decorative Images
import topLeftIcon from "../../assets/Groupartical.png";
import bottomRightIcon from "../../assets/Groupartical.png";
import cardTopRightDots from "../../assets/Ornament1.png";
import cardBottomLeftDots from "../../assets/Ornament1.png";

const articleList = [
    {
        date: "October 17, 2025",
        title: "Handmade with Love – Discover Danbro Cookies by Mr Brown Bakery",
        image: img1,
    },
    {
        date: "October 17, 2025",
        title: "Experience the Magic of Danbro Cakes – A Delicious Creation by Mr Brown Bakery",
        image: img2,
    },
    {
        date: "October 17, 2025",
        title: "Discover the Best Baklawa by Danbro – A Sweet Masterpiece by Mr Brown Bakery",
        image: img3,
    },
    {
        date: "October 17, 2025",
        title: "Handmade with Love – Discover Danbro Cookies by Mr Brown Bakery",
        image: img4,
    },
    {
        date: "October 17, 2025",
        title: "Handmade with Love – Discover Danbro Cookies by Mr Brown Bakery",
        image: img5,
    },
    {
        date: "October 17, 2025",
        title: "Handmade with Love – Discover Danbro Cookies by Mr Brown Bakery",
        image: img6,
    },
];

export const Artical = () => {
    const [active, setActive] = useState(0);


    return (
        <Box
            sx={{
                py: 10,
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
                    fontSize: { xs: 22, sm: 26, md: 32 },
                    fontWeight: 800,
                    color: "var(--themeColor)",
                    mb: { xs: 4, md: 6 },
                    px: { xs: 2, md: 0 },
                }}
            >
                Check it out, OUR NEW ARTICLES
            </Typography>
            <Container>
                <Grid container spacing={{ xs: 2, md: 2 }}>
                    {articleList?.map((item, i) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                            <Box
                                sx={{
                                    bgColor: "#fff",
                                    borderRadius: "12px",
                                    p: 1,
                                    textAlign: "left",
                                    position: "relative",
                                    cursor: "pointer",
                                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                                    overflow: "hidden",
                                    "&:hover": {
                                        transform: "translateY(-8px) scale(1.02)",
                                        boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                                        "& .article-image": {
                                            transform: "scale(1.1)",
                                        },
                                        "& .article-title": {
                                            color: "var(--themeColor)",
                                        },
                                    },
                                }}
                            >
                                {/* Image */}
                                <Box
                                    className="article-image"
                                    component="img"
                                    src={item.image}
                                    sx={{
                                        width: "100%",
                                        height: { xs: 180, sm: 200, md: 220 },
                                        objectFit: "cover",
                                        borderRadius: "12px",
                                        transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                                    }}
                                />

                                {/* Date */}
                                <Typography
                                    sx={{
                                        mt: 2,
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: "#6a6a6a",
                                        letterSpacing: 0.5,
                                    }}
                                >
                                    {item.date}
                                </Typography>
                                <Typography
                                    className="article-title"
                                    sx={{
                                        mt: 1,
                                        fontSize: { xs: 14, md: 16 },
                                        fontWeight: 600,
                                        lineHeight: 1.4,
                                        color: "#333",
                                        transition: "color 0.3s ease",
                                    }}
                                >
                                    {item.title}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <img
                src={cardTopRightDots}
                alt="decor"
                style={{
                    position: "absolute",
                    top: "19%",
                    right: "22%"
                }}
            />


            <img
                src={cardBottomLeftDots}
                alt="decor"
                style={{
                    position: "absolute",
                    bottom: "27%",
                    left: "22%",
                }}
            />

        </Box >
    );
};
