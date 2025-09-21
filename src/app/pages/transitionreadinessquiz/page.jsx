"use client";

import React from 'react';
import Image from 'next/image';

const TransitionReadinessQuiz = () => {
  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Header Navigation */}
      <header className="bg-white border-b border-gray-200">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-2 text-sm">
              <div className="flex items-center space-x-4">
                <select className="bg-transparent border-none text-gray-600 focus:outline-none">
                  <option>English</option>
                </select>
                <a href="#" className="text-gray-600 hover:text-gray-900">Sign in/Sign up</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Customer Support</a>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-1 text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button className="p-1 text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                </button>
                <button className="p-1 text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <a href="#" className="text-gray-600 hover:text-gray-900">Log in</a>
                <button className="bg-[#ff5e1a] text-white px-4 py-2 rounded-md hover:bg-[#e54e16] transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image
                src="/WANAC N 8 Old Glory.svg"
                alt="WANAC Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Products</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Solutions</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Pricing</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Resources</a>
            </nav>
            <div className="flex space-x-4">
              <button className="bg-[#ff5e1a] text-white px-6 py-2 rounded-md hover:bg-[#e54e16] transition-colors">
                Start my Claim Sandbox Check
              </button>
              <button className="bg-[#ff5e1a] text-white px-6 py-2 rounded-md hover:bg-[#e54e16] transition-colors">
                Start a DOD claim
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#faf9f7] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                WANAC Transition Readiness Quiz
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Take our 5-minute quiz to discover your personalized transition plan. Get AI-powered insights for your ideal path, resources, and support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#ff5e1a] text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-[#e54e16] transition-colors">
                  Take the 5-minute quiz
                </button>
                <button className="border-2 border-[#ff5e1a] text-[#ff5e1a] px-8 py-4 rounded-md text-lg font-semibold hover:bg-[#ff5e1a] hover:text-white transition-colors">
                  Book a 15-min consult
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-4">Free. No credit card required. 100% secure.</p>
            </div>
            <div className="relative flex flex-col items-center gap-4">
              {/* Quiz Card Placeholder */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 mb-4">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base">Readiness Score</h3>
                    <p className="text-gray-500 text-xs">AI Analysis</p>
                  </div>
                </div>
                <div className="h-4 bg-[#ff5e1a] rounded-full w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
              </div>
              {/* Chat Widget Placeholder */}
              <div className="absolute top-0 right-0 bg-white rounded-lg shadow-lg p-3 w-48 z-20 border border-[#ff5e1a]">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-[#ff5e1a] rounded-full mr-2"></div>
                  <span className="text-xs font-semibold text-gray-700">AI Assistant</span>
                </div>
                <p className="text-xs text-gray-600">How can I help you with your transition?</p>
              </div>
              {/* Analytics Cards Placeholder */}
              <div className="flex gap-2 mt-4">
                <div className="bg-white rounded-lg shadow p-2 w-20 h-16 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-[#ff5e1a]">92%</span>
                  <span className="text-xs text-gray-500">Success</span>
                </div>
                <div className="bg-white rounded-lg shadow p-2 w-20 h-16 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-[#ff5e1a]">4.8/5</span>
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
      <section className="bg-[#faf9f7] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why thousands of service members choose WANAC.
            </h2>
            <p className="text-xl text-gray-600">One platform. One plan.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Features Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 relative">
              <div className="absolute top-4 right-4 bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
                Edit today!
              </div>
              <div className="w-16 h-16 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Features</h3>
              <p className="text-gray-600 mb-6">
                AI-powered evidence strategy, document automation, record filing, C&P examinations, status monitoring, 24/7 customer support.
              </p>
              <button className="bg-[#ff5e1a] text-white px-6 py-3 rounded-md hover:bg-[#e54e16] transition-colors">
                Get started for free
              </button>
            </div>

            {/* Advantages Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 relative">
              <div className="absolute top-4 right-4 bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
                Edit today!
              </div>
              <div className="w-16 h-16 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advantages</h3>
              <p className="text-gray-600 mb-6">
                One platform, one ecosystem, one data, one AI, one workflow, one solution. Clear your inbox at every stage.
              </p>
              <button className="bg-[#ff5e1a] text-white px-6 py-3 rounded-md hover:bg-[#e54e16] transition-colors">
                See all features
              </button>
            </div>

            {/* Benefits Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 relative">
              <div className="absolute top-4 right-4 bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
                Edit today!
              </div>
              <div className="w-16 h-16 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h3>
              <p className="text-gray-600 mb-6">
                Higher confidence, fewer errors, earlier effective dates, more momentum, less anxiety, more VA success.
              </p>
              <button className="bg-[#ff5e1a] text-white px-6 py-3 rounded-md hover:bg-[#e54e16] transition-colors">
                Browse directory
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HubSpot Integration Section */}
      <section className="bg-[#faf9f7] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <h2 className="text-4xl font-bold text-gray-900 mr-4">How HubSpot works</h2>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-[#ff5e1a] rounded-full"></div>
                  <div className="w-8 h-8 bg-[#ff5e1a] bg-opacity-60 rounded-full"></div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Programs that meet you where you are—and take you further.
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                HubSpot is an AI-powered connected platform for marketing, sales, and customer service. Connect your tools, teams, and customers on one platform that grows with your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#ff5e1a] text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#e54e16] transition-colors">
                  Get a demo
                </button>
                <button className="border-2 border-[#ff5e1a] text-[#ff5e1a] px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#ff5e1a] hover:text-white transition-colors">
                  Get started free
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <section className="bg-[#faf9f7] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your whole front office. One customer platform.
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              HubSpot brings your teams together on one platform. Connect your data, teams, and customers with our AI-powered growth suite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#ff5e1a] text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#e54e16] transition-colors">
                Get a demo
              </button>
              <button className="border-2 border-[#ff5e1a] text-[#ff5e1a] px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#ff5e1a] hover:text-white transition-colors">
                Get started free
              </button>
            </div>
          </div>

          {/* Hub Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Marketing Hub */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-12 h-12 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Marketing Hub</h3>
              <p className="text-gray-600 mb-4">Attract and engage customers with marketing automation.</p>
              <div className="space-y-2 mb-4">
                <div className="text-sm text-gray-500">• Social media manager</div>
                <div className="text-sm text-gray-500">• Predictive lead scoring</div>
                <div className="text-sm text-gray-500">• AI analysis</div>
              </div>
              <button className="text-[#ff5e1a] font-semibold hover:text-[#e54e16] transition-colors">
                Learn more →
              </button>
            </div>

            {/* Sales Hub */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-12 h-12 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sales Hub</h3>
              <p className="text-gray-600 mb-4">Close more deals with sales automation.</p>
              <div className="space-y-2 mb-4">
                <div className="text-sm text-gray-500">• Sales automation</div>
                <div className="text-sm text-gray-500">• Email management</div>
                <div className="text-sm text-gray-500">• Prospecting signal</div>
              </div>
              <button className="text-[#ff5e1a] font-semibold hover:text-[#e54e16] transition-colors">
                Learn more →
              </button>
            </div>

            {/* Service Hub */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-12 h-12 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Service Hub</h3>
              <p className="text-gray-600 mb-4">Connect with customers on their terms.</p>
              <div className="space-y-2 mb-4">
                <div className="text-sm text-gray-500">• Omnichannel help desk</div>
                <div className="text-sm text-gray-500">• Service automation</div>
                <div className="text-sm text-gray-500">• Customer service report</div>
              </div>
              <button className="text-[#ff5e1a] font-semibold hover:text-[#e54e16] transition-colors">
                Learn more →
              </button>
            </div>

            {/* Operations Hub */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-12 h-12 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Operations</h3>
              <p className="text-gray-600 mb-4">Unify your data and automate processes.</p>
              <div className="space-y-2 mb-4">
                <div className="text-sm text-gray-500">• Data sync</div>
                <div className="text-sm text-gray-500">• Pro-grade automation</div>
                <div className="text-sm text-gray-500">• AI-powered data quality</div>
              </div>
              <button className="text-[#ff5e1a] font-semibold hover:text-[#e54e16] transition-colors">
                Learn more →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Breeze AI Section */}
      <section className="bg-[#20b2aa] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Meet Breeze — The complete AI solution for your business.
            </h2>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Breeze Caption, Breeze Agents, and Breeze Intel work together to help you grow better with AI-powered insights and automation.
            </p>
            <button className="bg-[#002147] text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#001122] transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* Customer Results Section */}
      <section className="bg-[#002147] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-8">
              HubSpot customer's results after 1 year:
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">114%</h3>
              <p className="text-white text-lg">more web traffic</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">55%</h3>
              <p className="text-white text-lg">more deals</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">43%</h3>
              <p className="text-white text-lg">more tickets resolved</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-white text-lg mb-6">
              HubSpot customers see improvement across their customer journey. What could your ROI be?
            </p>
            <button className="border-2 border-white text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-white hover:text-[#002147] transition-colors">
              See ROI report
            </button>
          </div>
        </div>
      </section>

      {/* Integrations and Awards Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Integrations */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                1,700+ ways to connect your tools.
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-gray-600 font-semibold">Gmail</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-gray-600 font-semibold">Shopify</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-gray-600 font-semibold">Mailchimp</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-gray-600 font-semibold">Zapier</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-gray-600 font-semibold">Google Ads</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-gray-600 font-semibold">Slack</div>
                </div>
              </div>
              <a href="#" className="text-[#ff5e1a] font-semibold hover:text-[#e54e16] transition-colors">
                View all apps →
              </a>
            </div>

            {/* Awards */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Voted #1 in 571 Reports.
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-gray-600 font-semibold text-sm">Best Relationship 2023</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-gray-600 font-semibold text-sm">Best Results 2023</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-gray-600 font-semibold text-sm">Best Usability 2023</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-gray-600 font-semibold text-sm">Best Support 2023</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-gray-600 font-semibold text-sm">Best ROI 2023</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-gray-600 font-semibold text-sm">Best Features 2023</div>
                </div>
              </div>
              <a href="#" className="text-[#ff5e1a] font-semibold hover:text-[#e54e16] transition-colors">
                Learn more →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#faf9f7] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Grow better with WANAC today.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#ff5e1a] text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-[#e54e16] transition-colors">
                Get a demo
              </button>
              <button className="border-2 border-[#ff5e1a] text-[#ff5e1a] px-8 py-4 rounded-md text-lg font-semibold hover:bg-[#ff5e1a] hover:text-white transition-colors">
                Get started free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#002147] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Popular Features</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Free Tools</a></li>
                <li><a href="#" className="hover:text-white">Templates</a></li>
                <li><a href="#" className="hover:text-white">Integration</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
            <p>&copy; 2023 WANAC Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TransitionReadinessQuiz;
