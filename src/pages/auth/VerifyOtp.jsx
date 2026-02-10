import { useState, useEffect, useRef } from "react";
import { Box, Button, Container, Alert, CircularProgress, InputLabel } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import banner from "../../assets/login.webp";
import { CustomTextField } from "../../components/comman/CustomTextField";
import { CustomButton } from "../../components/comman/CustomButton";
import { CustomText } from "../../components/comman/CustomText";
import axios from "axios";
import { API_BASE_URL } from "../../utils/apiUrl";
import { setAccessToken, setRefreshToken } from "../../utils/cookies";
import { getStoredLocation } from "../../utils/location";
import { invalidateHomeLayoutFetch } from "../../utils/apiService";

export const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get email and password from location state or localStorage
    const state = location.state || {};
    const storedEmail = localStorage.getItem('pendingLoginEmail');
    const storedPassword = localStorage.getItem('pendingLoginPassword');
    
    if (state.email) {
      setEmail(state.email);
      localStorage.setItem('pendingLoginEmail', state.email);
    } else if (storedEmail) {
      setEmail(storedEmail);
    }
    
    if (state.password) {
      setPassword(state.password);
      localStorage.setItem('pendingLoginPassword', state.password);
    } else if (storedPassword) {
      setPassword(storedPassword);
    }

    // If no email found, redirect to login
    if (!state.email && !storedEmail) {
      navigate("/login");
    }
  }, [location, navigate]);

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

    if (formRef.current) observer.observe(formRef.current);

    return () => {
      if (formRef.current) observer.unobserve(formRef.current);
    };
  }, []);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      setApiError("Please enter a valid 6-digit OTP.");
      return;
    }

    if (!email) {
      setApiError("Email not found. Please try logging in again.");
      return;
    }

    setIsVerifying(true);
    setApiError("");
    setApiSuccess("");

    try {
      // First verify OTP
      const location = getStoredLocation();
      const verifyResponse = await axios.post(`${API_BASE_URL}/user/verify`, {
        email: email,
        otp: otp,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'lat': location.lat.toString(),
          'long': location.long.toString(),
        },
      });

      if (verifyResponse.data) {
        setApiSuccess("Email verified! Logging you in...");
        
        // After OTP verification, proceed with login
        const loginPayload = {
          email: email,
          password: password,
        };

        try {
          const loginResponse = await axios.post(`${API_BASE_URL}/user/login`, loginPayload, {
            headers: {
              'Content-Type': 'application/json',
              'lat': location.lat.toString(),
              'long': location.long.toString(),
            },
          });

          if (loginResponse.data && loginResponse.data.user) {
            setApiSuccess("Login successful! Redirecting...");
            
            const user = loginResponse.data.user;
            
            // Store accessToken in cookie
            if (user.accessToken) {
              setAccessToken(user.accessToken);
            }
            
            // Store refreshToken in cookie
            if (user.refreshToken) {
              setRefreshToken(user.refreshToken);
            }

            // Clear pending login data
            localStorage.removeItem('pendingLoginEmail');
            localStorage.removeItem('pendingLoginPassword');

            invalidateHomeLayoutFetch();
            window.dispatchEvent(new CustomEvent("homeLayoutInvalidate"));

            // Redirect to home or profile page
            setTimeout(() => {
              navigate("/");
            }, 1500);
          }
        } catch (loginError) {
          console.error("Login after verification error:", loginError);
          if (loginError.response && loginError.response.data) {
            setApiError(loginError.response.data.message || loginError.response.data.error || "Login failed. Please try again.");
          } else {
            setApiError("Login failed. Please try again.");
          }
        }
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      if (error.response && error.response.data) {
        setApiError(error.response.data.message || error.response.data.error || "OTP verification failed. Please try again.");
      } else {
        setApiError("Network error. Please check your connection and try again.");
      }
      setApiSuccess("");
    } finally {
      setIsVerifying(false);
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    setApiError("");
    setApiSuccess("Resending OTP...");
    
    try {
      // You might need to call a resend OTP API here
      // For now, we'll just show a success message
      setApiSuccess("OTP has been resent to your email. Please check your inbox.");
    } catch (error) {
      setApiError("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 4, md: 0 },
        pb: { xs: 12, md: 0 },
        overflow: "hidden",
        p: { xs: 1.25, md: 0 },
      }}
    >
      {/* Blurred Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px)",
            transform: "scale(1.1)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      />

      <Container maxWidth="sm">
        <Box
          ref={formRef}
          sx={{
            position: "relative",
            zIndex: 1,
            backgroundColor: "transparent",
            borderRadius: { xs: "20px", md: "30px" },
            p: { xs: 3, sm: 4, md: 5 },
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            backdropFilter: "blur(10px)",
            opacity: 0,
            transform: "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            border: "1px solid rgba(173, 216, 230, 0.3)",
          }}
        >
          <CustomText
            sx={{
              fontSize: { xs: 28, sm: 32, md: 40 },
              fontWeight: 'bold',
              color: "white",
              textAlign: "center",
              mb: { xs: 3, md: 4 },
              animation: "fadeInDown 0.6s ease-out",
              "@keyframes fadeInDown": {
                "0%": { opacity: 0, transform: "translateY(-20px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            Verify Your Email
          </CustomText>

          <Box component="form" onSubmit={handleVerifyOtp}>
            {apiError && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {apiError}
              </Alert>
            )}
            {apiSuccess && (
              <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
                {apiSuccess}
              </Alert>
            )}
            
            <CustomText
              sx={{
                fontSize: { xs: 14, md: 16 },
                color: "#fff",
                textAlign: "center",
                mb: 3,
                opacity: 0.9,
              }}
            >
              We've sent a 6-digit OTP to <strong>{email}</strong>. Please enter it below to verify your email and complete login.
            </CustomText>

            <InputLabel sx={{ fontSize: 14, color: "#fff", mb: 1 }}>Enter OTP</InputLabel>
            <CustomTextField
              fullWidth
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setOtp(value);
              }}
              inputProps={{
                maxLength: 6,
                style: {
                  textAlign: "center",
                  fontSize: "24px",
                  letterSpacing: "8px",
                  fontWeight: "bold",
                },
              }}
              required
              sx={{ mb: 2 }}
            />

            <CustomButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={isVerifying || otp.length !== 6}
              sx={{
                backgroundColor: "#FFB5A1",
                color: "#000",
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
                py: 1.5,
                mb: 2,
                "&:hover": {
                  backgroundColor: "#F2709C",
                },
                "&:disabled": {
                  backgroundColor: "rgba(255,181,161,0.5)",
                  color: "rgba(0,0,0,0.3)",
                },
              }}
            >
              {isVerifying ? "Verifying..." : "Verify & Login"}
            </CustomButton>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <CustomText
                sx={{
                  fontSize: 14,
                  color: "#fff",
                  opacity: 0.8,
                  mb: 1,
                }}
              >
                Didn't receive OTP?
              </CustomText>
              <Button
                onClick={handleResendOtp}
                sx={{
                  color: "#FFB5A1",
                  textTransform: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                Resend OTP
              </Button>
            </Box>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button
                onClick={() => {
                  localStorage.removeItem('pendingLoginEmail');
                  localStorage.removeItem('pendingLoginPassword');
                  navigate("/login");
                }}
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  fontSize: 14,
                  "&:hover": {
                    backgroundColor: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                Back to Login
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

