import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { ChevronRight, Play } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const heroSlides = [
    {
      title: "Grow Your Business with Zentroverse",
      subtitle:
        "Transform your digital presence with our comprehensive marketing solutions",
      description:
        "From SEO to social media management, we help businesses achieve measurable growth through data-driven strategies and creative excellence.",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200",
      ctaText: "Request Proposal",
    },
    {
      title: "Drive Results with Smart Marketing",
      subtitle: "Innovative strategies that deliver real ROI",
      description:
        "Our team combines cutting-edge technology with proven marketing techniques to maximize your return on investment and accelerate business growth.",
      image:
        "https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=1200",
      ctaText: "Get Started Today",
    },
    {
      title: "Your Digital Success Partners",
      subtitle: "360-degree marketing solutions for modern businesses",
      description:
        "We don't just execute campaigns – we become your strategic partners, working closely with you to achieve long-term success in the digital landscape.",
      image:
        "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1200",
      ctaText: "Schedule Consultation",
    },
    {
      title: "Scale Beyond Expectations",
      subtitle: "Premium marketing services for ambitious brands",
      description:
        "Join hundreds of successful businesses that have transformed their growth trajectory with our award-winning digital marketing expertise.",
      image:
        "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200",
      ctaText: "View Case Studies",
    },
  ];

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      <ParticleBackground />

      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        loop
        className="h-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30"></div>
            </div>

            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-4 text-blue-100 font-medium">
                    {slide.subtitle}
                  </p>
                  <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
                    {slide.description}
                  </p>
                  <Link to={"/contact"}>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl inline-flex items-center space-x-2">
                      <span>{slide.ctaText}</span>
                      <ChevronRight size={20} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-500/10 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 right-20 w-12 h-12 bg-orange-500/10 rounded-full animate-ping"></div>
    </section>
  );
};

export default HeroSection;
