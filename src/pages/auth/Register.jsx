import { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Link, Container, Alert, CircularProgress, InputLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/login.png";

const RECAPTCHA_SITE_KEY = "6Lfr-iAsAAAAAIQsR8mfUxZO1qK3r_AXrTSLSb4g";

// Check if we're in development mode (localhost)
// Set to false if you want to test reCAPTCHA even on localhost
const FORCE_RECAPTCHA = false; // Set to true to force reCAPTCHA even in dev
const isDevelopment = !FORCE_RECAPTCHA && (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname === ''
);

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [recaptchaError, setRecaptchaError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      // In development mode, skip reCAPTCHA or use a test token
      if (isDevelopment) {
        console.warn("Development mode: Skipping reCAPTCHA validation");
        const registerPayload = {
          ...formData,
          recaptchaToken: "dev-mode-token",
        };
        console.log("Registration data:", registerPayload);
        setIsSubmitting(false);
        // Here you would typically send the data to your backend
        return;
      }

      // Execute reCAPTCHA Enterprise
      if (window.grecaptcha && window.grecaptcha.enterprise) {
        const executeRecaptcha = async () => {
          try {
            const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, {
              action: "REGISTER",
            });

            if (token) {
              setRecaptchaToken(token);
              setRecaptchaError("");

              // Handle registration logic here
              const registerPayload = {
                ...formData,
                recaptchaToken: token,
              };

              console.log("Registration data:", registerPayload);
            } else {
              setRecaptchaError("reCAPTCHA verification failed. Please try again.");
            }
          } catch (error) {
            console.error("reCAPTCHA error:", error);
            // Check for specific domain error
            if (error.message && error.message.includes("not in the list of supported domains")) {
              setRecaptchaError("reCAPTCHA domain not configured. Please add localhost to your reCAPTCHA console settings or wait a few minutes for changes to propagate.");
            } else {
              setRecaptchaError("reCAPTCHA verification failed. Please try again.");
            }
          } finally {
            setIsSubmitting(false);
          }
        };

        // Use ready callback to ensure grecaptcha is loaded
        if (typeof window.grecaptcha.enterprise.ready === 'function') {
          window.grecaptcha.enterprise.ready(executeRecaptcha);
        } else {
          // If ready doesn't exist, try executing directly after a small delay
          setTimeout(executeRecaptcha, 100);
        }
      } else {
        setRecaptchaError("reCAPTCHA is not loaded. Please refresh the page.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setRecaptchaError("An error occurred. Please try again.");
      setIsSubmitting(false);
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
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: { xs: "20px", md: "30px" },
            p: { xs: 2, sm: 3, md: 4 },
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            backdropFilter: "blur(10px)",
            opacity: 0,
            transform: "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            border: "1px solid rgba(173, 216, 230, 0.3)",
          }}
        >
          <Typography
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
            Welcome Back
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <InputLabel sx={{ fontSize: 14, color: "#fff", mb: 1 }}>Full Name</InputLabel>
            <TextField
              fullWidth
              name="fullName"
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={handleChange}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  },
                  "&.Mui-focused": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(95,41,48,0.2)",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontWeight: 500,
                },
              }}
            />

            {/* Email Field */}
            <InputLabel sx={{ fontSize: 14, color: "#fff", mb: 1 }}>Email Address</InputLabel>
            <TextField
              fullWidth
              name="email"
              placeholder="Email Address"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  },
                  "&.Mui-focused": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(95,41,48,0.2)",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontWeight: 500,
                },
              }}
            />

            {/* Mobile Field */}
            <InputLabel sx={{ fontSize: 14, color: "#fff", mb: 1 }}>Mobile Number</InputLabel>
            <TextField
              fullWidth
              name="mobile"
              placeholder="Mobile Number"
              type="tel"
              required
              value={formData.mobile}
              onChange={handleChange}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  },
                  "&.Mui-focused": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(95,41,48,0.2)",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontWeight: 500,
                },
              }}
            />

            {/* Password Field */}
            <InputLabel sx={{ fontSize: 14, color: "#fff", mb: 1 }}>Password</InputLabel>
            <Box sx={{ position: "relative", mb: 2 }}>
              <TextField
                fullWidth
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    },
                    "&.Mui-focused": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(95,41,48,0.2)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                  },
                }}
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
              <TextField
                fullWidth
                name="confirmPassword"
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    },
                    "&.Mui-focused": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(95,41,48,0.2)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                  },
                }}
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
            <Typography sx={{ fontSize: 12, color: "#fff", mb: 2, ml: 1.5, }}>
              Use 8 or more characters with a mix of letters, numbers & symbols
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#fff", mb: 2, ml: 1.5, }}>
              Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described
              in our <Link href="#" sx={{ color: "#4A90E2", textDecoration: "underline" }}>
                Privacy Policy
              </Link>.
            </Typography>

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
                  <Typography sx={{ color: "#fff", fontSize: { xs: 13, md: 14 } }}>
                    Agree to our{" "}
                    <Link href="#" sx={{ color: "#4A90E2", textDecoration: "underline" }}>
                      Terms of use
                    </Link>{" "}
                    and{" "}
                    <Link href="#" sx={{ color: "#4A90E2", textDecoration: "underline" }}>
                      Privacy Policy
                    </Link>
                  </Typography>
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
                  <Typography sx={{ color: "#fff", fontSize: { xs: 13, md: 14 } }}>
                    Subscribe to our monthly newsletter
                  </Typography>
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
            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              sx={{
                backgroundColor: "#FF9472",
                color: "#fff",
                py: { xs: 1.2, md: 1.5 },
                borderRadius: "12px",
                fontSize: { xs: 16, md: 18 },
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "50px",
                mb: 1,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 15px rgba(255,148,114,0.3)",
                "&:hover": {
                  backgroundColor: "#F2709C",
                  transform: "translateY(-3px)",
                  boxShadow: "0 8px 25px rgba(255,148,114,0.5)",
                },
                "&:disabled": {
                  backgroundColor: "#ccc",
                  color: "#999",
                },
              }}
            >
              {isSubmitting ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={20} sx={{ color: "#fff" }} />
                  <Typography>Verifying...</Typography>
                </Box>
              ) : (
                "Register"
              )}
            </Button>

            {/* Login Link */}
            <Typography sx={{ textAlign: "center", color: "#fff", fontSize: { xs: 14, md: 16 }, mb: 2 }}>
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
            </Typography>

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
          {/* Google Register Button */}


        </Box>
      </Container>
    </Box>
  );
};

