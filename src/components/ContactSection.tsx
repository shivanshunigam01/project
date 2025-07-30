import React, { useEffect, useRef, useState } from "react";
import { Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import SVGSeparator from "./SVGSeparator";

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    address: "",
    industry: "",
    message: "",
  });

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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendOtp = () => {
    setIsOtpSent(true);
    // Removed alert - now just sets the OTP sent state for demo
  };

  const verifyOtp = () => {
    // Accept any OTP for demo purposes
    if (enteredOtp.trim() !== "") {
      setIsOtpVerified(true);
      setStep(2);
    } else {
      alert("Please enter an OTP.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        company: "",
        address: "",
        industry: "",
        message: "",
      });
      setStep(1);
      setIsOtpSent(false);
      setIsOtpVerified(false);
      setEnteredOtp("");
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      content: "hello@elevate360digital.com",
      link: "mailto:hello@elevate360digital.com",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      content: "123 Business Ave, Suite 100\nNew York, NY 10001",
      link: "#",
    },
  ];

  return (
    <>
      <SVGSeparator type="curve" color="#1f2937" flip />
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600/10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-purple-600/10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-32 w-28 h-28 bg-orange-600/10 rounded-full animate-ping"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div
            ref={sectionRef}
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Request a Free Proposal
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Ready to elevate your digital presence? Let's discuss your goals
                and create a customized strategy that drives real results for
                your business.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/10">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-300">
                      We've received your proposal request and will get back to
                      you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {step === 1 && (
                      <>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter your full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter your phone number"
                            />
                          </div>
                        </div>

                        {!isOtpSent ? (
                          <button
                            type="button"
                            onClick={sendOtp}
                            disabled={!formData.name || !formData.phone}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors duration-200"
                          >
                            Send OTP
                          </button>
                        ) : !isOtpVerified ? (
                          <>
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-200 mb-2">
                                Enter OTP
                              </label>
                              <input
                                type="text"
                                value={enteredOtp}
                                onChange={(e) => setEnteredOtp(e.target.value)}
                                maxLength={6}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Enter any OTP (demo)"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={verifyOtp}
                              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                            >
                              Verify OTP
                            </button>
                          </>
                        ) : (
                          <div className="flex items-center space-x-2 text-green-400">
                            <CheckCircle className="w-5 h-5" />
                            <span>
                              Phone number verified! Please continue below.
                            </span>
                          </div>
                        )}
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter your email"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                              Select Industry
                            </label>
                            <select
                              name="industry"
                              value={formData.industry}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                backgroundPosition: "right 0.5rem center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "1.5em 1.5em",
                              }}
                            >
                              <option
                                value=""
                                className="bg-gray-800 text-white"
                              >
                                Select Industry
                              </option>
                              <option
                                value="Technology"
                                className="bg-gray-800 text-white"
                              >
                                Technology
                              </option>
                              <option
                                value="Healthcare"
                                className="bg-gray-800 text-white"
                              >
                                Healthcare
                              </option>
                              <option
                                value="E-commerce"
                                className="bg-gray-800 text-white"
                              >
                                E-commerce
                              </option>
                              <option
                                value="Finance"
                                className="bg-gray-800 text-white"
                              >
                                Finance
                              </option>
                              <option
                                value="Education"
                                className="bg-gray-800 text-white"
                              >
                                Education
                              </option>
                              <option
                                value="Real Estate"
                                className="bg-gray-800 text-white"
                              >
                                Real Estate
                              </option>
                              <option
                                value="Other"
                                className="bg-gray-800 text-white"
                              >
                                Other
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                              Company Name
                            </label>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter company name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                              Address
                            </label>
                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter your address"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-200 mb-2">
                            Tell us about your project
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Describe your project requirements..."
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105"
                        >
                          <Send className="w-5 h-5" />
                          <span>Get a Proposal</span>
                        </button>
                      </>
                    )}
                  </form>
                )}
              </div>

              <div className="space-y-8">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Get in Touch
                  </h3>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                          {info.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-1">
                            {info.title}
                          </h4>
                          <a
                            href={info.link}
                            className="text-gray-300 hover:text-blue-400 transition-colors duration-200 whitespace-pre-line"
                          >
                            {info.content}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Why Choose Elevate360?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-300">
                        Free initial consultation
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-300">
                        Customized strategy development
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-300">
                        Transparent pricing & reporting
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-300">
                        Dedicated account manager
                      </span>
                    </div>
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

export default ContactSection;
