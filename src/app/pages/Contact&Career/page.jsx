"use client";

import React, { useState } from "react";

export default function ContactCareer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    submitting: false,
    submitted: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required.";
    if (!form.email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email format.";
    if (!form.message) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm((prev) => ({ ...prev, submitting: true }));
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setForm((prev) => ({ ...prev, submitted: true, submitting: false }));
    } else {
      setForm((prev) => ({ ...prev, submitting: false }));
    }
  };

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      {/* Hero Section */}
      <header className="relative bg-[#002147] text-white min-h-[320px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url("/landingpage1.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#002147]/90 via-[#002147]/80 to-[#ff5e1a]/40"></div>
        <div className="relative z-10 py-16 px-4 w-full max-w-3xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg" style={{ fontFamily: "var(--font-heading)" }}>
            Contact & Career Opportunities
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-6 text-blue-100 font-medium drop-shadow">
            Reach out to WANAC for support, partnership, or to explore career opportunities. We're here to help you thrive!
          </p>
        </div>
      </header>

      {/* Navigation Bar */}
      <section>
        <div className="relative w-full h-16 bg-[#002147] overflow-hidden flex items-center justify-center">
          <nav className="relative z-10 flex space-x-8 px-4">
            <a href="#contact" className="group flex flex-col items-center justify-center text-white text-base font-medium transition-colors flex-none no-underline hover:no-underline">
              <div className="flex flex-col items-center w-full h-full px-6 py-3 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                <span className="whitespace-nowrap text-center w-full">Contact Us</span>
                <svg className="w-4 h-4 mt-1 transition-colors" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </a>
            <a href="#careers" className="group flex flex-col items-center justify-center text-white text-base font-medium transition-colors flex-none no-underline hover:no-underline">
              <div className="flex flex-col items-center w-full h-full px-6 py-3 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                <span className="whitespace-nowrap text-center w-full">Careers</span>
                <svg className="w-4 h-4 mt-1 transition-colors" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </a>
          </nav>
          <div 
            className="absolute inset-0 w-full" 
            style={{ animation: 'slide 20s linear infinite' }}
          >
            <div className="h-full bg-gradient-to-r from-blue-600 via-[#002147] to-blue-600 w-[200%]"></div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16 bg-white overflow-hidden">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002147] mb-4 text-center" style={{ fontFamily: "var(--font-heading)" }}>
            Get in Touch
          </h2>
          <p className="text-lg text-[#002147] mb-8 text-center">
            Fill out the form below and our team will get back to you as soon as possible.
          </p>
          {form.submitted ? (
            <div className="bg-green-100 text-green-800 p-6 rounded-lg text-center font-semibold">
              Thank you for contacting WANAC! We will respond to your inquiry soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">Name <span className="text-red-500">*</span></label>
                <input type="text" id="name" name="name" value={form.name} onChange={handleChange} className={`w-full p-3 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#002147]`} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-500">*</span></label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} className={`w-full p-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#002147]`} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="message">Message <span className="text-red-500">*</span></label>
                <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} className={`w-full p-3 rounded-lg border ${errors.message ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#002147]`} />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <button type="submit" className="w-full bg-[#002147] text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-500 transition-all duration-300 shadow-lg" disabled={form.submitting}>
                {form.submitting ? "Submitting..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Career Opportunities Section */}
      <section id="careers" className="relative py-16 bg-[#f7fafc] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002147] mb-4 text-center" style={{ fontFamily: "var(--font-heading)" }}>
            Career Opportunities at WANAC
          </h2>
          <p className="text-lg text-[#002147] mb-8 text-center">
            Join our mission-driven team and help empower veterans, service members, and the community. Explore our current openings below:
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-[#002147] mb-2">Veteran Transition Coach</h3>
              <p className="text-gray-700 mb-2">Guide veterans through their transition journey, providing coaching and support for career, education, and personal growth.</p>
              <p className="text-sm text-gray-500 mb-4">Location: Remote | Type: Part-Time/Full-Time</p>
              <a href="#contact" className="inline-block px-4 py-2 bg-orange-500 text-white rounded hover:bg-[#002147] transition-colors duration-300 shadow text-sm font-semibold">Apply Now</a>
            </div>
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-[#002147] mb-2">Community Engagement Specialist</h3>
              <p className="text-gray-700 mb-2">Foster relationships with community partners, organize events, and support outreach initiatives for WANAC programs.</p>
              <p className="text-sm text-gray-500 mb-4">Location: Hybrid (HQ & Remote) | Type: Full-Time</p>
              <a href="#contact" className="inline-block px-4 py-2 bg-orange-500 text-white rounded hover:bg-[#002147] transition-colors duration-300 shadow text-sm font-semibold">Apply Now</a>
            </div>
          </div>
          <div className="text-center mt-10">
            <p className="text-gray-700">Don't see a role that fits? <a href="#contact" className="text-orange-500 underline hover:text-orange-700">Contact us</a> to express your interest in future opportunities!</p>
          </div>
        </div>
      </section>
    </div>
  );
}
