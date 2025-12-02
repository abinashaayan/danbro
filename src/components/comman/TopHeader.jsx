import { Box, Button, IconButton } from "@mui/material";
import { NearMe } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import logo from "../../assets/logo.png"


export const TopHeader = () => {
    return (
        <Box
            sx={{
                // borderBottom: "1px solid var(--themeColor)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: { xs: 1, md: 3 },
                backgroundColor: "#fff",
            }}
        >
            <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<NearMe />}
                    sx={{
                        textTransform: "none",
                        borderRadius: 5,
                        borderColor: "var(--themeColor)",
                        color: "var(--themeColor)",
                        fontWeight: 600,
                        "&:hover": {
                            borderColor: "var(--themeColor)",
                            backgroundColor: "#fbeeee",
                        },
                    }}
                >
                    Location
                </Button>

                <Button
                    variant="outlined"
                    size="small"
                    sx={{
                        textTransform: "none",
                        borderRadius: 5,
                        borderColor: "var(--themeColor)",
                        color: "var(--themeColor)",
                        fontWeight: 600,
                        "&:hover": {
                            borderColor: "var(--themeColor)",
                            backgroundColor: "#fbeeee",
                        },
                    }}
                >
                    Business +
                </Button>

                <Button
                    variant="outlined"
                    size="small"
                    sx={{
                        textTransform: "none",
                        borderRadius: 5,
                        borderColor: "var(--themeColor)",
                        color: "var(--themeColor)",
                        fontWeight: 600,
                        "&:hover": {
                            borderColor: "var(--themeColor)",
                            backgroundColor: "#fbeeee",
                        },
                    }}
                >
                    Track Order
                </Button>
            </Box>
            <Box sx={{ py: 1, bgcolor: "#fff", display: "flex", justifyContent: "center" }}>
                <img src={logo} alt="logo" style={{ height: 40 }} />
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton sx={{ color: "var(--themeColor)" }}>
                    <SearchIcon />
                </IconButton>
                <IconButton sx={{ color: "var(--themeColor)" }}>
                    <PersonOutlineIcon />
                </IconButton>
                <IconButton sx={{ color: "var(--themeColor)" }}>
                    <ShoppingBagOutlinedIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

