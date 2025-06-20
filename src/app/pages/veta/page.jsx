'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaGraduationCap, FaChartLine, FaHandshake, FaUsers, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const VetaPage = () => {
  const [activeStep, setActiveStep] = useState(1);

  const programSteps = [
    {
      number: 1,
      title: "Foundation Building",
      description: "Master the fundamentals of entrepreneurship and business planning",
      icon: <FaGraduationCap className="w-6 h-6" />,
      details: [
        "Business model development",
        "Market research fundamentals",
        "Financial literacy basics",
        "Legal and regulatory essentials"
      ]
    },
    {
      number: 2,
      title: "Growth Strategy",
      description: "Develop and validate your business strategy",
      icon: <FaChartLine className="w-6 h-6" />,
      details: [
        "Market analysis and positioning",
        "Competitive strategy development",
        "Financial modeling and projections",
        "Growth planning and scaling"
      ]
    },
    {
      number: 3,
      title: "Launch Preparation",
      description: "Prepare for successful business launch",
      icon: <FaHandshake className="w-6 h-6" />,
      details: [
        "Pitch deck creation",
        "Funding strategy development",
        "Network building",
        "Launch plan execution"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
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
          <h1 className="text-5xl font-bold mb-4">
            Vetrepreneurship Academy (VETA)
          </h1>
          <p className="text-xl max-w-3xl mx-auto px-4">
            Launch and Scale Your Veteran-Led Business
          </p>
          <p className="text-xl max-w-3xl mx-auto px-4">
          WANAC's Vetrepreneurship Academy offers transitioning service members and veterans a robust entrepreneurial
education, equipping you with essential skills to successfully launch, grow, and sustain your business ventures.
Through a comprehensive, structured curriculum and expert mentorship, you'll transform your innovative ideas into
thriving enterprises.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              Apply Now
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#002147] transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      {/* Navigation Bar */}
      <section>
        <div className="relative w-full h-16 bg-[#002147] overflow-hidden flex items-center justify-center">
          <nav className="relative z-10 flex space-x-16 px-4">
            <a href="#program-overview" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
              Program Overview
            </a>
            <a href="#how-it-works" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
              How It Works
            </a>
            <a href="#success-stories" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
              Success Stories
            </a>
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

      {/* Overview Section */}
      <section id="overview" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#002147]">Why Choose Vetrepreneurship Academy?</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold mb-3 text-[#002147] text-xl">Comprehensive Entrepreneurial Training</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Master key entrepreneurial skills: ideation, business model development, financial modeling</li>
                <li>Gain practical expertise in customer discovery, market analysis, and competitive strategy</li>
                <li>Learn effective strategies to secure funding and attract investors</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold mb-3 text-[#002147] text-xl">Integrated and Structured Curriculum</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>The academy covers: Strategic business planning and market entry techniques</li>
                <li>Rigorous financial planning, projections, and management strategies</li>
                <li>Effective sales, marketing, and customer engagement methods</li>
                <li>Proven methodologies for startup success and sustainable business growth</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Program Section */}
      <section id="how-it-works" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#002147]">How the Academy Works</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Immersive Learning Modules */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col h-full">
              <h3 className="text-xl font-semibold text-[#002147] mb-4">Immersive Learning Modules</h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li>Interactive online courses and dynamic in-person workshops</li>
                <li>Real-world business scenario analyses and hands-on project work</li>
              </ul>
            </div>
            {/* Expert-Led Mentorship */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col h-full">
              <h3 className="text-xl font-semibold text-[#002147] mb-4">Expert-Led Mentorship</h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li>Personal mentoring from successful veteran entrepreneurs</li>
                <li>Ongoing coaching and feedback tailored to your specific venture</li>
              </ul>
            </div>
            {/* Practical Application */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col h-full">
              <h3 className="text-xl font-semibold text-[#002147] mb-4">Practical Application</h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li>Create investor-ready business plans and pitch decks</li>
                <li>Participate in practical simulations and real-world business challenges</li>
              </ul>
            </div>
            {/* Access to Networks and Resources */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col h-full">
              <h3 className="text-xl font-semibold text-[#002147] mb-4">Access to Networks and Resources</h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li>Connect with veteran-specific funding opportunities and industry leaders</li>
                <li>Leverage WANAC's extensive entrepreneurial network for growth and collaboration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Vetrepreneurship Candidates Section */}
      <section id="ideal-candidates" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#002147]">Ideal Vetrepreneurship Candidates</h2>
          <div className="max-w-3xl mx-auto">
            <ul className="list-disc pl-8 space-y-5 text-lg text-gray-700">
              <li>Veterans and service members transitioning into entrepreneurship</li>
              <li>Aspiring veteran entrepreneurs ready to develop and launch their business ideas</li>
              <li>Existing veteran business owners aiming to scale their enterprises</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#002147]">Success Stories</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <blockquote className="bg-white rounded-xl shadow-md p-6 text-lg italic text-gray-800 border-l-4 border-orange-500">
              “Vetrepreneurship Academy gave me the critical tools and support to launch my startup confidently. The mentorship was invaluable.”<br/>
              <span className="block mt-4 font-semibold text-[#002147]">– Veteran Entrepreneur</span>
            </blockquote>
            <blockquote className="bg-white rounded-xl shadow-md p-6 text-lg italic text-gray-800 border-l-4 border-orange-500">
              “The structured guidance and resources provided by the academy were key in scaling my business successfully.”<br/>
              <span className="block mt-4 font-semibold text-[#002147]">– Program Alumnus</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Begin Your Entrepreneurial Journey Section */}
      <section id="begin-journey" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#002147]">Begin Your Entrepreneurial Journey</h2>
          <p className="max-w-2xl mx-auto text-lg text-center text-gray-700 mb-8">
            Ready to build your entrepreneurial legacy? Schedule your complimentary consultation today and discover how WANAC's Vetrepreneurship Academy can support your journey to business success.
          </p>
          <div className="flex justify-center">
            <a
              href="#"
              className="inline-block bg-[#002147] text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-500 transition-colors text-lg shadow-md"
            >
              Schedule Your Complimentary Consultation &rarr;
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default VetaPage; 