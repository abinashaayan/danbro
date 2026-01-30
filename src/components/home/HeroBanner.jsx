import { Box } from "@mui/material";
import { useRef, useState } from "react";
import "./HeroBanner.css";
import { bannerSlides } from "../../utils/bannerSlides";

const TRANSITION_DURATION = 450;

export const HeroBanner = () => {
  const bannerRef = useRef(null);
  const [orderedSlides, setOrderedSlides] = useState([...bannerSlides]);
  const [transitionPhase, setTransitionPhase] = useState("idle");
  const [direction, setDirection] = useState(null);
  const isAnimating = transitionPhase !== "idle";

  const handleNext = () => {
    if (isAnimating) return;
    setDirection("next");
    setTransitionPhase("exiting");
    setTimeout(() => {
      setOrderedSlides((prev) => {
        const next = [...prev];
        next.push(next.shift());
        return next;
      });
      setTransitionPhase("entering");
      setTimeout(() => {
        setTransitionPhase("idle");
        setDirection(null);
      }, TRANSITION_DURATION);
    }, TRANSITION_DURATION);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection("prev");
    setTransitionPhase("exiting");
    setTimeout(() => {
      setOrderedSlides((prev) => {
        const next = [...prev];
        next.unshift(next.pop());
        return next;
      });
      setTransitionPhase("entering");
      setTimeout(() => {
        setTransitionPhase("idle");
        setDirection(null);
      }, TRANSITION_DURATION);
    }, TRANSITION_DURATION);
  };

  return (
    <>
      <Box
        ref={bannerRef}
        sx={{
          width: "100%",
          maxWidth: "100vw",
          mb: 0,
          mt: { xs: "-2px", md: "-2px" },
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 0,
          py: 0,
          overflowX: "hidden",
        }}
      >
        <Box sx={{ position: "relative", width: "100%" }}>
        <Box className="hero-carousel-container">
          <Box
            className="hero-carousel-slide"
            data-transition={transitionPhase}
            data-direction={direction ?? ""}
          >
            {orderedSlides.map((slide, index) => {
              const imgSrc = typeof slide?.img === "string" ? slide.img : slide?.img?.default ?? slide?.img?.src ?? "";
              return (
              <Box
                key={`${slide?.id}-${index}`}
                className="hero-carousel-item"
                sx={{
                  backgroundImage: imgSrc ? `url(${imgSrc})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "50% 50%",
                }}
              >
                <Box className="hero-carousel-content">
                  <Box className="hero-carousel-name">{slide?.title}</Box>
                  <Box className="hero-carousel-des">{slide?.subtitle}</Box>
                  <a
                    className="hero-carousel-seeMore"
                    href={slide?.link || "/store"}
                    {...(typeof slide?.link === "string" && slide.link.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <button type="button">See More</button>
                  </a>
                </Box>
              </Box>
            );
            })}
          </Box>
          <Box className="hero-carousel-button">
            <button
              type="button"
              className="hero-carousel-prev"
              onClick={handlePrev}
              aria-label="Previous"
              disabled={isAnimating}
            >
              ◀
            </button>
            <button
              type="button"
              className="hero-carousel-next"
              onClick={handleNext}
              aria-label="Next"
              disabled={isAnimating}
            >
              ▶
            </button>
          </Box>
        </Box>

        {/* Zigzag shape – main image ke bottom pe, sharp sawtooth */}
        <Box
          className="elementor-shape elementor-shape-bottom"
          data-negative="false"
          aria-hidden="true"
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -1,
            width: "100%",
            height: { xs: "24px", md: "32px" },
            zIndex: 2,
            overflow: "hidden",
            lineHeight: 0,
            "& svg": { height: "100%", display: "block", verticalAlign: "middle" },
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 5.8" preserveAspectRatio="none">
            <path
              className="elementor-shape-fill"
            d="M5.4 0.4l5.4 5.3L16.5 0.4l5.4 5.3L27.5 0.4 33 5.7 38.6 0.4l5.5 5.4h.1L49.9 0.4l5.4 5.3L60.9 0.4l5.5 5.3L72 0.4l5.5 5.3L83.1 0.4l5.4 5.3L94.1 0.4l5.5 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.4 5.3L161 0.4l5.4 5.3L172 0.4l5.5 5.3 5.6-5.3 5.4 5.3 5.7-5.3 5.4 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.5 5.3L261 0.4l5.4 5.3L272 0.4l5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.7-5.4 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.7-5.3 5.4 5.4h.2l5.6-5.4 5.5 5.3L361 0.4l5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.7-5.4 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.6-5.4 5.5 5.3L461 0.4l5.5 5.3 5.6-5.3 5.4 5.3 5.7-5.3 5.4 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1L550 0.4l5.4 5.3L561 0.4l5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.4 5.3 5.7-5.3 5.4 5.3 5.6-5.3 5.5 5.4h.2L650 0.4l5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.4h.2L750 0.4l5.5 5.3 5.6-5.3 5.4 5.3 5.7-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.7-5.4 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.4h.2L850 0.4l5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.4 5.3 5.7-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.7-5.4 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.4 5.3 5.7-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.7-5.4 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.6-5.4 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.7-5.4 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.7-5.3 5.4 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.6-5.4 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.7-5.3 5.4 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.4h.1l5.7-5.4 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.6-5.4 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.7-5.3 5.4 5.3 5.6-5.3 5.5 5.4V0H-.2v5.8z"
            fill="#fff"
          />
        </svg>
      </Box>
        </Box>
      </Box>
    </>
  );
};
