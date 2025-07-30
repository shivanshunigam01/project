import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Search,
  Share2,
  Target,
  Palette,
  BarChart3,
  Megaphone,
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  Users,
  Award,
  Clock,
} from "lucide-react";

const serviceDetails = {
  seo: {
    title: "Search Engine Optimization",
    icon: <Search className="w-16 h-16 text-blue-600" />,
    gradient: "from-blue-600 to-blue-800",
    description:
      "Dominate search results and drive qualified organic traffic with our comprehensive SEO strategies.",
    content: `Transform your online visibility with our data-driven SEO approach. We don't just optimize for search engines – we optimize for your business growth. Our team combines technical expertise with creative content strategies to ensure your website not only ranks higher but converts visitors into customers.

Our proven methodology has helped businesses increase their organic traffic by up to 300% within six months. We focus on sustainable, white-hat techniques that build long-term authority and trust with search engines.`,
    features: [
      {
        title: "Advanced Keyword Research & Analysis",
        description:
          "Identify high-value keywords with commercial intent and low competition",
      },
      {
        title: "Technical SEO Optimization",
        description:
          "Complete website audit and optimization for speed, mobile-friendliness, and crawlability",
      },
      {
        title: "Content Strategy & Creation",
        description:
          "SEO-optimized content that engages users and satisfies search intent",
      },
      {
        title: "Link Building & Authority Development",
        description:
          "Ethical backlink strategies to build domain authority and trust",
      },
      {
        title: "Local SEO Optimization",
        description:
          "Dominate local search results and Google My Business optimization",
      },
      {
        title: "Performance Tracking & Reporting",
        description:
          "Detailed monthly reports with actionable insights and ROI analysis",
      },
    ],
    benefits: [
      "Increase organic traffic by 200-500%",
      "Improve search rankings for target keywords",
      "Build long-term brand authority",
      "Reduce customer acquisition costs",
    ],
    stats: [
      { number: "300%", label: "Average Traffic Increase" },
      { number: "85%", label: "First Page Rankings" },
      { number: "6", label: "Months to Results" },
    ],
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=faces,entropy",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=faces,entropy",
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop&crop=faces,entropy",
    ],
  },
  smm: {
    title: "Social Media Marketing",
    icon: <Share2 className="w-16 h-16 text-purple-600" />,
    gradient: "from-purple-600 to-purple-800",
    description:
      "Build engaged communities and amplify your brand across all major social platforms.",
    content: `Connect with your audience where they spend their time. Our social media marketing strategies go beyond posting content – we create meaningful conversations that drive engagement, build brand loyalty, and generate leads.

From Instagram stories that captivate to LinkedIn campaigns that convert, we tailor our approach to each platform's unique audience and algorithm. Our creative team produces thumb-stopping content while our strategists ensure every post serves your business objectives.`,
    features: [
      {
        title: "Platform-Specific Content Strategy",
        description:
          "Tailored content for Instagram, Facebook, LinkedIn, Twitter, and TikTok",
      },
      {
        title: "Paid Social Media Campaigns",
        description:
          "High-converting ad campaigns with precise audience targeting",
      },
      {
        title: "Influencer Partnership Management",
        description:
          "Strategic collaborations with relevant influencers in your industry",
      },
      {
        title: "Community Management",
        description:
          "Real-time engagement and reputation management across platforms",
      },
      {
        title: "Social Commerce Integration",
        description:
          "Seamless shopping experiences directly through social platforms",
      },
      {
        title: "Analytics & Performance Optimization",
        description:
          "Data-driven insights to continuously improve engagement and conversions",
      },
    ],
    benefits: [
      "Build authentic brand communities",
      "Increase brand awareness by 400%",
      "Drive qualified traffic to your website",
      "Generate high-quality leads",
    ],
    stats: [
      { number: "400%", label: "Brand Awareness Boost" },
      { number: "250%", label: "Engagement Increase" },
      { number: "150%", label: "Lead Generation Growth" },
    ],
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=faces,entropy",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=faces,entropy",
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&h=400&fit=crop&crop=faces,entropy",
    ],
  },
  ppc: {
    title: "Paid Advertising (PPC)",
    icon: <Target className="w-16 h-16 text-orange-600" />,
    gradient: "from-orange-600 to-orange-800",
    description:
      "Maximize ROI with precision-targeted advertising campaigns across Google, Facebook, and LinkedIn.",
    content: `Stop wasting ad spend on unqualified clicks. Our PPC campaigns are built for performance, targeting users with high purchase intent at the exact moment they're ready to buy. We combine advanced audience targeting with compelling ad creative to deliver exceptional returns on investment.

Our certified experts manage every aspect of your campaigns, from keyword research and ad creation to bid optimization and conversion tracking. We don't just drive traffic – we drive revenue.`,
    features: [
      {
        title: "Search & Display Campaign Management",
        description:
          "Comprehensive Google Ads campaigns optimized for maximum visibility",
      },
      {
        title: "Advanced Audience Targeting",
        description:
          "Precision targeting based on demographics, interests, and behaviors",
      },
      {
        title: "Conversion Tracking & Optimization",
        description: "Complete funnel tracking with automated bid adjustments",
      },
      {
        title: "Creative Ad Development",
        description: "High-converting ad copy and visuals that drive action",
      },
      {
        title: "Retargeting & Remarketing",
        description:
          "Re-engage visitors who didn't convert with personalized campaigns",
      },
      {
        title: "Multi-Platform Campaign Management",
        description:
          "Coordinated campaigns across Google, Facebook, LinkedIn, and more",
      },
    ],
    benefits: [
      "Achieve 300-500% ROAS consistently",
      "Reduce cost per acquisition by 40%",
      "Increase qualified leads by 200%",
      "Get immediate visibility in search results",
    ],
    stats: [
      { number: "450%", label: "Average ROAS" },
      { number: "40%", label: "CPA Reduction" },
      { number: "24hrs", label: "Campaign Launch Time" },
    ],
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=faces,entropy",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=faces,entropy",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&crop=faces,entropy",
    ],
  },
  branding: {
    title: "Brand Design & Identity",
    icon: <Palette className="w-16 h-16 text-green-600" />,
    gradient: "from-green-600 to-green-800",
    description:
      "Create memorable brand identities that resonate with your audience and drive business growth.",
    content: `Your brand is more than a logo – it's the emotional connection between your business and your customers. We craft comprehensive brand identities that tell your story, communicate your values, and differentiate you from competitors.

From startups to established businesses looking for a rebrand, we create cohesive visual systems that work across all touchpoints. Our designs don't just look good – they drive recognition, trust, and customer loyalty.`,
    features: [
      {
        title: "Logo & Visual Identity Design",
        description: "Memorable logos and complete visual identity systems",
      },
      {
        title: "Brand Strategy & Positioning",
        description:
          "Define your unique value proposition and market positioning",
      },
      {
        title: "Brand Guidelines & Standards",
        description:
          "Comprehensive style guides for consistent brand application",
      },
      {
        title: "Marketing Material Design",
        description:
          "Business cards, brochures, banners, and promotional materials",
      },
      {
        title: "Website & Digital Branding",
        description:
          "Cohesive digital experiences that reflect your brand personality",
      },
      {
        title: "Brand Refresh & Evolution",
        description: "Modernize existing brands while maintaining brand equity",
      },
    ],
    benefits: [
      "Increase brand recognition by 80%",
      "Build customer trust and loyalty",
      "Command premium pricing",
      "Stand out from competitors",
    ],
    stats: [
      { number: "80%", label: "Brand Recognition Boost" },
      { number: "60%", label: "Customer Loyalty Increase" },
      { number: "23%", label: "Revenue Growth Average" },
    ],
    images: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop&crop=faces,entropy",
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&h=400&fit=crop&crop=faces,entropy",
      "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=600&h=400&fit=crop&crop=faces,entropy",
    ],
  },
  analytics: {
    title: "Analytics & Data Intelligence",
    icon: <BarChart3 className="w-16 h-16 text-red-600" />,
    gradient: "from-red-600 to-red-800",
    description:
      "Transform data into actionable insights that drive smarter business decisions and growth.",
    content: `Data without insights is just numbers. We transform your marketing data into clear, actionable intelligence that guides strategic decisions and maximizes ROI. Our comprehensive analytics approach covers every touchpoint of your customer journey.

From setting up advanced tracking systems to creating custom dashboards and reports, we ensure you have complete visibility into what's working and what's not. Make confident decisions backed by data, not guesswork.`,
    features: [
      {
        title: "Advanced Analytics Setup",
        description:
          "Google Analytics 4, Google Tag Manager, and custom tracking implementation",
      },
      {
        title: "Custom Dashboard Creation",
        description:
          "Real-time dashboards showing KPIs that matter to your business",
      },
      {
        title: "Conversion Funnel Analysis",
        description: "Identify bottlenecks and optimize the customer journey",
      },
      {
        title: "Attribution Modeling",
        description:
          "Understand which channels drive the most valuable customers",
      },
      {
        title: "Predictive Analytics",
        description: "Forecast trends and identify growth opportunities",
      },
      {
        title: "Comprehensive Reporting",
        description:
          "Monthly strategic reports with actionable recommendations",
      },
    ],
    benefits: [
      "Make data-driven decisions confidently",
      "Increase marketing ROI by 35%",
      "Identify new growth opportunities",
      "Optimize budget allocation",
    ],
    stats: [
      { number: "35%", label: "ROI Improvement" },
      { number: "90%", label: "Data Accuracy" },
      { number: "50%", label: "Decision Speed Increase" },
    ],
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=faces,entropy",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=faces,entropy",
      "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=600&h=400&fit=crop&crop=faces,entropy",
    ],
  },
  content: {
    title: "Content Marketing",
    icon: <Megaphone className="w-16 h-16 text-indigo-600" />,
    gradient: "from-indigo-600 to-indigo-800",
    description:
      "Engage, educate, and convert your audience with strategic content that drives results.",
    content: `Content is the fuel that powers modern marketing. Our content marketing strategies don't just fill your blog – they establish your authority, nurture leads, and drive conversions throughout the customer journey.

From thought leadership articles that position you as an industry expert to video content that goes viral, we create content that resonates with your audience and achieves your business objectives. Every piece is optimized for search, social sharing, and conversion.`,
    features: [
      {
        title: "Content Strategy & Planning",
        description:
          "Comprehensive content calendars aligned with business goals",
      },
      {
        title: "SEO-Optimized Blog Content",
        description:
          "High-quality articles that rank well and drive organic traffic",
      },
      {
        title: "Video Content Production",
        description: "Engaging video content for social media and website use",
      },
      {
        title: "Email Marketing Campaigns",
        description:
          "Automated email sequences that nurture leads into customers",
      },
      {
        title: "Lead Magnets & Resources",
        description: "Valuable content offers that capture and qualify leads",
      },
      {
        title: "Content Distribution Strategy",
        description: "Multi-channel content promotion for maximum reach",
      },
    ],
    benefits: [
      "Generate 3x more leads than traditional marketing",
      "Build trust and authority in your industry",
      "Reduce customer acquisition costs by 62%",
      "Create lasting customer relationships",
    ],
    stats: [
      { number: "300%", label: "Lead Generation Increase" },
      { number: "62%", label: "Lower Acquisition Cost" },
      { number: "13x", label: "Higher ROI vs Outbound" },
    ],
    images: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&crop=faces,entropy",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&crop=faces,entropy",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop&crop=faces,entropy",
    ],
  },
};

const ServicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const service = serviceDetails[id as keyof typeof serviceDetails];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl text-gray-400 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Service Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The service you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${service.gradient} text-white`}>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>

            <div className="mb-8 flex justify-center">{service.icon}</div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {service.title}
            </h1>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {service.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        <div
          ref={sectionRef}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* About Section */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Why Choose Our {service.title}?
              </h2>
              <div className="prose prose-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {service.content}
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              What's Included
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {service.features.map((feature, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-20">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                Key Benefits
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <p className="text-gray-700 font-medium">{benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Our Work in Action
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {service.images.map((img, idx) => (
                <div
                  key={idx}
                  className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <img
                    src={img}
                    alt={`${service.title} example ${idx + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div
              className={`bg-gradient-to-r ${service.gradient} rounded-2xl p-12 text-white`}
            >
              <Award className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Let's discuss how our {service.title.toLowerCase()} can drive
                your success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-gray-800 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center">
                  <Users className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-800 transition-colors duration-300 flex items-center justify-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Get Free Audit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
