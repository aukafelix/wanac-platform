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
        </div>
      </header>

      {/* Navigation Bar */}
      <section>
        <div className="relative w-full h-10 bg-[#002147] overflow-hidden flex items-center justify-center">
          <nav className="relative z-10 flex space-x-16 px-4">
            <a href="#overview" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
              Overview
            </a>
            <a href="#program" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
              Program
            </a>
            <a href="#apply" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
              Apply
            </a>
          </nav>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#002147]">Why Choose Vetrepreneurship Academy?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FaGraduationCap className="w-6 h-6 text-[#002147]" />
              </div>
              <h3 className="font-semibold mb-3 text-[#002147]">Comprehensive Training</h3>
              <p className="text-gray-600">Master key entrepreneurial skills through our structured curriculum</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FaUsers className="w-6 h-6 text-[#002147]" />
              </div>
              <h3 className="font-semibold mb-3 text-[#002147]">Expert Mentorship</h3>
              <p className="text-gray-600">Learn from successful veteran entrepreneurs and industry leaders</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FaHandshake className="w-6 h-6 text-[#002147]" />
              </div>
              <h3 className="font-semibold mb-3 text-[#002147]">Network Access</h3>
              <p className="text-gray-600">Connect with investors, partners, and fellow veteran entrepreneurs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Program Section */}
      <section id="program" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#002147]">Program Journey</h2>
          <div className="max-w-6xl mx-auto">
            {/* Step Navigation */}
            <div className="flex justify-center mb-8">
              {programSteps.map((step) => (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(step.number)}
                  className={`mx-2 px-6 py-2 rounded-full transition-all duration-300 ${
                    activeStep === step.number
                      ? 'bg-[#002147] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Step {step.number}
                </button>
              ))}
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300">
              {programSteps.map((step) => (
                activeStep === step.number && (
                  <div key={step.number} className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-[#002147] text-white flex items-center justify-center">
                        {step.icon}
                      </div>
                      <h3 className="text-2xl font-semibold text-[#002147]">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 text-lg">{step.description}</p>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-[#002147] mb-4">Key Components:</h4>
                      <ul className="space-y-3">
                        {step.details.map((detail, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <FaCheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section id="apply" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#002147]">Ready to Begin Your Journey?</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-[#002147]">Program Requirements</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3" />
                    <span>Veteran or transitioning service member status</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3" />
                    <span>Business idea or existing business</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3" />
                    <span>Commitment to full program participation</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-[#002147]">Next Steps</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-[#002147] font-semibold">1</span>
                    </div>
                    <span>Complete the online application form</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-[#002147] font-semibold">2</span>
                    </div>
                    <span>Schedule an initial consultation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-[#002147] font-semibold">3</span>
                    </div>
                    <span>Begin your entrepreneurial journey</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link 
                href="/apply/veta"
                className="inline-flex items-center bg-[#002147] text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-500 transition-colors"
              >
                Apply Now <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VetaPage; 