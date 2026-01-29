"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function Navbar({ hideNavbar = false }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileNavView, setMobileNavView] = useState("main"); // "main" or section key
  const dropdownRef = useRef(null);
  const navRef = useRef(null);
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );
  const [language, setLanguage] = useState("English");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const languageOptions = ["English", "Spanish", "French", "German"];
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const langDropdownRef = useRef(null);

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
    '/pages/coach',
    '/pages/vsoclaimsupport',
  ];
  
  // Check if current path starts with any of the excluded paths
  const shouldHideNavbar = 
    hideNavbar || 
    navbarExcludedPaths.some(path => pathname?.startsWith(path));
  
  // If the navbar should be hidden, don't render it
  if (shouldHideNavbar) return null;

  const navigation = {
    are: {
      title: "WHO WE ARE",
      items: [
        { label: "Our Story", href: "/pages/ourstory" },
        { label: "Core Pillars", href: "/pages/ourstory#corepillars" },
        { label: "Strategic Aspirations", href: "/pages/ourstory#strategicaspirations" },
        //{ label: "Board of Directors", href: "/pages/ourstory#boardofdirectors" },
        { label: "Executive Staff", href: "/pages/ourstory#executivestaff" }
      ]
    },
    help: {
      title: "HOW WE HELP",
      items: [
        
        { label: "Our Approach", href: "/pages/howwehelp#approach" },
        { label: "PLEP", href: "/pages/wanacplep" },
        { label: "PLCA", href: "/pages/wanacplca" },
        { label: "PPC", href: "/pages/wanacppc" },
        { label: "VETA", href: "/pages/vetaacademy" },
        { label: "CPPC", href: "/pages/wanacppc" },
        { label: "VSO CLAIM", href: "/pages/vsoclaimsupport" }
      ]
    },
    action: {
      title: "TAKE ACTION",
      items: [
        { label: "Volunteer", href: "/pages/volunteer" },
        { label: "Ways to Support", href: "/pages/donate" },
        { label: "Testimonials", href: "/pages/testimonials" },
        { label: "University Partner", href: "/pages/wanacuniversityInstitutionalpartner" },
        { label: "Webinar Registration", href: "/pages/wanacwebinarregistration" }
      ]
    },
    resources: {
      title: "RESOURCES",
      items: [
        { label: "Free Workshops", href: "/pages/workshops" },
        { label: "Help Center", href: "/pages/helpcenter" },
        { label: "WANAC Careers", href: "/pages/wanaccareers" },
        { label: "Scholarships", href: "/pages/scholarshipelidgibilityestimator" },
        { label: "Hiring Partners", href: "/pages/employerandhiringpatner" },
        { label: "Transition Quiz", href: "/pages/transitionreadinessquiz" }
      ]
    }
  };

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
  const router = useRouter();

  const handleNavigation = (href) => {
    setActiveDropdown(null);
    setActiveMobileDropdown(null);
    setIsMobileMenuOpen(false);
    router.push(href); // client-side route change
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!showLangDropdown) return;
    function handleClickOutside(event) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setShowLangDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLangDropdown]);

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

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-100">
        {/* Top Bar - Compact & Modern */}
        <div className="w-full text-white text-xs flex items-center justify-between px-4 lg:px-6 py-1.5 bg-gradient-to-r from-[#002147] to-[#003368]">
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Language Selector Dropdown */}
            <div className="relative flex items-center select-none" ref={langDropdownRef}>
              <button
                type="button"
                className="flex items-center gap-1.5 px-2 py-1 hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                onClick={e => { e.stopPropagation(); setShowLangDropdown(v => !v); }}
                aria-haspopup="listbox"
                aria-expanded={showLangDropdown}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span className="hidden sm:inline">{language}</span>
                <svg className={`w-3 h-3 transition-transform duration-200 ${showLangDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showLangDropdown && (
                <div className="absolute top-full left-0 mt-2 min-w-[140px] bg-white text-gray-900 shadow-xl border border-gray-200 overflow-hidden z-50 animate-fadeIn" role="listbox">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      className={`w-full text-left px-4 py-2.5 hover:bg-orange-50 transition-colors duration-150 ${lang === language ? "font-semibold bg-orange-50 text-orange-600" : "text-gray-700"}`}
                      onClick={e => { e.stopPropagation(); setLanguage(lang); setShowLangDropdown(false); }}
                      role="option"
                      aria-selected={lang === language}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* High Contrast Toggle */}
            <div className="hidden md:flex items-center gap-2">
              
              <span className="text-xs hidden lg:inline">High Contrast</span>
              <label className="relative inline-flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isDark}
                  onChange={() => setIsDark(!isDark)}
                />
                <div className="w-9 h-5 bg-white/20 rounded-full peer peer-checked:bg-orange-500 transition-all duration-300 group-hover:ring-2 ring-white/30"></div>
                <div className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${isDark ? "translate-x-4" : ""}`}></div>
              </label>
            </div>
          </div>
          {/* Search, Customer & Support, and Log In */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Icon and Input */}
            <div className="relative flex items-center">
              <button
                className="p-1.5 sm:p-2 hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                onClick={() => setShowSearch((v) => !v)}
                aria-label="Search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              {showSearch && (
                <input
                  type="text"
                  className="absolute right-0 top-full mt-2 px-3 py-1.5 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 text-xs shadow-lg border border-gray-200 animate-fadeIn"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  autoFocus
                  onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                  onKeyDown={e => { if (e.key === 'Escape') setShowSearch(false); }}
                  style={{ minWidth: '180px' }}
                />
              )}
            </div>
            <a href="/pages/helpcenter" className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 hover:bg-white/10 transition-all duration-200 text-xs">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 1 1 5.82 0c0 1.5-1.5 2.25-2.25 2.25S12 13.5 12 15" />
                <circle cx="12" cy="18" r="1" />
              </svg>
              <span className="hidden lg:inline">Support</span>
            </a>
            <a href="/login" className="px-2.5 sm:px-3 py-1 border border-orange-400 text-orange-400 hover:bg-orange-500 hover:!text-white hover:border-orange-500 transition-all duration-200 font-semibold text-xs">Log In</a>
          </div>
        </div>
        <nav
          ref={navRef}
          className="relative text-sm py-2.5 px-4 lg:px-6 transition duration-300 bg-transparent"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Desktop Nav */}
          <div className="hidden lg:flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center">
              <Link href="/" aria-label="WANAC Home" className="transform hover:scale-105 transition-transform duration-200">
                <Image
                  src="/WANAC N 8 Old Glory.png"
                  alt="WANAC Logo"
                  width={160}
                  height={60}
                  priority
                  className="object-contain"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="flex items-center justify-end gap-6 xl:gap-8 flex-1" ref={dropdownRef}>
              {Object.entries(navigation).map(([key, section]) => (
                <div key={key} className="relative">
                  <button
                    onClick={() => toggleDropdown(key)}
                    onKeyDown={(e) => handleKeyDown(e, key)}
                    className={`flex items-center text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap px-3 py-2 hover:bg-gray-50 ${
                      activeDropdown === key ? "text-orange-500 bg-orange-50" : "text-gray-800 hover:text-orange-500"
                    }`}
                    aria-expanded={activeDropdown === key}
                    aria-haspopup="true"
                  >
                    {section.title}
                    <ChevronDown 
                      className={`ml-1 w-3.5 h-3.5 transition-transform duration-300 ${
                        activeDropdown === key ? "rotate-180" : ""
                      }`} 
                      aria-hidden="true" 
                    />
                  </button>
                </div>
              ))}

              {/* Action Buttons - More Compact & Modern */}
              <div className="flex items-center gap-2">
                <Link
                  href="/pages/donate"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-3 py-2 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 transform transition-all duration-200 whitespace-nowrap"
                >
                  DONATE
                </Link>
                <Link
                  href="/pages/programintakeform"
                  className="bg-gradient-to-r from-[#002147] to-[#003368] text-white text-xs font-bold px-3 py-2 hover:shadow-lg hover:shadow-blue-900/30 hover:scale-105 transform transition-all duration-200 whitespace-nowrap"
                >
                  FREE SESSION
                </Link>
                <Link
                  href="/pages/workshops"
                  className="border-2 border-orange-500 text-orange-600 text-xs font-bold px-3 py-1.5 hover:bg-orange-500 hover:text-white transform hover:scale-105 transition-all duration-200 whitespace-nowrap"
                >
                  SHOP
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Nav - Different layout */}
          <div className="flex lg:hidden justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center">
              <Link href="/" aria-label="WANAC Home" className="flex items-center gap-2">
                <Image
                  src="/WANAC N 8 Old Glory.png"
                  alt="WANAC Logo"
                  width={130}
                  height={48}
                  priority
                  className="object-contain"
                />
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/pages/donate"
                className="px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-sm"
              >
                Donate
              </Link>
              <button
                className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  setActiveMobileDropdown(null);
                  setMobileNavView("main");
                }}
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
                <div className="relative flex flex-col justify-between w-6 h-4">
                  {/* top line */}
                  <span
                    className={`block h-0.5 w-full rounded-full bg-gray-800 transform transition-transform duration-300 ${
                      isMobileMenuOpen ? "translate-y-1.5 rotate-45" : ""
                    }`}
                  />
                  {/* middle line */}
                  <span
                    className={`block h-0.5 w-full rounded-full bg-gray-800 transition-opacity duration-300 ${
                      isMobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  {/* bottom line */}
                  <span
                    className={`block h-0.5 w-full rounded-full bg-gray-800 transform transition-transform duration-300 ${
                      isMobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Dropdown Menu - Positioned relative to nav (desktop only) */}
          {activeDropdown && (
            <div className="hidden lg:block absolute top-full left-0 w-full bg-gradient-to-r from-[#002147] to-[#003368] text-white py-6 z-50 shadow-xl border-t border-orange-500/20 animate-fadeIn">
              <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-x-8 gap-y-3 px-8">
                {navigation[activeDropdown]?.items.map((item, index) => (
                  <React.Fragment key={index}>
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className="text-sm hover:text-orange-400 transition-all duration-200 hover:scale-105 transform font-medium bg-transparent border-none cursor-pointer"
                    >
                      {item.label}
                    </button>
                    {index < navigation[activeDropdown].items.length - 1 && (
                      <span className="text-orange-500 text-xs">★</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Menu - Simple slide-out like reference design */}
          {isMobileMenuOpen && (
            <React.Fragment>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-[90] bg-black/40 lg:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Right slide-out panel */}
              <div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                className="fixed inset-0 z-[95] lg:hidden flex items-stretch justify-end"
              >
                <div className="h-full w-[80vw] max-w-xs bg-white rounded-l-2xl shadow-2xl flex flex-col overflow-hidden">
                  {/* Header row with close icon */}
                  <div className="flex items-center justify-between px-5 py-4 border-b">
                    <span className="sr-only">Navigation</span>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-150"
                      aria-label="Close menu"
                    >
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Links */}
                  <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                    {Object.entries(navigation).map(([key, section]) => (
                      <div key={key} className="space-y-1">
                        <div className="text-xs font-semibold tracking-wide text-gray-500">
                          {section.title}
                        </div>
                        {section.items.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => handleNavigation(item.href)}
                            className="block w-full text-left py-2 text-sm text-gray-900 hover:text-orange-500"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Bottom CTAs */}
                  <div className="px-5 py-4 border-t space-y-2">
                    <Link
                      href="/pages/donate"
                      className="block w-full text-center py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      DONATE
                    </Link>
                    <Link
                      href="/pages/programintakeform"
                      className="block w-full text-center py-2.5 rounded-full bg-[#002147] text-white text-sm font-semibold"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      FREE STRATEGY SESSION
                    </Link>
                    <Link
                      href="/pages/workshops"
                      className="block w-full text-center py-2.5 rounded-full border border-orange-500 text-orange-600 text-sm font-semibold"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      SHOP
                    </Link>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </nav>
      </header>

      {/* Global Mobile Menu Overlay (outside header to avoid layout issues) */}
      {isMobileMenuOpen && (
        <React.Fragment>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[9998] bg-black/40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Right slide-out panel */}
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            className="fixed inset-y-0 right-0 z-[9999] lg:hidden flex items-stretch"
          >
            <div className="h-full w-[80vw] max-w-xs bg-white shadow-2xl flex flex-col overflow-hidden">
              {/* Header row with close icon */}
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <span className="sr-only">Navigation</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-150"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Links - accordion style for mobile */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {Object.entries(navigation).map(([key, section]) => {
                  const isOpen = activeMobileDropdown === key;
                  return (
                    <div key={key} className="border-b border-gray-100 pb-2">
                      <button
                        onClick={() =>
                          setActiveMobileDropdown(isOpen ? null : key)
                        }
                        className="w-full flex items-center justify-between py-2 text-sm font-semibold text-gray-900"
                        aria-expanded={isOpen}
                        aria-controls={`mobile-section-${key}`}
                      >
                        <span>{section.title}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      {isOpen && (
                        <div
                          id={`mobile-section-${key}`}
                          className="mt-1 pl-2 space-y-1"
                        >
                          {section.items.map((item, index) => (
                            <button
                              key={index}
                              onClick={() => handleNavigation(item.href)}
                              className="block w-full text-left py-1.5 text-sm text-gray-700 hover:text-orange-500"
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom CTAs */}
              <div className="px-5 py-4 border-t space-y-2">
                <Link
                  href="/pages/programintakeform"
                  className="block w-full text-center py-2.5 rounded-full bg-[#002147] text-white text-sm font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FREE STRATEGY SESSION
                </Link>
                <Link
                  href="/pages/workshops"
                  className="block w-full text-center py-2.5 rounded-full border border-orange-500 text-orange-600 text-sm font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  SHOP
                </Link>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
}