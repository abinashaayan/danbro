import { Box, Link as MuiLink } from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import { CustomToast } from "../../components/comman/CustomToast";
import { useEffect, useRef, useState } from "react";
import { submitContact, getAllFAQs } from "../../utils/apiService";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import SendIcon from "@mui/icons-material/Send";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CakeIcon from "@mui/icons-material/Cake";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ArticleIcon from "@mui/icons-material/Article";
import { Link } from "react-router-dom";

import "./Contact.css";

export const Contact = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const [open, setOpen] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
    loading: false,
  });

  const sectionRefs = {
    header: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const observers = Object.keys(sectionRefs).map((key) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting)
              setVisibleSections((prev) => ({ ...prev, [key]: true }));
          });
        },
        { threshold: 0.1 }
      );

      if (sectionRefs[key].current) observer.observe(sectionRefs[key].current);
      return observer;
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoadingFaqs(true);
        const response = await getAllFAQs();
        if (response?.data && Array.isArray(response.data)) {
          setFaqs(response.data);
        } else if (response?.faqs && Array.isArray(response.faqs)) {
          setFaqs(response.faqs);
        } else if (Array.isArray(response)) {
          setFaqs(response);
        } else {
          setFaqs([
            {
              question: "How to reach out to support?",
              answer:
                "Send your query via our contact form or email us directly at support@danbro.com. We respond within 4 hours.",
            },
            {
              question: "How can I place order for different state?",
              answer:
                "We ship nationwide! Add items to cart, enter your pincode, and available shipping options will appear.",
            },
            {
              question: "Transaction failed but money debited?",
              answer:
                "Don't worry—amounts are automatically refunded within 5-7 days. If not, share your order ID with our support team.",
            },
            {
              question: "How do I create an account?",
              answer:
                'Click on "Account" at top right, then "Sign Up". Use your email and create a password—takes just 30 seconds.',
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setFaqs([
          {
            question: "How to reach out to support?",
            answer:
              "Send your query via our contact form or email us directly. We respond within 4 hours.",
          },
          {
            question: "How can I place order for different state?",
            answer:
              "We ship nationwide! Add items to cart, enter your pincode, and available shipping options will appear.",
          },
          {
            question: "Transaction failed but money debited?",
            answer:
              "Amounts are automatically refunded within 5-7 days. If not, share your order ID with our support team.",
          },
          {
            question: "How do I create an account?",
            answer:
              'Click on "Account" at top right, then "Sign Up". Use your email and create a password—takes just 30 seconds.',
          },
        ]);
      } finally {
        setLoadingFaqs(false);
      }
    };

    fetchFAQs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setToast({
        open: true,
        message: "Please enter both first name and last name",
        severity: "error",
        loading: false,
      });
      return;
    }

    if (!formData.email.trim()) {
      setToast({
        open: true,
        message: "Please enter your email address",
        severity: "error",
        loading: false,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setToast({
        open: true,
        message: "Please enter a valid email address",
        severity: "error",
        loading: false,
      });
      return;
    }

    if (!formData.phone.trim()) {
      setToast({
        open: true,
        message: "Please enter your phone number",
        severity: "error",
        loading: false,
      });
      return;
    }

    if (!formData.message.trim()) {
      setToast({
        open: true,
        message: "Please enter your message",
        severity: "error",
        loading: false,
      });
      return;
    }

    setIsSubmitting(true);
    setToast({
      open: true,
      message: "Submitting your message...",
      severity: "info",
      loading: true,
    });

    try {
      await submitContact(formData);
      setToast({
        open: true,
        message: "Thank you! Your message has been sent successfully.",
        severity: "success",
        loading: false,
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setToast({
        open: true,
        message:
          error.message || "Failed to send message. Please try again.",
        severity: "error",
        loading: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box className="contact-page-wrap" sx={{ pt: { xs: "35px", sm: 0 } }}>
      <div ref={sectionRefs.header} className="contact-page">
        {/* BREADCRUMB */}
        <nav className="contact-breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Contact Us</span>
        </nav>

        {/* MAIN GRID: CONTACT DETAILS + FORM */}
        <div className="contact-grid">
          {/* LEFT: CONTACT DETAILS & BRAND */}
          <div ref={sectionRefs.contact} className="contact-details-section">
            <h1 className="contact-section-title">CONTACT US</h1>
            <p className="contact-section-subtitle">
              Reach out, and let's create a universe of possibilities together!
            </p>

            <div className="contact-info-grid">
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <PhoneIcon fontSize="medium" />
                </div>
                <div className="contact-info-content">
                  <h3>Phone</h3>
                  <p className="contact-phone-numbers">
                    <a href="tel:+917309032618">+91 7309032618</a>
                    <a href="tel:05224113205" style={{ marginTop: 4 }}>
                      0522-4113205
                    </a>
                  </p>
                </div>
              </div>
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <EmailIcon fontSize="medium" />
                </div>
                <div className="contact-info-content">
                  <h3>Email</h3>
                  <p>
                    <MuiLink
                      href="mailto:Info@Mrbrownbakery.Com"
                      className="contact-email-link"
                    >
                      Info@Mrbrownbakery.Com
                    </MuiLink>
                  </p>
                </div>
              </div>
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <LocationOnIcon fontSize="medium" />
                </div>
                <div className="contact-info-content">
                  <h3>Address</h3>
                  <p>
                    <MuiLink
                      href="https://www.google.com/maps/search/?api=1&query=B-35,+Sector-P,+Aliganj,+Lucknow,+UP+220024"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-address-link"
                    >
                      B-35 Sector-P, Aliganj,
                      <br />
                      Lucknow, UP 220024
                    </MuiLink>
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-brand-promise">
              <div className="contact-promise-item">
                <CheckCircleIcon className="contact-promise-icon" fontSize="small" />
                <span>Fresh Baked daily</span>
              </div>
              <div className="contact-promise-item">
                <CheckCircleIcon className="contact-promise-icon" fontSize="small" />
                <span>Premium Quality ingredients</span>
              </div>
              <div className="contact-promise-item">
                <CheckCircleIcon className="contact-promise-icon" fontSize="small" />
                <span>Fast Delivery · 60 mins</span>
              </div>
            </div>
          </div>

          {/* RIGHT: GET IN TOUCH + FORM */}
          <div className="contact-get-in-touch">
            <h2>
              <StarIcon className="contact-title-icon" fontSize="medium" /> Get in touch
            </h2>
            <p className="contact-touch-subtitle">
              Let's align our constellations! Reach out and let the magic of collaboration shine.
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label htmlFor="contact-firstName">First Name</label>
                  <input
                    id="contact-firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="contact-form-group">
                  <label htmlFor="contact-lastName">Last Name</label>
                  <input
                    id="contact-lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="contact-form-group">
                  <label htmlFor="contact-phone">Phone Number</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="contact-form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                className="contact-submit-btn"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                <SendIcon fontSize="small" />
              </button>
            </form>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="contact-faq-section">
          <div className="contact-faq-header">
            <h2>
              <HelpOutlineIcon className="contact-faq-icon" fontSize="medium" /> Frequently Asked Questions
            </h2>
          </div>

          {loadingFaqs ? (
            <CustomText sx={{ textAlign: "center", py: 4 }}>Loading FAQs...</CustomText>
          ) : faqs.length === 0 ? (
            <CustomText sx={{ textAlign: "center", py: 4 }}>No FAQs available</CustomText>
          ) : (
            <div className="contact-faq-grid">
              {faqs.map((item, i) => {
                const question = item.question || item.q || "";
                const answer = item.answer || item.a || "";
                const isOpen = open === i;
                return (
                  <div
                    key={i}
                    className="contact-faq-item"
                    onClick={() => setOpen(isOpen ? null : i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpen(isOpen ? null : i);
                      }
                    }}
                  >
                    <div className="contact-faq-question">
                      <HelpOutlineIcon className="contact-faq-q-icon" fontSize="small" />
                      <h3>{question}</h3>
                    </div>
                    {isOpen && <div className="contact-faq-answer">{answer}</div>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* BRAND STATEMENT & PAYMENT */}
        <div className="contact-brand-footer">
          <div className="contact-brand-quote">
            <span className="contact-quote-text">
              <CakeIcon className="contact-quote-icon" fontSize="small" /> Have a good cake Today.
            </span>
          </div>
          <div className="contact-payment-methods">
            <span className="contact-payment-icon">
              <span className="contact-payment-i">VISA</span>
            </span>
            <span className="contact-payment-icon">
              <span className="contact-payment-i">PAYPAL</span>
            </span>
            <span className="contact-payment-icon">
              <span className="contact-payment-i">AMEX</span>
            </span>
          </div>
        </div>

        {/* FOOTER COPYRIGHT */}
        <div className="contact-copyright">
          <div className="contact-copyright-left">
            <WorkspacePremiumIcon className="contact-crown-icon" fontSize="small" />
            <span>
              <strong>DANBRO®</strong> Mr. Brown Bakery and Food Products Pvt Ltd | 2026
            </span>
          </div>
          <div className="contact-developed-by">
            <span>Design & Developed by</span>
            <span style={{ fontWeight: 700, color: "#5F2930" }}>Ayan Infotech</span>
          </div>
          <Link to="/blog" className="contact-blog-link">
            <ArticleIcon fontSize="small" /> Blog
          </Link>
        </div>
      </div>

      <CustomToast
        open={toast.open}
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
        severity={toast.severity}
        loading={toast.loading}
      />
    </Box>
  );
};
