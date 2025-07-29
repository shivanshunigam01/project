import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, Target, Users, Zap } from 'lucide-react';
import SVGSeparator from './SVGSeparator';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Strategic Focus",
      description: "Data-driven strategies tailored to your unique business goals"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Expert Team",
      description: "Certified professionals with 10+ years of industry experience"
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-600" />,
      title: "Rapid Results",
      description: "Fast implementation with measurable outcomes within 30 days"
    }
  ];

  return (
    <>
      <SVGSeparator type="wave" color="#f9fafb" />
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div 
            ref={sectionRef}
            className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                  Elevating Brands to New Heights
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  At Elevate360 Digital, we're not just another marketing agency. We're your strategic growth partners, 
                  committed to transforming your digital presence and driving measurable results.
                </p>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                With over a decade of experience in digital marketing, our team has helped over 500 businesses 
                across various industries achieve their growth objectives. From startups to enterprise-level 
                organizations, we deliver customized solutions that align with your business goals.
              </p>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6 pt-6">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`text-center transition-all duration-500 delay-${index * 200}`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="flex justify-center mb-3">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-4 pt-6">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-lg font-medium text-gray-700">
                  500+ Successful Projects • 95% Client Retention Rate
                </span>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Team working on digital marketing strategies"
                  className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">250%</div>
                    <div className="text-sm text-gray-600">Average ROI Increase</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;