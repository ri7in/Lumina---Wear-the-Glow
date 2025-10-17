import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    image: "https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/hero-slide-1.jpg",
    title: "Wear the Glow",
    subtitle: "Premium aesthetic clothing that makes you feel radiant"
  },
  {
    image: "https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/hero-slide-2.jpg", 
    title: "Urban Comfort",
    subtitle: "Discover comfort that embraces style"
  },
  {
    image: "https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/hero-slide-3.jpg",
    title: "Effortless Elegance", 
    subtitle: "Every piece crafted to make you feel confident"
  }
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[calc(100vh-3.5rem)] flex items-end justify-center overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 pb-20">
        <h1 className="text-4xl md:text-6xl font-source font-semibold text-white mb-6 animate-slide-up">
          {slides[currentSlide].title}
        </h1>
        
        <p className="text-lg md:text-2xl text-white/90 mb-12 animate-slide-up font-source" style={{ animationDelay: '0.2s' }}>
          {slides[currentSlide].subtitle}
        </p>
        
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <a 
            href="/products"
            className="group inline-flex items-center space-x-3 px-8 py-4 text-lg btn-primary shadow-soft hover:shadow-glow transform hover:scale-105 font-source"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
