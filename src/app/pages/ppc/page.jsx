'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const PpcPage = () => {
  const [activePhase, setActivePhase] = useState(1);

  return (
    <div className="bg-white">
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
            Peak Performance Coaching (PPC)
          </h1>
          <p className="text-xl max-w-3xl mx-auto px-4">
            Transform Your Potential into Exceptional Results
          </p>
        </div>
      </header>

      {/* Navigation Bar */}
      <section>
        <div className="relative w-full h-10 bg-[#002147] overflow-hidden flex items-center justify-center">
          <nav className="relative z-10 flex space-x-16 px-4">
            <a href="#program-overview" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
              Program Overview
            </a>
            <a href="#phases" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
              Program Phases
            </a>
            <a href="#experience" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
              Experience
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

      {/* Program Overview Section */}
      <section id="program-overview" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#002147]">Program Overview</h2>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold mb-6 text-[#002147]">Unlock Your Peak Potential</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Clearly define and pursue your personal and professional objectives</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Optimize physical, emotional, and mental energy for sustained performance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Build courage and resilience to confidently tackle challenges</span>
                </li>
              </ul>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Enhance productivity to consistently meet and exceed performance benchmarks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Improve influence and leadership capabilities to achieve impactful outcomes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Develop sustainable high-performance habits and mindsets</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Program Phases Section */}
      <section id="phases" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#002147]">Two Phases of Transformative Growth</h2>
          
          {/* Phase Selection Tabs */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setActivePhase(1)}
              className={`px-6 py-3 rounded-l-lg font-semibold transition-all ${
                activePhase === 1
                  ? 'bg-[#002147] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Phase 1: Foundations
            </button>
            <button
              onClick={() => setActivePhase(2)}
              className={`px-6 py-3 rounded-r-lg font-semibold transition-all ${
                activePhase === 2
                  ? 'bg-[#002147] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Phase 2: Mastery
            </button>
          </div>

          {/* Phase Content */}
          <div className="max-w-4xl mx-auto">
            {activePhase === 1 ? (
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
                <h3 className="text-xl font-semibold mb-6 text-[#002147]">Sessions 1–6: Foundations for Success</h3>
                <div className="grid gap-4">
                  {[
                    { title: 'Clarity', desc: 'Clarify your core mission, goals, and professional direction' },
                    { title: 'Energy', desc: 'Build strong, health-focused routines (sleep, nutrition, hydration, exercise, emotional wellness)' },
                    { title: 'Courage', desc: 'Develop resilient mindsets and strategies to effectively face adversity' },
                    { title: 'Productivity', desc: 'Master daily routines, prioritize effectively, and achieve measurable results' },
                    { title: 'Influence', desc: 'Develop interpersonal communication skills to enhance leadership and collaboration' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start group">
                      <div className="min-w-[24px] h-6 flex items-center justify-center bg-blue-100 rounded-full mr-3 group-hover:bg-blue-200 transition-colors">
                        <span className="text-[#002147] font-semibold">{index + 1}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#002147]">{item.title}:</span>
                        <span className="ml-2 text-gray-600">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
                <h3 className="text-xl font-semibold mb-6 text-[#002147]">Sessions 7–12: Mastery for Exceptional Results</h3>
                <div className="grid gap-4">
                  {[
                    { title: 'Psychology', desc: 'Deepen mindset strategies for lasting high-performance habits' },
                    { title: 'Physiology', desc: 'Maintain peak health through sustainable wellness practices' },
                    { title: 'Advanced Productivity', desc: 'Maximize productivity with advanced planning and execution strategies' },
                    { title: 'Persuasion', desc: 'Strengthen persuasive communication and build influential relationships' },
                    { title: 'Presence', desc: 'Enhance emotional intelligence and full situational engagement' },
                    { title: 'Purpose', desc: 'Align daily actions with a profound, meaningful professional and personal purpose' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start group">
                      <div className="min-w-[24px] h-6 flex items-center justify-center bg-blue-100 rounded-full mr-3 group-hover:bg-blue-200 transition-colors">
                        <span className="text-[#002147] font-semibold">{index + 1}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#002147]">{item.title}:</span>
                        <span className="ml-2 text-gray-600">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Experience Section */}
      <section id="experience" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#002147]">Customized Coaching Experience</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "One-on-One Coaching",
                desc: "Personalized sessions tailored to your individual goals",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                )
              },
              {
                title: "Interactive Workshops",
                desc: "Collaborative workshops designed to reinforce key strategies",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                )
              },
              {
                title: "Resources & Tools",
                desc: "Access to premium content and performance tracking tools",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                )
              },
              {
                title: "Progress Tracking",
                desc: "Regular assessments and performance analytics",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                )
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <svg className="w-6 h-6 text-[#002147]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="font-semibold mb-2 text-[#002147]">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[#002147] transform -skew-y-3 origin-top-right"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Take the First Step Towards Excellence
              </h3>
              <p className="text-lg text-gray-300 mb-8">
                Ready to redefine your limits and achieve lasting success? Schedule your complimentary consultation today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <Link 
                  href="/consultation"
                  className="w-full sm:w-auto bg-white text-[#002147] px-8 py-4 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Schedule Consultation
                </Link>
                <Link 
                  href="/contact"
                  className="w-full sm:w-auto bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#002147] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-72 h-72 bg-orange-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-72 h-72 bg-white rounded-full opacity-10 blur-3xl"></div>
      </section>
    </div>
  );
};

export default PpcPage; 