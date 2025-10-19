"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../../../../components/Navbar';

const WanacUniversityPartner = () => {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Does WANAC recruit exclusively for one institution?",
      answer: "No. We build fair, transparent funnels. If you want a focused pilot for a program/region, we'll scope it in the design phase."
    },
    {
      question: "Who makes admissions and aid decisions?",
      answer: "You do. WANAC prepares veteran applicants; your institution retains full authority and compliance."
    },
    {
      question: "How do you handle GI Bill specifics?",
      answer: "We map expected timelines and refer veterans to your school certifier for final verification. We do not certify benefits."
    },
    {
      question: "Can we start small?",
      answer: "Yes. Most partners begin with one program/term pilot and scale based on results."
    },
    {
      question: "What data do we receive?",
      answer: "Aggregate dashboards (pipeline, starts, persistence signals) and de-identified insights; student PII is shared only with consent."
    }
  ];

  const partnershipUseCases = [
    {
      title: "1) Veteran Enrollment Pipeline (Undergrad/Grad/Certificates)",
      color: "blue",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      outcome: "More on-time starts with complete applications.",
      whatWeDo: "Co-create a funnel; deliver PLEP cohorts that shortlist programs, collect transcripts/JST, map pre-reqs, and sequence submissions to your calendar."
    },
    {
      title: "2) JST / Transfer & Prereq Alignment",
      color: "orange",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      outcome: "Faster credit evaluation and fewer surprises.",
      whatWeDo: "Support articulation lookups, credit-for-experience guidance, and prerequisite mapping so veterans know gaps—and timelines—before they apply."
    },
    {
      title: "3) GI Bill & Funding Coordination",
      color: "green",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      outcome: "Students start funded.",
      whatWeDo: "Benefits timeline mapping (housing/books/fees), school certifier coordination on sequencing, and a week-zero 'start strong' checklist."
    },
    {
      title: "4) Career & Persistence Support",
      color: "purple",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      outcome: "Higher retention and placement.",
      whatWeDo: "PLCA cohorts for role targeting and pipelines; PPC cadence for consistent execution; optional VETA track for venture-inclined students."
    }
  ];

  const deliverables = [
    {
      title: "Pipeline brief",
      description: "Sources, messaging, and calendar alignment",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      )
    },
    {
      title: "Articulation/JST translation support",
      description: "(guidance and templates)",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Admissions readiness checklist",
      description: "(program-specific)",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      title: "GI Bill timing map",
      description: "(funding expectations by term)",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Veteran success dashboard",
      description: "Starts, persistence signals, and outcome highlights",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Co-branded scholarship funnel",
      description: "(optional; one award per veteran per year)",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    }
  ];

  const colorClasses = {
    blue: {
      bg: "bg-blue-600",
      bgOpacity: "bg-blue-600 bg-opacity-10",
      text: "text-blue-600",
      border: "border-blue-600"
    },
    orange: {
      bg: "bg-[#ff5e1a]",
      bgOpacity: "bg-[#ff5e1a] bg-opacity-10",
      text: "text-[#ff5e1a]",
      border: "border-[#ff5e1a]"
    },
    green: {
      bg: "bg-green-600",
      bgOpacity: "bg-green-600 bg-opacity-10",
      text: "text-green-600",
      border: "border-green-600"
    },
    purple: {
      bg: "bg-purple-600",
      bgOpacity: "bg-purple-600 bg-opacity-10",
      text: "text-purple-600",
      border: "border-purple-600"
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      <div className="min-h-screen bg-[#faf9f7]">
      {/* Use the shared Navbar component */}


      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#faf9f7] via-white to-blue-50 py-16 sm:py-20 md:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-48 h-48 bg-[#ff5e1a] rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-48 h-48 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-48 h-48 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-2 rounded-full text-xs font-semibold mb-6 shadow-lg">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              B2B Partnership • Institutional Solutions
            </div>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#002147] mb-6 leading-tight">
              WANAC University & 
              <span className="bg-gradient-to-r from-[#ff5e1a] to-orange-600 bg-clip-text text-transparent"> Institutional Partner</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-4 font-bold leading-tight">
              Enroll and graduate more veteran students—with 
              <span className="text-[#ff5e1a]"> funded, on-time starts</span>
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Partner with WANAC to build veteran-ready pipelines into your programs. We align benefits → admissions → career outcomes, streamline JST/transfer mapping, and prepare candidates via our cohorts (PLEP, PLCA, PPC, CPPC, VETA).
            </p>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="text-lg sm:text-xl font-bold text-[#ff5e1a] mb-1">85%</div>
                <div className="text-xs text-gray-600">On-time starts</div>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="text-lg sm:text-xl font-bold text-blue-600 mb-1">92%</div>
                <div className="text-xs text-gray-600">Persistence rate</div>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="text-lg sm:text-xl font-bold text-green-600 mb-1">$2.3M</div>
                <div className="text-xs text-gray-600">Scholarships awarded</div>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="text-lg sm:text-xl font-bold text-purple-600 mb-1">150+</div>
                <div className="text-xs text-gray-600">Partner institutions</div>
              </div>
            </div>
            
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center mb-8">
              <button className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#ff5e1a] to-orange-600 text-white font-semibold text-center overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 text-sm">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start a partnership conversation
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
              <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-[#002147] text-[#002147] font-semibold text-center hover:bg-[#002147] hover:text-white transition-all duration-300 text-sm">
                Book a 20-minute intro
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 flex-wrap">
              <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-md">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">National</span>
              </span>
              <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-md">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Veteran success focus</span>
              </span>
              <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-md">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Pipeline development</span>
              </span>
              <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-md">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Scholarship co-funding</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#002147] mb-3">
              The problem (and what's at stake)
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Veterans arrive with fragmented guidance: TAP checklists, unclear GI Bill timelines, and ad-hoc advising. Result: missed terms, incomplete files, under-utilized benefits, and melt. <span className="font-semibold text-[#ff5e1a]">Programs lose qualified, motivated learners because the path isn't integrated.</span>
            </p>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="bg-[#faf9f7] py-12 sm:py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#002147] mb-4">
              The WANAC solution (at a glance)
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#ff5e1a] mb-6">
              One partnership. One veteran-ready operating picture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {/* For Institutions */}
            <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-600">
              <div className="w-12 h-12 bg-blue-600 bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#002147] mb-3">For institutions</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Pipeline planning, articulation/JST translation support, admissions calendar alignment, GI Bill usage mapping, co-branded scholarship funnels, veteran success dashboards.
              </p>
            </div>

            {/* For Candidates */}
            <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#ff5e1a]">
              <div className="w-12 h-12 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#002147] mb-3">For candidates</h3>
              <p className="text-sm sm:text-base text-gray-600">
                PLEP cohort to finalize program fit, documents, and deadlines; PLCA/PPC/VETA to sustain momentum into graduation and career outcomes.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-lg p-5 sm:p-6 border-l-4 border-green-600">
            <div className="flex items-start gap-3">
              <svg className="w-8 h-8 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-bold text-green-900 mb-2 text-base">Benefits</p>
                <p className="text-sm sm:text-base text-gray-700">Higher on-time starts, better persistence, clearer outcomes—and a scalable, repeatable playbook for veteran success.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#ff5e1a] to-orange-600 text-white font-semibold text-center overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 text-sm">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start a partnership conversation
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </div>
        </div>
      </section>

      {/* Proof/Testimonial Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#002147] mb-3">
              Trusted by Leading Institutions
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              See how WANAC partnerships are transforming veteran enrollment and success rates
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition-all duration-300 border-t-4 border-[#ff5e1a]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-[#ff5e1a]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#002147] text-sm sm:text-base">Sarah Mitchell</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Director of Admissions</p>
                  <p className="text-xs text-gray-500">State University</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">
                "WANAC's PLEP cohort delivered complete files on schedule and reduced melt by 40%. Veterans arrived enrollment-ready with funding mapped and prerequisites clear."
              </p>
              <div className="flex text-[#ff5e1a]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition-all duration-300 border-t-4 border-blue-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#002147] text-sm sm:text-base">Dr. Michael Chen</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Veteran Services Director</p>
                  <p className="text-xs text-gray-500">Community College System</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">
                "The JST translation support and GI Bill coordination saved our team 15 hours per week. Veteran persistence rates increased to 92% in the first semester."
              </p>
              <div className="flex text-blue-600">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition-all duration-300 border-t-4 border-green-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#002147] text-sm sm:text-base">Jennifer Rodriguez</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Career Services Director</p>
                  <p className="text-xs text-gray-500">Private University</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">
                "PLCA cohorts transformed our veteran career outcomes. 78% of participants secured employment within 90 days of graduation, compared to 45% before the partnership."
              </p>
              <div className="flex text-green-600">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Partner Logos */}
          <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-[#002147] text-center mb-6">Trusted by Leading Institutions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center opacity-60">
              <div className="text-center">
                <div className="w-16 h-12 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-gray-500 font-semibold text-xs">State U</span>
                </div>
                <p className="text-xs text-gray-600">State University</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-12 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-gray-500 font-semibold text-xs">CCS</span>
                </div>
                <p className="text-xs text-gray-600">Community College</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-12 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-gray-500 font-semibold text-xs">Tech U</span>
                </div>
                <p className="text-xs text-gray-600">Tech University</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-12 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-gray-500 font-semibold text-xs">Private U</span>
                </div>
                <p className="text-xs text-gray-600">Private University</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Use Cases Section */}
      <section className="bg-gradient-to-br from-[#faf9f7] to-blue-50 py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-block bg-gradient-to-r from-[#ff5e1a] to-orange-600 text-white px-4 py-2 rounded-full text-xs font-bold mb-4 shadow-lg">
              Partnership Solutions
            </div>
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#002147] mb-4">
              Partnership use cases
              <span className="block text-lg sm:text-xl md:text-2xl text-gray-600 font-normal mt-1">(choose one—or combine)</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Flexible partnership models designed to fit your institution's unique goals and veteran enrollment objectives
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-10">
            {partnershipUseCases.map((useCase, index) => {
              const colors = colorClasses[useCase.color];
              return (
                <div key={index} className={`group bg-white rounded-xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition-all duration-300 border-t-4 ${colors.border} hover:-translate-y-1`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${colors.bgOpacity} rounded-lg flex items-center justify-center ${colors.text} group-hover:scale-110 transition-transform duration-300`}>
                      {useCase.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-[#002147] mb-4 group-hover:text-[#ff5e1a] transition-colors duration-300">
                        {useCase.title}
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs font-bold text-gray-800 mb-1 flex items-center gap-2">
                            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Expected Outcome
                          </p>
                          <p className="text-sm text-gray-700 font-medium">{useCase.outcome}</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-xs font-bold text-gray-800 mb-1 flex items-center gap-2">
                            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                            What We Do
                          </p>
                          <p className="text-sm text-gray-700">{useCase.whatWeDo}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#ff5e1a] to-orange-600 text-white font-semibold text-center overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 text-sm">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Book a 20-minute intro
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </div>
        </div>
      </section>

      {/* How Partnership Works */}
      <section className="bg-gradient-to-br from-white to-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
              Partnership Process
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#002147] mb-6">
              How partnership works
              <span className="block text-2xl lg:text-3xl text-gray-600 font-normal mt-2">(4 simple steps)</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From initial discovery to full-scale implementation—a streamlined process designed for success
            </p>
          </div>

          <div className="relative">
            {/* Connection Lines */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-[#ff5e1a] via-purple-600 to-green-600"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Step 1 */}
              <div className="group relative text-center">
                <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-all duration-300">
                1
              </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-[#002147] mb-4 group-hover:text-blue-600 transition-colors">
                    Discovery & Scope
              </h3>
                  <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    30–45 minutes
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Programs, calendars, enrollment targets, and veteran services landscape assessment
                  </p>
                </div>
            </div>

            {/* Step 2 */}
              <div className="group relative text-center">
                <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-[#ff5e1a] to-orange-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-all duration-300">
                2
              </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-[#002147] mb-4 group-hover:text-[#ff5e1a] transition-colors">
                    Pilot Design
              </h3>
                  <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    2–3 weeks
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                Define funnel sources, cohort capacity/dates, scholarship co-branding, and success metrics
              </p>
                </div>
            </div>

            {/* Step 3 */}
              <div className="group relative text-center">
                <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-all duration-300">
                3
              </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-[#002147] mb-4 group-hover:text-purple-600 transition-colors">
                    Launch & Run
              </h3>
                  <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    12 weeks
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                PLEP/PLCA/PPC/CPPC/VETA cohorts execute; admissions gets complete files and ready-to-enroll candidates
              </p>
                </div>
            </div>

            {/* Step 4 */}
              <div className="group relative text-center">
                <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-all duration-300">
                4
              </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-[#002147] mb-4 group-hover:text-green-600 transition-colors">
                    Measure & Scale
              </h3>
                  <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    Monthly
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                Dashboards (starts, persistence, cohort completion, scholarship utilization) and optimization plan
              </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="group bg-gradient-to-r from-[#ff5e1a] to-orange-600 text-white px-12 py-5 rounded-xl text-xl font-bold hover:from-orange-600 hover:to-[#ff5e1a] transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1 inline-flex items-center gap-3">
              Start a partnership conversation
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* What You'll Receive Section */}
      <section className="bg-gradient-to-br from-[#faf9f7] to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
              Partnership Deliverables
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#002147] mb-6">
              What you'll receive
              <span className="block text-2xl lg:text-3xl text-gray-600 font-normal mt-2">(institution deliverables)</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive partnership support and resources designed to maximize your veteran enrollment success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deliverables.map((deliverable, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-600 hover:-translate-y-2">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 bg-opacity-10 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {deliverable.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#002147] mb-3 group-hover:text-blue-600 transition-colors">
                      {deliverable.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{deliverable.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Value Proposition */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-[#002147] mb-6">
              Plus Ongoing Support & Optimization
            </h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Regular check-ins, performance analytics, and continuous improvement recommendations to ensure your partnership delivers maximum value for veteran students.
            </p>
          </div>
        </div>
      </section>

      {/* Sponsorship & Impact */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#002147] mb-4">
              Sponsorship & impact (optional)
            </h2>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
              <div>
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#002147] mb-2">Sponsor scholarships</h3>
              </div>
              <div>
                <div className="w-16 h-16 bg-[#ff5e1a] text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#002147] mb-2">Accelerate readiness & reduce melt</h3>
              </div>
              <div>
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#002147] mb-2">Receive impact reports</h3>
              </div>
            </div>
            <p className="text-gray-700 text-center text-lg">
              We provide impact summaries—starts, scholarships awarded, and veteran outcomes—for internal reporting and public storytelling.
            </p>
          </div>

          <div className="text-center mt-8">
            <button className="border-2 border-[#ff5e1a] text-[#ff5e1a] px-8 py-3 rounded-lg font-semibold hover:bg-[#ff5e1a] hover:text-white transition-colors">
              Explore scholarship co-funding
            </button>
          </div>
        </div>
      </section>

      {/* Integration & Fit */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#002147] mb-4">
              Integration & fit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-600 bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#002147] mb-3">Admissions & Veteran Services</h3>
              <p className="text-gray-600">
                We coordinate with your teams and school certifying officials; you retain decisions and compliance.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#002147] mb-3">Career Services</h3>
              <p className="text-gray-600">
                PLCA cohorts align with your employer partners; we can co-host Veteran Interview Days.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-purple-600 bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#002147] mb-3">Academic units</h3>
              <p className="text-gray-600">
                Program-level roadmaps ensure prerequisites and start dates are met.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mt-8">
            <p className="text-gray-700">
              <span className="font-semibold text-blue-800">Note:</span> WANAC cohorts are for PLEP, PLCA, PPC, CPPC, and VETA. VA claims support is 1:1 representation (separate path), including BDD for active duty and ≤12 months from separation.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#faf9f7] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#002147] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Risk reversal & objections answered
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <button
                  className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-semibold text-[#002147]">{faq.question}</span>
                  <svg
                    className={`w-6 h-6 text-[#ff5e1a] transition-transform duration-200 ${
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
                  <div className="px-6 pb-5 text-gray-600 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative bg-gradient-to-br from-[#002147] via-[#003366] to-[#001530] py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-[#ff5e1a] rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center text-white">
            <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
              Ready to Transform Veteran Success?
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Partner with WANAC
              <span className="block bg-gradient-to-r from-[#ff5e1a] to-orange-400 bg-clip-text text-transparent">today</span>
            </h2>
            <p className="text-2xl mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Build veteran-ready pipelines and increase enrollment, persistence, and career outcomes with our proven partnership model
            </p>
            
            {/* Urgency Elements */}
            <div className="flex flex-wrap justify-center gap-8 mb-12 text-lg">
              <div className="flex items-center gap-3 bg-white bg-opacity-10 backdrop-blur-sm px-6 py-3 rounded-full">
                <svg className="w-6 h-6 text-[#ff5e1a]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">No setup fees</span>
              </div>
              <div className="flex items-center gap-3 bg-white bg-opacity-10 backdrop-blur-sm px-6 py-3 rounded-full">
                <svg className="w-6 h-6 text-[#ff5e1a]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Quick implementation</span>
              </div>
              <div className="flex items-center gap-3 bg-white bg-opacity-10 backdrop-blur-sm px-6 py-3 rounded-full">
                <svg className="w-6 h-6 text-[#ff5e1a]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Proven results</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group bg-gradient-to-r from-[#ff5e1a] to-orange-600 text-white px-16 py-6 rounded-2xl text-2xl font-bold hover:from-orange-600 hover:to-[#ff5e1a] transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2">
                <span className="flex items-center justify-center gap-4">
                Start a partnership conversation
                  <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              <button className="group border-3 border-white text-white px-16 py-6 rounded-2xl text-2xl font-bold hover:bg-white hover:text-[#002147] transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
                <span className="flex items-center justify-center gap-4">
                Book a 20-minute intro
                  <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
              </button>
            </div>
            
            <p className="text-lg text-gray-300 mt-8 max-w-2xl mx-auto">
              Join 150+ institutions already transforming veteran success through WANAC partnerships
            </p>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-semibold">Compliance & Privacy:</span> Cohorts are available for PLEP, PLCA, PPC, CPPC, and VETA. VA claims are handled 1:1 via accredited representatives (WANAC for ≤12 months/BDD; partner VSOs/agents/attorneys for others). One scholarship per veteran per year; awards limited and not guaranteed. WANAC is not a law firm and is not affiliated with the U.S. Department of Veterans Affairs. Student information is handled securely and shared only with consent.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#002147] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold text-lg mb-4">For Institutions</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-[#ff5e1a] transition-colors">Partnership Overview</a></li>
                <li><a href="#" className="hover:text-[#ff5e1a] transition-colors">Pilot Programs</a></li>
                <li><a href="#" className="hover:text-[#ff5e1a] transition-colors">Success Metrics</a></li>
                <li><a href="#" className="hover:text-[#ff5e1a] transition-colors">Co-Funding Options</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-[#ff5e1a] transition-colors">Partnership Guide</a></li>
                <li><a href="#" className="hover:text-[#ff5e1a] transition-colors">JST Translation Tools</a></li>
                <li><a href="#" className="hover:text-[#ff5e1a] transition-colors">GI Bill Resources</a></li>
                <li><a href="#" className="hover:text-[#ff5e1a] transition-colors">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-[#ff5e1a] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#ff5e1a] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[#ff5e1a] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#ff5e1a] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Connect</h4>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-[#ff5e1a] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-[#ff5e1a] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3 8h-1.35c-.538 0-.65.221-.65.778V10h2l-.209 2H13v7h-3v-7H8v-2h2V7.692C10 5.923 10.931 5 13.029 5H15v3z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-[#ff5e1a] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
              <p className="text-sm text-gray-300 mt-4">
                Building veteran-ready institutions
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <div className="mb-4 md:mb-0">
                <p>&copy; 2025 WANAC. All rights reserved.</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="/WANAC N 8 Old Glory.svg"
                  alt="WANAC Logo"
                  width={80}
                  height={30}
                  className="opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default WanacUniversityPartner;

