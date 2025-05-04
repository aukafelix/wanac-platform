"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";


export default function Navbar({ hideNavbar = false }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  
  // List of paths where the navbar should be hidden
  const navbarExcludedPaths = [
    '/dashboard',
    '/login',
    '/signup',
    '/signin',
    '/register',
    '/client',
    '/coach',
    '/admin',
    '/appointments',
    '/messages',
    '/community',
    '/journal',
    '/aichatbot',
    '/lifescore',
    '/resources',
    '/settings',
    '/mycoach',
    '/library',
  ];
  
  // Check if current path starts with any of the excluded paths
  const shouldHideNavbar = 
    hideNavbar || 
    navbarExcludedPaths.some(path => pathname?.startsWith(path));
  
  // If the navbar should be hidden, don't render it
  if (shouldHideNavbar) return null;

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleKeyDown = (e, menu) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown(menu);
    }
  };

  const handleClickOutside = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      !e.target.closest("button")
    ) {
      setActiveDropdown(null);
    }
  };

  // Function to handle navigation
  const handleNavigation = (href) => {
    setActiveDropdown(null); // Close dropdown
    window.location.href = href; // Navigate using window.location for direct navigation
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle(
          "backdrop-blur-md",
          window.scrollY > 10
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];
      
      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              firstFocusableElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isMobileMenuOpen]);

  return (
    <nav
      ref={navRef}
      className="bg-white/70 text-sm backdrop-blur-md shadow-md py-3 px-4 sticky top-0 z-50 transition duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href="/homepage" aria-label="WANAC Home">
            <Image
              src="/WANAC N 8 Old Glory.png"
              alt="WANAC Logo"
              width={150}
              height={50}
              priority
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav
          className="hidden md:flex space-x-4 items-center relative"
          ref={dropdownRef}
          aria-label="Desktop navigation"
        >
          <div className="relative">
            <button
              onClick={() => toggleDropdown("are")}
              onKeyDown={(e) => handleKeyDown(e, "are")}
              className={`flex items-center text-sm hover:text-orange-500 transition duration-500 ${
                activeDropdown === "are" ? "text-orange-500 font-medium" : "text-black"
              }`}
              aria-expanded={activeDropdown === "are"}
              aria-haspopup="true"
            >
              WHO WE ARE<ChevronDown className={`ml-1 w-3 h-3 transition-transform duration-500 ${activeDropdown === "are" ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown("help")}
              onKeyDown={(e) => handleKeyDown(e, "help")}
              className={`flex items-center text-sm hover:text-orange-500 transition duration-500 ${
                activeDropdown === "help" ? "text-orange-500 font-medium" : "text-black"
              }`}
              aria-expanded={activeDropdown === "help"}
              aria-haspopup="true"
            >
              HOW WE HELP <ChevronDown className={`ml-1 w-3 h-3 transition-transform duration-500 ${activeDropdown === "help" ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown("action")}
              onKeyDown={(e) => handleKeyDown(e, "action")}
              className={`flex items-center text-sm font hover:text-orange-500 transition duration-500 ${
                activeDropdown === "action" ? "text-orange-500 font-medium" : "text-black"
              }`}
              aria-expanded={activeDropdown === "action"}
              aria-haspopup="true"
            >
              TAKE ACTION <ChevronDown className={`ml-1 w-3 h-3 transition-transform duration-500 ${activeDropdown === "action" ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown("resources")}
              onKeyDown={(e) => handleKeyDown(e, "resources")}
              className={`flex items-center text-sm font hover:text-orange-500 transition duration-500 ${
                activeDropdown === "resources" ? "text-orange-500 font-medium" : "text-black"
              }`}
              aria-expanded={activeDropdown === "resources"}
              aria-haspopup="true"
            >
              RESOURCES <ChevronDown className={`ml-1 w-3 h-3 transition-transform duration-500 ${activeDropdown === "resources" ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
          </div>
          
          <Link
            href="/donate"
            className="bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300"
          >
            DONATE
          </Link>
          <Link
            href="/strategy"
            className="bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300"
          >
            FREE STRATEGY SESSION
          </Link>
          <Link
            href="/workshops"
            className="bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            SHOP
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
            className="p-1.5"
          >
            <Menu className="w-5 h-5 text-black" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Full-width Dropdowns */}
      <div 
        className={`absolute left-0 top-full w-screen bg-white backdrop-blur-md border-t border-gray-200 shadow-md z-40 transition-all duration-700 ease-in-out transform ${
          activeDropdown === "are" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        role="menu"
      >
        <div className="max-w-7xl mx-auto px-3 py-2 grid grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-1 text-black">
          <a 
            href="/ourstory" 
            onClick={() => handleNavigation("/ourstory")}
            className="text-sm font-bold hover:text-orange-500 whitespace-nowrap py-0.5 transition duration-300 cursor-pointer" 
            role="menuitem"
          >
            ★ Our Story 
          </a>
          <a 
            href="/ourstory" 
            onClick={() => handleNavigation("/ourstory")}
            className="text-sm font-bold hover:text-orange-500 whitespace-nowrap py-0.5 transition duration-300 cursor-pointer" 
            role="menuitem"
          >
            ★ Board of Directors
          </a>
          <a 
            href="/ourstory" 
            onClick={() => handleNavigation("/ourstory")}
            className="text-sm font-bold hover:text-orange-500 whitespace-nowrap py-0.5 transition duration-300 cursor-pointer" 
            role="menuitem"
          >
            ★ Advisory Board
          </a>
          <a 
            href="/ourstory" 
            onClick={() => handleNavigation("/ourstory")}
            className="text-sm font-bold hover:text-orange-500 whitespace-nowrap py-0.5 transition duration-300 cursor-pointer" 
            role="menuitem"
          >
            ★ Veteran Advisory Board
          </a>
          <a 
            href="/ourstory" 
            onClick={() => handleNavigation("/ourstory")}
            className="text-sm font-bold hover:text-orange-500 whitespace-nowrap py-0.5 transition duration-300 cursor-pointer" 
            role="menuitem"
          >
            ★ Executive Staff
          </a>
        </div>
      </div>

      <div 
        className={`absolute left-0 top-full w-screen bg-white backdrop-blur-md border-t border-gray-200 shadow-md z-40 transition-all duration-700 ease-in-out transform ${
          activeDropdown === "help" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        role="menu"
      >
        <div className="max-w-7xl mx-auto px-3 py-2 grid grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-1 text-black">
          <a 
            href="/howwehelp" 
            onClick={() => handleNavigation("/howwehelp")}
            className="text-sm font-bold hover:text-orange-500 whitespace-nowrap py-0.5 transition duration-300 cursor-pointer" 
            role="menuitem"
          >
            ★ Why You Need a Coach
          </a>
          <a 
            href="/howwehelp" 
            onClick={() => handleNavigation("/howwehelp")}
            className="text-sm font-bold hover:text-orange-500 whitespace-nowrap py-0.5 transition duration-300 cursor-pointer" 
            role="menuitem"
          >
            ★ Our Approach
          </a>
          <a 
            href="/howwehelp" 
            onClick={() => handleNavigation("/howwehelp")}
            className="text-sm font-bold hover:text-orange-500 whitespace-nowrap py-0.5 transition duration-300 cursor-pointer" 
            role="menuitem"
          >
            ★ Phase 1
          </a>
          <a 
            href="/howwehelp" 
            onClick={() => handleNavigation("/howwehelp")}
            className="text-sm font-bold hover:text-orange-500 whitespace-nowrap py-0.5 transition duration-300 cursor-pointer" 
            role="menuitem"
          >
            ★ Phase 2
          </a>
          <a 
            href="/howwehelp" 
            onClick={() => handleNavigation("/howwehelp")}
            className="text-sm font-bold hover:text-orange-500 whitespace-nowrap py-0.5 transition duration-300 cursor-pointer" 
            role="menuitem"
          >
            ★ Phase 3
          </a>
        </div>
      </div>

      <div 
        className={`absolute left-0 top-full w-screen bg-white backdrop-blur-md border-t border-gray-200 shadow-md z-40 transition-all duration-700 ease-in-out transform ${
          activeDropdown === "action" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        role="menu"
      >
        <div className="max-w-7xl mx-auto px-3 py-2 grid grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-1 text-black">
          <a 
            href="/volunteer" 
            onClick={() => handleNavigation("/volunteer")}
            className="text-sm font-bold hover:text-orange-500 whitespace-nowrap py-0.5 transition duration-300 cursor-pointer" 
            role="menuitem"
          >
            ★ Volunteer
          </a>
          <a 
            href="/corporatepartners" 
            onClick={() => handleNavigation("/corporatepartners")}
            className="text-sm font-bold hover:text-orange-500 whitespace-nowrap py-0.5 transition duration-300 cursor-pointer" 
            role="menuitem"
          >
            ★ Corporate Partners
          </a>
          <a 
            href="/leadership" 
            onClick={() => handleNavigation("/leadership")}
            className="text-sm font-bold hover:text-orange-500 whitespace-nowrap py-0.5 transition duration-300 cursor-pointer" 
            role="menuitem"
          >
            ★ Leadership Giving
          </a>
          <a 
            href="/support" 
            onClick={() => handleNavigation("/donate")}
            className="text-sm font-bold hover:text-orange-500 whitespace-nowrap py-0.5 transition duration-300 cursor-pointer" 
            role="menuitem"
          >
            ★ Ways to Support
          </a>
          <a 
            href="/testimonials" 
            onClick={() => handleNavigation("/testimonials")}
            className="text-sm font-bold hover:text-orange-500 whitespace-nowrap py-0.5 transition duration-300 cursor-pointer" 
            role="menuitem"
          >
            ★ Testimonials
          </a>
        </div>
      </div>

      <div 
        className={`absolute left-0 top-full w-screen bg-white backdrop-blur-md border-t border-gray-200 shadow-md z-40 transition-all duration-700 ease-in-out transform ${
          activeDropdown === "resources" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        role="menu"
      >
        <div className="max-w-7xl mx-auto px-3 py-2 grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-1 text-black">
          <a 
            href="/workshops" 
            onClick={() => handleNavigation("/workshops")}
            className="text-sm font-bold hover:text-orange-500 whitespace-nowrap py-0.5 transition duration-300 cursor-pointer" 
            role="menuitem"
          >
            ★ Free Workshops
          </a>
          <a 
            href="/guides" 
            onClick={() => handleNavigation("/guides")}
            className="text-sm font-bold hover:text-orange-500 whitespace-nowrap py-0.5 transition duration-300 cursor-pointer" 
            role="menuitem"
          >
            ★ Guides
          </a>
          <a 
            href="/blog" 
            onClick={() => handleNavigation("/blogs")}
            className="text-sm font-bold hover:text-orange-500 whitespace-nowrap py-0.5 transition duration-300 cursor-pointer" 
            role="menuitem"
          >
            ★ Blog
          </a>
          <a 
            href="/help" 
            onClick={() => handleNavigation("/helpcenter")}
            className="text-sm font-bold hover:text-orange-500 whitespace-nowrap py-0.5 transition duration-300 cursor-pointer" 
            role="menuitem"
          >
            ★ Help Center
          </a>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div 
        className={`md:hidden mt-3 px-3 space-y-3 bg-white/90 backdrop-blur-md border-t py-3 transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden pointer-events-none"
        }`}
        role="menu"
      >
        <Link
          href="/who-we-are"
          className="block text-black text-sm font-bold hover:text-orange-500 transition duration-300"
          role="menuitem"
        >
          ★ Who We Are
        </Link>
        <Link
          href="/howwehelp"
          className="block text-black text-sm font-bold hover:text-orange-500 transition duration-300"
          role="menuitem"
        >
          ★ How We Help
        </Link>
        <Link
          href="/take-action"
          className="block text-black text-sm font-bold hover:text-orange-500 transition duration-300"
          role="menuitem"
        >
          ★ Take Action
        </Link>
        <Link
          href="/resources"
          className="block text-black text-sm font-bold hover:text-orange-500 transition duration-300"
          role="menuitem"
        >
          ★ Resources
        </Link>
        <Link
          href="/donate"
          className="block bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300"
          role="menuitem"
        >
          DONATE
        </Link>
        <Link
          href="/strategy"
          className="block bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300"
          role="menuitem"
        >
          FREE STRATEGY SESSION
        </Link>
        <Link
          href="/workshops"
          className="block bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          role="menuitem"
        >
          SHOP
        </Link>
      </div>
    </nav>
  );
}