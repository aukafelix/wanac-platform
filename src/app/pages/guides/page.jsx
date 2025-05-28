"use client";

import React from "react";
import Link from "next/link";
import { FaBookOpen, FaCalendarAlt, FaQuestionCircle } from "react-icons/fa";

const GuidesPage = () => {
  // Sample guides data -this would come from a CMS or API
  const guides = [
    {
      id: 1,
      title: "Military to Civilian Transition Guide",
      description: "A comprehensive resource for service members preparing to transition to civilian life, covering employment, education, benefits, and more.",
      category: "Career & Employment",
      icon: "",
      downloadLink: "/downloads/military-civilian-transition-guide.pdf",
      lastUpdated: "March 2024",
      pages: 42,
      image: "/transitionguide.jpg"
    },
    {
      id: 2,
      title: "VA Benefits Handbook",
      description: "Navigate the complex world of VA benefits with this step-by-step guide to eligibility, application processes, and maximizing your benefits.",
      category: "Benefits & Resources",
      icon: "",
      downloadLink: "/downloads/va-benefits-handbook.pdf",
      lastUpdated: "February 2024",
      pages: 68,
      image: "/images/guides/va-benefits.jpg"
    },
    {
      id: 3,
      title: "Military Family Relocation Guide",
      description: "Essential information for military families facing PCS moves, including checklists, school transition tips, and community resources.",
      category: "Family Support",
      icon: "",
      downloadLink: "/downloads/military-family-relocation.pdf",
      lastUpdated: "January 2024",
      pages: 35,
      image: "/images/guides/family-relocation.jpg"
    },
    {
      id: 4,
      title: "Veteran Mental Health Resource Directory",
      description: "A comprehensive listing of mental health services, support groups, crisis resources, and self-care strategies for veterans and their families.",
      category: "Health & Wellness",
      icon: "",
      downloadLink: "/downloads/veteran-mental-health-directory.pdf",
      lastUpdated: "April 2024",
      pages: 53,
      image: "/images/guides/mental-health.jpg"
    },
    {
      id: 5,
      title: "Military Spouse Employment Toolkit",
      description: "Career resources specifically designed for military spouses, including remote work opportunities, portable careers, and resume strategies.",
      category: "Career & Employment",
      icon: "",
      downloadLink: "/downloads/spouse-employment-toolkit.pdf",
      lastUpdated: "December 2023",
      pages: 29,
      image: "/images/guides/spouse-employment.jpg"
    }
  ];

  const categories = [
    "All Categories",
    "Career & Employment",
    "Benefits & Resources",
    "Family Support",
    "Health & Wellness",
    "Education",
    "Financial Planning"
  ];

  const featuredGuide = guides[0]; // Using the Transition Guide as featured

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <header className="relative bg-[#002147] text-white">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url("/landingpage1.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 bg-[#002147] opacity-75"></div>
        <div className="relative z-10 py-16 text-center">
          <h1 className="text-5xl font-bold mb-4">RESOURCES GUIDES</h1>
          <p className="text-xl max-w-3xl mx-auto px-4">
            Access a wide range of resources to help you navigate your transition to civilian life.
          </p>
        </div>
      </header>
      <section>
          <div className="relative w-full h-10 bg-[#002147] overflow-hidden flex items-center justify-center">
            <nav className="relative z-10 flex space-x-16 px-4">
              <Link href="#Featured-Workshop" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Featured Guide
              </Link>
              <Link href="#Upcoming-Workshops" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                All Guides
              </Link>
            </nav>
            <div 
              className="absolute inset-0 w-full" 
              style={{
                animation: 'slide 20s linear infinite',
              }}
            >
              <div className="h-full bg-gradient-to-r from-blue-600 via-[#002147] to-blue-600 w-[200%]"></div>
            </div>
          </div>
        </section>

      {/* Featured Guide */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8">Featured Guides</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5">
                <img 
                  src={featuredGuide.image} 
                  alt={featuredGuide.title} 
                  className="w-full h-full object-cover"
                  style={{ minHeight: "400px" }}
                />
              </div>
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <span className="bg-orange-100 text-orange-600 text-xs font-medium px-3 py-1 rounded-full">
                    {featuredGuide.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-4">Updated: {featuredGuide.lastUpdated}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {featuredGuide.title}
                </h3>
                <p className="text-gray-600 mb-6">{featuredGuide.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-8">
                  <span className="flex items-center mr-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    {featuredGuide.pages} pages
                  </span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    PDF Download
                  </span>
                </div>
                <a
                  href={featuredGuide.downloadLink}
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300"
                  download
                >
                  Download Guide
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-6" id="guides-list">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  category === "All Categories" 
                    ? "bg-orange-500 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <div 
                key={guide.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col border border-gray-100"
              >
                <div className="h-48 relative">
                  <img 
                    src={guide.image} 
                    alt={guide.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-md">
                    {guide.icon}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center mb-4">
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                      {guide.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    {guide.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">{guide.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <span className="flex items-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {guide.lastUpdated}
                    </span>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      {guide.pages} pages
                    </span>
                  </div>
                  <a
                    href={guide.downloadLink}
                    className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300"
                    download
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Guide Section */}
      <section className="py-20 px-6 bg-[#002147]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl text-white font-bold mb-6">Need A Specific Resource</h2>
          <p className="text-lg text-white mb-8">
            Can't find what you're looking for? Let us know what resources would be helpful for you.
          </p>
          <a
            href="/contact?subject=Resource%20Request"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors duration-300"
          >
            Request a Guide
          </a>
        </div>
      </section>

      {/* How to Use Guides */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            How to Use Our Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold mb-4">Download</h3>
              <p className="text-gray-600">
                Choose the guide that fits your needs and download the PDF to your device for easy access.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold mb-4">Review</h3>
              <p className="text-gray-600">
                Each guide contains actionable steps, checklists, and resources you can use immediately.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <p className="text-gray-600">
                Reach out to our team if you need additional support or have questions about the resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-20 px-6 bg-[#002147]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-white font-semibold mb-12 text-center animate-fadeIn">
            Explore More Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slideUp">
              <div className="text-4xl mb-6 mx-auto w-16 h-16 flex items-center justify-center bg-orange-100 text-orange-500 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <FaBookOpen className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-orange-500 transition-colors duration-300">Blog Articles</h3>
              <p className="text-gray-600 mb-6">
                Read our latest articles on military life, veteran resources, and community stories.
              </p>
              <Link
                href="/resources/blogs"
                className="inline-flex items-center text-orange-500 hover:text-orange-700 font-medium group-hover:translate-x-2 transition-transform duration-300"
              >
                Read Articles <span className="ml-2">→</span>
              </Link>
            </div>
            
            <div className="group bg-white rounded-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slideUp [animation-delay:200ms]">
              <div className="text-4xl mb-6 mx-auto w-16 h-16 flex items-center justify-center bg-orange-100 text-orange-500 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <FaCalendarAlt className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-orange-500 transition-colors duration-300">Workshops & Events</h3>
              <p className="text-gray-600 mb-6">
                Join our virtual and in-person events designed to support your journey.
              </p>
              <Link
                href="/resources/workshops"
                className="inline-flex items-center text-orange-500 hover:text-orange-700 font-medium group-hover:translate-x-2 transition-transform duration-300"
              >
                View Calendar <span className="ml-2">→</span>
              </Link>
            </div>
            
            <div className="group bg-white rounded-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slideUp [animation-delay:400ms]">
              <div className="text-4xl mb-6 mx-auto w-16 h-16 flex items-center justify-center bg-orange-100 text-orange-500 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <FaQuestionCircle className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-orange-500 transition-colors duration-300">Help Center</h3>
              <p className="text-gray-600 mb-6">
                Find answers to common questions and access support resources.
              </p>
              <Link
                href="/resources/helpcenter"
                className="inline-flex items-center text-orange-500 hover:text-orange-700 font-medium group-hover:translate-x-2 transition-transform duration-300"
              >
                Get Help <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuidesPage;
