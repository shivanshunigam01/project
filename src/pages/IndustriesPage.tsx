import React, { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  Globe,
  Building2,
  HeartPulse,
  GraduationCap,
  Home,
  ChevronRight,
  X,
  CheckCircle,
  TrendingUp,
  Users,
  Car,
  ShoppingBag,
  Gamepad2,
  Plane,
  Utensils,
  Shirt,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
const industryData = [
  {
    icon: <Briefcase className="w-10 h-10 text-blue-500" />,
    title: "Technology",
    description: "Empowering tech firms with data-driven digital strategies.",
    stats: { clients: "150+", growth: "300%", projects: "500+" },
    services: [
      "SaaS Marketing Strategy",
      "Product Launch Campaigns",
      "Developer Community Building",
      "B2B Lead Generation",
      "Technical Content Marketing",
      "App Store Optimization",
    ],
    caseStudy:
      "Helped a fintech startup increase user acquisition by 250% through targeted digital campaigns and strategic partnerships.",
    challenges: [
      "Rapid technology evolution",
      "Technical audience targeting",
      "Complex product positioning",
      "Competitive landscape",
    ],
  },
  {
    icon: <HeartPulse className="w-10 h-10 text-red-500" />,
    title: "Healthcare",
    description:
      "Helping healthcare providers reach patients with trust and transparency.",
    stats: { clients: "85+", growth: "180%", projects: "200+" },
    services: [
      "Patient Acquisition Campaigns",
      "Medical Practice SEO",
      "Healthcare Content Marketing",
      "HIPAA-Compliant Digital Solutions",
      "Telemedicine Promotion",
      "Medical Device Marketing",
    ],
    caseStudy:
      "Increased patient bookings by 400% for a multi-location clinic through local SEO and targeted social media campaigns.",
    challenges: [
      "Regulatory compliance (HIPAA)",
      "Building patient trust",
      "Medical accuracy requirements",
      "Sensitive topic handling",
    ],
  },
  {
    icon: <Globe className="w-10 h-10 text-green-500" />,
    title: "E-commerce",
    description: "Boosting sales and visibility for online businesses.",
    stats: { clients: "200+", growth: "450%", projects: "800+" },
    services: [
      "Amazon & Marketplace Optimization",
      "Conversion Rate Optimization",
      "Email Marketing Automation",
      "Social Commerce Strategy",
      "Influencer Partnerships",
      "Abandoned Cart Recovery",
    ],
    caseStudy:
      "Transformed a small online retailer into a $2M annual revenue business through comprehensive digital marketing strategy.",
    challenges: [
      "High competition",
      "Seasonal fluctuations",
      "Cart abandonment",
      "Customer retention",
    ],
  },
  {
    icon: <Building2 className="w-10 h-10 text-purple-500" />,
    title: "Finance",
    description:
      "Creating secure and compliant marketing for financial services.",
    stats: { clients: "60+", growth: "220%", projects: "150+" },
    services: [
      "Financial Content Marketing",
      "Compliance-First Campaigns",
      "Investment Lead Generation",
      "Banking Digital Transformation",
      "Insurance Marketing",
      "Fintech Product Launches",
    ],
    caseStudy:
      "Generated 500+ qualified leads for an investment firm while maintaining 100% regulatory compliance.",
    challenges: [
      "Strict regulatory requirements",
      "Trust and credibility",
      "Complex financial products",
      "Risk-averse audience",
    ],
  },
  {
    icon: <GraduationCap className="w-10 h-10 text-yellow-500" />,
    title: "Education",
    description: "Attracting students and promoting institutions effectively.",
    stats: { clients: "40+", growth: "160%", projects: "120+" },
    services: [
      "Student Enrollment Campaigns",
      "Educational Content Strategy",
      "Campus Virtual Tours",
      "Alumni Engagement Programs",
      "Online Course Promotion",
      "Educational App Marketing",
    ],
    caseStudy:
      "Increased enrollment by 60% for a private university through targeted digital campaigns and virtual campus experiences.",
    challenges: [
      "Declining enrollment trends",
      "Competition from online platforms",
      "Budget constraints",
      "Multi-generational audiences",
    ],
  },
  {
    icon: <Home className="w-10 h-10 text-orange-500" />,
    title: "Real Estate",
    description: "Driving leads and building trust in real estate markets.",
    stats: { clients: "90+", growth: "280%", projects: "300+" },
    services: [
      "Property Listing Optimization",
      "Virtual Property Tours",
      "Real Estate Agent Branding",
      "Local Market SEO",
      "Property Investment Marketing",
      "Real Estate CRM Integration",
    ],
    caseStudy:
      "Helped a real estate agency increase property sales by 180% through virtual tours and targeted local advertising.",
    challenges: [
      "Market volatility",
      "High-ticket decision making",
      "Local competition",
      "Seasonal market changes",
    ],
  },
  {
    icon: <Car className="w-10 h-10 text-blue-600" />,
    title: "Automotive",
    description:
      "Accelerating growth for automotive businesses and dealerships.",
    stats: { clients: "75+", growth: "190%", projects: "250+" },
    services: [
      "Dealership Digital Marketing",
      "Auto Parts E-commerce",
      "Service Center Promotion",
      "Vehicle Showcase Campaigns",
      "Automotive SEO",
      "Test Drive Lead Generation",
    ],
    caseStudy:
      "Increased dealership foot traffic by 300% and online inquiries by 450% through integrated digital campaigns.",
    challenges: [
      "Long sales cycles",
      "High competition",
      "Seasonal buying patterns",
      "Inventory management",
    ],
  },
  {
    icon: <ShoppingBag className="w-10 h-10 text-pink-500" />,
    title: "Retail",
    description:
      "Bridging online and offline retail experiences for maximum impact.",
    stats: { clients: "120+", growth: "320%", projects: "400+" },
    services: [
      "Omnichannel Marketing",
      "In-store Experience Design",
      "Loyalty Program Development",
      "Seasonal Campaign Management",
      "Retail Analytics",
      "Customer Journey Optimization",
    ],
    caseStudy:
      "Boosted a fashion retailer's online sales by 400% while maintaining strong in-store performance through omnichannel strategy.",
    challenges: [
      "Omnichannel integration",
      "Inventory synchronization",
      "Customer experience consistency",
      "Price competition",
    ],
  },
  {
    icon: <Gamepad2 className="w-10 h-10 text-indigo-500" />,
    title: "Gaming & Entertainment",
    description:
      "Engaging audiences in the dynamic world of gaming and entertainment.",
    stats: { clients: "55+", growth: "350%", projects: "180+" },
    services: [
      "Game Launch Campaigns",
      "Influencer Gaming Partnerships",
      "Esports Marketing",
      "Gaming Community Building",
      "Streaming Platform Promotion",
      "Gaming Content Creation",
    ],
    caseStudy:
      "Achieved 1M+ downloads in the first month for a mobile game through strategic influencer partnerships and viral campaigns.",
    challenges: [
      "Highly competitive market",
      "Rapidly changing trends",
      "Diverse audience segments",
      "Platform-specific strategies",
    ],
  },
  {
    icon: <Plane className="w-10 h-10 text-cyan-500" />,
    title: "Travel & Hospitality",
    description:
      "Creating memorable experiences and driving bookings in travel industry.",
    stats: { clients: "65+", growth: "240%", projects: "220+" },
    services: [
      "Destination Marketing",
      "Hotel Booking Optimization",
      "Travel Experience Promotion",
      "Tourism Board Campaigns",
      "Travel App Marketing",
      "Hospitality Reputation Management",
    ],
    caseStudy:
      "Increased hotel bookings by 320% during off-season through targeted promotional campaigns and experience-focused content.",
    challenges: [
      "Seasonal demand fluctuations",
      "Economic sensitivity",
      "Travel restrictions impact",
      "Experience vs. price balance",
    ],
  },
  {
    icon: <Utensils className="w-10 h-10 text-amber-500" />,
    title: "Food & Beverage",
    description:
      "Serving up success for restaurants, food brands, and culinary businesses.",
    stats: { clients: "95+", growth: "280%", projects: "350+" },
    services: [
      "Restaurant Digital Presence",
      "Food Delivery Optimization",
      "Culinary Brand Building",
      "Menu Engineering",
      "Food Photography & Content",
      "Franchise Marketing Support",
    ],
    caseStudy:
      "Helped a local restaurant chain expand to 15 locations with 500% revenue growth through digital marketing and brand positioning.",
    challenges: [
      "High competition",
      "Food quality consistency",
      "Local market preferences",
      "Delivery platform optimization",
    ],
  },
  {
    icon: <Shirt className="w-10 h-10 text-rose-500" />,
    title: "Fashion & Beauty",
    description: "Styling success for fashion brands and beauty companies.",
    stats: { clients: "80+", growth: "380%", projects: "280+" },
    services: [
      "Fashion Brand Development",
      "Beauty Product Launches",
      "Influencer Fashion Campaigns",
      "Seasonal Collection Marketing",
      "Beauty Tutorial Content",
      "Fashion E-commerce Optimization",
    ],
    caseStudy:
      "Launched a sustainable fashion brand that achieved $1M in sales within 6 months through authentic storytelling and influencer partnerships.",
    challenges: [
      "Fast-changing trends",
      "Visual content demands",
      "Seasonal inventory",
      "Sustainability expectations",
    ],
  },
];

const IndustriesPage = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openModal = (industry: any) => {
    setSelectedIndustry(industry);
  };

  const closeModal = () => {
    setSelectedIndustry(null);
  };

  return (
    <>
      <section className="pt-24 pb-12 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
        <div className="container mx-auto px-4">
          {/* 🔙 Back to Home Button */}
          <div className="mb-6 md:mb-8">
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm md:text-base"
            >
              Back to Home
            </button>
          </div>
          <div ref={sectionRef} className="opacity-100 translate-y-0">
            <div className="text-center mb-8 md:mb-16">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6">
                Industries We Serve
              </h1>
              <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                At Zentroverse, we specialize in providing tailored digital
                solutions across diverse industries. Our expertise spans
                multiple sectors, delivering measurable results and driving
                growth for businesses of all sizes.
              </p>
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span>1000+ Clients Served</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span>Average 250% Growth</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {industryData.map((industry, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-2xl p-4 md:p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-start group border border-gray-100"
                >
                  <div className="mb-3 md:mb-4 p-2 md:p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors duration-300">
                    {industry.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">
                    {industry.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 flex-grow mb-3 md:mb-4 leading-relaxed">
                    {industry.description}
                  </p>
                  <div className="w-full mb-3 md:mb-4">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>Clients: {industry.stats.clients}</span>
                      <span>Growth: {industry.stats.growth}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <button
                    onClick={() => openModal(industry)}
                    className="w-full mt-auto inline-flex justify-center items-center px-3 md:px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm md:text-base font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 group-hover:shadow-lg"
                  >
                    Learn More <ChevronRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedIndustry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4">
            <div className="sticky top-0 bg-white border-b p-4 md:p-6 flex justify-between items-center">
              <div className="flex items-center">
                <div className="p-1 md:p-2 bg-gray-50 rounded-lg mr-2 md:mr-4">
                  {selectedIndustry.icon}
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-gray-800">
                  {selectedIndustry.title}
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 md:p-6">
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
                {selectedIndustry.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8 p-4 md:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold text-blue-600">
                    {selectedIndustry.stats.clients}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Happy Clients
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold text-purple-600">
                    {selectedIndustry.stats.growth}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Average Growth
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold text-green-600">
                    {selectedIndustry.stats.projects}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Projects Completed
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">
                  Our Services
                </h3>
                <div className="grid grid-cols-1 gap-2 md:gap-3">
                  {selectedIndustry.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center p-2 md:p-3 bg-gray-50 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm md:text-base text-gray-700">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Case Study */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">
                  Success Story
                </h3>
                <div className="bg-green-50 border-l-4 border-green-500 p-3 md:p-4 rounded-r-lg">
                  <p className="text-sm md:text-base text-gray-700 italic">
                    "{selectedIndustry.caseStudy}"
                  </p>
                </div>
              </div>

              {/* Challenges */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">
                  Industry Challenges We Address
                </h3>
                <div className="grid grid-cols-1 gap-2 md:gap-3">
                  {selectedIndustry.challenges.map((challenge, index) => (
                    <div
                      key={index}
                      className="flex items-center p-2 md:p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-sm md:text-base text-gray-700">
                        {challenge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center p-4 md:p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white">
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Ready to Transform Your {selectedIndustry.title} Business?
                </h3>
                <p className="text-sm md:text-base mb-4">
                  Let's discuss how we can help you achieve similar results.
                </p>
                <Link to={"/contact"}>
                  <button className="bg-white text-blue-600 px-4 md:px-6 py-2 rounded-lg text-sm md:text-base font-medium hover:bg-gray-100 transition-colors">
                    Get Started Today
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IndustriesPage;
