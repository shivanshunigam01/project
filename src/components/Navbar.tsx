import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo.png";
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Industries", href: "/industries" },
    { name: "Blog", href: "/blog" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  // Scroll to top when the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <header className="bg-white border-b shadow-sm fixed w-full z-50 top-0">
      {/* keep overall height same; slightly tighter vertical padding for balance */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Inline logo: visually larger but does NOT increase navbar height */}
        <Link to="/" className="flex items-center">
          {/* Fixed-size box = same navbar height; overflow hidden clips the larger image */}
          <div className="relative h-15 md:h-14 w-[170px] md:w-[210px] overflow-hidden flex-shrink-0">
            <img
              src={Logo}
              alt="Zentroverse"
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[170%] md:h-[185%] w-auto select-none"
              style={{ imageRendering: "auto" }}
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          {menuItems.map((item) => {
            const isAnchor = item.href.startsWith("#");
            return isAnchor ? (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          {menuItems.map((item) => {
            const isAnchor = item.href.startsWith("#");
            return isAnchor ? (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
