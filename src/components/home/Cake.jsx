import { Box, Typography, Button, useMediaQuery, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import offer1 from "../../assets/Group 8.png";
import offer2 from "../../assets/Group 8 (2).png";
import offer3 from "../../assets/Group 8 (1).png";
import { useState, useRef } from "react";
import Slider from "react-slick";

const categoryTabs = ["Category 1", "Category 2", "Category 3", "Category 4"];
const pastryTabs = ["Birthday Cake", "Anniversary Cake", "Danbro Special", "Others"];
const cookieTabs = ["Birthday Cookies", "Premium Cookies", "Danbro Special", "Others",];
const breadTabs = ["Fresh Bread", "Brown Bread", "Rusk / Toast", "Others"];
const comboTabs = ["Birthday Combos", "Premium Combos", "Chocolate Combos", "Others",];

const categoryData = [
    {
        title: "Cake 1",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        price: "450.90 ₹",
        img: offer1,
        category: "Category 1",
    },
    {
        title: "Cake 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: "450.90 ₹",
        img: offer2,
        category: "Category 2",
    },
    {
        title: "Cake 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: "450.90 ₹",
        img: offer3,
        category: "Category 3",
    },
];

const pastryData = [
    {
        title: "Pastry 1",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        price: "450.90 ₹",
        img: offer1,
        category: "Birthday Cake",
    },
    {
        title: "Pastry 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: "450.90 ₹",
        img: offer2,
        category: "Anniversary Cake",
    },
    {
        title: "Pastry 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: "450.90 ₹",
        img: offer3,
        category: "Danbro Special",
    },
];

const cookieData = [
    {
        title: "Cookie 1",
        description:
            "Crispy & fresh baked cookies with rich flavor for every celebration.",
        price: "150.00 ₹",
        img: offer1,
        category: "Birthday Cookies",
    },
    {
        title: "Cookie 2",
        description: "Delicious premium biscuits for everyday snacking.",
        price: "180.00 ₹",
        img: offer2,
        category: "Premium Cookies",
    },
    {
        title: "Cookie 3",
        description: "Special Danbro-style cookies with extra crunch.",
        price: "199.00 ₹",
        img: offer3,
        category: "Danbro Special",
    },
];

const breadData = [
    {
        title: "Fresh White Bread",
        description: "Soft & fluffy freshly baked white bread.",
        price: "50.00 ₹",
        img: offer1,
        category: "Fresh Bread",
    },
    {
        title: "Healthy Brown Bread",
        description: "Made with whole wheat, healthy choice.",
        price: "65.00 ₹",
        img: offer2,
        category: "Brown Bread",
    },
    {
        title: "Crunchy Rusk",
        description: "Perfect tea-time biscuits with crunch.",
        price: "80.00 ₹",
        img: offer3,
        category: "Rusk / Toast",
    },
];

const comboData = [
    {
        title: "Birthday Gift Combo",
        description: "Cake + Flowers + Chocolate combo for birthdays.",
        price: "899.00 ₹",
        img: offer1,
        category: "Birthday Combos",
    },
    {
        title: "Premium Celebration Combo",
        description: "Luxury gift hamper with sweets and goodies.",
        price: "1299.00 ₹",
        img: offer2,
        category: "Premium Combos",
    },
    {
        title: "Chocolate Lovers Combo",
        description: "Assorted premium chocolates for gifting.",
        price: "1099.00 ₹",
        img: offer3,
        category: "Chocolate Combos",
    },
];

export const CakeSection = () => {
    const isMobile = useMediaQuery("(max-width:899px)");
    const [activeCategoryTab, setActiveCategoryTab] = useState("Category 1");
    const [activePastryTab, setActivePastryTab] = useState("Birthday Cake");
    const [activeCookieTab, setActiveCookieTab] = useState("Birthday Cookies");
    const [activeBreadTab, setActiveBreadTab] = useState("Fresh Bread");
    const [activeComboTab, setActiveComboTab] = useState("Birthday Combos");
    
    let cakesSliderRef = useRef(null);
    let pastriesSliderRef = useRef(null);
    let cookiesSliderRef = useRef(null);
    let breadsSliderRef = useRef(null);
    let combosSliderRef = useRef(null);

    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
    };

    const filteredCategoryItems =
        activeCategoryTab === "Category 1"
            ? categoryData
            : categoryData.filter((item) => item.category === activeCategoryTab);

    const filteredPastries =
        activePastryTab === "Birthday Cake"
            ? pastryData
            : pastryData.filter((item) => item.category === activePastryTab);

    const filteredCookies =
        activeCookieTab === "Birthday Cookies"
            ? cookieData
            : cookieData.filter((item) => item.category === activeCookieTab);

    const filteredBreads =
        activeBreadTab === "Fresh Bread"
            ? breadData
            : breadData.filter((item) => item.category === activeBreadTab);

    const filteredCombos =
        activeComboTab === "Birthday Combos"
            ? comboData
            : comboData.filter((item) => item.category === activeComboTab);

    return (
        <Box sx={{ mb: 5 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    gap: { xs: 2, md: 4 },
                    alignItems: { xs: "flex-start", md: "center" },
                    mb: { xs: 3, md: 4 },
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: 28, sm: 32, md: 38 },
                        fontWeight: 800,
                        color: "var(--themeColor)",
                        position: "relative",
                        display: "inline-block",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: "-5px",
                            left: 0,
                            width: "50%",
                            height: "4px",
                            background: "linear-gradient(90deg, var(--themeColor) 0%, rgba(255,181,161,0.5) 100%)",
                            borderRadius: "2px",
                        },
                    }}
                >
                    Cakes
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "flex-start", md: "end" },
                        gap: { xs: 1, sm: 2, md: 4 },
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {categoryTabs?.map((tab) => (
                        <Button
                            key={tab}
                            onClick={() => setActiveCategoryTab(tab)}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: { xs: 11, sm: 12, md: 14 },
                                color:
                                    activeCategoryTab === tab
                                        ? "var(--themeColor)"
                                        : "rgba(0,0,0,0.7)",
                                border:
                                    activeCategoryTab === tab
                                        ? "2px solid var(--themeColor)"
                                        : "2px solid transparent",
                                backgroundColor:
                                    activeCategoryTab === tab ? "#fff4f0" : "transparent",
                                borderRadius: 20,
                                px: activeCategoryTab === tab ? { xs: 2, md: 3 } : 0,
                                py: activeCategoryTab === tab ? { xs: 0.4, md: 0.6 } : 0,
                                transition: "0.25s",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {tab}
                        </Button>
                    ))}
                </Box>
            </Box>

            {/* Cake Cards */}
            {isMobile ? (
                <Box sx={{ position: "relative" }}>
                    <IconButton
                        onClick={() => cakesSliderRef?.slickPrev()}
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
                    <Slider ref={(slider) => (cakesSliderRef = slider)} {...sliderSettings}>
                        {filteredCategoryItems?.map((offer, index) => (
                            <Box key={index} sx={{ px: 1 }}>
                                {(() => {
                                    const CakeCard = (
                                        <Box
                                            sx={{
                                                position: "relative",
                                                borderRadius: { xs: 2.5, md: 3 },
                                                overflow: "hidden",
                                                bgcolor: "#fff",
                                                boxShadow: "0 8px 25px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05) inset",
                                                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                                                cursor: "pointer",
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
                                                    "& .product-image": {
                                                        transform: "scale(1.18)",
                                                    },
                                                    "& .heart-icon": {
                                                        transform: "scale(1.3) rotate(15deg)",
                                                        bgcolor: "#fff",
                                                        boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                                                    },
                                                    "& .add-to-cart": {
                                                        backgroundColor: "var(--themeColor)",
                                                        color: "#fff",
                                                        transform: "scale(1.08) translateY(-2px)",
                                                        boxShadow: "0 8px 25px rgba(95,41,48,0.4)",
                                                    },
                                                },
                                            }}
                                        >
                                            <Box
                                                className="heart-icon"
                                                sx={{
                                                    position: "absolute",
                                                    right: { xs: 12, md: 18 },
                                                    top: { xs: 12, md: 18 },
                                                    zIndex: 10,
                                                    bgcolor: "rgba(255,255,255,0.95)",
                                                    borderRadius: "50%",
                                                    width: { xs: 38, md: 42 },
                                                    height: { xs: 38, md: 42 },
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    cursor: "pointer",
                                                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                                    backdropFilter: "blur(15px)",
                                                    boxShadow: "0 4px 15px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.3) inset",
                                                    "&:active": {
                                                        transform: "scale(0.95)",
                                                    },
                                                }}
                                            >
                                                <FavoriteBorderIcon
                                                    sx={{
                                                        fontSize: { xs: 22, md: 24 },
                                                        color: "var(--themeColor)",
                                                        transition: "all 0.3s ease",
                                                    }}
                                                />
                                            </Box>
                                            <Box
                                                className="product-image"
                                                component="img"
                                                src={offer?.img}
                                                alt={offer?.title}
                                                sx={{
                                                    width: "100%",
                                                    height: { xs: 240, md: 280 },
                                                    objectFit: "cover",
                                                    transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), filter 0.5s ease",
                                                    filter: "brightness(0.95)",
                                                }}
                                            />
                                            <Box sx={{ p: { xs: 2, md: 2.5 }, position: "relative", zIndex: 2 }}>
                                                <Typography 
                                                    sx={{ 
                                                        fontSize: { xs: 18, md: 22 }, 
                                                        fontWeight: 800, 
                                                        mb: 1,
                                                        color: "var(--themeColor)",
                                                        transition: "color 0.3s ease",
                                                    }}
                                                >
                                                    {offer?.title}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: { xs: 13, md: 14 },
                                                        color: "rgba(0,0,0,0.7)",
                                                        mb: 2.5,
                                                        lineHeight: 1.6,
                                                    }}
                                                >
                                                    {offer?.description}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                    }}
                                                >
                                                    <Typography 
                                                        sx={{ 
                                                            fontSize: { xs: 20, md: 22 }, 
                                                            fontWeight: 700,
                                                            color: "var(--themeColor)",
                                                        }}
                                                    >
                                                        {offer?.price}
                                                    </Typography>
                                                    <Box
                                                        className="add-to-cart"
                                                        sx={{
                                                            background: "linear-gradient(135deg, #fbc7b5 0%, #ffb5a1 100%)",
                                                            color: "var(--themeColor)",
                                                            px: { xs: 2.5, md: 3 },
                                                            py: { xs: 0.8, md: 1 },
                                                            borderRadius: { xs: 18, md: 22 },
                                                            cursor: "pointer",
                                                            fontWeight: 700,
                                                            fontSize: { xs: 13, md: 14 },
                                                            textAlign: "center",
                                                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                                            boxShadow: "0 4px 15px rgba(251,199,181,0.4)",
                                                            position: "relative",
                                                            overflow: "hidden",
                                                            "&::before": {
                                                                content: '""',
                                                                position: "absolute",
                                                                top: 0,
                                                                left: "-100%",
                                                                width: "100%",
                                                                height: "100%",
                                                                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                                                                transition: "left 0.5s ease",
                                                            },
                                                            "&:hover::before": {
                                                                left: "100%",
                                                            },
                                                            "&:active": {
                                                                transform: "scale(0.98)",
                                                            },
                                                        }}
                                                    >
                                                        Add to Cart
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    );
                                    return CakeCard;
                                })()}
                            </Box>
                        ))}
                    </Slider>
                    <IconButton
                        onClick={() => cakesSliderRef?.slickNext()}
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
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: { xs: 3, md: 4 }, }}>
                    {filteredCategoryItems?.map((offer, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "relative",
                            borderRadius: { xs: 2.5, md: 3 },
                            overflow: "hidden",
                            bgcolor: "#fff",
                            boxShadow: "0 8px 25px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05) inset",
                            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                            cursor: "pointer",
                            animation: `fadeInScale 0.6s ease-out ${index * 0.1}s both`,
                            "@keyframes fadeInScale": {
                                "0%": {
                                    opacity: 0,
                                    transform: "translateY(30px) scale(0.95)",
                                },
                                "100%": {
                                    opacity: 1,
                                    transform: "translateY(0) scale(1)",
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
                                "& .product-image": {
                                    transform: "scale(1.18)",
                                },
                                "& .heart-icon": {
                                    transform: "scale(1.3) rotate(15deg)",
                                    bgcolor: "#fff",
                                    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                                },
                                "& .add-to-cart": {
                                    backgroundColor: "var(--themeColor)",
                                    color: "#fff",
                                    transform: "scale(1.08) translateY(-2px)",
                                    boxShadow: "0 8px 25px rgba(95,41,48,0.4)",
                                },
                            },
                        }}
                    >
                        {/* Heart Icon */}
                        <Box
                            className="heart-icon"
                            sx={{
                                position: "absolute",
                                right: { xs: 12, md: 18 },
                                top: { xs: 12, md: 18 },
                                zIndex: 10,
                                bgcolor: "rgba(255,255,255,0.95)",
                                borderRadius: "50%",
                                width: { xs: 38, md: 42 },
                                height: { xs: 38, md: 42 },
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                backdropFilter: "blur(15px)",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.3) inset",
                                "&:active": {
                                    transform: "scale(0.95)",
                                },
                            }}
                        >
                            <FavoriteBorderIcon
                                sx={{
                                    fontSize: { xs: 22, md: 24 },
                                    color: "var(--themeColor)",
                                    transition: "all 0.3s ease",
                                }}
                            />
                        </Box>

                        {/* Image */}
                        <Box
                            className="product-image"
                            component="img"
                            src={offer?.img}
                            alt={offer?.title}
                            sx={{
                                width: "100%",
                                height: { xs: 240, md: 280 },
                                objectFit: "cover",
                                transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), filter 0.5s ease",
                                filter: "brightness(0.95)",
                            }}
                        />

                        {/* Content */}
                        <Box sx={{ p: { xs: 2, md: 2.5 }, position: "relative", zIndex: 2 }}>
                            <Typography 
                                sx={{ 
                                    fontSize: { xs: 18, md: 22 }, 
                                    fontWeight: 800, 
                                    mb: 1,
                                    color: "var(--themeColor)",
                                    transition: "color 0.3s ease",
                                }}
                            >
                                {offer?.title}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: { xs: 13, md: 14 },
                                    color: "rgba(0,0,0,0.7)",
                                    mb: 2.5,
                                    lineHeight: 1.6,
                                }}
                            >
                                {offer?.description}
                            </Typography>

                            {/* Price + Add to Cart */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography 
                                    sx={{ 
                                        fontSize: { xs: 20, md: 22 }, 
                                        fontWeight: 700,
                                        color: "var(--themeColor)",
                                    }}
                                >
                                    {offer?.price}
                                </Typography>

                                <Box
                                    className="add-to-cart"
                                    sx={{
                                        background: "linear-gradient(135deg, #fbc7b5 0%, #ffb5a1 100%)",
                                        color: "var(--themeColor)",
                                        px: { xs: 2.5, md: 3 },
                                        py: { xs: 0.8, md: 1 },
                                        borderRadius: { xs: 18, md: 22 },
                                        cursor: "pointer",
                                        fontWeight: 700,
                                        fontSize: { xs: 13, md: 14 },
                                        textAlign: "center",
                                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                        boxShadow: "0 4px 15px rgba(251,199,181,0.4)",
                                        position: "relative",
                                        overflow: "hidden",
                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            top: 0,
                                            left: "-100%",
                                            width: "100%",
                                            height: "100%",
                                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                                            transition: "left 0.5s ease",
                                        },
                                        "&:hover::before": {
                                            left: "100%",
                                        },
                                        "&:active": {
                                            transform: "scale(0.98)",
                                        },
                                    }}
                                >
                                    Add to Cart
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
            )}

            {/* Pastries Cards */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    gap: { xs: 2, md: 4 },
                    alignItems: { xs: "flex-start", md: "center" },
                    my: { xs: 3, md: 4 },
                }}
            >
                <Typography 
                    sx={{ 
                        fontSize: { xs: 28, sm: 32, md: 38 }, 
                        fontWeight: 800, 
                        color: "var(--themeColor)",
                        position: "relative",
                        display: "inline-block",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: "-5px",
                            left: 0,
                            width: "50%",
                            height: "4px",
                            background: "linear-gradient(90deg, var(--themeColor) 0%, rgba(255,181,161,0.5) 100%)",
                            borderRadius: "2px",
                        },
                    }}
                >
                    Pastries
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: { xs: 1, sm: 2, md: 4 },
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {pastryTabs?.map((tab) => (
                        <Button
                            key={tab}
                            onClick={() => setActivePastryTab(tab)}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: { xs: 11, sm: 12, md: 14 },
                                color:
                                    activePastryTab === tab
                                        ? "var(--themeColor)"
                                        : "rgba(0,0,0,0.7)",
                                border:
                                    activePastryTab === tab
                                        ? "2px solid var(--themeColor)"
                                        : "2px solid transparent",
                                backgroundColor:
                                    activePastryTab === tab ? "#fff4f0" : "transparent",
                                borderRadius: 20,
                                px: activePastryTab === tab ? { xs: 2, md: 3 } : 0,
                                py: activePastryTab === tab ? { xs: 0.4, md: 0.6 } : 0,
                                transition: "0.25s",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {tab}
                        </Button>
                    ))}
                </Box>
            </Box>
            {isMobile ? (
                <Box sx={{ position: "relative", mt: 4 }}>
                    <IconButton
                        onClick={() => pastriesSliderRef?.slickPrev()}
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
                    <Slider ref={(slider) => (pastriesSliderRef = slider)} {...sliderSettings}>
                        {filteredPastries?.map((item, index) => (
                            <Box key={index} sx={{ px: 1 }}>
                                {(() => {
                                    const PastryCard = (
                                        <Box
                                            sx={{
                                                position: "relative",
                                                borderRadius: 3,
                                                overflow: "hidden",
                                                bgcolor: "#fff",
                                                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                                                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                                cursor: "pointer",
                                                "&:hover": {
                                                    transform: "translateY(-10px) scale(1.02)",
                                                    boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
                                                    "& .product-image": {
                                                        transform: "scale(1.15)",
                                                    },
                                                    "& .heart-icon": {
                                                        transform: "scale(1.2) rotate(10deg)",
                                                        bgcolor: "#fff",
                                                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                                    },
                                                    "& .add-to-cart": {
                                                        backgroundColor: "var(--themeColor)",
                                                        color: "#fff",
                                                        transform: "scale(1.05)",
                                                    },
                                                },
                                            }}
                                        >
                                            <Box
                                                className="heart-icon"
                                                sx={{
                                                    position: "absolute",
                                                    right: 15,
                                                    top: 15,
                                                    zIndex: 10,
                                                    bgcolor: "rgba(255,255,255,0.9)",
                                                    borderRadius: "50%",
                                                    width: 36,
                                                    height: 36,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    cursor: "pointer",
                                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                                    backdropFilter: "blur(10px)",
                                                }}
                                            >
                                                <FavoriteBorderIcon
                                                    sx={{ fontSize: 22, color: "var(--themeColor)" }}
                                                />
                                            </Box>
                                            <Box
                                                className="product-image"
                                                component="img"
                                                src={item?.img}
                                                alt={item?.title}
                                                sx={{
                                                    width: "100%",
                                                    height: 260,
                                                    objectFit: "cover",
                                                    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                                                }}
                                            />
                                            <Box sx={{ p: 2 }}>
                                                <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 0.5 }}>
                                                    {item?.title}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: 14,
                                                        color: "gray",
                                                        mb: 2,
                                                        lineHeight: 1.4,
                                                    }}
                                                >
                                                    {item?.description}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                    }}
                                                >
                                                    <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                                                        {item?.price}
                                                    </Typography>
                                                    <Box
                                                        className="add-to-cart"
                                                        sx={{
                                                            backgroundColor: "#fbc7b5",
                                                            color: "var(--themeColor)",
                                                            px: 2.5,
                                                            py: 0.7,
                                                            borderRadius: 20,
                                                            cursor: "pointer",
                                                            fontWeight: 600,
                                                            fontSize: 14,
                                                            textAlign: "center",
                                                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                                            boxShadow: "0 2px 8px rgba(251,199,181,0.3)",
                                                        }}
                                                    >
                                                        Add to Cart
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    );
                                    return PastryCard;
                                })()}
                            </Box>
                        ))}
                    </Slider>
                    <IconButton
                        onClick={() => pastriesSliderRef?.slickNext()}
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
                <Box sx={{ mt: 4, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 4, }}>
                    {filteredPastries?.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "relative",
                            borderRadius: 3,
                            overflow: "hidden",
                            bgcolor: "#fff",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            cursor: "pointer",
                            "&:hover": {
                                transform: "translateY(-10px) scale(1.02)",
                                boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
                                "& .product-image": {
                                    transform: "scale(1.15)",
                                },
                                "& .heart-icon": {
                                    transform: "scale(1.2) rotate(10deg)",
                                    bgcolor: "#fff",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                },
                                "& .add-to-cart": {
                                    backgroundColor: "var(--themeColor)",
                                    color: "#fff",
                                    transform: "scale(1.05)",
                                },
                            },
                        }}
                    >
                        {/* Heart Icon */}
                        <Box
                            className="heart-icon"
                            sx={{
                                position: "absolute",
                                right: 15,
                                top: 15,
                                zIndex: 10,
                                bgcolor: "rgba(255,255,255,0.9)",
                                borderRadius: "50%",
                                width: 36,
                                height: 36,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <FavoriteBorderIcon
                                sx={{ fontSize: 22, color: "var(--themeColor)" }}
                            />
                        </Box>

                        {/* Image */}
                        <Box
                            className="product-image"
                            component="img"
                            src={item?.img}
                            alt={item?.title}
                            sx={{
                                width: "100%",
                                height: 260,
                                objectFit: "cover",
                                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        />

                        {/* Content */}
                        <Box sx={{ p: 2 }}>
                            <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 0.5 }}>
                                {item?.title}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 14,
                                    color: "gray",
                                    mb: 2,
                                    lineHeight: 1.4,
                                }}
                            >
                                {item?.description}
                            </Typography>

                            {/* Price + Add to Cart */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                                    {item?.price}
                                </Typography>

                                <Box
                                    className="add-to-cart"
                                    sx={{
                                        backgroundColor: "#fbc7b5",
                                        color: "var(--themeColor)",
                                        px: 2.5,
                                        py: 0.7,
                                        borderRadius: 20,
                                        cursor: "pointer",
                                        fontWeight: 600,
                                        fontSize: 14,
                                        textAlign: "center",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        boxShadow: "0 2px 8px rgba(251,199,181,0.3)",
                                    }}
                                >
                                    Add to Cart
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
            )}

            {/* Cookies Cards */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    gap: { xs: 2, md: 4 },
                    alignItems: { xs: "flex-start", md: "center" },
                    my: { xs: 3, md: 4 },
                }}
            >
                <Typography 
                    sx={{ 
                        fontSize: { xs: 28, sm: 32, md: 38 }, 
                        fontWeight: 800, 
                        color: "var(--themeColor)",
                        position: "relative",
                        display: "inline-block",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: "-5px",
                            left: 0,
                            width: "50%",
                            height: "4px",
                            background: "linear-gradient(90deg, var(--themeColor) 0%, rgba(255,181,161,0.5) 100%)",
                            borderRadius: "2px",
                        },
                    }}
                >
                    Cookies
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: { xs: 1, sm: 2, md: 4 },
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {cookieTabs?.map((tab) => (
                        <Button
                            key={tab}
                            onClick={() => setActiveCookieTab(tab)}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: { xs: 11, sm: 12, md: 14 },
                                color:
                                    activeCookieTab === tab
                                        ? "var(--themeColor)"
                                        : "rgba(0,0,0,0.7)",
                                border:
                                    activeCookieTab === tab
                                        ? "2px solid var(--themeColor)"
                                        : "2px solid transparent",
                                backgroundColor:
                                    activeCookieTab === tab ? "#fff4f0" : "transparent",
                                borderRadius: 20,
                                px: activeCookieTab === tab ? { xs: 2, md: 3 } : 0,
                                py: activeCookieTab === tab ? { xs: 0.4, md: 0.6 } : 0,
                                transition: "0.25s",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {tab}
                        </Button>
                    ))}
                </Box>
            </Box>
            {isMobile ? (
                <Box sx={{ position: "relative", mt: 4 }}>
                    <IconButton
                        onClick={() => cookiesSliderRef?.slickPrev()}
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
                    <Slider ref={(slider) => (cookiesSliderRef = slider)} {...sliderSettings}>
                        {filteredCookies?.map((item, index) => (
                            <Box key={index} sx={{ px: 1 }}>
                                {(() => {
                                    const CookieCard = (
                                        <Box
                                            sx={{
                                                position: "relative",
                                                borderRadius: 3,
                                                overflow: "hidden",
                                                bgcolor: "#fff",
                                                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                                                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                                cursor: "pointer",
                                                "&:hover": {
                                                    transform: "translateY(-10px) scale(1.02)",
                                                    boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
                                                    "& .product-image": {
                                                        transform: "scale(1.15)",
                                                    },
                                                    "& .heart-icon": {
                                                        transform: "scale(1.2) rotate(10deg)",
                                                        bgcolor: "#fff",
                                                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                                    },
                                                    "& .add-to-cart": {
                                                        backgroundColor: "var(--themeColor)",
                                                        color: "#fff",
                                                        transform: "scale(1.05)",
                                                    },
                                                },
                                            }}
                                        >
                                            <Box
                                                className="heart-icon"
                                                sx={{
                                                    position: "absolute",
                                                    right: 15,
                                                    top: 15,
                                                    zIndex: 10,
                                                    bgcolor: "rgba(255,255,255,0.9)",
                                                    borderRadius: "50%",
                                                    width: 36,
                                                    height: 36,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    cursor: "pointer",
                                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                                    backdropFilter: "blur(10px)",
                                                }}
                                            >
                                                <FavoriteBorderIcon sx={{ fontSize: 22, color: "var(--themeColor)" }} />
                                            </Box>
                                            <Box
                                                className="product-image"
                                                component="img"
                                                src={item?.img}
                                                alt={item?.title}
                                                sx={{
                                                    width: "100%",
                                                    height: 260,
                                                    objectFit: "cover",
                                                    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                                                }}
                                            />
                                            <Box sx={{ p: 2 }}>
                                                <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 0.5 }}>
                                                    {item?.title}
                                                </Typography>
                                                <Typography sx={{ fontSize: 14, color: "gray", mb: 2, lineHeight: 1.4, }}>
                                                    {item?.description}
                                                </Typography>
                                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                                    <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                                                        {item?.price}
                                                    </Typography>
                                                    <Box
                                                        className="add-to-cart"
                                                        sx={{
                                                            backgroundColor: "#fbc7b5",
                                                            color: "var(--themeColor)",
                                                            px: 2.5,
                                                            py: 0.7,
                                                            borderRadius: 20,
                                                            cursor: "pointer",
                                                            fontWeight: 600,
                                                            fontSize: 14,
                                                            textAlign: "center",
                                                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                                            boxShadow: "0 2px 8px rgba(251,199,181,0.3)",
                                                        }}
                                                    >
                                                        Add to Cart
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    );
                                    return CookieCard;
                                })()}
                            </Box>
                        ))}
                    </Slider>
                    <IconButton
                        onClick={() => cookiesSliderRef?.slickNext()}
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
                <Box sx={{ mt: 4, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 4, }}>
                    {filteredCookies?.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "relative",
                            borderRadius: 3,
                            overflow: "hidden",
                            bgcolor: "#fff",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            cursor: "pointer",
                            "&:hover": {
                                transform: "translateY(-10px) scale(1.02)",
                                boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
                                "& .product-image": {
                                    transform: "scale(1.15)",
                                },
                                "& .heart-icon": {
                                    transform: "scale(1.2) rotate(10deg)",
                                    bgcolor: "#fff",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                },
                                "& .add-to-cart": {
                                    backgroundColor: "var(--themeColor)",
                                    color: "#fff",
                                    transform: "scale(1.05)",
                                },
                            },
                        }}
                    >
                        <Box
                            className="heart-icon"
                            sx={{
                                position: "absolute",
                                right: 15,
                                top: 15,
                                zIndex: 10,
                                bgcolor: "rgba(255,255,255,0.9)",
                                borderRadius: "50%",
                                width: 36,
                                height: 36,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <FavoriteBorderIcon sx={{ fontSize: 22, color: "var(--themeColor)" }} />
                        </Box>
                        <Box
                            className="product-image"
                            component="img"
                            src={item?.img}
                            alt={item?.title}
                            sx={{
                                width: "100%",
                                height: 260,
                                objectFit: "cover",
                                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        />
                        <Box sx={{ p: 2 }}>
                            <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 0.5 }}>
                                {item?.title}
                            </Typography>

                            <Typography sx={{ fontSize: 14, color: "gray", mb: 2, lineHeight: 1.4, }}>
                                {item?.description}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                                    {item?.price}
                                </Typography>

                                <Box
                                    className="add-to-cart"
                                    sx={{
                                        backgroundColor: "#fbc7b5",
                                        color: "var(--themeColor)",
                                        px: 2.5,
                                        py: 0.7,
                                        borderRadius: 20,
                                        cursor: "pointer",
                                        fontWeight: 600,
                                        fontSize: 14,
                                        textAlign: "center",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        boxShadow: "0 2px 8px rgba(251,199,181,0.3)",
                                    }}
                                >
                                    Add to Cart
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
            )}

            {/* Breads Cards */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    gap: { xs: 2, md: 4 },
                    alignItems: { xs: "flex-start", md: "center" },
                    my: { xs: 3, md: 4 },
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: 28, sm: 32, md: 38 },
                        fontWeight: 800,
                        color: "var(--themeColor)",
                        position: "relative",
                        display: "inline-block",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: "-5px",
                            left: 0,
                            width: "50%",
                            height: "4px",
                            background: "linear-gradient(90deg, var(--themeColor) 0%, rgba(255,181,161,0.5) 100%)",
                            borderRadius: "2px",
                        },
                    }}
                >
                    Breads
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: { xs: 1, sm: 2, md: 4 },
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {breadTabs?.map((tab) => (
                        <Button
                            key={tab}
                            onClick={() => setActiveBreadTab(tab)}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: { xs: 11, sm: 12, md: 14 },
                                color:
                                    activeBreadTab === tab
                                        ? "var(--themeColor)"
                                        : "rgba(0,0,0,0.7)",
                                border:
                                    activeBreadTab === tab
                                        ? "2px solid var(--themeColor)"
                                        : "2px solid transparent",
                                backgroundColor:
                                    activeBreadTab === tab ? "#fff4f0" : "transparent",
                                borderRadius: 20,
                                px: activeBreadTab === tab ? { xs: 2, md: 3 } : 0,
                                py: activeBreadTab === tab ? { xs: 0.4, md: 0.6 } : 0,
                                transition: "0.25s",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {tab}
                        </Button>
                    ))}
                </Box>
            </Box>
            {isMobile ? (
                <Box sx={{ position: "relative", mt: 4 }}>
                    <IconButton
                        onClick={() => breadsSliderRef?.slickPrev()}
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
                    <Slider ref={(slider) => (breadsSliderRef = slider)} {...sliderSettings}>
                        {filteredBreads?.map((item, index) => (
                            <Box key={index} sx={{ px: 1 }}>
                                {(() => {
                                    const BreadCard = (
                                        <Box
                                            sx={{
                                                position: "relative",
                                                borderRadius: 3,
                                                overflow: "hidden",
                                                bgcolor: "#fff",
                                                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                                                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                                cursor: "pointer",
                                                "&:hover": {
                                                    transform: "translateY(-10px) scale(1.02)",
                                                    boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
                                                    "& .product-image": {
                                                        transform: "scale(1.15)",
                                                    },
                                                    "& .heart-icon": {
                                                        transform: "scale(1.2) rotate(10deg)",
                                                        bgcolor: "#fff",
                                                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                                    },
                                                    "& .add-to-cart": {
                                                        backgroundColor: "var(--themeColor)",
                                                        color: "#fff",
                                                        transform: "scale(1.05)",
                                                    },
                                                },
                                            }}
                                        >
                                            <Box
                                                className="heart-icon"
                                                sx={{
                                                    position: "absolute",
                                                    right: 15,
                                                    top: 15,
                                                    zIndex: 10,
                                                    bgcolor: "rgba(255,255,255,0.9)",
                                                    borderRadius: "50%",
                                                    width: 36,
                                                    height: 36,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    cursor: "pointer",
                                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                                    backdropFilter: "blur(10px)",
                                                }}
                                            >
                                                <FavoriteBorderIcon sx={{ fontSize: 22, color: "var(--themeColor)" }} />
                                            </Box>
                                            <Box
                                                className="product-image"
                                                component="img"
                                                src={item?.img}
                                                alt={item?.title}
                                                sx={{
                                                    width: "100%",
                                                    height: 260,
                                                    objectFit: "cover",
                                                    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                                                }}
                                            />
                                            <Box sx={{ p: 2 }}>
                                                <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 0.5 }}>
                                                    {item?.title}
                                                </Typography>
                                                <Typography sx={{ fontSize: 14, color: "gray", mb: 2, lineHeight: 1.4, }}>
                                                    {item?.description}
                                                </Typography>
                                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                                    <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                                                        {item?.price}
                                                    </Typography>
                                                    <Box
                                                        className="add-to-cart"
                                                        sx={{
                                                            backgroundColor: "#fbc7b5",
                                                            color: "var(--themeColor)",
                                                            px: 2.5,
                                                            py: 0.7,
                                                            borderRadius: 20,
                                                            cursor: "pointer",
                                                            fontWeight: 600,
                                                            fontSize: 14,
                                                            textAlign: "center",
                                                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                                            boxShadow: "0 2px 8px rgba(251,199,181,0.3)",
                                                        }}
                                                    >
                                                        Add to Cart
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    );
                                    return BreadCard;
                                })()}
                            </Box>
                        ))}
                    </Slider>
                    <IconButton
                        onClick={() => breadsSliderRef?.slickNext()}
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
                <Box sx={{ mt: 4, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 4, }}>
                    {filteredBreads?.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "relative",
                            borderRadius: 3,
                            overflow: "hidden",
                            bgcolor: "#fff",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            cursor: "pointer",
                            "&:hover": {
                                transform: "translateY(-10px) scale(1.02)",
                                boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
                                "& .product-image": {
                                    transform: "scale(1.15)",
                                },
                                "& .heart-icon": {
                                    transform: "scale(1.2) rotate(10deg)",
                                    bgcolor: "#fff",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                },
                                "& .add-to-cart": {
                                    backgroundColor: "var(--themeColor)",
                                    color: "#fff",
                                    transform: "scale(1.05)",
                                },
                            },
                        }}
                    >
                        <Box
                            className="heart-icon"
                            sx={{
                                position: "absolute",
                                right: 15,
                                top: 15,
                                zIndex: 10,
                                bgcolor: "rgba(255,255,255,0.9)",
                                borderRadius: "50%",
                                width: 36,
                                height: 36,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <FavoriteBorderIcon sx={{ fontSize: 22, color: "var(--themeColor)" }} />
                        </Box>
                        <Box
                            className="product-image"
                            component="img"
                            src={item?.img}
                            alt={item?.title}
                            sx={{
                                width: "100%",
                                height: 260,
                                objectFit: "cover",
                                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        />
                        <Box sx={{ p: 2 }}>
                            <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 0.5 }}>
                                {item?.title}
                            </Typography>

                            <Typography sx={{ fontSize: 14, color: "gray", mb: 2, lineHeight: 1.4, }}>
                                {item?.description}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                                    {item?.price}
                                </Typography>

                                <Box
                                    className="add-to-cart"
                                    sx={{
                                        backgroundColor: "#fbc7b5",
                                        color: "var(--themeColor)",
                                        px: 2.5,
                                        py: 0.7,
                                        borderRadius: 20,
                                        cursor: "pointer",
                                        fontWeight: 600,
                                        fontSize: 14,
                                        textAlign: "center",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        boxShadow: "0 2px 8px rgba(251,199,181,0.3)",
                                    }}
                                >
                                    Add to Cart
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
            )}

            {/* Gift Combos Cards */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    gap: { xs: 2, md: 4 },
                    alignItems: { xs: "flex-start", md: "center" },
                    my: { xs: 3, md: 4 },
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: 28, sm: 32, md: 38 },
                        fontWeight: 800,
                        color: "var(--themeColor)",
                        position: "relative",
                        display: "inline-block",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: "-5px",
                            left: 0,
                            width: "50%",
                            height: "4px",
                            background: "linear-gradient(90deg, var(--themeColor) 0%, rgba(255,181,161,0.5) 100%)",
                            borderRadius: "2px",
                        },
                    }}
                >
                    Gift Combos
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: { xs: 1, sm: 2, md: 4 },
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {comboTabs?.map((tab) => (
                        <Button
                            key={tab}
                            onClick={() => setActiveComboTab(tab)}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: { xs: 11, sm: 12, md: 14 },
                                color:
                                    activeComboTab === tab
                                        ? "var(--themeColor)"
                                        : "rgba(0,0,0,0.7)",
                                border:
                                    activeComboTab === tab
                                        ? "2px solid var(--themeColor)"
                                        : "2px solid transparent",
                                backgroundColor:
                                    activeComboTab === tab ? "#fff4f0" : "transparent",
                                borderRadius: 20,
                                px: activeComboTab === tab ? { xs: 2, md: 3 } : 0,
                                py: activeComboTab === tab ? { xs: 0.4, md: 0.6 } : 0,
                                transition: "0.25s",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {tab}
                        </Button>
                    ))}
                </Box>
            </Box>
            {isMobile ? (
                <Box sx={{ position: "relative", mt: 4 }}>
                    <IconButton
                        onClick={() => combosSliderRef?.slickPrev()}
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
                    <Slider ref={(slider) => (combosSliderRef = slider)} {...sliderSettings}>
                        {filteredCombos?.map((item, index) => (
                            <Box key={index} sx={{ px: 1 }}>
                                {(() => {
                                    const ComboCard = (
                                        <Box
                                            sx={{
                                                position: "relative",
                                                borderRadius: 3,
                                                overflow: "hidden",
                                                bgcolor: "#fff",
                                                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                                                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                                cursor: "pointer",
                                                "&:hover": {
                                                    transform: "translateY(-10px) scale(1.02)",
                                                    boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
                                                    "& .product-image": {
                                                        transform: "scale(1.15)",
                                                    },
                                                    "& .heart-icon": {
                                                        transform: "scale(1.2) rotate(10deg)",
                                                        bgcolor: "#fff",
                                                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                                    },
                                                    "& .add-to-cart": {
                                                        backgroundColor: "var(--themeColor)",
                                                        color: "#fff",
                                                        transform: "scale(1.05)",
                                                    },
                                                },
                                            }}
                                        >
                                            <Box
                                                className="heart-icon"
                                                sx={{
                                                    position: "absolute",
                                                    right: 15,
                                                    top: 15,
                                                    zIndex: 10,
                                                    bgcolor: "rgba(255,255,255,0.9)",
                                                    borderRadius: "50%",
                                                    width: 36,
                                                    height: 36,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    cursor: "pointer",
                                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                                    backdropFilter: "blur(10px)",
                                                }}
                                            >
                                                <FavoriteBorderIcon sx={{ fontSize: 22, color: "var(--themeColor)" }} />
                                            </Box>
                                            <Box
                                                className="product-image"
                                                component="img"
                                                src={item?.img}
                                                alt={item?.title}
                                                sx={{
                                                    width: "100%",
                                                    height: 260,
                                                    objectFit: "cover",
                                                    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                                                }}
                                            />
                                            <Box sx={{ p: 2 }}>
                                                <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 0.5 }}>
                                                    {item?.title}
                                                </Typography>
                                                <Typography sx={{ fontSize: 14, color: "gray", mb: 2, lineHeight: 1.4, }}>
                                                    {item?.description}
                                                </Typography>
                                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                                    <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                                                        {item?.price}
                                                    </Typography>
                                                    <Box
                                                        className="add-to-cart"
                                                        sx={{
                                                            backgroundColor: "#fbc7b5",
                                                            color: "var(--themeColor)",
                                                            px: 2.5,
                                                            py: 0.7,
                                                            borderRadius: 20,
                                                            cursor: "pointer",
                                                            fontWeight: 600,
                                                            fontSize: 14,
                                                            textAlign: "center",
                                                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                                            boxShadow: "0 2px 8px rgba(251,199,181,0.3)",
                                                        }}
                                                    >
                                                        Add to Cart
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    );
                                    return ComboCard;
                                })()}
                            </Box>
                        ))}
                    </Slider>
                    <IconButton
                        onClick={() => combosSliderRef?.slickNext()}
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
                <Box sx={{ mt: 4, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 4, }}>
                    {filteredCombos?.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "relative",
                            borderRadius: 3,
                            overflow: "hidden",
                            bgcolor: "#fff",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            cursor: "pointer",
                            "&:hover": {
                                transform: "translateY(-10px) scale(1.02)",
                                boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
                                "& .product-image": {
                                    transform: "scale(1.15)",
                                },
                                "& .heart-icon": {
                                    transform: "scale(1.2) rotate(10deg)",
                                    bgcolor: "#fff",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                },
                                "& .add-to-cart": {
                                    backgroundColor: "var(--themeColor)",
                                    color: "#fff",
                                    transform: "scale(1.05)",
                                },
                            },
                        }}
                    >
                        <Box
                            className="heart-icon"
                            sx={{
                                position: "absolute",
                                right: 15,
                                top: 15,
                                zIndex: 10,
                                bgcolor: "rgba(255,255,255,0.9)",
                                borderRadius: "50%",
                                width: 36,
                                height: 36,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <FavoriteBorderIcon sx={{ fontSize: 22, color: "var(--themeColor)" }} />
                        </Box>
                        <Box
                            className="product-image"
                            component="img"
                            src={item?.img}
                            alt={item?.title}
                            sx={{
                                width: "100%",
                                height: 260,
                                objectFit: "cover",
                                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        />
                        <Box sx={{ p: 2 }}>
                            <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 0.5 }}>
                                {item?.title}
                            </Typography>
                            <Typography sx={{ fontSize: 14, color: "gray", mb: 2, lineHeight: 1.4, }}>
                                {item?.description}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                                    {item?.price}
                                </Typography>

                                <Box
                                    className="add-to-cart"
                                    sx={{
                                        backgroundColor: "#fbc7b5",
                                        color: "var(--themeColor)",
                                        px: 2.5,
                                        py: 0.7,
                                        borderRadius: 20,
                                        cursor: "pointer",
                                        fontWeight: 600,
                                        fontSize: 14,
                                        textAlign: "center",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        boxShadow: "0 2px 8px rgba(251,199,181,0.3)",
                                    }}
                                >
                                    Add to Cart
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
            )}
        </Box>
    );
};
