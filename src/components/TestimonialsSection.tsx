import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import SVGSeparator from './SVGSeparator';

import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO, TechStart Solutions",
      image: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      content: "Elevate360 Digital transformed our online presence completely. Their strategic approach to SEO and content marketing helped us increase our organic traffic by 300% in just 6 months. The team is professional, responsive, and truly understands digital marketing.",
      company: "TechStart Solutions",
      results: "300% traffic increase"
    },
    {
      name: "Michael Chen",
      position: "Marketing Director, GrowthCorp",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      content: "Working with Elevate360 has been a game-changer for our business. Their paid advertising campaigns generated an impressive 400% ROI, and their social media strategies helped us build a community of over 50,000 engaged followers. Highly recommended!",
      company: "GrowthCorp",
      results: "400% ROI achieved"
    },
    {
      name: "Emily Rodriguez",
      position: "Founder, Creative Studios Inc",
      image: "https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      content: "The level of creativity and strategic thinking that Elevate360 brings to the table is exceptional. They redesigned our brand identity and launched a comprehensive digital campaign that resulted in a 250% increase in qualified leads. Outstanding work!",
      company: "Creative Studios Inc",
      results: "250% lead increase"
    },
    {
      name: "David Park",
      position: "VP Marketing, InnovateTech",
      image: "https://images.pexels.com/photos/3184422/pexels-photo-3184422.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      content: "Elevate360's data-driven approach and attention to detail sets them apart. They helped us optimize our conversion funnel and implement advanced analytics tracking. The result? A 180% improvement in our conversion rate and much better ROI on our marketing spend.",
      company: "InnovateTech",
      results: "180% conversion boost"
    }
  ];

  return (
    <>
      <SVGSeparator type="wave" color="#ffffff" flip />
      <section id="testimonials" className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-blue-600 rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border-2 border-purple-600 rounded-full"></div>
          <div className="absolute bottom-20 left-32 w-24 h-24 border-2 border-orange-600 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div 
            ref={sectionRef}
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Header */}
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <Quote className="w-16 h-16 text-blue-600 opacity-50" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Don't just take our word for it. Here's what industry leaders say about working with Elevate360 Digital.
              </p>
            </div>

            {/* Testimonials Carousel */}
            <div className="max-w-6xl mx-auto">
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  bulletClass: 'swiper-pagination-bullet !bg-blue-600',
                  bulletActiveClass: 'swiper-pagination-bullet-active',
                }}
                className="pb-12"
              >
                {testimonials.map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                      {/* Stars */}
                      <div className="flex space-x-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>

                      {/* Content */}
                      <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 italic">
                        "{testimonial.content}"
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center space-x-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 text-lg">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-600 mb-1">
                            {testimonial.position}
                          </div>
                          <div className="text-sm text-blue-600 font-medium">
                            {testimonial.company}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            {testimonial.results.split(' ')[0]}
                          </div>
                          <div className="text-xs text-gray-500 uppercase tracking-wide">
                            {testimonial.results.split(' ').slice(1).join(' ')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
                <div className="text-gray-600">Client Retention</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">300%</div>
                <div className="text-gray-600">Average Growth</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">10+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;