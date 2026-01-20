import { useState, useEffect, useRef } from "react";
import { Box,  Button, Checkbox, FormControlLabel, Link, Container, Alert, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/login.png";
import { CustomTextField } from "../../components/comman/CustomTextField";
import { CustomButton } from "../../components/comman/CustomButton";

const RECAPTCHA_SITE_KEY = "6LfBFCwsAAAAAIiTPg_1ZGCaKId4TwkCDcvBNBq0";

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
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaWidgetRef = useRef(null);
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

  // Check if reCAPTCHA Enterprise script is loaded
  useEffect(() => {
    const checkRecaptcha = () => {
      if (window.grecaptcha && window.grecaptcha.enterprise) {
        setRecaptchaLoaded(true);
        console.log("reCAPTCHA Enterprise is loaded");
      } else {
        console.warn("reCAPTCHA Enterprise script is still loading...");
      }
    };

    // Check immediately
    checkRecaptcha();

    // Also check after a delay in case script is still loading
    const interval = setInterval(() => {
      if (window.grecaptcha && window.grecaptcha.enterprise) {
        setRecaptchaLoaded(true);
        clearInterval(interval);
      }
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      checkRecaptcha();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Render reCAPTCHA Enterprise checkbox widget
  useEffect(() => {
    if (!recaptchaLoaded) return;
    if (!recaptchaWidgetRef.current) return;
    if (!window.grecaptcha || !window.grecaptcha.enterprise) return;

    try {
      // Check if already rendered
      if (recaptchaWidgetRef.current.dataset.rendered === "true") return;

      // Render Enterprise checkbox widget
      const widgetId = window.grecaptcha.enterprise.render(recaptchaWidgetRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: (token) => {
          setRecaptchaToken(token);
          setRecaptchaError("");
          console.log("reCAPTCHA Enterprise verified successfully");
        },
        "expired-callback": () => {
          setRecaptchaToken(null);
          setRecaptchaError("reCAPTCHA expired. Please verify again.");
        },
        "error-callback": () => {
          setRecaptchaToken(null);
          setRecaptchaError("reCAPTCHA verification failed. Please try again.");
        },
      });

      recaptchaWidgetRef.current.dataset.rendered = "true";
      recaptchaWidgetRef.current.dataset.widgetId = widgetId;
      console.log("reCAPTCHA Enterprise checkbox widget rendered");
    } catch (error) {
      console.error("reCAPTCHA Enterprise render error:", error);
      setRecaptchaError("Unable to load reCAPTCHA. Please refresh the page.");
    }
  }, [recaptchaLoaded]);

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
      if (isDevelopment) {
        console.warn("Development mode: Skipping reCAPTCHA validation");
        const loginPayload = {
          ...formData,
          recaptchaToken: "dev-mode-token",
        };
        console.log("Login data:", loginPayload);
        setIsSubmitting(false);
        return;
      }

      // Validate reCAPTCHA token
      if (!recaptchaToken) {
        setRecaptchaError("Please verify you are not a robot.");
        setIsSubmitting(false);
        return;
      }

      // Proceed with login
      const loginPayload = {
        ...formData,
        recaptchaToken: recaptchaToken,
      };
      console.log("Login data:", loginPayload);
      setIsSubmitting(false);
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
            Welcome Back
          </CustomText>

          <Box component="form" onSubmit={handleSubmit}>
            <CustomTextField
              fullWidth
              name="username"
              placeholder="Username, Email or Mobile Number"
              required
              value={formData.username}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            {/* Password Field */}
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

            {/* Password Requirements */}
            <CustomText sx={{ fontSize: 12, color: "white", mb: 3, ml: 1.5, }}>
              Use 8 or more characters with a mix of letters, numbers & symbols
            </CustomText>

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
                  <CustomText sx={{ color: "white", fontSize: { xs: 13, md: 14 } }}>
                    Agree to our{" "}
                    <Link href="#" sx={{ color: "#4A90E2", textDecoration: "underline" }}>
                      Terms of use
                    </Link>{" "}
                    and{" "}
                    <Link href="#" sx={{ color: "#4A90E2", textDecoration: "underline" }}>
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
                        color: "#fff",
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

            {/* reCAPTCHA Enterprise Checkbox - Above Login Button */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Box
                ref={recaptchaWidgetRef}
                sx={{
                  transform: { xs: "scale(0.92)", md: "scale(1)" },
                  transformOrigin: "top left",
                }}
              />
            </Box>

            <CustomButton
              type="submit"
              fullWidth
              disabled={isSubmitting || !recaptchaToken}
              onClick={() => {
                if (formData.username && formData.password) {
                  navigate("/user-profile");
                } else {
                  alert("Please enter valid email and password");
                }
              }}
              sx={{ mb: 3 }}
            >
              {isSubmitting ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={20} sx={{ color: "#fff" }} />
                  <CustomText>Verifying...</CustomText>
                </Box>
              ) : (
                "Login"
              )}
            </CustomButton>
            {/* </Link> */}

            {/* Register Link */}
            <CustomText sx={{ textAlign: "center", color: "#fff", fontSize: { xs: 14, md: 16 }, }}>
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
            </CustomText>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

