"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const TransitionReadinessQuiz = () => {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Does it cost anything?",
      answer: "No. The quiz and plan are free."
    },
    {
      question: "Do I need email?",
      answer: "Yes—we send your plan and next-step links securely to your inbox."
    },
    {
      question: "Will this affect my VA claim?",
      answer: "No—it's a planning tool. If claims are indicated, we connect you to accredited VSO support (WANAC represents ≤12 months/BDD; >12 months we partner with accredited orgs)."
    },
    {
      question: "Are cohorts used for claims?",
      answer: "No. Cohorts are for PLEP, PLCA, PPC, CPPC, and VETA. Claims support is 1:1 representation."
    },
    {
      question: "How fast do I get results?",
      answer: "Immediately on screen, with the full plan by email within minutes."
    }
  ];

  const quizCoverageAreas = [
    {
      title: "Benefits (VA claims)",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      checks: "DD-214/orders, claim status, evidence gaps, BDD eligibility (if active duty).",
      output: "Whether VSO Claim Support should happen first, plus what evidence is missing."
    },
    {
      title: "Education (PLEP)",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      checks: "Goal clarity, program fit, GI Bill usage, timeline.",
      output: "Shortlist of programs, credit-for-experience pointers, and funding path."
    },
    {
      title: "Career (PLCA)",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      checks: "Target role, resume targeting, interview readiness, networking.",
      output: "2–3 target roles, employer list format, and a 2-week outreach plan."
    },
    {
      title: "Entrepreneurship (VETA)",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      checks: "Idea clarity, problem validation, revenue model, time runway.",
      output: "7-day validation sprint and model assumptions to test."
    },
    {
      title: "Performance (PPC/CPPC)",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      checks: "Clarity, daily routine, energy, time blocks, accountability.",
      output: "A 7-day mission rhythm (plan → execute → debrief) you can sustain."
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7]">

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#faf9f7] to-white py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#002147] mb-4 leading-tight tracking-tight">
                WANAC Transition Readiness Quiz
              </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 font-semibold">
              Know your mission plan in 3 minutes
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-6 leading-relaxed max-w-3xl mx-auto">
              Diagnose your benefits, education, career, entrepreneurship, and performance readiness—then get a personalized plan and the right next step (PLEP, PLCA, VETA, PPC/CPPC) or VSO Claim Support if benefits are the bottleneck.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center mb-6">
              <button className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-center overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 text-sm">
                <span className="relative z-10 flex items-center justify-center gap-2">
                Take the 3-minute quiz
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-[#002147] text-[#002147] font-semibold text-center hover:bg-[#002147] hover:text-white transition-all duration-300 text-sm">
                Prefer to talk? Book a 15-minute consult
                </button>
              </div>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600 flex-wrap">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Veteran-led
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Private & secure
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Instant results
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="bg-white py-16 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-[#002147]">
              The problem (and what's at stake)
            </h2>
            <div className="w-12 h-1 bg-[#ff5e1a] mx-auto rounded-full mb-3" aria-hidden="true"/>
            <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Transition gets treated like separate checklists—TAP here, resume there, claims "somewhere." That fragmentation costs time, delays benefits, and creates missed school or hiring windows. <span className="font-semibold text-[#ff5e1a]">Every week without a plan is momentum lost.</span>
            </p>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="bg-[#faf9f7] py-16 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-[#002147]">
              The WANAC solution (at a glance)
            </h2>
            <div className="w-12 h-1 bg-[#ff5e1a] mx-auto rounded-full mb-3" aria-hidden="true"/>
            <p className="text-sm sm:text-base md:text-lg font-semibold text-[#ff5e1a] mb-6">
              One quiz. One mission plan.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 md:mb-12">
            {/* Features Card */}
            <div className="group relative bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col">
              {/* Gradient border effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-4 sm:p-5 flex flex-col flex-grow">
                <div className="w-12 h-12 bg-[#ff5e1a] bg-opacity-10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#002147] group-hover:text-orange-600 transition-colors leading-snug mb-2">Features</h3>
                <p className="text-gray-600 text-xs leading-relaxed flex-grow">
                12 quick questions across Benefits, Education, Career, Entrepreneurship, Performance.
              </p>
              </div>
            </div>

            {/* Advantages Card */}
            <div className="group relative bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col">
              {/* Gradient border effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-4 sm:p-5 flex flex-col flex-grow">
                <div className="w-12 h-12 bg-[#002147] bg-opacity-10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#002147]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#002147] group-hover:text-orange-600 transition-colors leading-snug mb-2">Advantages</h3>
                <p className="text-gray-600 text-xs leading-relaxed flex-grow">
                Instant Red/Amber/Green score by domain, step-by-step plan, and a routed next step (cohort or claim support).
              </p>
              </div>
            </div>

            {/* Benefits Card */}
            <div className="group relative bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col">
              {/* Gradient border effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-4 sm:p-5 flex flex-col flex-grow">
                <div className="w-12 h-12 bg-green-600 bg-opacity-10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#002147] group-hover:text-orange-600 transition-colors leading-snug mb-2">Benefits</h3>
                <p className="text-gray-600 text-xs leading-relaxed flex-grow">
                Clarity in minutes, not months—so you move immediately toward funded school, a targeted job search, or a validated venture.
              </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-center overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 text-sm">
              <span className="relative z-10 flex items-center justify-center gap-2">
              Take the 3-minute quiz
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </div>
        </div>
      </section>

      {/* Proof/Testimonial Section */}
      <section className="bg-white py-16 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#002147] to-[#003366] shadow-xl p-6 sm:p-8 md:p-12 text-white">
            <div className="flex items-start gap-4 mb-6">
              <svg className="w-12 h-12 text-[#ff5e1a] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div>
                <p className="text-xl md:text-2xl font-semibold mb-4 leading-relaxed">
                  "I finally knew exactly what to do this week—file my claim, pick a program, and book two employer calls."
                </p>
                <p className="text-gray-300 font-medium">— U.S. Army veteran</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results & Impact Section - HubSpot Inspired */}
      <section className="bg-[#002147] py-16 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-white">
              WANAC quiz takers see results within 90 days
            </h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mb-3" aria-hidden="true"/>
            <p className="text-xs sm:text-sm md:text-base text-gray-300">
              Veterans who complete the quiz and follow their personalized plan
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 md:mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">87%</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-300">File claims within 2 weeks</p>
              <p className="text-xs text-gray-400 mt-1">With complete evidence packages</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">3.2x</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-300">Faster program enrollment</p>
              <p className="text-xs text-gray-400 mt-1">Compared to unguided transition</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">94%</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-300">Report reduced anxiety</p>
              <p className="text-xs text-gray-400 mt-1">About their transition plan</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-white text-sm sm:text-base md:text-lg mb-6">
              Join thousands of veterans who've found clarity and direction
            </p>
            <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold text-center hover:bg-white hover:text-[#002147] transition-all duration-300 text-sm">
              Take the quiz now
            </button>
          </div>
        </div>
      </section>

      {/* Trusted By / Social Proof - HubSpot Style */}
      <section className="bg-white py-16 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-3">
              Trusted by Service Members Worldwide
            </p>
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-[#002147] mb-2">
              240,000+ veterans served across 135+ countries
            </h3>
            <div className="w-12 h-1 bg-[#ff5e1a] mx-auto rounded-full mb-3" aria-hidden="true"/>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Transitioning successfully with WANAC's support
            </p>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10 md:mb-12">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ff5e1a] mb-2">98%</div>
              <div className="text-xs sm:text-sm text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ff5e1a] mb-2">50+</div>
              <div className="text-xs sm:text-sm text-gray-600">Partner Organizations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ff5e1a] mb-2">24/7</div>
              <div className="text-xs sm:text-sm text-gray-600">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ff5e1a] mb-2">&lt;3min</div>
              <div className="text-xs sm:text-sm text-gray-600">Average Quiz Time</div>
            </div>
          </div>

          {/* Partner Logos Placeholder */}
          <div className="border-t border-gray-200 pt-8 sm:pt-10 md:pt-12">
            <p className="text-center text-xs text-gray-500 uppercase tracking-wide font-semibold mb-6 sm:mb-8">
              Partnered with Leading Organizations
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 items-center opacity-60">
              <div className="bg-gray-100 p-4 sm:p-6 text-center">
                <div className="text-gray-600 font-bold text-xs sm:text-sm">VA</div>
              </div>
              <div className="bg-gray-100 p-4 sm:p-6 text-center">
                <div className="text-gray-600 font-bold text-xs sm:text-sm">DOD</div>
              </div>
              <div className="bg-gray-100 p-4 sm:p-6 text-center">
                <div className="text-gray-600 font-bold text-xs sm:text-sm">VFW</div>
              </div>
              <div className="bg-gray-100 p-4 sm:p-6 text-center">
                <div className="text-gray-600 font-bold text-xs sm:text-sm">American Legion</div>
              </div>
              <div className="bg-gray-100 p-4 sm:p-6 text-center">
                <div className="text-gray-600 font-bold text-xs sm:text-sm">DAV</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Coverage Section */}
      <section className="bg-[#faf9f7] py-16 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-[#002147]">
              What the quiz covers (and what you'll get)
            </h2>
            <div className="w-12 h-1 bg-[#ff5e1a] mx-auto rounded-full mb-3" aria-hidden="true"/>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
              Our comprehensive assessment evaluates your readiness across five critical domains of transition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 md:mb-12">
            {quizCoverageAreas.map((area, index) => (
              <div key={index} className="group relative bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col border-t-4 border-[#ff5e1a]">
                {/* Gradient border effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-4 sm:p-5 flex flex-col flex-grow">
                  <div className="w-12 h-12 bg-[#ff5e1a] bg-opacity-10 flex items-center justify-center mb-4 text-[#ff5e1a]">
                  {area.icon}
                </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#002147] group-hover:text-orange-600 transition-colors leading-snug mb-3">{area.title}</h3>
                  <div className="mb-4 flex-grow">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Checks:</p>
                    <p className="text-xs text-gray-600 mb-3">{area.checks}</p>
                    <p className="text-xs font-semibold text-gray-700 mb-1">Output:</p>
                    <p className="text-xs text-gray-600">{area.output}</p>
                  </div>
                </div>
              </div>
            ))}
              </div>

          <div className="text-center">
            <button className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-center overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 text-sm inline-flex items-center gap-2">
              <span className="relative z-10 flex items-center justify-center gap-2">
              Get my personalized plan (free)
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-white py-16 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-[#002147]">
              How it works (3 steps)
            </h2>
            <div className="w-12 h-1 bg-[#ff5e1a] mx-auto rounded-full mb-3" aria-hidden="true"/>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
              Simple, fast, and actionable
            </p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 md:mb-12">
            {/* Step 1 */}
            <div className="relative">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ff5e1a] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  1
              </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#002147] mb-2">
                  Answer the 12 prompts
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Takes approximately 3 minutes. Quick, focused questions about your transition readiness.
                </p>
              </div>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-8 left-full w-full h-1 bg-gray-200" style={{ width: 'calc(100% - 32px)', left: 'calc(50% + 32px)' }}></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#002147] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  2
              </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#002147] mb-2">
                  See your R/A/G score
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Get instant Red/Amber/Green scoring and a concise plan for each domain.
                </p>
              </div>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-8 left-full w-full h-1 bg-gray-200" style={{ width: 'calc(100% - 32px)', left: 'calc(50% + 32px)' }}></div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#002147] mb-2">
                Act today
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Book claims support, apply for a cohort, or grab your next task immediately.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-center overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 text-sm">
              <span className="relative z-10 flex items-center justify-center gap-2">
              Take the 3-minute quiz
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </div>
        </div>
      </section>

      {/* Where it Plugs In Section */}
      <section className="bg-[#faf9f7] py-16 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-[#002147]">
              Where it plugs in (integration & fit)
            </h2>
            <div className="w-12 h-1 bg-[#ff5e1a] mx-auto rounded-full mb-3" aria-hidden="true"/>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 md:mb-12">
            <div className="group relative bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col">
              {/* Gradient border effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-4 sm:p-5 flex flex-col flex-grow">
                <div className="w-12 h-12 bg-blue-600 bg-opacity-10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#002147] group-hover:text-orange-600 transition-colors leading-snug mb-2">Claim-first routing</h3>
                <p className="text-gray-600 text-xs leading-relaxed flex-grow">
                If you're ≤12 months from separation or on active duty, we route you to accredited VSO claim support (including BDD).
              </p>
              </div>
            </div>
            
            <div className="group relative bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col">
              {/* Gradient border effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-4 sm:p-5 flex flex-col flex-grow">
                <div className="w-12 h-12 bg-[#ff5e1a] bg-opacity-10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#002147] group-hover:text-orange-600 transition-colors leading-snug mb-2">Program routing</h3>
                <p className="text-gray-600 text-xs leading-relaxed flex-grow">
                Education → PLEP, Career → PLCA, Entrepreneurship → VETA, Performance → PPC/CPPC.
              </p>
              </div>
            </div>
            
            <div className="group relative bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col">
              {/* Gradient border effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-4 sm:p-5 flex flex-col flex-grow">
                <div className="w-12 h-12 bg-green-600 bg-opacity-10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#002147] group-hover:text-orange-600 transition-colors leading-snug mb-2">Funding next step</h3>
                <p className="text-gray-600 text-xs leading-relaxed flex-grow">
                Links to the Scholarship Eligibility Estimator and cohort dates.
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Take This Section */}
      <section className="bg-white py-16 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-[#002147]">
              Who should take this
            </h2>
            <div className="w-12 h-1 bg-[#ff5e1a] mx-auto rounded-full mb-3" aria-hidden="true"/>
                </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-[#ff5e1a] to-[#e54e16] shadow-lg p-4 sm:p-6 text-white text-center hover:shadow-xl transition-shadow duration-300">
              <svg className="w-8 h-8 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <p className="font-semibold text-sm sm:text-base">
                Active duty within BDD window or ≤12 months from separation
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#002147] to-[#003366] shadow-lg p-4 sm:p-6 text-white text-center hover:shadow-xl transition-shadow duration-300">
              <svg className="w-8 h-8 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <p className="font-semibold text-sm sm:text-base">
                Recently separated veterans ready to prioritize benefits, school, job, or venture
              </p>
              </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 shadow-lg p-4 sm:p-6 text-white text-center hover:shadow-xl transition-shadow duration-300">
              <svg className="w-8 h-8 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <p className="font-semibold text-sm sm:text-base">
                Anyone stuck in "where do I start?" who wants a single, clear plan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#faf9f7] py-16 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-[#002147]">
              Frequently Asked Questions
            </h2>
            <div className="w-12 h-1 bg-[#ff5e1a] mx-auto rounded-full mb-3" aria-hidden="true"/>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              Risk reversal & objections answered
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white shadow-md overflow-hidden">
                <button
                  className="w-full text-left px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-sm sm:text-base md:text-lg font-semibold text-[#002147]">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-[#ff5e1a] transition-transform duration-200 ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-gray-600 animate-fadeIn text-xs sm:text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-[#002147] to-[#003366] py-16 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Start your transition plan today
            </h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mb-4" aria-hidden="true"/>
            <p className="text-sm sm:text-base md:text-lg mb-8 text-gray-200 max-w-3xl mx-auto">
              Get your personalized readiness assessment in just 3 minutes
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
              <button className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-center overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 text-sm">
                <span className="relative z-10 flex items-center justify-center gap-2">
                Take the 3-minute quiz
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
              <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold text-center hover:bg-white hover:text-[#002147] transition-all duration-300 text-sm">
                Book a 15-minute consult
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="bg-gray-100 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              <span className="font-semibold">Compliance & Privacy:</span> WANAC provides accredited VSO representation for eligible veterans within 12 months of separation and for active-duty BDD claims, and partners with accredited organizations for others. WANAC is not a law firm and is not affiliated with the U.S. Department of Veterans Affairs. Your information is handled securely and shared only with your consent.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TransitionReadinessQuiz;
