import { useRef } from "react";
import "./HeroBanner.css";
import { bannerSlides } from "../../utils/bannerSlides";

export const HeroBanner = () => {
  const slideRef = useRef(null);

  const nextSlide = () => {
    const items = slideRef.current.querySelectorAll(".item");
    slideRef.current.appendChild(items[0]);
  };

  const prevSlide = () => {
    const items = slideRef.current.querySelectorAll(".item");
    slideRef.current.prepend(items[items.length - 1]);
  };

  return (
    <>
   <div className="container">
      <div className="slide" ref={slideRef}>
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
                href="https://github.com/MDJAmin"
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
