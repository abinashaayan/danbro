import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Box } from '@mui/material';

export const CustomCarousel = forwardRef(({ 
  children, 
  slidesToShow = 1, 
  slidesToScroll = 1,
  autoplay = false,
  autoplaySpeed = 3000,
  infinite = true,
  arrows = true,
  dots = false,
  pauseOnHover = true,
  swipeToSlide = true,
  speed = 500,
  cssEase = 'ease-out',
  responsive = [],
  beforeChange,
  afterChange,
  customArrow,
  ...props 
}, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef(null);
  const autoplayRef = useRef(null);
  const childrenArray = Array.isArray(children) ? children : [children];

  // Get responsive slidesToShow based on window width
  const getResponsiveSlidesToShow = useCallback(() => {
    const width = window.innerWidth;
    let responsiveSlides = slidesToShow;
    
    // Sort responsive breakpoints by width (descending)
    const sortedResponsive = [...responsive].sort((a, b) => b.breakpoint - a.breakpoint);
    
    for (const breakpoint of sortedResponsive) {
      if (width <= breakpoint.breakpoint) {
        responsiveSlides = breakpoint.settings.slidesToShow;
      }
    }
    
    return responsiveSlides;
  }, [slidesToShow, responsive]);

  const [currentSlidesToShow, setCurrentSlidesToShow] = useState(() => getResponsiveSlidesToShow());

  // Update slidesToShow on window resize
  useEffect(() => {
    const handleResize = () => {
      setCurrentSlidesToShow(getResponsiveSlidesToShow());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getResponsiveSlidesToShow]);

  // Autoplay functionality
  useEffect(() => {
    if (autoplay && !isPaused && !isDragging) {
      autoplayRef.current = setInterval(() => {
        handleNext();
      }, autoplaySpeed);
    } else {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, isPaused, isDragging, autoplaySpeed, currentIndex]);

  const handleNext = useCallback(() => {
    if (beforeChange) beforeChange(currentIndex, currentIndex + 1);
    
    const maxIndex = infinite ? childrenArray.length : childrenArray.length - currentSlidesToShow + 1;
    const nextIndex = infinite ? (currentIndex + 1) % childrenArray.length : 
                       Math.min(currentIndex + 1, maxIndex - 1);
    
    setCurrentIndex(nextIndex);
    setTranslateX(-nextIndex * (100 / currentSlidesToShow));
    
    if (afterChange) afterChange(nextIndex);
  }, [currentIndex, childrenArray.length, currentSlidesToShow, infinite, beforeChange, afterChange]);

  const handlePrev = useCallback(() => {
    if (beforeChange) beforeChange(currentIndex, currentIndex - 1);
    
    const prevIndex = infinite ? 
      (currentIndex - 1 + childrenArray.length) % childrenArray.length : 
      Math.max(currentIndex - 1, 0);
    
    setCurrentIndex(prevIndex);
    setTranslateX(-prevIndex * (100 / currentSlidesToShow));
    
    if (afterChange) afterChange(prevIndex);
  }, [currentIndex, childrenArray.length, currentSlidesToShow, infinite, beforeChange, afterChange]);

  const handleDotClick = (index) => {
    if (beforeChange) beforeChange(currentIndex, index);
    setCurrentIndex(index);
    setTranslateX(-index * (100 / currentSlidesToShow));
    if (afterChange) afterChange(index);
  };

  // Touch/Swipe handlers
  const handleTouchStart = (e) => {
    if (!swipeToSlide) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !swipeToSlide) return;
    e.preventDefault();
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    const swipeThreshold = 50;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    if (!swipeToSlide) return;
    setIsDragging(true);
    setStartX(e.clientX);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !swipeToSlide) return;
    e.preventDefault();
    const currentX = e.clientX;
    const diff = startX - currentX;
    const swipeThreshold = 50;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    handleNext,
    handlePrev,
    getCurrentIndex: () => currentIndex,
    pause: () => setIsPaused(true),
    play: () => setIsPaused(false)
  }));

  // Calculate total slides needed for infinite loop
  const getDisplaySlides = () => {
    if (!infinite) return childrenArray;
    
    // Clone slides for infinite scrolling
    const clonesNeeded = Math.ceil(currentSlidesToShow);
    const beforeClones = childrenArray.slice(-clonesNeeded).map((child, index) => ({
      ...child,
      key: `clone-before-${index}`,
      isClone: true,
      originalIndex: childrenArray.length - clonesNeeded + index
    }));
    
    const afterClones = childrenArray.slice(0, clonesNeeded).map((child, index) => ({
      ...child,
      key: `clone-after-${index}`,
      isClone: true,
      originalIndex: index
    }));
    
    return [...beforeClones, ...childrenArray, ...afterClones];
  };

  const displaySlides = getDisplaySlides();
  const actualIndex = infinite ? currentIndex + currentSlidesToShow : currentIndex;

  // Calculate dots
  const dotsCount = infinite ? 
    childrenArray.length : 
    Math.max(1, childrenArray.length - currentSlidesToShow + 1);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        userSelect: isDragging ? 'none' : 'auto',
        cursor: isDragging ? 'grabbing' : 'grab',
        ...props.sx
      }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => {
        pauseOnHover && setIsPaused(false);
        handleMouseLeave();
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Box
        sx={{
          display: 'flex',
          transition: isDragging ? 'none' : `transform ${speed}ms ${cssEase}`,
          transform: `translateX(${translateX}%)`,
          willChange: 'transform'
        }}
      >
        {displaySlides.map((child, index) => (
          <Box
            key={child.key || index}
            sx={{
              flex: `0 0 ${100 / currentSlidesToShow}%`,
              padding: '0 4px'
            }}
          >
            {child}
          </Box>
        ))}
      </Box>

      {/* Custom Arrows */}
      {arrows && customArrow && (
        <>
          <Box onClick={handlePrev}>
            {customArrow.prev}
          </Box>
          <Box onClick={handleNext}>
            {customArrow.next}
          </Box>
        </>
      )}

      {/* Dots */}
      {dots && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mt: 2
          }}
        >
          {Array.from({ length: dotsCount }).map((_, index) => (
            <Box
              key={index}
              onClick={() => handleDotClick(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: index === (infinite ? currentIndex % childrenArray.length : currentIndex) 
                  ? 'var(--themeColor)' 
                  : 'rgba(0,0,0,0.3)',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
});

export const CustomCarouselArrow = ({ direction, onClick, sx, children, ...props }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        backgroundColor: '#fff',
        border: '2px solid rgba(255,181,161,0.3)',
        width: { xs: 40, md: 50 },
        height: { xs: 40, md: 50 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        '&:hover': {
          backgroundColor: 'var(--themeColor)',
          borderColor: 'var(--themeColor)',
          transform: 'translateY(-50%) scale(1.1)',
          '& svg': {
            color: '#fff',
          },
        },
        ...(direction === 'prev' ? { left: { xs: 5, md: 10 } } : { right: { xs: 5, md: 10 } }),
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
