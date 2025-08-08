'use client';

import React from 'react';
import Link from 'next/link';

const PlcaPage = () => {
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Source Sans Pro', Arial, sans-serif" }}>
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
        <div className="relative z-10 py-20 text-center">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>
            Promise Land Career Accelerator (PLCA)
          </h1>
          <p className="text-xl max-w-3xl mx-auto px-4">
            Accelerate your career transition with confidence through WANAC's proven methodologies and comprehensive support system.
          </p>
          <p className="text-xl max-w-3xl mx-auto px-4">
          WANAC's Promise Land Career Accelerator (PLCA) is specifically designed to support transitioning service members
and veterans in achieving successful and fulfilling civilian careers. Utilizing proven methodologies, PLCA prepares
participants with the essential skills needed to thrive professionally in diverse sectors.
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
     <section>
        <div className="relative w-full h-16 bg-[#002147] overflow-hidden flex items-center justify-center">
          <nav className="relative z-10 flex space-x-8 px-4">
            <a href="#program-overview" className="text-white hover:text-blue-300 transition-colors text-sm font-bold flex flex-col items-center gap-0.5">
              Program Overview
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#how-it-works" className="text-white hover:text-blue-300 transition-colors text-sm font-bold flex flex-col items-center gap-0.5">
              How It Works
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#success-stories" className="text-white hover:text-blue-300 transition-colors text-sm font-bold flex flex-col items-center gap-0.5">
              Success Stories
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
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
      <section id="overview" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#002147]" style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>Program Overview</h2>
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8 items-stretch">
              {/* Strategic Career Readiness Card */}
              <div className="flex-1 bg-white border border-orange-100 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-orange-200 transition-shadow duration-300">
                <div className="mb-4">
                  {/* Icon: Briefcase */}
                  <svg className="w-12 h-12 text-orange-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 7V5a4 4 0 0 0-8 0v2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#002147]" style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>Strategic Career Readiness</h3>
                <ul className="space-y-3 text-gray-700 text-base text-left mx-auto max-w-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Comprehensive career management skills training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Personalized coaching to define clear career objectives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Targeted strategies for securing internships and job placements</span>
                  </li>
                </ul>
              </div>
              {/* Expert-Designed Curriculum Card */}
              <div className="flex-1 bg-white border border-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-blue-200 transition-shadow duration-300">
                <div className="mb-4">
                  {/* Icon: Academic Cap */}
                  <svg className="w-12 h-12 text-blue-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 3L2 9l10 6 10-6-10-6z" />
                    <path d="M2 9v6c0 2.21 4.48 4 10 4s10-1.79 10-4V9" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#002147]" style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>Expert-Designed Curriculum</h3>
                <ul className="space-y-3 text-gray-700 text-base text-left mx-auto max-w-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Personal branding and professional identity development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Strategic networking techniques and relationship building</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Advanced interview preparation and confidence building</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="process" className="py-20 bg-gradient-to-r from-orange-100 via-white to-blue-100 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0" style={{
          backgroundImage: 'url("/background4.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.05
        }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#002147]" style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>How PLCA Works</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: 1,
                title: "Initial Career Assessment",
                description: "Clarify and define professional goals and career direction Develop a personalized roadmap tailored to your professional aspirations"
              },
              {
                step: 2,
                title: "Targeted Career Coaching",
                description: "One-on-one sessions with career experts focused on veteran transitions Hands-on support to build robust resumes, LinkedIn profiles, and cover letters"
              },
              {
                step: 3,
                title: "Professional Development Workshops",
                description: "Interactive workshops on networking, interviewing, and personal branding Veteran-specific resources and guidance for career exploration and advancement"
              },
              {
                step: 4,
                title: "Networking and Placement Opportunities",
                description: "Access to veteran-friendly employers and job placement networks Structured events to connect with industry leaders and successful veteran professionals"
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-500">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#002147]" style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Enroll Section */}
      <section id="who-should-enroll" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#002147]" style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>Who Should Enroll?</h2>
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <p className="text-lg mb-6 text-[#002147] font-semibold">PLCA is ideal for:</p>
            <ul className="list-disc pl-6 space-y-4 text-gray-700 text-base">
              <li>Veterans preparing to enter or re-enter the civilian workforce</li>
              <li>Transitioning service members seeking clear, structured career guidance</li>
              <li>Individuals aiming to significantly enhance their professional readiness and employability</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#002147]" style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <p className="italic mb-6 text-gray-600">
                "PLCA provided me with the structure and support I needed to successfully transition into a fulfilling civilian career. The personalized coaching was invaluable."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-orange-500">JD</span>
                </div>
                <div>
                  <p className="font-semibold text-[#002147]">John Doe</p>
                  <p className="text-sm text-gray-600">Army Veteran, Program Graduate</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <p className="italic mb-6 text-gray-600">
                "The skills and confidence I gained through PLCA were instrumental in landing my dream job. The program's comprehensive approach sets it apart."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-orange-500">JS</span>
                </div>
                <div>
                  <p className="font-semibold text-[#002147]">Jane Smith</p>
                  <p className="text-sm text-gray-600">Navy Veteran, Program Graduate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[#002147] transform -skew-y-3 origin-top-right"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>
              Launch Your Civilian Career Today
              </h3>
              <p className="text-lg text-gray-300 mb-8">
              Ready to take your next career step with confidence? Schedule your complimentary consultation and discover how
              WANAC's Promise Land Career Accelerator can accelerate your professional success.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Schedule Your Consultation 
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlcaPage; 