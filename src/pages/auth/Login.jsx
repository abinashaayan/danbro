import { useState, useEffect, useRef } from "react";
import { Box, Button, Checkbox, FormControlLabel, Link, Container, Alert, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser, checkAuth } from "../../store/authSlice";
import { store } from "../../store/store";
import { getGuestCart, getGuestWishlist } from "../../store/guestSlice";
import banner from "../../assets/login.webp";
import { CustomTextField } from "../../components/comman/CustomTextField";
import { CustomButton } from "../../components/comman/CustomButton";
import { CustomText } from "../../components/comman/CustomText";
import { getAccessToken } from "../../utils/cookies";
import api from "../../utils/api";
import { invalidateHomeLayoutFetch } from "../../utils/apiService";
import { loadRecaptchaScript } from "../../utils/loadRecaptcha";

const RECAPTCHA_SITE_KEY = "6LfBFCwsAAAAAIiTPg_1ZGCaKId4TwkCDcvBNBq0";

// Set to true to skip reCAPTCHA (e.g. when using IP like 34.206.193.218:5556 - domain not in reCAPTCHA admin).
// Set to false when proper domain is added in Google reCAPTCHA admin.
const SKIP_RECAPTCHA = true;

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, error, isRedirecting } = useAppSelector((state) => state.auth);
  const fromCartState = location.state?.fromCart ? location.state : null;

  const [showPassword, setShowPassword] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [recaptchaError, setRecaptchaError] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaWidgetRef = useRef(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    agreeTerms: true,
    newsletter: true,
  });
  const [loginErrors, setLoginErrors] = useState({ email: "", password: "", agreeTerms: "" });
  const formRef = useRef(null);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email || "").trim());

  // Forgot Password State
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1); // 1: email, 2: OTP + new password
  const [resetEmail, setResetEmail] = useState("");
  const [resetOtp, setResetOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRequestingReset, setIsRequestingReset] = useState(false);
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  // Check auth status on mount
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Redirect after successful login (to cart if came from cart, else home)
  useEffect(() => {
    if (isRedirecting && isAuthenticated) {
      invalidateHomeLayoutFetch();
      window.dispatchEvent(new CustomEvent("homeLayoutInvalidate"));
      navigate(fromCartState ? "/cart" : "/home", { replace: true });
    }
  }, [isRedirecting, isAuthenticated, navigate, fromCartState]);

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

  // Load reCAPTCHA script only on Login page (not on home) for faster initial load
  useEffect(() => {
    if (SKIP_RECAPTCHA) {
      setRecaptchaLoaded(true);
      return;
    }
    loadRecaptchaScript()
      .then(() => setRecaptchaLoaded(true))
      .catch(() => setRecaptchaError("Could not load security check. Please refresh."));
  }, []);

  // Render reCAPTCHA Enterprise checkbox widget
  useEffect(() => {
    if (!recaptchaLoaded) return;
    if (!recaptchaWidgetRef.current) return;
    if (!window.grecaptcha || !window.grecaptcha.enterprise) return;

    try {
      if (recaptchaWidgetRef.current.dataset.rendered === "true") return;
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

  const validateLoginField = (name, value) => {
    if (name === "username") {
      const v = (value || "").trim();
      if (!v) return "Email is required.";
      if (!isValidEmail(v)) return "Please enter a valid email address.";
      return "";
    }
    if (name === "password") {
      if (!value) return "Password is required.";
      if (value.length < 8) return "Password must be at least 8 characters.";
      return "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    const errorMsg = type === "checkbox" ? "" : validateLoginField(name, value);
    if (name === "username") setLoginErrors((p) => ({ ...p, email: errorMsg }));
    else if (name === "password") setLoginErrors((p) => ({ ...p, password: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRecaptchaError("");
    setLoginErrors({ email: "", password: "", agreeTerms: "" });

    const email = (formData.username || "").trim();
    const password = (formData.password || "").trim();

    const errors = {};
    if (!email) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
    } else {
      const hasUpper = /[A-Z]/.test(password);
      const hasLower = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
      if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
        errors.password = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
      }
    }
    if (!formData.agreeTerms) {
      errors.agreeTerms = "You must agree to the Terms of use and Privacy Policy.";
    }

    if (Object.keys(errors).length > 0) {
      setLoginErrors((prev) => ({ ...prev, ...errors }));
      return;
    }

    const loginPayload = {
      email: formData.username,
      password: formData.password,
    };
    // Always merge guest cart/wishlist from Redux when present (fixes: guest added to cart -> register -> login losing cart)
    const guestCart = getGuestCart(store.getState());
    const guestWishlist = getGuestWishlist(store.getState()) ?? [];
    if (guestCart?.length) {
      loginPayload.cart = {
        items: guestCart.map((item) => ({
          product: item.productId,
          quantity: Number(item.quantity) || 1,
        })),
        appliedCoupon: fromCartState?.appliedCoupon || undefined,
      };
    }
    if (guestWishlist?.length) {
      loginPayload.wishlist = guestWishlist;
    }
    const result = await dispatch(loginUser(loginPayload));

    // Handle login rejection: show API message and optionally redirect to verify-otp
    if (loginUser.rejected.match(result)) {
      const errorPayload = result.payload;
      const apiMessage = errorPayload?.message || (typeof errorPayload === "string" ? errorPayload : "") || "Login failed.";

      // Show API validation message under the relevant field (password / email)
      if (apiMessage && /password|character|uppercase|lowercase|special/i.test(apiMessage)) {
        setLoginErrors((prev) => ({ ...prev, password: apiMessage }));
      } else if (apiMessage && /email|invalid credentials|user not found/i.test(apiMessage)) {
        setLoginErrors((prev) => ({ ...prev, email: apiMessage }));
      } else {
        setLoginErrors((prev) => ({ ...prev, password: "", email: "" }));
      }

      // Redirect to verify-otp only when backend requires OTP (isVerified === false). Do not redirect for "Domain not allowed" or other 403.
      const isOtpRequired = errorPayload?.isVerified === false;
      const isDomainOrForbidden = /domain not allowed|forbidden/i.test(apiMessage);
      if (isOtpRequired && !isDomainOrForbidden) {
        localStorage.setItem('pendingLoginEmail', formData?.username);
        localStorage.setItem('pendingLoginPassword', formData?.password);
        navigate("/verify-otp", {
          state: {
            email: formData?.username,
            password: formData?.password,
            message: apiMessage
          }
        });
      }
    }
  };

  // Handle Forgot Password Request
  const handleForgotPasswordRequest = async (e) => {
    e.preventDefault();
    const email = (resetEmail || "").trim();
    if (!email) {
      setResetError("Email is required.");
      return;
    }
    if (!isValidEmail(email)) {
      setResetError("Please enter a valid email address.");
      return;
    }

    setIsRequestingReset(true);
    setResetError("");
    setResetSuccess("");

    try {
      const response = await api.post('/user/resetPasswordRequest', {
        email,
      });

      if (response.data) {
        setResetSuccess("OTP has been sent to your email. Please check your inbox.");
        setForgotPasswordStep(2);
        setTimeout(() => setResetSuccess(""), 3000);
      }
    } catch (error) {
      console.error("Error requesting password reset:", error);
      setResetError(error.response?.data?.message || error.message || "Failed to send reset OTP. Please try again.");
    } finally {
      setIsRequestingReset(false);
    }
  };

  // Handle Password Reset Confirm
  const handleResetPasswordConfirm = async (e) => {
    e.preventDefault();
    setResetError("");

    const otp = (resetOtp || "").trim();
    const pwd = (newPassword || "").trim();
    const confirmPwd = (confirmNewPassword || "").trim();

    if (!otp || otp.length !== 6) {
      setResetError("Please enter a valid 6-digit OTP.");
      return;
    }
    if (!pwd) {
      setResetError("New password is required.");
      return;
    }
    if (pwd.length < 6) {
      setResetError("Password must be at least 6 characters long.");
      return;
    }
    if (pwd !== confirmPwd) {
      setResetError("New password and confirm password do not match.");
      return;
    }

    setIsConfirmingReset(true);
    setResetError("");
    setResetSuccess("");

    try {
      const response = await api.post('/user/resetPasswordConfirm', {
        otp,
        email: (resetEmail || "").trim(),
        newPassword: pwd,
      });

      if (response.data) {
        setResetSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          handleCloseForgotPassword();
        }, 2000);
      }
    } catch (error) {
      console.error("Error confirming password reset:", error);
      setResetError(error.response?.data?.message || error.message || "Failed to reset password. Please try again.");
    } finally {
      setIsConfirmingReset(false);
    }
  };

  // Close Forgot Password Card
  const handleCloseForgotPassword = () => {
    setForgotPasswordOpen(false);
    setForgotPasswordStep(1);
    setResetEmail("");
    setResetOtp("");
    setNewPassword("");
    setConfirmNewPassword("");
    setResetError("");
    setResetSuccess("");
  };

  const hasToken = !!getAccessToken();
  if (isAuthenticated || hasToken) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 2, }}>
        <CircularProgress size={40} sx={{ color: "var(--themeColor, #e67850)" }} />
        <CustomText sx={{ fontSize: 14, color: "#666" }}>Redirecting to home...</CustomText>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", p: { xs: 1.25, md: 0 }, }}>
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

      {/* Login Form / Forgot Password Card */}
      <Container maxWidth="sm" sx={{ mt: { xs: 5, md: 6 }, mb: { xs: 4, md: 6 }, display: "flex", flexDirection: "column", alignItems: "center", }}>
        {isRedirecting ? (
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              backgroundColor: "transparent",
              borderRadius: { xs: "20px", md: "30px" },
              p: { xs: 3, sm: 4, md: 5 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
            }}
          >
            <CircularProgress sx={{ color: "#fff", mb: 2 }} />
            <CustomText sx={{ color: "white", fontSize: { xs: 16, md: 18 } }}>
              Login successful! Redirecting...
            </CustomText>
          </Box>
        ) : forgotPasswordOpen ? (
          // Forgot Password Card
          <Box
            ref={formRef}
            sx={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: 500,
              backgroundColor: "transparent",
              borderRadius: { xs: "16px", md: "20px" },
              p: { xs: 2, sm: 2.5, md: 3 },
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
                fontSize: { xs: 22, sm: 24, md: 26 },
                fontWeight: 'bold',
                color: "white",
                textAlign: "center",
                mb: { xs: 2, md: 2.5 },
                animation: "fadeInDown 0.6s ease-out",
                "@keyframes fadeInDown": {
                  "0%": { opacity: 0, transform: "translateY(-20px)" },
                  "100%": { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              {forgotPasswordStep === 1 ? "Forgot Password" : "Reset Password"}
            </CustomText>

            {forgotPasswordStep === 1 ? (
              // Step 1: Enter Email
              <Box component="form" onSubmit={handleForgotPasswordRequest}>
                {resetError && (
                  <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                    {resetError}
                  </Alert>
                )}
                {resetSuccess && (
                  <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
                    {resetSuccess}
                  </Alert>
                )}

                <CustomText sx={{ fontSize: { xs: 14, md: 16 }, color: "#fff", textAlign: "center", mb: 3, opacity: 0.9 }}>
                  Enter your email address and we'll send you an OTP to reset your password.
                </CustomText>

                <CustomTextField
                  fullWidth
                  type="email"
                  placeholder="Email Address"
                  value={resetEmail}
                  onChange={(e) => {
                    setResetEmail(e.target.value);
                    setResetError("");
                  }}
                  required
                  sx={{ mb: 3 }}
                />

                <CustomButton type="submit" fullWidth disabled={isRequestingReset || !resetEmail} sx={{ mb: 3 }}>
                  {isRequestingReset ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CircularProgress size={20} sx={{ color: "#fff" }} />
                      <CustomText>Sending OTP...</CustomText>
                    </Box>
                  ) : (
                    "Send OTP"
                  )}
                </CustomButton>

                <CustomText sx={{ textAlign: "center", color: "#fff", fontSize: { xs: 14, md: 16 } }}>
                  Remember your password?{" "}
                  <Link
                    onClick={handleCloseForgotPassword}
                    sx={{
                      color: "#4A90E2",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontWeight: 600,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#6BA3E8",
                      },
                    }}
                  >
                    Back to Login
                  </Link>
                </CustomText>
              </Box>
            ) : (
              // Step 2: Enter OTP and New Password
              <Box component="form" onSubmit={handleResetPasswordConfirm}>
                {resetError && (
                  <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                    {resetError}
                  </Alert>
                )}
                {resetSuccess && (
                  <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
                    {resetSuccess}
                  </Alert>
                )}

                <CustomText sx={{ fontSize: { xs: 14, md: 16 }, color: "#fff", textAlign: "center", mb: 3, opacity: 0.9 }}>
                  We've sent a 6-digit OTP to <strong>{resetEmail}</strong>. Please enter it below along with your new password.
                </CustomText>

                <CustomTextField
                  fullWidth
                  placeholder="Enter 6-digit OTP"
                  value={resetOtp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setResetOtp(value);
                    setResetError("");
                  }}
                  inputProps={{
                    maxLength: 6,
                    style: {
                      textAlign: "center",
                      fontSize: "20px",
                      letterSpacing: "6px",
                      fontWeight: "bold",
                    },
                  }}
                  required
                  sx={{ mb: 2 }}
                />

                <Box sx={{ position: "relative", mb: 2 }}>
                  <CustomTextField
                    fullWidth
                    placeholder="New Password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setResetError("");
                    }}
                    required
                    sx={{ mb: 0 }}
                  />
                  <Button
                    onClick={() => setShowNewPassword(!showNewPassword)}
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
                    {showNewPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                  </Button>
                </Box>

                <Box sx={{ position: "relative", mb: 3 }}>
                  <CustomTextField
                    fullWidth
                    placeholder="Confirm New Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmNewPassword}
                    onChange={(e) => {
                      setConfirmNewPassword(e.target.value);
                      setResetError("");
                    }}
                    required
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
                    {showConfirmPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                  </Button>
                </Box>

                <CustomButton
                  type="submit"
                  fullWidth
                  disabled={isConfirmingReset || !resetOtp || !newPassword || !confirmNewPassword}
                  sx={{ mb: 2 }}
                >
                  {isConfirmingReset ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CircularProgress size={20} sx={{ color: "#fff" }} />
                      <CustomText>Resetting Password...</CustomText>
                    </Box>
                  ) : (
                    "Reset Password"
                  )}
                </CustomButton>

                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <Link
                    onClick={() => {
                      setForgotPasswordStep(1);
                      setResetOtp("");
                      setNewPassword("");
                      setConfirmNewPassword("");
                      setResetError("");
                      setResetSuccess("");
                    }}
                    sx={{
                      color: "#4A90E2",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontSize: { xs: 13, md: 14 },
                      "&:hover": {
                        color: "#6BA3E8",
                      },
                    }}
                  >
                    Back to Email
                  </Link>
                </Box>

                <CustomText sx={{ textAlign: "center", color: "#fff", fontSize: { xs: 14, md: 16 } }}>
                  Remember your password?{" "}
                  <Link
                    onClick={handleCloseForgotPassword}
                    sx={{
                      color: "#4A90E2",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontWeight: 600,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#6BA3E8",
                      },
                    }}
                  >
                    Back to Login
                  </Link>
                </CustomText>
              </Box>
            )}
          </Box>
        ) : (
          <Box
            ref={formRef}
            sx={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: 500,
              backgroundColor: "transparent",
              borderRadius: { xs: "16px", md: "20px" },
              p: { xs: 2, sm: 2.5, md: 3 },
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
                fontSize: { xs: 22, sm: 24, md: 26 },
                fontWeight: 'bold',
                color: "white",
                textAlign: "center",
                mb: { xs: 2, md: 2.5 },
                animation: "fadeInDown 0.6s ease-out",
                "@keyframes fadeInDown": {
                  "0%": { opacity: 0, transform: "translateY(-20px)" },
                  "100%": { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              Welcome
            </CustomText>

            <Box component="form" onSubmit={handleSubmit}>
              {error && typeof error === 'object' && error.message && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2, whiteSpace: "normal", wordBreak: "break-word", "& .MuiAlert-message": { overflow: "hidden" } }}>
                  {error.message}
                </Alert>
              )}
              {error && typeof error === 'string' && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2, whiteSpace: "normal", wordBreak: "break-word", "& .MuiAlert-message": { overflow: "hidden" } }}>
                  {error}
                </Alert>
              )}
              {recaptchaError && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                  {recaptchaError}
                </Alert>
              )}
              <CustomTextField
                fullWidth
                name="username"
                placeholder="Email Address"
                type="email"
                required
                value={formData.username}
                onChange={handleChange}
                error={!!loginErrors.email}
                helperText={loginErrors.email}
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
                  error={!!loginErrors.password}
                  helperText={loginErrors.password}
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
              <CustomText sx={{ fontSize: 12, color: "white", mb: 1, ml: 1.5, whiteSpace: "normal" }}>
                Use 8+ characters with uppercase, lowercase, number and special character
              </CustomText>

              {/* Forgot Password Link */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
                <Link
                  onClick={() => setForgotPasswordOpen(true)}
                  sx={{
                    color: "#4A90E2",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: { xs: 13, md: 14 },
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#6BA3E8",
                    },
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>

              {/* Checkboxes */}
              <Box sx={{ mb: 3 }}>
                {loginErrors.agreeTerms && (
                  <CustomText sx={{ color: "#f44336", fontSize: 12, ml: 1.5 }}>
                    {loginErrors.agreeTerms}
                  </CustomText>
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={(e) => {
                        handleChange(e);
                        if (loginErrors.agreeTerms) setLoginErrors((p) => ({ ...p, agreeTerms: "" }));
                      }}
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
              </Box>

              {/* reCAPTCHA - hidden when SKIP_RECAPTCHA is true (e.g. IP without domain) */}
              {!SKIP_RECAPTCHA && recaptchaError && (
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

              {!SKIP_RECAPTCHA && (
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Box
                    ref={recaptchaWidgetRef}
                    sx={{
                      transform: { xs: "scale(0.92)", md: "scale(1)" },
                      transformOrigin: "top left",
                    }}
                  />
                </Box>
              )}

              <CustomButton
                type="submit"
                fullWidth
                disabled={isLoading || (!SKIP_RECAPTCHA && !recaptchaToken)}
                sx={{ mb: 3 }}
              >
                {isLoading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={20} sx={{ color: "#fff" }} />
                    <CustomText>Logging in...</CustomText>
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
        )}
      </Container>

    </Box>
  );
};

