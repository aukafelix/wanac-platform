"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navRef = useRef(null);

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
      className="bg-white/70 backdrop-blur-md shadow-md py-4 px-6 sticky top-0 z-50 transition duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-extrabold">
          <Link href="/" aria-label="WANAC Home">
            <Image
              src="/WANAC N 8 Old Glory.png"
              alt="WANAC Logo"
              width={120}
              height={40}
              priority
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav
          className="hidden md:flex space-x-6 items-center relative"
          ref={dropdownRef}
          aria-label="Desktop navigation"
        >
          <div className="relative">
            <button
              onClick={() => toggleDropdown("are")}
              onKeyDown={(e) => handleKeyDown(e, "are")}
              className="flex items-center text-black font-medium hover:text-orange-500"
              aria-expanded={activeDropdown === "are"}
              aria-haspopup="true"
            >
              WHO WE ARE<ChevronDown className="ml-1 w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown("help")}
              onKeyDown={(e) => handleKeyDown(e, "help")}
              className="flex items-center text-black font-medium hover:text-orange-500"
              aria-expanded={activeDropdown === "help"}
              aria-haspopup="true"
            >
              HOW WE HELP <ChevronDown className="ml-1 w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown("action")}
              onKeyDown={(e) => handleKeyDown(e, "action")}
              className="flex items-center text-black font-medium hover:text-orange-500"
              aria-expanded={activeDropdown === "action"}
              aria-haspopup="true"
            >
              TAKE ACTION <ChevronDown className="ml-1 w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown("resources")}
              onKeyDown={(e) => handleKeyDown(e, "resources")}
              className="flex items-center text-black font-medium hover:text-orange-500"
              aria-expanded={activeDropdown === "resources"}
              aria-haspopup="true"
            >
              RESOURCES <ChevronDown className="ml-1 w-4 h-4" aria-hidden="true" />
            </button>
          </div>
          
          <Link
            href="/donate"
            className="bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-orange-600"
          >
            DONATE
          </Link>
          <Link
            href="/strategy-session"
            className="bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-orange-600"
          >
            FREE STRATEGY SESSION
          </Link>
          <Link
            href="/shop"
            className="bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-orange-600"
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
            className="p-2"
          >
            <Menu className="w-6 h-6 text-black" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Full-width Dropdowns */}
      {activeDropdown === "are" && (
        <div 
          className="absolute left-0 top-full w-screen bg-white backdrop-blur-md border-t border-gray-200 shadow-md z-40 transition-all duration-200 ease-in-out"
          role="menu"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-0.5 text-black">
            <Link href="/Our Story" className="text-sm hover:text-orange-500 whitespace-nowrap py-1" role="menuitem">
              ★ Our Story 
            </Link>
            <Link href="/board" className="text-sm hover:text-orange-500 whitespace-nowrap py-1" role="menuitem">
              ★ Board of Directors
            </Link>
            <Link href="/advisory-board" className="text-sm hover:text-orange-500 whitespace-nowrap py-1" role="menuitem">
              ★ Advisory Board
            </Link>
            <Link href="/veteran-board" className="text-sm hover:text-orange-500 whitespace-nowrap py-1" role="menuitem">
              ★ Veteran Advisory Board
            </Link>
            <Link href="/executive-staff" className="text-sm hover:text-orange-500 whitespace-nowrap py-1" role="menuitem">
              ★ Executive Staff
            </Link>
          </div>
        </div>
      )}

      {activeDropdown === "help" && (
        <div 
          className="absolute left-0 top-full w-screen bg-white backdrop-blur-md border-t border-gray-200 shadow-md z-40 transition-all duration-200 ease-in-out"
          role="menu"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-0.5 text-black">
            <Link href="/why-coaching" className="text-sm hover:text-orange-500 whitespace-nowrap py-1" role="menuitem">
              ★ Why You Need a Coach
            </Link>
            <Link href="/approach" className="text-sm hover:text-orange-500 whitespace-nowrap py-1" role="menuitem">
              ★ Our Approach
            </Link>
            <Link href="/phase-1" className="text-sm hover:text-orange-500 whitespace-nowrap py-1" role="menuitem">
              ★ Phase 1
            </Link>
            <Link href="/phase-2" className="text-sm hover:text-orange-500 whitespace-nowrap py-1" role="menuitem">
              ★ Phase 2
            </Link>
            <Link href="/phase-3" className="text-sm hover:text-orange-500 whitespace-nowrap py-1" role="menuitem">
              ★ Phase 3
            </Link>
          </div>
        </div>
      )}

      {activeDropdown === "action" && (
        <div 
          className="absolute left-0 top-full w-screen bg-white backdrop-blur-md border-t border-gray-200 shadow-md z-40 transition-all duration-200 ease-in-out"
          role="menu"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-0.5 text-black">
            <Link href="/volunteer" className="text-sm hover:text-orange-500 whitespace-nowrap py-1" role="menuitem">
              ★ Volunteer
            </Link>
            <Link href="/partners" className="text-sm hover:text-orange-500 whitespace-nowrap py-1" role="menuitem">
              ★ Corporate Partners
            </Link>
            <Link href="/leadership" className="text-sm hover:text-orange-500 whitespace-nowrap py-1" role="menuitem">
              ★ Leadership Giving
            </Link>
            <Link href="/support" className="text-sm hover:text-orange-500 whitespace-nowrap py-1" role="menuitem">
              ★ Ways to Support
            </Link>
            <Link href="/testimonials" className="text-sm hover:text-orange-500 whitespace-nowrap py-1" role="menuitem">
              ★ Testimonials
            </Link>
          </div>
        </div>
      )}

      {activeDropdown === "resources" && (
        <div 
          className="absolute left-0 top-full w-screen bg-white backdrop-blur-md border-t border-gray-200 shadow-md z-40 transition-all duration-200 ease-in-out"
          role="menu"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-0.5 text-black">
            <Link href="/workshops" className="text-sm hover:text-orange-500 whitespace-nowrap py-1" role="menuitem">
              ★ Free Workshops
            </Link>
            <Link href="/guides" className="text-sm hover:text-orange-500 whitespace-nowrap py-1" role="menuitem">
              ★ Guides
            </Link>
            <Link href="/blog" className="text-sm hover:text-orange-500 whitespace-nowrap py-1" role="menuitem">
              ★ Blog
            </Link>
            <Link href="/help" className="text-sm hover:text-orange-500 whitespace-nowrap py-1" role="menuitem">
              ★ Help Center
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden mt-4 px-4 space-y-4 bg-white/90 backdrop-blur-md border-t py-4"
          role="menu"
        >
          <Link
            href="/who-we-are"
            className="block text-black font-medium hover:text-orange-500"
            role="menuitem"
          >
            ★ Who We Are
          </Link>
          <Link
            href="/how-we-help"
            className="block text-black font-medium hover:text-orange-500"
            role="menuitem"
          >
            ★ How We Help
          </Link>
          <Link
            href="/take-action"
            className="block text-black font-medium hover:text-orange-500"
            role="menuitem"
          >
            ★ Take Action
          </Link>
          <Link
            href="/resources"
            className="block text-black font-medium hover:text-orange-500"
            role="menuitem"
          >
            ★ Resources
          </Link>
          <Link
            href="/donate"
            className="block bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-orange-600"
            role="menuitem"
          >
            DONATE
          </Link>
        </div>
      )}
    </nav>
  );
}
