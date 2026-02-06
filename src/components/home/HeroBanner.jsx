import { useRef, useEffect } from "react";
import "./HeroBanner.css";
import { bannerSlides } from "../../utils/bannerSlides";

const AUTO_SLIDE_INTERVAL_MS = 2000;

export const HeroBanner = () => {
  const slideRef = useRef(null);

  const nextSlide = () => {
    if (!slideRef.current) return;
    const items = slideRef.current.querySelectorAll(".item");
    if (items.length) slideRef.current.appendChild(items[0]);
  };

  const prevSlide = () => {
    if (!slideRef.current) return;
    const items = slideRef.current.querySelectorAll(".item");
    if (items.length) slideRef.current.prepend(items[items.length - 1]);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, AUTO_SLIDE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container">
        <div className="slide" ref={slideRef}>
          {bannerSlides?.map((slide, index) => (
            <div
              key={slide.id ?? index}
              className="item"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="content">
                <div className="name">{slide?.title}</div>
                <div className="des">{slide?.subtitle}</div>
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
