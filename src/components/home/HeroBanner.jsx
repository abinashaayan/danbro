import React, { useRef, useEffect } from "react";
import "./HeroBanner.css";
import { bannerSlides } from "../../utils/bannerSlides";

export const HeroBanner = () => {
  const slideRef = useRef(null);
  const intervalRef = useRef(null);

  const nextSlide = () => {
    const items = slideRef.current.querySelectorAll(".item");
    slideRef.current.appendChild(items[0]);
  };

  const prevSlide = () => {
    const items = slideRef.current.querySelectorAll(".item");
    slideRef.current.prepend(items[items.length - 1]);
  };

  // Auto slide functionality
  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 1000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Pause auto-slide on hover, resume on mouse leave
  const handleMouseEnter = () => {
    stopAutoSlide();
  };

  const handleMouseLeave = () => {
    startAutoSlide();
  };

  return (
    <>
   <div className="container">
      <div className="slide" ref={slideRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id ?? index}
            className="item"
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="content">
              <div className="name">{slide.title}</div>
              <div className="des">{slide.subtitle}</div>
              <a
                className="seeMore"
                href="http://34.206.193.218:5556"
                target="_blank"
                rel="noreferrer"
              >
                <button>See More</button>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="button">
        <button className="prev" onClick={prevSlide}>
          ◁
        </button>
        <button className="next" onClick={nextSlide}>
          ▷
        </button>
      </div>
    </div>
    </>
  );
};
