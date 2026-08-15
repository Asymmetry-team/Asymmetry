import { useState } from "react";

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = (e) => {
    e.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = (e) => {
    e.stopPropagation();
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const slideStyle = {
    backgroundImage: `url(${slides[currentIndex]})`,
  };

  return (
    <div className="image-slider">
      {slides.length > 1 && (
        <>
          <button
            type="button"
            className="slider-arrow slider-arrow--left"
            onClick={goToPrevious}
            aria-label="წინა ფოტო"
          >
            ‹
          </button>
          <button
            type="button"
            className="slider-arrow slider-arrow--right"
            onClick={goToNext}
            aria-label="შემდეგი ფოტო"
          >
            ›
          </button>
        </>
      )}
      <div className="slide-image" style={slideStyle}></div>
      {slides.length > 1 && (
        <div className="slide-dots">
          {slides.map((_, i) => (
            <span
              key={i}
              className={i === currentIndex ? "slide-dot is-active" : "slide-dot"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;