import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import GallerySection from "./components/GallerySection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import BackToTop from "./components/BackToTop";
import ServicePage from "./pages/ServicePage";
import OurWorkDetailPage from "./pages/OurWorkDetailPage";
import IndustriesPage from "./pages/IndustriesPage";
import BlogsPage from "./pages/Blogs";

function App() {
  return (
    <div className="min-h-screen font-['Poppins',sans-serif]">
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HeroSection />
              <AboutSection />
              <ServicesSection />
              <GallerySection />
              <TestimonialsSection />
              <ContactSection />
              <BackToTop />
            </>
          }
        />

        {/* Service Page Route */}
        <Route path="/service/:id" element={<ServicePage />} />
        <Route path="/ourwork" element={<OurWorkDetailPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/blog" element={<BlogsPage />} />
      </Routes>
    </div>
  );
}

export default App;
