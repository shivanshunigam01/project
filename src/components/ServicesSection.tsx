import React, { useEffect, useRef, useState } from 'react';
import { Search, Share2, Target, Palette, BarChart3, Megaphone } from 'lucide-react';
import SVGSeparator from './SVGSeparator';

const ServicesSection = () => {
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

  const services = [
    {
      icon: <Search className="w-12 h-12 text-blue-600" />,
      title: "Search Engine Optimization",
      description: "Boost your organic visibility and drive qualified traffic with our proven SEO strategies that deliver long-term results.",
      features: ["Keyword Research", "On-Page Optimization", "Technical SEO", "Content Strategy"]
    },
    {
      icon: <Share2 className="w-12 h-12 text-purple-600" />,
      title: "Social Media Marketing",
      description: "Build engaged communities and increase brand awareness across all major social media platforms.",
      features: ["Content Creation", "Community Management", "Influencer Partnerships", "Social Analytics"]
    },
    {
      icon: <Target className="w-12 h-12 text-orange-600" />,
      title: "Paid Advertising",
      description: "Maximize ROI with targeted PPC campaigns across Google Ads, Facebook, Instagram, and LinkedIn.",
      features: ["Campaign Setup", "Ad Optimization", "Budget Management", "Performance Tracking"]
    },
    {
      icon: <Palette className="w-12 h-12 text-green-600" />,
      title: "Brand Design",
      description: "Create compelling visual identities that resonate with your audience and differentiate your brand.",
      features: ["Logo Design", "Brand Guidelines", "Marketing Materials", "Website Design"]
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-red-600" />,
      title: "Analytics & Reporting",
      description: "Make data-driven decisions with comprehensive analytics and detailed performance reporting.",
      features: ["Custom Dashboards", "ROI Analysis", "Conversion Tracking", "Monthly Reports"]
    },
    {
      icon: <Megaphone className="w-12 h-12 text-indigo-600" />,
      title: "Content Marketing",
      description: "Engage your audience with high-quality content that educates, entertains, and converts.",
      features: ["Content Strategy", "Blog Writing", "Video Production", "Email Campaigns"]
    }
  ];

  return (
    <>
      <SVGSeparator type="curve" color="#ffffff" flip />
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div 
            ref={sectionRef}
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Our Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Comprehensive digital marketing solutions designed to accelerate your business growth 
                and establish a dominant online presence.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-500 group cursor-pointer ${
                    isVisible ? 'animate-fade-in-up' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                      Learn More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;