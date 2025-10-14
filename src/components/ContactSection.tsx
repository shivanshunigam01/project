import React, { useEffect, useRef, useState } from "react";
import { Send, Mail, MapPin, CheckCircle, Home } from "lucide-react";
import SVGSeparator from "./SVGSeparator";
import toast from "react-hot-toast";
import { sendOtp, verifyOtp, submitContactForm } from "../services/apiService";

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [isContactPage, setIsContactPage] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    industry: "",
    message: "",
    budget: "",
  });

  useEffect(() => {
    setIsContactPage(window.location.pathname === "/contact");
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Send OTP
  const handleSendOtp = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Please enter your name and email.");
      return;
    }
    const id = toast.loading("Sending OTP...");
    try {
      await sendOtp(formData.name, formData.email);
      setIsOtpSent(true);
      toast.dismiss(id);
      toast.success("OTP sent to your email. (Use 123456 for demo)");
    } catch (error: any) {
      toast.dismiss(id);
      toast.error(error.message || "Failed to send OTP.");
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    if (!enteredOtp.trim()) {
      toast.error("Please enter the OTP.");
      return;
    }
    const id = toast.loading("Verifying OTP...");
    try {
      const data = await verifyOtp(formData.email, enteredOtp);
      toast.dismiss(id);
      if (data.verified || data.message.includes("verified")) {
        toast.success("OTP Verified Successfully 🎉");
        setIsOtpVerified(true);
        setStep(2);
      } else toast.error("Invalid OTP");
    } catch (error: any) {
      toast.dismiss(id);
      toast.error(error.message || "Verification failed.");
    }
  };

  // ✅ Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpVerified) {
      toast.error("Please verify your email first.");
      return;
    }

    const id = toast.loading("Submitting your request...");
    try {
      await submitContactForm(formData);
      toast.dismiss(id);
      toast.success("Proposal request submitted successfully 🎯");
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          address: "",
          industry: "",
          message: "",
          budget: "",
        });
        setStep(1);
        setIsOtpSent(false);
        setIsOtpVerified(false);
        setEnteredOtp("");
      }, 2500);
    } catch (error: any) {
      toast.dismiss(id);
      toast.error(error.message || "Submission failed.");
    }
  };

  const handleBackToHome = () => (window.location.href = "/");

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      content: "hello@zentroverse.com",
      link: "mailto:hello@zentroverse.com",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      content: "405, Block B, Shyamyash Enclave, Razabazar, Patna, 800014",
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
            {isContactPage && (
              <div className="mb-8">
                <button
                  onClick={handleBackToHome}
                  className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <Home className="w-5 h-5" />
                  <span>Back to Homepage</span>
                </button>
              </div>
            )}

            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Request a Free Proposal
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Ready to elevate your digital presence? Let’s discuss your goals
                and create a customized strategy that drives real results.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* LEFT FORM */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/10">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-300">
                      We’ve received your request and will contact you soon.
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
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter your full name"
                            />
                          </div>

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
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter your email"
                            />
                          </div>
                        </div>

                        {!isOtpSent ? (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
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
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500"
                                placeholder="Enter 123456 for demo"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={handleVerifyOtp}
                              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                            >
                              Verify OTP
                            </button>
                          </>
                        ) : (
                          <div className="flex items-center space-x-2 text-green-400">
                            <CheckCircle className="w-5 h-5" />
                            <span>Verified successfully!</span>
                          </div>
                        )}
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                              Industry
                            </label>
                            <select
                              name="industry"
                              value={formData.industry}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-gray-800 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Select Industry</option>
                              <option value="Technology">Technology</option>
                              <option value="Healthcare">Healthcare</option>
                              <option value="E-commerce">E-commerce</option>
                              <option value="Finance">Finance</option>
                              <option value="Education">Education</option>
                              <option value="Real Estate">Real Estate</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                              Company Name
                            </label>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter company name"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-200 mb-2">
                            Message / Project Details
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe your project..."
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105"
                        >
                          <Send className="w-5 h-5" />
                          <span>Submit Request</span>
                        </button>
                      </>
                    )}
                  </form>
                )}
              </div>

              {/* RIGHT INFO CARD */}
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
