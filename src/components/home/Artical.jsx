import { Box,  IconButton, Grid, Container, useMediaQuery } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useRef } from "react";
import Slider from "react-slick";
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
    const isMobile = useMediaQuery("(max-width:899px)");
    let articlesSliderRef = useRef(null);

    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
    };


    return (
        <Box
            sx={{
                py: { xs: 4, sm: 4, md: 6, lg: 6 },
                borderRadius: { xs: "20px", md: "30px" },
                position: "relative",
                textAlign: "center",
                overflow: "hidden",
                background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(251,217,211,0.1) 100%)",
                px: { xs: 1.25, sm: 1.5, md: 2, lg: 0 },
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "radial-gradient(circle at 10% 20%, rgba(255,181,161,0.08) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(251,199,181,0.06) 0%, transparent 50%)",
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
                    top: { xs: '10%', md: '20%' },
                    left: { xs: '2%', md: '6%' },
                    width: { xs: 50, md: 80 },
                    display: { xs: "none", sm: "block" },
                }}
            />
            <Box
                component="img"
                src={bottomRightIcon}
                alt="decor"
                sx={{
                    position: "absolute",
                    bottom: { xs: '10%', md: '20%' },
                    right: { xs: '2%', md: '5%' },
                    width: { xs: 50, md: 80 },
                    display: { xs: "none", sm: "block" },
                }}
            />

            <CustomText
                sx={{
                    fontSize: { xs: 24, sm: 28, md: 32, lg: 34 },
                    fontWeight: 800,
                    color: "var(--themeColor)",
                    mb: { xs: 5, sm: 5, md: 6, lg: 7 },
                    px: { xs: 2, sm: 2, md: 2, lg: 0 },
                    position: "relative",
                    display: "inline-block",
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "-8px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "60%",
                        height: "4px",
                        background: "linear-gradient(90deg, transparent, var(--themeColor), transparent)",
                        borderRadius: "2px",
                    },
                }}
            >
                Check it out, OUR NEW ARTICLES
            </CustomText>
            <Container sx={{ px: { xs: 2, sm: 3, md: 4, lg: 3 } }}>
                {isMobile ? (
                    <Box sx={{ position: "relative" }}>
                        <IconButton
                            onClick={() => articlesSliderRef?.slickPrev()}
                            sx={{
                                position: "absolute",
                                left: -10,
                                top: "50%",
                                transform: "translateY(-50%)",
                                zIndex: 10,
                                bgcolor: "#fff",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                                "&:hover": { bgcolor: "#fff4f0" },
                            }}
                        >
                            <ArrowBackIosNewIcon />
                        </IconButton>
                        <Slider ref={(slider) => (articlesSliderRef = slider)} {...sliderSettings}>
                            {articleList?.map((item, i) => (
                                <Box key={i} sx={{ px: 1 }}>
                                    {(() => {
                                        const ArticleCard = (
                                            <Box
                                                sx={{
                                                    bgColor: "#fff",
                                                    borderRadius: { xs: "15px", md: "18px" },
                                                    textAlign: "left",
                                                    position: "relative",
                                                    cursor: "pointer",
                                                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                                                    boxShadow: "0 6px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05) inset",
                                                    overflow: "hidden",
                                                    "&::before": {
                                                        content: '""',
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        background: "linear-gradient(135deg, rgba(255,181,161,0.05) 0%, rgba(95,41,48,0.02) 100%)",
                                                        opacity: 0,
                                                        transition: "opacity 0.5s ease",
                                                        zIndex: 1,
                                                        pointerEvents: "none",
                                                    },
                                                    "&:hover": {
                                                        transform: "translateY(-12px) scale(1.03)",
                                                        boxShadow: "0 20px 50px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,181,161,0.3) inset",
                                                        "&::before": {
                                                            opacity: 1,
                                                        },
                                                        "& .article-image": {
                                                            transform: "scale(1.15)",
                                                            filter: "brightness(1.1)",
                                                        },
                                                        "& .article-title": {
                                                            color: "var(--themeColor)",
                                                            transform: "translateX(5px)",
                                                        },
                                                    },
                                                }}
                                            >
                                                <Box
                                                    className="article-image"
                                                    component="img"
                                                    src={item.image}
                                                    sx={{
                                                        width: "100%",
                                                        height: { xs: 200, sm: 220, md: 240 },
                                                        objectFit: "cover",
                                                        borderRadius: { xs: "15px 15px 0 0", md: "18px 18px 0 0" },
                                                        transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), filter 0.5s ease",
                                                        filter: "brightness(0.95)",
                                                    }}
                                                />
                                                <Box sx={{ p: { xs: 2, sm: 2.5, md: 2.5, lg: 2.5 }, position: "relative", zIndex: 2 }}>
                                                    <CustomText
                                                        sx={{
                                                            fontSize: { xs: 11, sm: 11.5, md: 12, lg: 12 },
                                                            fontWeight: 600,
                                                            color: "rgba(0,0,0,0.6)",
                                                            letterSpacing: 0.8,
                                                            textTransform: "uppercase",
                                                            mb: 1,
                                                        }}
                                                    >
                                                        {item.date}
                                                    </CustomText>
                                                    <CustomText
                                                        className="article-title"
                                                        sx={{
                                                            fontSize: { xs: 15, sm: 16, md: 16, lg: 17 },
                                                            fontWeight: 700,
                                                            lineHeight: 1.5,
                                                            color: "#333",
                                                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                                        }}
                                                    >
                                                        {item.title}
                                                    </CustomText>
                                                </Box>
                                            </Box>
                                        );
                                        return ArticleCard;
                                    })()}
                                </Box>
                            ))}
                        </Slider>
                        <IconButton
                            onClick={() => articlesSliderRef?.slickNext()}
                            sx={{
                                position: "absolute",
                                right: -10,
                                top: "50%",
                                transform: "translateY(-50%)",
                                zIndex: 10,
                                bgcolor: "#fff",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                                "&:hover": { bgcolor: "#fff4f0" },
                            }}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Box>
                ) : (
                    <Grid container spacing={{ xs: 2, sm: 2, md: 2.5, lg: 3 }}>
                        {articleList?.map((item, i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                            <Box
                                sx={{
                                    bgColor: "#fff",
                                    borderRadius: { xs: "15px", md: "18px" },
                                    textAlign: "left",
                                    position: "relative",
                                    cursor: "pointer",
                                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                                    boxShadow: "0 6px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05) inset",
                                    overflow: "hidden",
                                    animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`,
                                    "@keyframes fadeInUp": {
                                        "0%": {
                                            opacity: 0,
                                            transform: "translateY(30px)",
                                        },
                                        "100%": {
                                            opacity: 1,
                                            transform: "translateY(0)",
                                        },
                                    },
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: "linear-gradient(135deg, rgba(255,181,161,0.05) 0%, rgba(95,41,48,0.02) 100%)",
                                        opacity: 0,
                                        transition: "opacity 0.5s ease",
                                        zIndex: 1,
                                        pointerEvents: "none",
                                    },
                                    "&:hover": {
                                        transform: "translateY(-12px) scale(1.03)",
                                        boxShadow: "0 20px 50px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,181,161,0.3) inset",
                                        "&::before": {
                                            opacity: 1,
                                        },
                                        "& .article-image": {
                                            transform: "scale(1.15)",
                                            filter: "brightness(1.1)",
                                        },
                                        "& .article-title": {
                                            color: "var(--themeColor)",
                                            transform: "translateX(5px)",
                                        },
                                    },
                                }}
                            >
                                {/* Image */}
                                <Box
                                    className="article-image"
                                    component="img"
                                    src={item.image}
                                    loading="lazy"
                                    sx={{
                                        width: "100%",
                                        height: { xs: 200, sm: 220, md: 240 },
                                        objectFit: "cover",
                                        borderRadius: { xs: "15px 15px 0 0", md: "18px 18px 0 0" },
                                        transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), filter 0.5s ease",
                                        filter: "brightness(0.95)",
                                    }}
                                />

                                {/* Date */}
                                <Box sx={{ p: { xs: 2, sm: 2.5, md: 2.5, lg: 2.5 }, position: "relative", zIndex: 2 }}>
                                    <CustomText
                                        sx={{
                                            fontSize: { xs: 11, sm: 11.5, md: 12, lg: 12 },
                                            fontWeight: 600,
                                            color: "rgba(0,0,0,0.6)",
                                            letterSpacing: 0.8,
                                            textTransform: "uppercase",
                                            mb: 1,
                                        }}
                                    >
                                        {item.date}
                                    </CustomText>
                                    <CustomText
                                        className="article-title"
                                        sx={{
                                            fontSize: { xs: 15, sm: 16, md: 16, lg: 17 },
                                            fontWeight: 700,
                                            lineHeight: 1.5,
                                            color: "#333",
                                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                        }}
                                    >
                                        {item.title}
                                    </CustomText>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                )}
            </Container>
            <Box
                component="img"
                src={cardTopRightDots}
                alt="decor"
                sx={{
                    position: "absolute",
                    top: { xs: "15%", md: "19%" },
                    right: { xs: "5%", md: "22%" },
                    width: { xs: 40, md: 60 },
                    display: { xs: "none", sm: "block" },
                }}
            />

            <Box
                component="img"
                src={cardBottomLeftDots}
                alt="decor"
                sx={{
                    position: "absolute",
                    bottom: { xs: "20%", md: "27%" },
                    left: { xs: "5%", md: "22%" },
                    width: { xs: 40, md: 60 },
                    display: { xs: "none", sm: "block" },
                }}
            />

        </Box >
    );
};
