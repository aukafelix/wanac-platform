"use client";

import React from 'react';
import Image from 'next/image';

const VetaAcademy = () => {
  return (
    <div className="min-h-screen bg-[#faf9f7]">
    
      {/* Hero Section */}
      <section className="bg-[#faf9f7] py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight">
                WANAC Vetrepreneurship Academy (VETA)
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-xl">
                A 12-session, cohort-based program that turns idea → validated model → launch plan using customer discovery, 7-day validation sprints, financial modeling, and a go-to-market roadmap. (Built on the rigor of UCLA Anderson's venture courses.)
              </p>
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                <button className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-center overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 text-sm">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Check eligibility
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
                <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-orange-500 text-orange-500 font-semibold text-center hover:bg-orange-500 hover:text-white transition-all duration-300 text-sm">
                  Talk to an advisor
                </button>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">Cohort-based • National • Scholarships available (one per year)</p>
            </div>
            <div className="relative flex flex-col items-center gap-4">
              {/* Main Card Placeholder (update with dashboard/AI/score look) */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 mb-4">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base">Eligibility Score</h3>
                    <p className="text-gray-500 text-xs">AI Analysis</p>
                  </div>
                </div>
                <div className="h-4 bg-[#ff5e1a] rounded-full w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
              </div>
              {/* Floating Cards (simulate as in screenshot) */}
              <div className="absolute top-0 right-0 bg-white rounded-lg shadow-lg p-3 w-48 z-20 border border-[#ff5e1a]">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-[#ff5e1a] rounded-full mr-2"></div>
                  <span className="text-xs font-semibold text-gray-700">AI Assistant</span>
                </div>
                <p className="text-xs text-gray-600">Get instant answers about your eligibility!</p>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="bg-white rounded-lg shadow p-2 w-20 h-16 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-[#ff5e1a]">98%</span>
                  <span className="text-xs text-gray-500">Eligible</span>
                </div>
                <div className="bg-white rounded-lg shadow p-2 w-20 h-16 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-[#ff5e1a]">4.9/5</span>
                  <span className="text-xs text-gray-500">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium">
              240,000+ Veterans in over 135 countries Transitioning to civilian life
            </p>
          </div>
          <div className="flex items-center justify-center space-x-8 sm:space-x-12 opacity-80">
            <Image src="/ebay.png" alt="eBay" width={80} height={32} />
            <Image src="/shopify.png" alt="Shopify" width={80} height={32} />
            <Image src="/reddit.png" alt="Reddit" width={80} height={32} />
            <Image src="/tripadvisor.png" alt="Tripadvisor" width={80} height={32} />
            <Image src="/eventbrite.png" alt="Eventbrite" width={80} height={32} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#faf9f7] py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why thousands of service members choose WANAC.
            </h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mb-3" aria-hidden="true"/>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">One platform. One plan.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Features Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg p-5 sm:p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-orange-500 bg-opacity-10 rounded-full flex items-center justify-center mb-4 sm:mb-5">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-orange-600 transition-colors">Features</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                AI-powered evidence strategy, document automation, record filing, C&P examinations, status monitoring, 24/7 customer support.
              </p>
              <button className="group relative px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-center overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 text-xs sm:text-sm">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get started for free
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </div>

            {/* Advantages Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg p-5 sm:p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-orange-500 bg-opacity-10 rounded-full flex items-center justify-center mb-4 sm:mb-5">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-orange-600 transition-colors">Advantages</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                One platform, one ecosystem, one data, one AI, one workflow, one solution. Clear your inbox at every stage.
              </p>
              <button className="group relative px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-center overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 text-xs sm:text-sm">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  See all features
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </div>

            {/* Benefits Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg p-5 sm:p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-orange-500 bg-opacity-10 rounded-full flex items-center justify-center mb-4 sm:mb-5">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-orange-600 transition-colors">Benefits</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Higher confidence, fewer errors, earlier effective dates, more momentum, less anxiety, more VA success.
              </p>
              <button className="group relative px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-center overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 text-xs sm:text-sm">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Browse directory
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HubSpot Integration Section */}
      <section className="bg-[#faf9f7] py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="flex items-center mb-4 sm:mb-6">
                <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mr-3 sm:mr-4">How HubSpot works</h2>
                <div className="flex space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full"></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 bg-opacity-60 rounded-full"></div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Programs that meet you where you are—and take you further.
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                HubSpot is an AI-powered connected platform for marketing, sales, and customer service. Connect your tools, teams, and customers on one platform that grows with your business.
              </p>
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                <button className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-center overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 text-sm">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get a demo
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
                <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-orange-500 text-orange-500 font-semibold text-center hover:bg-orange-500 hover:text-white transition-all duration-300 text-sm">
                  Get started free
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <section className="bg-[#faf9f7] py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Your whole front office. One customer platform.
            </h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mb-3" aria-hidden="true"/>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              HubSpot brings your teams together on one platform. Connect your data, teams, and customers with our AI-powered growth suite.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
              <button className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-center overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 text-sm">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get a demo
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
              <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-orange-500 text-orange-500 font-semibold text-center hover:bg-orange-500 hover:text-white transition-all duration-300 text-sm">
                Get started free
              </button>
            </div>
          </div>

          {/* Hub Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 md:mb-12">
            {/* Marketing Hub */}
            <div className="group relative bg-white rounded-2xl shadow-lg p-4 sm:p-5 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 bg-opacity-10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">Marketing Hub</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">Attract and engage customers with marketing automation.</p>
              <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                <div className="text-xs sm:text-sm text-gray-500">• Social media manager</div>
                <div className="text-xs sm:text-sm text-gray-500">• Predictive lead scoring</div>
                <div className="text-xs sm:text-sm text-gray-500">• AI analysis</div>
              </div>
              <button className="text-orange-500 font-semibold hover:text-orange-600 transition-colors text-xs sm:text-sm">
                Learn more →
              </button>
            </div>

            {/* Sales Hub */}
            <div className="group relative bg-white rounded-2xl shadow-lg p-4 sm:p-5 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 bg-opacity-10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">Sales Hub</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">Close more deals with sales automation.</p>
              <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                <div className="text-xs sm:text-sm text-gray-500">• Sales automation</div>
                <div className="text-xs sm:text-sm text-gray-500">• Email management</div>
                <div className="text-xs sm:text-sm text-gray-500">• Prospecting signal</div>
              </div>
              <button className="text-orange-500 font-semibold hover:text-orange-600 transition-colors text-xs sm:text-sm">
                Learn more →
              </button>
            </div>

            {/* Service Hub */}
            <div className="group relative bg-white rounded-2xl shadow-lg p-4 sm:p-5 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 bg-opacity-10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">Service Hub</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">Connect with customers on their terms.</p>
              <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                <div className="text-xs sm:text-sm text-gray-500">• Omnichannel help desk</div>
                <div className="text-xs sm:text-sm text-gray-500">• Service automation</div>
                <div className="text-xs sm:text-sm text-gray-500">• Customer service report</div>
              </div>
              <button className="text-orange-500 font-semibold hover:text-orange-600 transition-colors text-xs sm:text-sm">
                Learn more →
              </button>
            </div>

            {/* Operations Hub */}
            <div className="group relative bg-white rounded-2xl shadow-lg p-4 sm:p-5 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 bg-opacity-10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">Operations</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">Unify your data and automate processes.</p>
              <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                <div className="text-xs sm:text-sm text-gray-500">• Data sync</div>
                <div className="text-xs sm:text-sm text-gray-500">• Pro-grade automation</div>
                <div className="text-xs sm:text-sm text-gray-500">• AI-powered data quality</div>
              </div>
              <button className="text-orange-500 font-semibold hover:text-orange-600 transition-colors text-xs sm:text-sm">
                Learn more →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Breeze AI Section */}
      <section className="bg-[#20b2aa] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Meet Breeze — The complete AI solution for your business.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Breeze Caption, Breeze Agents, and Breeze Intel work together to help you grow better with AI-powered insights and automation.
            </p>
            <button className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-[#002147] text-white font-semibold text-center overflow-hidden hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 text-sm">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Learn more
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </div>
        </div>
      </section>

      {/* Customer Results Section */}
      <section className="bg-[#002147] py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              HubSpot customer's results after 1 year:
            </h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mb-3" aria-hidden="true"/>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 md:mb-12">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">114%</h3>
              <p className="text-white text-sm sm:text-base md:text-lg">more web traffic</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">55%</h3>
              <p className="text-white text-sm sm:text-base md:text-lg">more deals</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">43%</h3>
              <p className="text-white text-sm sm:text-base md:text-lg">more tickets resolved</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-white text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
              HubSpot customers see improvement across their customer journey. What could your ROI be?
            </p>
            <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold text-center hover:bg-white hover:text-[#002147] transition-all duration-300 text-sm">
              See ROI report
            </button>
          </div>
        </div>
      </section>

      {/* Integrations and Awards Section */}
      <section className="bg-white py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Integrations */}
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                1,700+ ways to connect your tools.
              </h3>
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-gray-100 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-gray-600 font-semibold text-xs sm:text-sm">Gmail</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-gray-600 font-semibold text-xs sm:text-sm">Shopify</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-gray-600 font-semibold text-xs sm:text-sm">Mailchimp</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-gray-600 font-semibold text-xs sm:text-sm">Zapier</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-gray-600 font-semibold text-xs sm:text-sm">Google Ads</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-gray-600 font-semibold text-xs sm:text-sm">Slack</div>
                </div>
              </div>
              <a href="#" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors text-sm">
                View all apps →
              </a>
            </div>

            {/* Awards */}
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                Voted #1 in 571 Reports.
              </h3>
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-gray-100 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-gray-600 font-semibold text-xs">Best Relationship 2023</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-gray-600 font-semibold text-xs">Best Results 2023</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-gray-600 font-semibold text-xs">Best Usability 2023</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-gray-600 font-semibold text-xs">Best Support 2023</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-gray-600 font-semibold text-xs">Best ROI 2023</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-gray-600 font-semibold text-xs">Best Features 2023</div>
                </div>
              </div>
              <a href="#" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors text-sm">
                Learn more →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#faf9f7] py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
              Grow better with WANAC today.
            </h2>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
              <button className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-center overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 text-sm">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get a demo
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
              <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-orange-500 text-orange-500 font-semibold text-center hover:bg-orange-500 hover:text-white transition-all duration-300 text-sm">
                Get started free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
     
    </div>
  );
};

export default VetaAcademy;
