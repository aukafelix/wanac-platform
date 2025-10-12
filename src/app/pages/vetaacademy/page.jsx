"use client";

import React from 'react';
import Image from 'next/image';
import Head from 'next/head';

const VetaAcademy = () => {
  return (
    <>
      <Head>
        <title>VETA - WANAC Vetrepreneurship Academy | 12-Week Entrepreneur Program</title>
        <meta name="description" content="Turn your business idea into reality with VETA's 12-week cohort-based program. Built on UCLA Anderson methodology for veteran entrepreneurs." />
        <meta property="og:title" content="VETA - Vetrepreneurship Academy" />
        <meta property="og:description" content="From idea to launch in 12 weeks" />
      </Head>
      <div className="min-h-screen bg-[#faf9f7]">

      {/* Hero Section */}
      <section className="bg-[#faf9f7] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              WANAC Vetrepreneurship Academy (VETA)</h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
              A 12-session, cohort-based program that turns idea → validated model → launch plan using customer discovery, 7-day validation sprints, financial modeling, and a go-to-market roadmap.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-[#ff5e1a] text-white px-6 py-3 rounded-md text-base font-semibold hover:bg-[#e54e16] transition-colors">
                  Check eligibility
                </button>
                <button className="border-2 border-[#ff5e1a] text-[#ff5e1a] px-6 py-3 rounded-md text-base font-semibold hover:bg-[#ff5e1a] hover:text-white transition-colors">
                  Talk to an advisor
                </button>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-3">Cohort-based • National • Scholarships available</p>
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
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700 font-medium">
              240,000+ Veterans in over 135 countries Transitioning to civilian life
            </p>
          </div>
          <div className="flex items-center justify-center space-x-12 opacity-80">
            <Image src="/ebay.png" alt="eBay" width={80} height={32} />
            <Image src="/shopify.png" alt="Shopify" width={80} height={32} />
            <Image src="/reddit.png" alt="Reddit" width={80} height={32} />
            <Image src="/tripadvisor.png" alt="Tripadvisor" width={80} height={32} />
            <Image src="/eventbrite.png" alt="Eventbrite" width={80} height={32} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#faf9f7] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Why thousands of service members choose WANAC.
            </h2>
            <p className="text-sm sm:text-base text-gray-600">One platform. One plan.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Features Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-12 h-12 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Features</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                AI-powered evidence strategy, document automation, record filing, C&P examinations, status monitoring, 24/7 customer support.
              </p>
              <button className="bg-[#ff5e1a] text-white px-5 py-2.5 text-sm rounded-md hover:bg-[#e54e16] transition-colors">
                Get started for free
              </button>
            </div>

            {/* Advantages Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-12 h-12 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Advantages</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                One platform, one ecosystem, one data, one AI, one workflow, one solution. Clear your inbox at every stage.
              </p>
              <button className="bg-[#ff5e1a] text-white px-5 py-2.5 text-sm rounded-md hover:bg-[#e54e16] transition-colors">
                See all features
              </button>
            </div>

            {/* Benefits Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-12 h-12 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Benefits</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Higher confidence, fewer errors, earlier effective dates, more momentum, less anxiety, more VA success.
              </p>
              <button className="bg-[#ff5e1a] text-white px-5 py-2.5 text-sm rounded-md hover:bg-[#e54e16] transition-colors">
                Browse directory
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Program Details
            </h2>
            <p className="text-sm sm:text-base text-gray-600">Everything you need to succeed</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-[#ff5e1a] mb-2">12</div>
              <div className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Weeks</div>
              <p className="text-sm text-gray-600">Live sessions + async work</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-[#ff5e1a] mb-2">20-30</div>
              <div className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Veterans</div>
              <p className="text-sm text-gray-600">Per cohort for peer learning</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-[#ff5e1a] mb-2">$0</div>
              <div className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Cost</div>
              <p className="text-sm text-gray-600">Scholarships available</p>
            </div>
          </div>
        </div>
      </section>

      {/* How VETA Works Section */}
      <section className="bg-[#faf9f7] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative h-80 lg:h-96 bg-gradient-to-br from-[#ff5e1a] to-[#e54e16] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="text-white text-center w-full">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">12-Week Journey</h3>
                  <div className="space-y-2">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 transform hover:scale-105 transition-transform">
                      <div className="font-semibold">Weeks 1-3</div>
                      <div className="text-sm">Customer Discovery</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 transform hover:scale-105 transition-transform">
                      <div className="font-semibold">Weeks 4-6</div>
                      <div className="text-sm">Validation Sprints</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 transform hover:scale-105 transition-transform">
                      <div className="font-semibold">Weeks 7-9</div>
                      <div className="text-sm">Financial Modeling</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 transform hover:scale-105 transition-transform">
                      <div className="font-semibold">Weeks 10-12</div>
                      <div className="text-sm">Go-to-Market</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How VETA Works
              </h2>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                From military service to business ownership.
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                VETA is a cohort-based entrepreneurship program built on UCLA Anderson's 
                venture methodology. You'll validate your business idea, build financial 
                models, and create a launch roadmap—all alongside fellow veterans.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-[#ff5e1a] text-white px-6 py-2.5 text-sm sm:text-base rounded-md font-semibold hover:bg-[#e54e16] transition-colors">
                  View curriculum
                </button>
                <button className="border-2 border-[#ff5e1a] text-[#ff5e1a] px-6 py-2.5 text-sm sm:text-base rounded-md font-semibold hover:bg-[#ff5e1a] hover:text-white transition-colors">
                  Meet alumni
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VETA Program Modules Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              The VETA Curriculum
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Four core modules designed to take you from idea to launch
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-[#ff5e1a] text-white px-6 py-2.5 text-sm sm:text-base rounded-md font-semibold hover:bg-[#e54e16] transition-colors">
                Download syllabus
              </button>
              <button className="border-2 border-[#ff5e1a] text-[#ff5e1a] px-6 py-2.5 text-sm sm:text-base rounded-md font-semibold hover:bg-[#ff5e1a] hover:text-white transition-colors">
                Talk to an advisor
              </button>
            </div>
          </div>

          {/* Module Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Customer Discovery */}
            <div className="bg-white rounded-2xl shadow-lg p-5 border-2 border-gray-100 hover:border-[#ff5e1a] transition-colors">
              <div className="w-10 h-10 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Customer Discovery</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3">Learn to identify and validate customer problems through structured interviews.</p>
              <div className="space-y-1.5 mb-3">
                <div className="text-xs text-gray-500">• 100+ customer interviews</div>
                <div className="text-xs text-gray-500">• Problem-solution fit</div>
                <div className="text-xs text-gray-500">• Market sizing</div>
              </div>
              <button className="text-[#ff5e1a] text-xs sm:text-sm font-semibold hover:text-[#e54e16] transition-colors">
                Learn more →
              </button>
            </div>

            {/* 7-Day Validation */}
            <div className="bg-white rounded-2xl shadow-lg p-5 border-2 border-gray-100 hover:border-[#ff5e1a] transition-colors">
              <div className="w-10 h-10 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Validation Sprints</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3">Test your assumptions with rapid 7-day experiments and real customer data.</p>
              <div className="space-y-1.5 mb-3">
                <div className="text-xs text-gray-500">• MVP testing</div>
                <div className="text-xs text-gray-500">• A/B experiments</div>
                <div className="text-xs text-gray-500">• Metric tracking</div>
              </div>
              <button className="text-[#ff5e1a] text-xs sm:text-sm font-semibold hover:text-[#e54e16] transition-colors">
                Learn more →
              </button>
            </div>

            {/* Financial Modeling */}
            <div className="bg-white rounded-2xl shadow-lg p-5 border-2 border-gray-100 hover:border-[#ff5e1a] transition-colors">
              <div className="w-10 h-10 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Financial Modeling</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3">Build investor-ready financial models and understand unit economics.</p>
              <div className="space-y-1.5 mb-3">
                <div className="text-xs text-gray-500">• 3-year projections</div>
                <div className="text-xs text-gray-500">• Unit economics</div>
                <div className="text-xs text-gray-500">• Fundraising prep</div>
              </div>
              <button className="text-[#ff5e1a] text-xs sm:text-sm font-semibold hover:text-[#e54e16] transition-colors">
                Learn more →
              </button>
            </div>

            {/* Go-to-Market */}
            <div className="bg-white rounded-2xl shadow-lg p-5 border-2 border-gray-100 hover:border-[#ff5e1a] transition-colors">
              <div className="w-10 h-10 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Go-to-Market</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3">Create your launch strategy with channels, messaging, and growth tactics.</p>
              <div className="space-y-1.5 mb-3">
                <div className="text-xs text-gray-500">• Channel strategy</div>
                <div className="text-xs text-gray-500">• Brand positioning</div>
                <div className="text-xs text-gray-500">• Launch roadmap</div>
              </div>
              <button className="text-[#ff5e1a] text-xs sm:text-sm font-semibold hover:text-[#e54e16] transition-colors">
                Learn more →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VETA Community Section */}
      <section className="bg-gradient-to-r from-[#ff5e1a] to-[#e54e16] py-12 sm:py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Join a Community of Veteran Entrepreneurs
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white mb-6 max-w-3xl mx-auto">
              Connect with 240,000+ veterans transitioning to civilian life, access mentorship 
              from successful veteran business owners, and tap into exclusive funding opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-white text-[#ff5e1a] px-6 py-2.5 text-sm sm:text-base rounded-md font-semibold hover:bg-gray-100 transition-colors">
                View community
              </button>
              <button className="border-2 border-white text-white px-6 py-2.5 text-sm sm:text-base rounded-md font-semibold hover:bg-white hover:text-[#ff5e1a] transition-colors">
                Meet mentors
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VETA Alumni Success Section */}
      <section className="bg-[#002147] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              VETA Alumni Results After 12 Months:
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">73%</h3>
              <p className="text-white text-sm sm:text-base">launched their business</p>
            </div>
            
            <div className="text-center">
              <div className="w-14 h-14 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">$2.3M</h3>
              <p className="text-white text-sm sm:text-base">average funding raised</p>
            </div>
            
            <div className="text-center">
              <div className="w-14 h-14 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">18</h3>
              <p className="text-white text-sm sm:text-base">average team size created</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-white text-sm sm:text-base mb-5">
              VETA graduates are building sustainable businesses and creating jobs. 
              What will you build?
            </p>
            <button className="border-2 border-white text-white px-6 py-2.5 text-sm sm:text-base rounded-md font-semibold hover:bg-white hover:text-[#002147] transition-colors">
              Read success stories
            </button>
          </div>
        </div>
      </section>

      {/* Alumni Testimonials Section */}
      <section className="bg-[#faf9f7] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-3">
            What Alumni Say
          </h2>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-8 md:mb-10">
            Hear from veterans who transformed their ideas into thriving businesses
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Testimonial Card 1 */}
            <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition-shadow">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-[#ff5e1a] rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                  JS
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">John Smith</h4>
                  <p className="text-xs text-gray-600">Army Veteran • TechFlow Inc</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 italic">
                "VETA gave me the structure and confidence to turn my idea into a 
                funded business. The veteran community support is unmatched."
              </p>
            </div>

            {/* Testimonial Card 2 */}
            <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition-shadow">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-[#ff5e1a] rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                  MR
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Maria Rodriguez</h4>
                  <p className="text-xs text-gray-600">Navy Veteran • VetHealth Solutions</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 italic">
                "The UCLA Anderson methodology combined with veteran-specific support 
                helped me raise $1.5M and launch in 6 months."
              </p>
            </div>

            {/* Testimonial Card 3 */}
            <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition-shadow">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-[#ff5e1a] rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                  DW
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">David Williams</h4>
                  <p className="text-xs text-gray-600">Marine Veteran • MissionReady Logistics</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 italic">
                "From 0 to 25 employees in our first year. VETA's financial modeling 
                module was game-changing for our growth strategy."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners and Resources Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Resources */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                VETA Partner Ecosystem
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-5">
                Access exclusive resources from our network of veteran business partners
              </p>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-gray-100 rounded-lg p-3 text-center hover:bg-gray-200 transition-colors">
                  <div className="text-gray-900 font-semibold text-sm">SBA Programs</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-center hover:bg-gray-200 transition-colors">
                  <div className="text-gray-900 font-semibold text-sm">VetFran</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-center hover:bg-gray-200 transition-colors">
                  <div className="text-gray-900 font-semibold text-sm">Bunker Labs</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-center hover:bg-gray-200 transition-colors">
                  <div className="text-gray-900 font-semibold text-sm">SCORE</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-center hover:bg-gray-200 transition-colors">
                  <div className="text-gray-900 font-semibold text-sm">V-WISE</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-center hover:bg-gray-200 transition-colors">
                  <div className="text-gray-900 font-semibold text-sm">Vet2Tech</div>
                </div>
              </div>
              <a href="#" className="text-[#ff5e1a] text-sm font-semibold hover:text-[#e54e16] transition-colors">
                View all partners →
              </a>
            </div>

            {/* Recognition */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Recognition & Accreditation
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-5">
                VETA is recognized by leading veteran entrepreneurship organizations
              </p>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-gray-100 rounded-lg p-3 text-center hover:bg-gray-200 transition-colors">
                  <div className="text-gray-900 font-semibold text-xs">UCLA Anderson Affiliated</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-center hover:bg-gray-200 transition-colors">
                  <div className="text-gray-900 font-semibold text-xs">VA Approved</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-center hover:bg-gray-200 transition-colors">
                  <div className="text-gray-900 font-semibold text-xs">SBA Partner</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-center hover:bg-gray-200 transition-colors">
                  <div className="text-gray-900 font-semibold text-xs">Certified Veteran Org</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-center hover:bg-gray-200 transition-colors">
                  <div className="text-gray-900 font-semibold text-xs">2024 Best Program</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-center hover:bg-gray-200 transition-colors">
                  <div className="text-gray-900 font-semibold text-xs">IRS 501(c)(3)</div>
                </div>
              </div>
              <a href="#" className="text-[#ff5e1a] text-sm font-semibold hover:text-[#e54e16] transition-colors">
                Learn more →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#faf9f7] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Ready to Start Your Entrepreneurship Journey?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Join the next VETA cohort and turn your business idea into reality
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-[#ff5e1a] text-white px-6 py-3 text-sm sm:text-base rounded-md font-semibold hover:bg-[#e54e16] transition-colors">
                Check eligibility
              </button>
              <button className="border-2 border-[#ff5e1a] text-[#ff5e1a] px-6 py-3 text-sm sm:text-base rounded-md font-semibold hover:bg-[#ff5e1a] hover:text-white transition-colors">
                Download program guide
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-4">
              Next cohort starts in 30 days • Limited spots available
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default VetaAcademy;
