'use client';

import React from 'react';
import Link from 'next/link';

const PlcaPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
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
          <h1 className="text-5xl font-bold mb-4">
            Promise Land Career Accelerator (PLCA)
          </h1>
          <p className="text-xl max-w-3xl mx-auto px-4">
            Accelerate your career transition with confidence through WANAC's proven methodologies and comprehensive support system.
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

      {/* Quick Navigation */}
      <section>
        <div className="relative w-full h-10 bg-[#002147] overflow-hidden flex items-center justify-center">
          <nav className="relative z-10 flex space-x-16 px-4">
            <a href="#overview" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
              Overview
            </a>
            <a href="#process" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
              Process
            </a>
            <a href="#apply" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
              Apply
            </a>
          </nav>
        </div>
      </section>

      {/* Program Overview Section */}
      <section id="overview" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#002147]">Program Overview</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
                <h3 className="text-xl font-semibold mb-4 text-[#002147]">Strategic Career Readiness</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Comprehensive career management skills training</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Personalized coaching to define clear career objectives</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Targeted strategies for securing internships and job placements</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
                <h3 className="text-xl font-semibold mb-4 text-[#002147]">Expert-Designed Curriculum</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Personal branding and professional identity development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Strategic networking techniques and relationship building</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Advanced interview preparation and confidence building</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="sticky top-8">
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-6 text-[#002147]">Program Highlights</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl text-orange-500">93%</span>
                      </div>
                      <p className="text-gray-600">Success rate in career placement</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl text-orange-500">12</span>
                      </div>
                      <p className="text-gray-600">Weeks of intensive training</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl text-orange-500">1:1</span>
                      </div>
                      <p className="text-gray-600">Personalized coaching sessions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="process" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#002147]">How PLCA Works</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: 1,
                title: "Initial Assessment",
                description: "Complete a comprehensive career assessment to identify your goals and strengths"
              },
              {
                step: 2,
                title: "Personalized Plan",
                description: "Receive a customized development plan tailored to your career objectives"
              },
              {
                step: 3,
                title: "Skills Development",
                description: "Engage in intensive training modules and hands-on workshops"
              },
              {
                step: 4,
                title: "Career Launch",
                description: "Get support in job search, placement, and ongoing career growth"
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-500">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#002147]">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section id="apply" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#002147]">Start Your Journey</h2>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#002147]">Application Process</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">1.</span>
                    <span>Fill out the initial application form</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">2.</span>
                    <span>Schedule a consultation call</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">3.</span>
                    <span>Complete career assessment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">4.</span>
                    <span>Receive program acceptance decision</span>
                  </li>
                </ul>
              </div>
              <div>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147]"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147]"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147]"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="service">Military Service</label>
                    <select
                      id="service"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147]"
                    >
                      <option value="">Select your service branch</option>
                      <option value="army">Army</option>
                      <option value="navy">Navy</option>
                      <option value="airforce">Air Force</option>
                      <option value="marines">Marines</option>
                      <option value="coastguard">Coast Guard</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#002147] text-white py-3 rounded-lg font-semibold hover:bg-orange-500 transition-colors"
                  >
                    Submit Application
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#002147]">Success Stories</h2>
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
              <h3 className="text-3xl font-bold text-white mb-8">
                Ready to Transform Your Career?
              </h3>
              <p className="text-lg text-gray-300 mb-8">
                Take the first step towards your successful civilian career. Apply now to join our next cohort.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto bg-white text-[#002147] px-8 py-4 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Apply Now
                </button>
                <button className="w-full sm:w-auto bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#002147] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Schedule Consultation
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