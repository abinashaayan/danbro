import { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Link, Container, Alert, CircularProgress } from "@mui/material";
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

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [recaptchaError, setRecaptchaError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "aman@yopmail.com",
    password: "Mohan@12",
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
    setIsSubmitting(true);
    setRecaptchaError("");

    try {
      // In development mode, skip reCAPTCHA or use a test token
      if (isDevelopment) {
        console.warn("Development mode: Skipping reCAPTCHA validation");
        const loginPayload = {
          ...formData,
          recaptchaToken: "dev-mode-token",
        };
        console.log("Login data:", loginPayload);
        setIsSubmitting(false);
        // Here you would typically send the data to your backend
        return;
      }

      // Execute reCAPTCHA Enterprise
      if (window.grecaptcha && window.grecaptcha.enterprise) {
        const executeRecaptcha = async () => {
          try {
            const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, {
              action: "LOGIN",
            });

            if (token) {
              setRecaptchaToken(token);
              setRecaptchaError("");

              // Handle login logic here
              const loginPayload = {
                ...formData,
                recaptchaToken: token,
              };

              console.log("Login data:", loginPayload);
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
        py: { xs: 4, md: 6 },
        pb: { xs: 12, md: 16 },
        overflow: "hidden",
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

      {/* Login Form */}
      <Container maxWidth="sm" sx={{ mb: { xs: 6, md: 8 } }}>
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
          <Typography
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
            Welcome Back
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="username"
              placeholder="Username, Email or Mobile Number"
              required
              value={formData.username}
              onChange={handleChange}
              sx={{
                mb: 3,
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

            {/* Password Requirements */}
            <Typography sx={{ fontSize: 12, color: "white", mb: 3, ml: 1.5, }}>
              Use 8 or more characters with a mix of letters, numbers & symbols
            </Typography>

            {/* Checkboxes */}
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    sx={{
                      color: "#fff",
                      "&.Mui-checked": {
                        color: "#fff",
                      },
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: "white", fontSize: { xs: 13, md: 14 } }}>
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
                        color: "#fff",
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
              <Box sx={{ mb: 2 }}>
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

            {/* Login Button */}
            {/* <Link to="/user-profile"> */}
            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              onClick={() => {
                if (formData.username && formData.password) {
                  navigate("/user-profile"); 
                } else {
                  alert("Please enter valid email and password");
                }
              }}
              sx={{
                backgroundColor: "#FF9472",
                borderRadius: "50px",
                color: "#fff",
                py: { xs: 1.2, md: 1.5 },
                borderRadius: "12px",
                fontSize: { xs: 16, md: 18 },
                fontWeight: 700,
                textTransform: "none",
                mb: 3,
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
                "Login"
              )}
            </Button>
            {/* </Link> */}

            {/* Register Link */}
            <Typography sx={{ textAlign: "center", color: "#fff", fontSize: { xs: 14, md: 16 }, }}>
              Don't have an account?{" "}
              <Link
                onClick={() => navigate("/register")}
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
                Register Now
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

