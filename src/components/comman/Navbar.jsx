import { Box, Typography } from "@mui/material";

const categoryItems = [
    "CAKES & DRY CAKES",
    "MITHAI & COOKIES",
    "BREAD & RUSK",
    "GIFT HAMPERS & CHOCOLATES",
    "ADDONS",
];

export const Navbar = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: 4,
                py: 1,
                flexWrap: "wrap",
                backgroundColor: "#fbc7b5",
            }}
        >
            {categoryItems.map((item) => (
                <Typography
                    key={item}
                    sx={{
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: "pointer",
                        color: item === "ADDONS" ? "#fff" : "var(--themeColor)",
                        ...(item === "ADDONS" && {
                            backgroundColor: "#00b53d",
                            borderRadius: 2,
                            px: 2,
                            py: 0.3,
                        }),
                    }}
                >
                    {item}
                </Typography>
            ))}
        </Box>
    );
};

