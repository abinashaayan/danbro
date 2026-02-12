import { Box, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SchoolIcon from "@mui/icons-material/School";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import ScheduleIcon from "@mui/icons-material/Schedule";
import WorkIcon from "@mui/icons-material/Work";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import SpaIcon from "@mui/icons-material/Spa";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import CommuteIcon from "@mui/icons-material/Commute";
import EventIcon from "@mui/icons-material/Event";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SendIcon from "@mui/icons-material/Send";
import PhoneIcon from "@mui/icons-material/Phone";
import { getAllCareers, getCareerById } from "../../utils/apiService";
import "./Career.css";

const BRAND = "#5F2930";

const BENEFITS = [
  { icon: RestaurantIcon, title: "Free baked goods", description: "Take home fresh products daily. Your family will love it." },
  { icon: SchoolIcon, title: "Learning stipend", description: "₹25,000/year for courses, workshops, and certifications." },
  { icon: HealthAndSafetyIcon, title: "Health insurance", description: "Comprehensive coverage for you and your family." },
  { icon: ScheduleIcon, title: "Flexible hours", description: "Early morning or evening shifts that fit your life." },
];

const PERKS = [
  { icon: RestaurantIcon, title: "Free meals & coffee", description: "Breakfast, lunch, and unlimited espresso" },
  { icon: SpaIcon, title: "Wellness Wednesdays", description: "Yoga, meditation, and mental health days" },
  { icon: ChildCareIcon, title: "Parental leave", description: "6 months maternity, 2 months paternity" },
  { icon: CommuteIcon, title: "Commute subsidy", description: "50% off on metro & cabs" },
  { icon: EventIcon, title: "Flexi holidays", description: "Work on your schedule, 30 days PTO" },
  { icon: EmojiEventsIcon, title: "Monthly awards", description: "₹10k bonus for employee of the month" },
];

const CULTURE_IMAGES = [
  "https://images.pexels.com/photos/3817648/pexels-photo-3817648.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/3992534/pexels-photo-3992534.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/5908222/pexels-photo-5908222.jpeg?auto=compress&cs=tinysrgb&w=400",
];

const FILTER_TABS = [
  { key: "all", label: "All departments" },
  { key: "bakery", label: "Bakery" },
  { key: "operations", label: "Operations" },
  { key: "management", label: "Management" },
  { key: "marketing", label: "Marketing" },
];

export const Career = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const [careerDetail, setCareerDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getAllCareers()
      .then((data) => {
        if (!cancelled && Array.isArray(data)) setCareers(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message || "Failed to load careers.");
          setCareers([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!detailOpen || !selectedCareerId) {
      setCareerDetail(null);
      return;
    }
    let cancelled = false;
    setDetailLoading(true);
    getCareerById(selectedCareerId)
      .then((data) => { if (!cancelled) setCareerDetail(data); })
      .catch(() => { if (!cancelled) setCareerDetail(null); })
      .finally(() => { if (!cancelled) setDetailLoading(false); });
    return () => { cancelled = true; };
  }, [detailOpen, selectedCareerId]);

  const openDetail = (id) => {
    setSelectedCareerId(id);
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setDetailOpen(false);
    setSelectedCareerId(null);
    setCareerDetail(null);
  };

  const getJobTitle = (j) => j?.title ?? j?.jobTitle ?? j?.name ?? "Position";
  const getJobDesc = (j) => j?.description ?? j?.jobDescription ?? j?.details ?? "";
  const getJobLocation = (j) => j?.location ?? j?.city ?? "";
  const getJobType = (j) => j?.jobType ?? j?.type ?? "Full time";
  const getSalary = (j) => j?.salary ?? j?.salaryRange ?? "";
  const getExperience = (j) => j?.experience ?? j?.experienceRequired ?? "";

  return (
    <Box className="career-page-wrap">
      <Box className="career-container">
        {/* Hero */}
        <section className="career-hero">
          <div className="hero-content">
            <Box className="hero-badge" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <WorkspacePremiumIcon sx={{ fontSize: "1.1rem" }} />
              JOIN THE DANBRO FAMILY
            </Box>
            <h1 className="hero-title">
              Bake your <span className="highlight">career</span>
              <br />
              with passion
            </h1>
            <p className="hero-description">
              Be part of a team that turns simple ingredients into moments of joy.
              We're looking for bakers, creators, and dreamers to grow with us.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{loading ? "—" : careers.length}</span>
                <span className="stat-label">open positions</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">150+</span>
                <span className="stat-label">team members</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">12</span>
                <span className="stat-label">bakery locations</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Danbro Bakery team"
            />
          </div>
        </section>

        {/* Why join us */}
        <section className="why-join-section">
          <div className="section-header">
            <div className="section-title">
              <Box className="section-title-icon" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FavoriteIcon sx={{ fontSize: "inherit" }} />
              </Box>
              <h2>Why join us?</h2>
            </div>
            <span className="section-subtitle">More than just a job</span>
          </div>
          <div className="benefits-grid">
            {BENEFITS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="benefit-card">
                  <Box className="benefit-icon">
                    <Icon sx={{ fontSize: "2rem" }} />
                  </Box>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Open positions */}
        <section className="positions-section">
          <div className="section-header">
            <div className="section-title">
              <Box className="section-title-icon" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BusinessCenterIcon sx={{ fontSize: "inherit" }} />
              </Box>
              <h2>Open positions</h2>
            </div>
            <span className="section-subtitle">{loading ? "—" : careers.length} roles available</span>
          </div>

          <div className="filter-tabs">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`filter-tab ${filter === tab.key ? "active" : ""}`}
                onClick={() => setFilter(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="jobs-loading">
              <CircularProgress sx={{ color: BRAND }} />
            </div>
          ) : error ? (
            <div className="jobs-error">{error}</div>
          ) : careers.length === 0 ? (
            <div className="jobs-empty">No openings at the moment. Check back later.</div>
          ) : (
            <div className="jobs-grid">
              {careers.map((job) => {
                const jobId = job?._id ?? job?.id;
                const title = getJobTitle(job);
                const description = getJobDesc(job);
                const location = getJobLocation(job);
                const jobType = getJobType(job);
                const salary = getSalary(job);
                const experience = getExperience(job);
                return (
                  <div
                    key={jobId}
                    role="button"
                    tabIndex={0}
                    className="job-card"
                    onClick={() => jobId && openDetail(jobId)}
                    onKeyDown={(e) => e.key === "Enter" && jobId && openDetail(jobId)}
                  >
                    <span className="job-type">{jobType}</span>
                    <h3 className="job-title">{title}</h3>
                    {location ? (
                      <div className="job-location">
                        <LocationOnIcon sx={{ fontSize: "1rem", color: BRAND }} />
                        {location}
                      </div>
                    ) : null}
                    <p className="job-description">{description}</p>
                    <div className="job-meta">
                      {salary ? (
                        <span className="job-salary">
                          <AttachMoneyIcon sx={{ fontSize: "0.9rem" }} />
                          {salary}
                        </span>
                      ) : null}
                      {experience ? <span className="job-experience">{experience}</span> : null}
                    </div>
                    <button type="button" className="apply-btn" onClick={(e) => { e.stopPropagation(); jobId && openDetail(jobId); }}>
                      Apply now <WorkIcon sx={{ fontSize: "1rem" }} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Culture */}
        <section className="culture-section">
          <div className="culture-content">
            <h2>More than a bakery. A family.</h2>
            <p>
              At Danbro, we believe the best bread is baked with love, laughter, and a little bit of flour on your apron.
              Our team members aren't just employees—they're bakers, artists, and innovators who shape our brand every day.
            </p>
            <div className="culture-stats">
              <div className="culture-stat">
                <span className="value">92%</span>
                <span className="label">employee satisfaction</span>
              </div>
              <div className="culture-stat">
                <span className="value">4.9</span>
                <span className="label">glassdoor rating</span>
              </div>
            </div>
          </div>
          <div className="culture-images">
            {CULTURE_IMAGES.map((src, i) => (
              <div key={i} className="culture-img">
                <img src={src} alt="" />
              </div>
            ))}
          </div>
        </section>

        {/* Perks */}
        <section className="perks-section">
          <div className="section-header">
            <div className="section-title">
              <Box className="section-title-icon" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CardGiftcardIcon sx={{ fontSize: "inherit" }} />
              </Box>
              <h2>Perks & benefits</h2>
            </div>
          </div>
          <div className="perks-grid">
            {PERKS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="perk-item">
                  <Box className="perk-icon">
                    <Icon sx={{ fontSize: "1.5rem" }} />
                  </Box>
                  <div className="perk-text">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="career-cta">
          <div className="cta-content">
            <h3>Didn't find your role?</h3>
            <p>We're always looking for passionate people. Send us your resume and we'll reach out when something matches.</p>
          </div>
          <a href="mailto:careers@danbro.com" className="cta-btn" style={{ textDecoration: "none" }}>
            <SendIcon /> Send open application
          </a>
        </section>

        {/* Footer */}
        <div className="career-footer">
          <Box component="span" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <WorkspacePremiumIcon sx={{ fontSize: "1rem", color: BRAND }} />
            Danbro Bakery Careers
          </Box>
          <span>·</span>
          <a href="mailto:careers@danbro.com">
            <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
              <EmailIcon sx={{ fontSize: "0.9rem" }} />
              careers@danbro.com
            </Box>
          </a>
          <span>·</span>
          <a href="tel:+918067891234">
            <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
              <PhoneIcon sx={{ fontSize: "0.9rem" }} />
              +91 80 6789 1234
            </Box>
          </a>
        </div>
      </Box>

      {/* Job detail dialog */}
      <Dialog open={detailOpen} onClose={closeDetail} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #eee", py: 2 }}>
          <Box component="span" sx={{ fontWeight: 700, color: "#2d1e1b", fontSize: "1.1rem" }}>
            {careerDetail ? getJobTitle(careerDetail) : "Job Details"}
          </Box>
          <IconButton onClick={closeDetail} size="small" aria-label="Close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          {detailLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress sx={{ color: BRAND }} />
            </Box>
          ) : careerDetail ? (
            <Box>
              <Box sx={{ color: "#5a4a45", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                {careerDetail.description ?? careerDetail.jobDescription ?? careerDetail.details ?? getJobDesc(careerDetail)}
              </Box>
              {getJobLocation(careerDetail) && (
                <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOnIcon sx={{ color: BRAND, fontSize: 20 }} />
                  <span>{getJobLocation(careerDetail)}</span>
                </Box>
              )}
              {(careerDetail.email ?? careerDetail.contactEmail) && (
                <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailIcon sx={{ color: BRAND, fontSize: 20 }} />
                  <span>{careerDetail.email ?? careerDetail.contactEmail}</span>
                </Box>
              )}
            </Box>
          ) : (
            <Box sx={{ color: "#6a5650" }}>Unable to load details.</Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};
