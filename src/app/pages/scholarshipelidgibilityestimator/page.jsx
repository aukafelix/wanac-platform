"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ScholarshipEligibilityEstimator = () => {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Does applying cost anything?",
      answer: "No. The estimator and application are free."
    },
    {
      question: "Is the estimator a guarantee?",
      answer: "No. It provides provisional eligibility pending document review, seat availability, and sponsor funds."
    },
    {
      question: "How many scholarships can I receive?",
      answer: "One per veteran per year."
    },
    {
      question: "Can I apply if I'm > 12 months separated?",
      answer: "Yes—awards depend on seat availability, fit, and funds. Transitioning service members and recent veterans are prioritized."
    },
    {
      question: "Can this pay for claim services?",
      answer: "No—claims support is free. Scholarships are for PLEP, PLCA, PPC, CPPC, or VETA program tuition/fees."
    },
    {
      question: "How fast will I hear back after I upload documents?",
      answer: "Most decisions are issued within 5–10 business days after a complete submission."
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#faf9f7] to-white py-12 sm:py-16 sm:py-12 sm:py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block bg-purple-100 text-purple-800 px-3 py-1.5 text-xs font-semibold mb-4">
              FREE Eligibility Check • One Award Per Year
            </div>
            <h1 className="text-base sm:text-sm sm:text-base xs:text-3xl sm:text-4xl md:text-5xl font-bold text-[#002147] mb-4 leading-tight">
              WANAC Scholarship Eligibility Estimator
            </h1>
            <p className="text-base sm:text-sm sm:text-base md:text-sm sm:text-base text-gray-600 mb-3 font-semibold">
              Find out if you qualify in 3 minutes
            </p>
            <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto">
              Provisional eligibility for PLEP, PLCA, PPC, CPPC, and VETA program scholarships—funded by partners and sponsors. One scholarship per veteran per year.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center mb-4">
              <button className="bg-[#ff5e1a] text-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold hover:bg-[#e54e16] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Check my eligibility
              </button>
              <button className="border-2 border-[#002147] text-[#002147] px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold hover:bg-[#002147] hover:text-white transition-all duration-200">
                Prefer to talk? Book a 15-minute consult
              </button>
            </div>
            <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs text-gray-600 flex-wrap">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No cost to apply
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                National
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Private & secure
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                One award per year
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="bg-white py-12 sm:py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-sm sm:text-base xs:text-base sm:text-sm sm:text-base sm:text-3xl font-bold text-[#002147] mb-3">
              The problem (and what's at stake)
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Great programs fall through when funding is unclear. Veterans delay cohorts, miss enrollment windows, and lose momentum after TAP—<span className="font-semibold text-[#ff5e1a]">while benefits sit unused.</span>
            </p>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="bg-[#faf9f7] py-12 sm:py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-sm sm:text-base xs:text-base sm:text-sm sm:text-base sm:text-3xl font-bold text-[#002147] mb-4">
              The WANAC solution (at a glance)
            </h2>
            <p className="text-base sm:text-sm sm:text-base md:text-sm sm:text-base font-semibold text-[#ff5e1a] mb-6">
              One form. Fast clarity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Features Card */}
            <div className="bg-white shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#ff5e1a] bg-opacity-10  flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-base sm:text-sm sm:text-base font-bold text-[#002147] mb-4">Features</h3>
              <p className="text-gray-600">
                8–10 quick questions → instant provisional eligibility for PLEP, PLCA, PPC, CPPC, VETA.
              </p>
            </div>

            {/* Advantages Card */}
            <div className="bg-white shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#002147] bg-opacity-10  flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#002147]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-sm sm:text-base font-bold text-[#002147] mb-4">Advantages</h3>
              <p className="text-gray-600">
                Know where you stand before you apply; see exactly what documents are needed.
              </p>
            </div>

            {/* Benefits Card */}
            <div className="bg-white shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-600 bg-opacity-10  flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-sm sm:text-base font-bold text-[#002147] mb-4">Benefits</h3>
              <p className="text-gray-600">
                Make decisions quickly—reserve a seat, line up documents, and start on time.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-[#ff5e1a] text-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold hover:bg-[#e54e16] transition-all duration-200 shadow-lg hover:shadow-xl">
              Check my eligibility
            </button>
          </div>
        </div>
      </section>

      {/* Proof/Testimonial Section */}
      <section className="bg-white py-12 sm:py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#002147] to-[#003366] shadow-xl p-6 sm:p-8 text-white">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#ff5e1a] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div>
                <p className="text-base sm:text-sm sm:text-base md:text-sm sm:text-base font-semibold mb-3 sm:mb-4 leading-relaxed">
                  "Seeing I was provisionally eligible let me reserve a PLCA seat and gather docs the same day."
                </p>
                <p className="text-gray-300 font-medium text-sm sm:text-base">— U.S. Navy veteran</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Scholarship Covers Section */}
      <section className="bg-[#faf9f7] py-12 sm:py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm sm:text-base xs:text-base sm:text-sm sm:text-base sm:text-3xl font-bold text-[#002147] mb-4">
              What this scholarship can cover
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* What's Covered */}
            <div className="bg-white  shadow-lg p-8 border-t-4 border-green-600">
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h3 className="text-base sm:text-sm sm:text-base font-bold text-[#002147]">Covered</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700"><span className="font-semibold">Program tuition/fees</span> for: PLEP, PLCA, PPC, CPPC, VETA</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700"><span className="font-semibold">Learning materials</span> required by the program (when applicable)</span>
                </li>
              </ul>
            </div>

            {/* What's Not Covered */}
            <div className="bg-white  shadow-lg p-8 border-t-4 border-red-600">
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <h3 className="text-base sm:text-sm sm:text-base font-bold text-[#002147]">Not Covered</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Cash disbursements</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Travel expenses</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Personal expenses</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Non-WANAC services</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 ">
            <p className="text-gray-700">
              <span className="font-semibold text-blue-800">Note:</span> VSO Claim Support is free and does not require a scholarship.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white py-12 sm:py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm sm:text-base xs:text-base sm:text-sm sm:text-base sm:text-3xl font-bold text-[#002147] mb-4">
              How it works (4 steps)
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              From estimator to enrollment—fast and clear
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#ff5e1a] text-white  flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#002147] mb-3">
                Answer the estimator
              </h3>
              <p className="text-gray-600">
                Takes approximately 3 minutes
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#002147] text-white  flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#002147] mb-3">
                See your result
              </h3>
              <p className="text-gray-600">
                Provisional result and exactly which documents to prepare
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 text-white  flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#002147] mb-3">
                Upload & submit
              </h3>
              <p className="text-gray-600">
                Takes ~10–15 minutes when ready
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 text-white  flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                4
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#002147] mb-3">
                Get decision
              </h3>
              <p className="text-gray-600">
                Receive decision and next steps to enroll
              </p>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-[#ff5e1a] text-white px-5 sm:px-6 py-2.5 sm:py-3  text-sm sm:text-base font-semibold hover:bg-[#e54e16] transition-all duration-200 shadow-lg hover:shadow-xl">
              Check my eligibility
            </button>
          </div>
        </div>
      </section>

      {/* Who We Prioritize */}
      <section className="bg-[#faf9f7] py-12 sm:py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm sm:text-base xs:text-base sm:text-sm sm:text-base sm:text-3xl font-bold text-[#002147] mb-8">
              Who we prioritize
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#ff5e1a] to-[#e54e16]  shadow-lg p-8 text-white text-center hover:shadow-xl transition-shadow duration-300">
              <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <p className="font-semibold text-sm sm:text-base">
                Active duty in the BDD window or ≤ 12 months from separation
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#002147] to-[#003366]  shadow-lg p-8 text-white text-center hover:shadow-xl transition-shadow duration-300">
              <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <p className="font-semibold text-sm sm:text-base">
                MEB / medical separation
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700  shadow-lg p-8 text-white text-center hover:shadow-xl transition-shadow duration-300">
              <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <p className="font-semibold text-sm sm:text-base">
                Recently separated veterans ready to commit to a cohort (weekly mission cadence)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Need */}
      <section className="bg-white py-12 sm:py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm sm:text-base xs:text-base sm:text-sm sm:text-base sm:text-3xl font-bold text-[#002147] mb-4">
              What you'll need for the full application
            </h2>
            <p className="text-sm sm:text-base text-gray-600">(after the estimator)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white  shadow-lg p-6 border-l-4 border-[#ff5e1a]">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#ff5e1a] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-bold text-[#002147] mb-2">Service status & timeline</h3>
                  <p className="text-gray-600 text-sm">DD-214 (or separation orders/ETS/EAS date)</p>
                </div>
              </div>
            </div>

            <div className="bg-white  shadow-lg p-6 border-l-4 border-[#002147]">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#002147] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-bold text-[#002147] mb-2">Program interest</h3>
                  <p className="text-gray-600 text-sm">PLEP, PLCA, PPC, CPPC, or VETA (pick one primary)</p>
                </div>
              </div>
            </div>

            <div className="bg-white  shadow-lg p-6 border-l-4 border-purple-600">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-bold text-[#002147] mb-2">Short purpose statement</h3>
                  <p className="text-gray-600 text-sm">150–250 words: Goal, fit, and expected impact</p>
                </div>
              </div>
            </div>

            <div className="bg-white  shadow-lg p-6 border-l-4 border-blue-600">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-bold text-[#002147] mb-2">Commitment confirmation</h3>
                  <p className="text-gray-600 text-sm">Ability to attend coaching/missions (~60–90 min/week)</p>
                </div>
              </div>
            </div>

            <div className="bg-white  shadow-lg p-6 border-l-4 border-green-600">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-bold text-[#002147] mb-2">Financial snapshot</h3>
                  <p className="text-gray-600 text-sm">High-level need indicators (no credit check)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration & Fit */}
      <section className="bg-[#faf9f7] py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm sm:text-base xs:text-base sm:text-sm sm:text-base sm:text-3xl font-bold text-[#002147] mb-4">
              Integration & fit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white  shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-[#ff5e1a] bg-opacity-10  flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#ff5e1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#002147] mb-3">From clarity to action</h3>
              <p className="text-gray-600">
                Your scholarship result links directly to cohort dates for PLEP/PLCA/PPC/CPPC/VETA.
              </p>
            </div>

            <div className="bg-white  shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-600 bg-opacity-10  flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#002147] mb-3">Claims first when needed</h3>
              <p className="text-gray-600">
                If the estimator flags benefits bottlenecks, you'll be routed to accredited VSO Claim Support (including BDD for active duty).
              </p>
            </div>

            <div className="bg-white  shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-purple-600 bg-opacity-10  flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#002147] mb-3">One award per year</h3>
              <p className="text-gray-600">
                Awards can't be stacked; choose the program with the most immediate impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-12 sm:py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm sm:text-base xs:text-base sm:text-sm sm:text-base sm:text-3xl font-bold text-[#002147] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Risk reversal & objections answered
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white  shadow-md overflow-hidden border border-gray-200">
                <button
                  className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-sm sm:text-base font-semibold text-[#002147]">{faq.question}</span>
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
      <section className="bg-gradient-to-r from-[#002147] to-[#003366] py-12 sm:py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-base sm:text-sm sm:text-base xs:text-3xl sm:text-4xl font-bold mb-6">
              Check your eligibility today
            </h2>
            <p className="text-sm sm:text-base mb-10 text-gray-200 max-w-3xl mx-auto">
              Find out if you qualify for program scholarships in just 3 minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-[#ff5e1a] text-white px-5 sm:px-6 py-2.5 sm:py-3  text-sm sm:text-base font-semibold hover:bg-[#e54e16] transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105">
                Check my eligibility
              </button>
              <button className="border-3 border-white text-white px-5 sm:px-6 py-2.5 sm:py-3  text-sm sm:text-base font-semibold hover:bg-white hover:text-[#002147] transition-all duration-200 shadow-xl">
                Book a 15-minute consult
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-semibold">Compliance & Privacy:</span> Scholarships are funded by partners and sponsors; awards are limited and not guaranteed. One scholarship per veteran per year. Awards apply to WANAC programs only (PLEP, PLCA, PPC, CPPC, VETA). WANAC is not a law firm and is not affiliated with the U.S. Department of Veterans Affairs. Your information is handled securely and shared only with your consent.
            </p>
          </div>
        </div>
      </section>


    </div>
  );
};

export default ScholarshipEligibilityEstimator;
