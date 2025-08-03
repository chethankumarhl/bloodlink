import React, { useState, useEffect } from 'react';
import blood1 from '../assets/corousel/blood1.jpg';
import blood2 from '../assets/corousel/blood2.jpg';
import blood3 from '../assets/corousel/blood3.jpg';

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      image: blood1,
      title: "Save Lives Today",
      subtitle: "Your donation can help save up to 3 lives"
    },
    {
      id: 2,
      image: blood2,
      title: "Be a Hero",
      subtitle: "Every drop counts in our mission to help others"
    },
    {
      id: 3,
      image: blood3,
      title: "Community Support",
      subtitle: "Join thousands of donors making a difference"
    },
    {
      id: 4,
      image: blood1,
      title: "Medical Excellence",
      subtitle: "State-of-the-art facilities ensure safe donations"
    },
    {
      id: 5,
      image: blood2,
      title: "Global Impact",
      subtitle: "Your contribution reaches those in need worldwide"
    }
  ];

  const totalSlides = slides.length;

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  return (
    <div className="w-full">
      <div className="relative w-full h-80 md:h-[450px] lg:h-[600px] overflow-hidden shadow-lg">
        {/* Slides */}
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                className="w-full h-full object-cover"
                alt={slide.title}
              />
              {/* Content overlay */}
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-xl md:text-3xl font-bold mb-2">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-base opacity-90">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-all duration-200"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-all duration-200"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? 'bg-white'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;