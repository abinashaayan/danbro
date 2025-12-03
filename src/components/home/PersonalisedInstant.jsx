import { Box, Typography, Button } from "@mui/material";
import logo from "../../assets/logo.png";
import mens from "../../assets/bbd53846cb92a734a26973d3c7cd83699addf233.png"

export const PersonalisedInstant = () => {
    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "#f7f7f7",
                borderRadius: "0 0 30px 30px",
                overflow: "hidden",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
            }}
        >
            <Box sx={{ width: { xs: "100%", md: "50%" }, }}>
                <img
                    src={mens}
                    alt="App Banner"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </Box>
            <Box
                sx={{
                    width: { xs: "100%", md: "50%" },
                    px: { xs: 2, md: 6 },
                    py: { xs: 4, md: 6 },
                    textAlign: { xs: "center", md: "left" },
                }}
            >
                <img src={logo} alt="logo" style={{ height: 100 }} />

                <Typography sx={{ mt: 3, fontSize: 36, fontWeight: 800, }}>
                    <Box component="span" sx={{ backgroundColor: "#0f1b40", color: "#fff", borderRadius: "40px", px: 2, py: "6px", }}>
                        <strong style={{ color: "#FFB5A1" }} className="fw-bold text-decoration-underline">Personalised</strong> & Instant
                    </Box>
                </Typography>

                <Typography sx={{ mt: 2, fontSize: 18, color: "#444" }}>
                    Download the DANBRO app for faster ordering
                </Typography>

                {/* Store Buttons */}
                <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            bgcolor: "#000",
                            color: "#fff",
                            px: 2.5,
                            py: 1,
                            borderRadius: "10px",
                            cursor: "pointer",
                            width: 160,
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
                            gap: 1,
                            bgcolor: "#000",
                            color: "#fff",
                            px: 2.5,
                            py: 1,
                            borderRadius: "10px",
                            cursor: "pointer",
                            width: 180,
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
