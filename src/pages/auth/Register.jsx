import { useState, useEffect, useRef } from "react";
import { Box,  Button, Checkbox, FormControlLabel, Link, Container, Alert, CircularProgress, InputLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/login.png";
import { CustomTextField } from "../../components/comman/CustomTextField";
import { CustomButton } from "../../components/comman/CustomButton";
import { CustomText } from "../../components/comman/CustomText";
import axios from "axios";
import { API_BASE_URL } from "../../utils/apiUrl";
import { setAccessToken, setRefreshToken, getAccessToken } from "../../utils/cookies";
import { getStoredLocation } from "../../utils/location";

const RECAPTCHA_SITE_KEY = "6Lfr-iAsAAAAAIQsR8mfUxZO1qK3r_AXrTSLSb4g";

// Check if we're in development mode (localhost)
// Set to false if you want to test reCAPTCHA even on localhost
const FORCE_RECAPTCHA = false; // Set to true to force reCAPTCHA even in dev

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [recaptchaError, setRecaptchaError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    agreeTerms: true,
    newsletter: true,
  });
  const formRef = useRef(null);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      navigate("/");
    }
  }, [navigate]);

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

  // Check if reCAPTCHA is loaded
  useEffect(() => {
    const checkRecaptcha = () => {
      if (window.grecaptcha && window.grecaptcha.enterprise) {
        console.log("reCAPTCHA Enterprise is loaded");
      } else {
        console.warn("reCAPTCHA Enterprise is not loaded yet");
      }
    };

    // Check immediately
    checkRecaptcha();

    // Also check after a short delay in case script is still loading
    const timeout = setTimeout(checkRecaptcha, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);
    setRecaptchaError("");

    try {
      // Prepare signup payload
      const signupPayload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.mobile,
        password: formData.password,
      };

      // Call signup API
      try {
        const location = getStoredLocation();
        const response = await axios.post(`${API_BASE_URL}/user/signup`, signupPayload, {
          headers: {
            'Content-Type': 'application/json',
            'lat': location.lat.toString(),
            'long': location.long.toString(),
          },
        });

        if (response.data) {
          setApiSuccess("Registration successful! Please verify your email with OTP.");
          setApiError("");
          
          // Subscribe to newsletter if checked
          if (formData.newsletter) {
            try {
              const location = getStoredLocation();
              await axios.post(`${API_BASE_URL}/newsletter/subscribe`, {
                email: formData.email,
              }, {
                headers: {
                  'Content-Type': 'application/json',
                  'lat': location.lat.toString(),
                  'long': location.long.toString(),
                },
              });
            } catch (error) {
              // Newsletter subscription is optional, don't block registration if it fails
              console.error("Newsletter subscription error:", error);
            }
          }
          
          // Store registered email for OTP verification
          setRegisteredEmail(formData.email);
          
          // Show OTP verification step
          setShowOtpVerification(true);
        }
      } catch (error) {
        console.error("Signup error:", error);
        if (error.response && error.response.data) {
          setApiError(error.response.data.message || error.response.data.error || "Registration failed. Please try again.");
        } else {
          setApiError("Network error. Please check your connection and try again.");
        }
        setApiSuccess("");
      } finally {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setRecaptchaError("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Handle OTP Verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      setApiError("Please enter a valid 6-digit OTP.");
      return;
    }

    setIsVerifying(true);
    setApiError("");
    setApiSuccess("");

    try {
      const location = getStoredLocation();
      const response = await axios.post(`${API_BASE_URL}/user/verify`, {
        email: registeredEmail,
        otp: otp,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'lat': location.lat.toString(),
          'long': location.long.toString(),
        },
      });

      if (response.data) {
        setApiSuccess("Email verified successfully! Redirecting to login...");
        setApiError("");
        
        // After OTP verification, redirect to login
        // Login will handle token storage

        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
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

  // Resend OTP handler (if needed)
  const handleResendOtp = async () => {
    setApiError("");
    setApiSuccess("Resending OTP...");
    
    try {
      // You might need to call a resend OTP API here
      // For now, we'll just show a message
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
            transform: "scale(1.1)",
          },
        }}
      />

      {/* Register Form */}
      <Container maxWidth="sm" sx={{ mb: { xs: 6, md: 8 } }}>
        <Box
          ref={formRef}
          sx={{
            position: "relative",
            zIndex: 1,
            backgroundColor: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(25px) saturate(180%)",
            borderRadius: { xs: "20px", md: "30px" },
            p: { xs: 2, sm: 3, md: 4 },
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            opacity: 0,
            transform: "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            border: "1px solid rgba(173, 216, 230, 0.3)",
            my: 4,
          }}
        >
          <CustomText
            sx={{
              fontSize: { xs: 28, sm: 32, md: 40 },
              fontWeight: 'bold',
              color: "#fff",
              textAlign: "center",
              mb: { xs: 1, md: 2 },
              animation: "fadeInDown 0.6s ease-out",
              "@keyframes fadeInDown": {
                "0%": { opacity: 0, transform: "translateY(-20px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            {showOtpVerification ? "Verify Your Email" : "Create Account"}
          </CustomText>

          {showOtpVerification ? (
            // OTP Verification Form
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
                We've sent a 6-digit OTP to <strong>{registeredEmail}</strong>. Please enter it below to verify your email.
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
                {isVerifying ? "Verifying..." : "Verify OTP"}
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
                    setShowOtpVerification(false);
                    setOtp("");
                    setApiError("");
                    setApiSuccess("");
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
                  Back to Registration
                </Button>
              </Box>
            </Box>
          ) : (
            // Registration Form
            <Box component="form" onSubmit={handleSubmit}>
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
            {recaptchaError && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {recaptchaError}
              </Alert>
            )}
            <InputLabel sx={{ fontSize: 14, color: "#fff", mb: 1 }}>Full Name</InputLabel>
            <CustomTextField
              fullWidth
              name="fullName"
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={handleChange}
            />

            {/* Email Field */}
            <InputLabel sx={{ fontSize: 14, color: "#fff", mb: 1 }}>Email Address</InputLabel>
            <CustomTextField
              fullWidth
              name="email"
              placeholder="Email Address"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />

            {/* Mobile Field */}
            <InputLabel sx={{ fontSize: 14, color: "#fff", mb: 1 }}>Mobile Number</InputLabel>
            <CustomTextField
              fullWidth
              name="mobile"
              placeholder="Mobile Number"
              type="tel"
              required
              value={formData.mobile}
              onChange={handleChange}
            />

            {/* Password Field */}
            <InputLabel sx={{ fontSize: 14, color: "#fff", mb: 1 }}>Password</InputLabel>
            <Box sx={{ position: "relative", mb: 2 }}>
              <CustomTextField
                fullWidth
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                sx={{ mb: 0 }}
              />
              <Button
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  minWidth: "auto",
                  color: "#666",
                  textTransform: "none",
                  fontSize: 12,
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "var(--themeColor)",
                  },
                }}
              >
                {showPassword ? (
                  <>
                    <VisibilityOff sx={{ fontSize: 18, mr: 0.5 }} />
                  </>
                ) : (
                  <>
                    <Visibility sx={{ fontSize: 18, mr: 0.5 }} />
                  </>
                )}
              </Button>
            </Box>

            {/* Confirm Password Field */}
            <InputLabel sx={{ fontSize: 14, color: "#fff", mb: 1 }}>Confirm Password</InputLabel>
            <Box sx={{ position: "relative", mb: 2 }}>
              <CustomTextField
                fullWidth
                name="confirmPassword"
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                sx={{ mb: 0 }}
              />
              <Button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  minWidth: "auto",
                  color: "#666",
                  textTransform: "none",
                  fontSize: 12,
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "var(--themeColor)",
                  },
                }}
              >
                {showConfirmPassword ? (
                  <>
                    <VisibilityOff sx={{ fontSize: 18, mr: 0.5 }} />
                  </>
                ) : (
                  <>
                    <Visibility sx={{ fontSize: 18, mr: 0.5 }} />
                  </>
                )}
              </Button>
            </Box>

            {/* Password Requirements */}
            <CustomText sx={{ fontSize: 12, color: "#fff", mb: 2, ml: 1.5, }}>
              Use 8 or more characters with a mix of letters, numbers & symbols
            </CustomText>
            <CustomText sx={{ fontSize: 12, color: "#fff", mb: 2, ml: 1.5, }}>
              Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described
              in our <Link 
                onClick={(e) => {
                  e.preventDefault();
                  window.open("/privacy-policy", "_blank");
                }}
                sx={{ 
                  color: "#4A90E2", 
                  textDecoration: "underline",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#6BA3E8",
                  },
                }}
              >
                Privacy Policy
              </Link>.
            </CustomText>

            {/* Checkboxes */}
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    sx={{
                      color: "#333",
                      "&.Mui-checked": {
                        color: "white",
                      },
                      "&:hover": {
                        backgroundColor: "rgba(95,41,48,0.1)",
                      },
                    }}
                  />
                }
                label={
                  <CustomText sx={{ color: "#fff", fontSize: { xs: 13, md: 14 } }}>
                    Agree to our{" "}
                    <Link 
                      onClick={(e) => {
                        e.preventDefault();
                        window.open("/terms-conditions", "_blank");
                      }}
                      sx={{ 
                        color: "#4A90E2", 
                        textDecoration: "underline",
                        cursor: "pointer",
                        "&:hover": {
                          color: "#6BA3E8",
                        },
                      }}
                    >
                      Terms of use
                    </Link>{" "}
                    and{" "}
                    <Link 
                      onClick={(e) => {
                        e.preventDefault();
                        window.open("/privacy-policy", "_blank");
                      }}
                      sx={{ 
                        color: "#4A90E2", 
                        textDecoration: "underline",
                        cursor: "pointer",
                        "&:hover": {
                          color: "#6BA3E8",
                        },
                      }}
                    >
                      Privacy Policy
                    </Link>
                  </CustomText>
                }
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    sx={{
                      color: "#333",
                      "&.Mui-checked": {
                        color: "white",
                      },
                      "&:hover": {
                        backgroundColor: "rgba(95,41,48,0.1)",
                      },
                    }}
                  />
                }
                label={
                  <CustomText sx={{ color: "#fff", fontSize: { xs: 13, md: 14 } }}>
                    Subscribe to our monthly newsletter
                  </CustomText>
                }
              />
            </Box>

            {/* reCAPTCHA Error Display */}
            {recaptchaError && (
              <Box>
                <Alert
                  severity="error"
                  sx={{
                    fontSize: 12,
                    backgroundColor: "rgba(211, 47, 47, 0.1)",
                    color: "#ffcdd2",
                    border: "1px solid rgba(211, 47, 47, 0.3)",
                    "& .MuiAlert-message": {
                      fontSize: 12,
                    },
                  }}
                >
                  {recaptchaError}
                </Alert>
              </Box>
            )}

            {/* Register Button */}
            <CustomButton
              type="submit"
              fullWidth
              disabled={isSubmitting}
              sx={{ mb: 1 }}
            >
              {isSubmitting ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={20} sx={{ color: "#fff" }} />
                  <CustomText>Verifying...</CustomText>
                </Box>
              ) : (
                "Register"
              )}
            </CustomButton>

              {/* Login Link */}
              <CustomText sx={{ textAlign: "center", color: "#fff", fontSize: { xs: 14, md: 16 }, mb: 2 }}>
                Already have an account?{" "}
                <Link
                onClick={() => navigate("/login")}
                sx={{
                  color: "#4A90E2",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#6BA3E8",
                    transform: "scale(1.05)",
                  },
                }}
              >
                Login Now
              </Link>
            </CustomText>

            <Button
              fullWidth
              startIcon={
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  width="20"
                  height="20"
                />
              }
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                py: 1.3,
                borderRadius: "50px",
                fontSize: { xs: 15, md: 16 },
                fontWeight: 600,
                textTransform: "none",
                mb: 2,
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#f1f1f1",
                  transform: "translateY(-2px)",
                  boxShadow: "0px 6px 20px rgba(0,0,0,0.2)",
                },
              }}
              onClick={() => console.log("Google Auth Clicked")} // later replace with auth logic
            >
              Continue with Google
            </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

