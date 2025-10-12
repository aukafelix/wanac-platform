"use client";

import React, { useState } from 'react';

const WanacPLEP = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Will PLEP pick my school for me?",
      answer: "No. We provide a comparative shortlist and decision framework; you choose."
    },
    {
      question: "What about GI Bill optimization?",
      answer: "We map expected benefits and timelines to your program plan so funding aligns with your start date."
    },
    {
      question: "I have prior credits/JST—can I use them?",
      answer: "Yes. We review transferability and build a plan to minimize duplication and time to completion."
    },
    {
      question: "How fast can I start?",
      answer: "Depends on program calendars and prerequisites. Many cohorts place veterans into the next available term with a complete file."
    },
    {
      question: "Do you handle claims inside the cohort?",
      answer: "No. If benefits are blocking, we route you to accredited VSO Claim Support first, then resume your PLEP missions."
    },
    {
      question: "Time per week?",
      answer: "Plan 60–90 minutes for sessions, missions, and debriefs."
    }
  ];

  const useCases = [
    {
      title: "1) Undergraduate / Transfer",
      color: "blue",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      outcome: "Target school list, transfer-credit strategy, term-by-term map.",
      whatWeDo: "Evaluate prior credits/JST, program prerequisites, articulation options; sequence applications and decisions."
    },
    {
      title: "2) Graduate / Professional",
      color: "purple",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      outcome: "Competitive application timeline and funding strategy.",
      whatWeDo: "Program comparison, pre-reqs/tests (if any), essays/resumes, recommenders, submission schedule."
    },
    {
      title: "3) Certificates / Bootcamps",
      color: "orange",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      outcome: "Skills-to-role alignment with accelerated start.",
      whatWeDo: "Provider vetting, outcomes fit, schedule & funding plan, rapid onboarding."
    },
    {
      title: "4) Trades / Licensing",
      color: "green",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      outcome: "Training + licensing path mapped to employment.",
      whatWeDo: "State/licensure requirements, apprenticeship routes, GI Bill alignment, start date sequencing."
    },
    {
      title: "5) Online vs. On-Campus",
      color: "cyan",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      outcome: "Modality matched to your life constraints.",
      whatWeDo: "Time-and-travel modeling, term load, support services, start-strong plan."
    }
  ];

  const deliverables = [
    {
      title: "Program Shortlist",
      description: "(3–5 options) with pros/cons and admissions dates.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      title: "Prerequisite & Transfer Plan",
      description: "(credit evaluation, gaps, sequencing).",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Funding Map",
      description: "GI Bill usage plan, expected housing/book benefits, other aid & WANAC scholarship fit.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Admissions Execution Checklist",
      description: "Essays, transcripts, recommendations, forms, deadlines.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      title: "Start-Strong Playbook",
      description: "Week-zero and week-one tasks, services to activate, study rhythm.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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
    purple: {
      bg: "bg-purple-600",
      bgOpacity: "bg-purple-600 bg-opacity-10",
      text: "text-purple-600",
      border: "border-purple-600"
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
    cyan: {
      bg: "bg-cyan-600",
      bgOpacity: "bg-cyan-600 bg-opacity-10",
      text: "text-cyan-600",
      border: "border-cyan-600"
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#faf9f7] to-white py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              Education Pathway • GI Bill Optimization
            </div>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-[#002147] mb-3 sm:mb-4 leading-tight">
              WANAC Promise Land Education Pathway (PLEP)
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-2 sm:mb-3 font-semibold">
              Build a funded, fit-for-purpose education plan
            </p>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
              A cohort-based pathway that aligns your mission, program choice, prerequisites, timeline, and GI Bill funding—so you start on time with a plan you can execute.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center mb-4 sm:mb-6">
              <button className="bg-[#ff5e1a] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#e54e16] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Apply for the PLEP cohort
              </button>
              <button className="border-2 border-[#002147] text-[#002147] px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#002147] hover:text-white transition-all duration-200">
                Not sure yet? Take the 3-minute quiz
              </button>
            </div>
            <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 flex-wrap">
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
                Cohort-based
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                National
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Scholarships available (one per year)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#002147] mb-3 sm:mb-4">
              The problem (and what's at stake)
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-3xl mx-auto">
              After TAP, most veterans get lists, not a plan. Wrong-fit programs, missed admissions windows, and uncoordinated GI Bill usage lead to delays and wasted time. <span className="font-semibold text-[#ff5e1a]">Every term you miss compounds lost momentum and costs.</span>
            </p>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="bg-[#faf9f7] py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#002147] mb-3 sm:mb-4">
              The PLEP solution (at a glance)
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#ff5e1a] mb-6 sm:mb-8">
              One cohort. One operating picture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {/* Features Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center mb-4 sm:mb-5">
                <svg className="w-8 h-8 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#002147] mb-3 sm:mb-4">Features</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Program fit & shortlisting, admissions timeline, prerequisite mapping, GI Bill optimization, cost & funding plan, application execution, start-strong onboarding.
              </p>
            </div>

            {/* Advantages Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#002147] bg-opacity-10 rounded-full flex items-center justify-center mb-4 sm:mb-5">
                <svg className="w-8 h-8 text-[#002147]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#002147] mb-3 sm:mb-4">Advantages</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                A single, integrated plan that ties benefits → program → start date.
              </p>
            </div>

            {/* Benefits Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-600 bg-opacity-10 rounded-full flex items-center justify-center mb-4 sm:mb-5">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#002147] mb-3 sm:mb-4">Benefits</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Start the right program, on time, with funding aligned and a week-one execution plan.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-[#ff5e1a] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#e54e16] transition-all duration-200 shadow-lg hover:shadow-xl">
              Apply for the PLEP cohort
            </button>
          </div>
        </div>
      </section>

      {/* Proof/Testimonial Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#002147] to-[#003366] rounded-xl sm:rounded-2xl shadow-xl p-5 sm:p-8 text-white">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
              <svg className="w-12 h-12 text-[#ff5e1a] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div>
                <p className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 leading-relaxed">
                  "I went from 'maybe next term' to a funded start date with a clear course map and checklist."
                </p>
                <p className="text-xs sm:text-sm text-gray-300 font-medium">— U.S. Navy veteran</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Benefits & Capabilities Section */}
      <section className="bg-[#faf9f7] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#002147] mb-3 sm:mb-4">
              Deep benefits & capabilities (by use case)
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
              Tailored pathways for every education goal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {useCases.map((useCase, index) => {
              const colors = colorClasses[useCase.color];
              return (
                <div key={index} className={`bg-white rounded-xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition-all duration-300 border-t-4 ${colors.border}`}>
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 ${colors.bgOpacity} rounded-full flex items-center justify-center mb-4 sm:mb-5 ${colors.text}`}>
                    {useCase.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#002147] mb-3 sm:mb-4">{useCase.title}</h3>
                  <div className="mb-3 sm:mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-1.5">Outcome:</p>
                    <p className="text-xs text-gray-600 mb-3">{ useCase.outcome}</p>
                    <p className="text-xs font-semibold text-gray-700 mb-1.5">What we do:</p>
                    <p className="text-xs text-gray-600">{useCase.whatWeDo}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8 sm:mt-10">
            <button className="bg-[#ff5e1a] text-white px-5 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#e54e16] transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center gap-2">
              Apply for the PLEP cohort
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* What You'll Produce Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#002147] mb-3 sm:mb-4">
              What you'll produce (deliverables)
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
              Concrete outputs from your PLEP cohort experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {deliverables.map((deliverable, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4 sm:p-5 hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#ff5e1a]">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center text-[#ff5e1a] flex-shrink-0">
                    {deliverable.icon}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#002147] mb-1.5 sm:mb-2">{deliverable.title}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">{deliverable.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How the Cohort Works */}
      <section className="bg-[#faf9f7] py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#002147] mb-3 sm:mb-4">
              How the cohort works (4 steps)
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
              12-week journey from intake to enrollment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-18 sm:h-18 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold mx-auto mb-4 sm:mb-5 shadow-lg">
                1
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#002147] mb-2 sm:mb-3">
                Intake & targeting
              </h3>
              <p className="text-xs text-gray-600 mb-1.5 sm:mb-2">(week 1)</p>
              <p className="text-xs text-gray-600">
                Goals, constraints, timeline, prior credits
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-18 sm:h-18 bg-[#ff5e1a] text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold mx-auto mb-4 sm:mb-5 shadow-lg">
                2
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#002147] mb-2 sm:mb-3">
                Design & alignment
              </h3>
              <p className="text-xs text-gray-600 mb-1.5 sm:mb-2">(weeks 2–3)</p>
              <p className="text-xs text-gray-600">
                Shortlist + funding map + admissions schedule
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-18 sm:h-18 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold mx-auto mb-4 sm:mb-5 shadow-lg">
                3
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#002147] mb-2 sm:mb-3">
                Execute
              </h3>
              <p className="text-xs text-gray-600 mb-1.5 sm:mb-2">(weeks 4–8)</p>
              <p className="text-xs text-gray-600">
                Submit applications, order records, finalize prerequisites
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-18 sm:h-18 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold mx-auto mb-4 sm:mb-5 shadow-lg">
                4
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#002147] mb-2 sm:mb-3">
                Launch readiness
              </h3>
              <p className="text-xs text-gray-600 mb-1.5 sm:mb-2">(weeks 9–12)</p>
              <p className="text-xs text-gray-600">
                Enroll, register, activate services, run the start-strong plan
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-5 rounded-lg mb-6 sm:mb-8">
            <p className="text-xs sm:text-sm text-gray-700">
              <span className="font-semibold text-blue-800">Time commitment:</span> ~60–90 minutes/week (session + missions).
            </p>
          </div>

          <div className="text-center">
            <button className="bg-[#ff5e1a] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#e54e16] transition-all duration-200 shadow-lg hover:shadow-xl">
              Apply for the PLEP cohort
            </button>
          </div>
        </div>
      </section>

      {/* Integration & Fit */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#002147] mb-3 sm:mb-4">
              Integration & fit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-lg p-5 sm:p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 sm:w-13 sm:h-13 bg-blue-600 bg-opacity-10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#002147] mb-2 sm:mb-3">Benefits first when needed</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                If claims are the bottleneck, we route you to accredited VSO Claim Support (including BDD for active duty) before cohort milestones.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-5 sm:p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 sm:w-13 sm:h-13 bg-[#ff5e1a] bg-opacity-10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-7 h-7 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#002147] mb-2 sm:mb-3">Career alignment</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                PLEP pairs with PLCA (Career Accelerator) to connect program → role pipeline.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-5 sm:p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 sm:w-13 sm:h-13 bg-green-600 bg-opacity-10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#002147] mb-2 sm:mb-3">Execution engine</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                PPC can run in parallel to keep weekly missions on track.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-5 rounded-lg mt-6 sm:mt-8">
            <p className="text-xs sm:text-sm text-gray-700">
              <span className="font-semibold text-blue-800">Note:</span> Cohorts are for PLEP, PLCA, PPC, CPPC, and VETA. Claims support is 1:1 representation (not a cohort).
            </p>
          </div>
        </div>
      </section>

      {/* Scholarships & Funding */}
      <section className="bg-[#faf9f7] py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#002147] mb-3 sm:mb-4">
              Scholarships & funding
            </h2>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-8 mb-6 sm:mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div>
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold mx-auto mb-3 sm:mb-4 shadow-lg">
                  1
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-semibold">One scholarship per veteran per year (sponsor-funded; limited)</p>
              </div>
              <div>
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#ff5e1a] text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-semibold">Use the Scholarship Eligibility Estimator after you apply</p>
              </div>
              <div>
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-semibold">Claims support is free and does not require a scholarship</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#002147] mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              Risk reversal & objections answered
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <button
                  className="w-full text-left px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-sm sm:text-base font-semibold text-[#002147]">{faq.question}</span>
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
                  <div className="px-4 sm:px-6 pb-3 sm:pb-4 text-xs sm:text-sm text-gray-600 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-[#002147] to-[#003366] py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Start your education journey
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-gray-200 max-w-3xl mx-auto">
              Join the next PLEP cohort and build a funded education plan that fits your mission
            </p>
            <div className="flex flex-col xs:flex-row gap-4 sm:gap-6 justify-center">
              <button className="bg-[#ff5e1a] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-[#e54e16] transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105">
                Apply for the PLEP cohort
              </button>
              <button className="border-2 sm:border-3 border-white text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-white hover:text-[#002147] transition-all duration-200 shadow-xl">
                Take the 3-minute quiz
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
              <span className="font-semibold">Compliance & Privacy:</span> Cohorts are available for PLEP, PLCA, PPC, CPPC, and VETA only. VA claims are handled 1:1 via accredited representatives (WANAC for ≤12 months/BDD; partner VSOs/agents/attorneys for others). One scholarship per veteran per year; awards limited and not guaranteed. WANAC is not a law firm and is not affiliated with the U.S. Department of Veterans Affairs. Your information is handled securely and shared only with your consent.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WanacPLEP;

