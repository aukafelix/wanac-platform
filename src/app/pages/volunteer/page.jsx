"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaWpforms, FaHandsHelping } from "react-icons/fa";

const VolunteerPage = () => {
  const volunteerSteps = [
    { 
      step: 1, 
      title: "Explore Opportunities", 
      desc: "Find volunteer roles near you that match your interests.",
      icon: FaSearch
    },
    { 
      step: 2, 
      title: "Apply Online", 
      desc: "Submit your application through our secure platform.",
      icon: FaWpforms
    },
    { 
      step: 3, 
      title: "Start Making a Difference", 
      desc: "Receive training and begin your journey.",
      icon: FaHandsHelping
    }
  ];

  const volunteerStories = [
    {
      name: "Sarah M.",
      story: "Volunteering at the USO has allowed me to give back to those who serve. It's been incredibly rewarding.",
      role: "Event Coordinator"
    },
    {
      name: "James T.",
      story: "The community I've built through volunteering is like a second family. I wouldn't trade it for anything.",
      role: "Program Assistant"
    }
  ];

  const faqData = [
    {
      question: "What are the time commitments for volunteering?",
      answer: "Volunteer commitments are flexible and can range from a few hours per week to monthly engagements, depending on your availability and the program you choose."
    },
    {
      question: "Do I need special qualifications to volunteer?",
      answer: "Most volunteer positions don't require special qualifications. We provide all necessary training. However, you must be 18 or older and pass a background check."
    },
    {
      question: "Can I volunteer if I'm not affiliated with the military?",
      answer: "Absolutely! We welcome volunteers from all backgrounds. Your dedication to helping service members and their families is what matters most."
    },
    {
      question: "What kinds of volunteer opportunities are available?",
      answer: "We offer various opportunities including event support, administrative assistance, mentoring, and program coordination. You can choose based on your interests and skills."
    }
  ];

  return (
    <div className="bg-background text-foreground relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-[70vh] md:min-h-[75vh] bg-[#002147] text-white py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0,33,71,0.95) 0%, rgba(0,33,71,0.85) 50%, rgba(255,94,26,0.35) 100%), url('/landingpage1.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        <div className="absolute top-1/4 right-0 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-l from-orange-500/15 to-transparent rounded-full blur-3xl animate-pulse" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 uppercase">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200">
                Volunteer With WANAC
              </span>
            </h1>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mb-3" />
            <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 max-w-3xl mx-auto leading-relaxed">
              Make a difference in the lives of service members and their families through meaningful volunteer opportunities
            </p>
          </div>
        </div>
      </section>
      {/* Navigation */}
      <section className="bg-[#002147] py-4">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {[
              { href: "#how-to-volunteer", label: "HOW TO VOLUNTEER" },
              { href: "#stories", label: "VOLUNTEER STORIES" },
              { href: "#faq", label: "FAQ" },
              { href: "#apply", label: "APPLY NOW" }
            ].map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className="px-4 py-2 text-white hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-300 text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* How to Volunteer Section */}
      <section id="how-to-volunteer" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden" 
               style={{ background: 'linear-gradient(160deg, #002147 0%, #FF7D33 15%, #FF5E1A 30%, #002147 50%)' }}>
        
        <div className="absolute top-1/3 left-0 w-64 md:w-80 h-64 md:h-80 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative max-w-6xl mx-auto z-10">
          <div className="mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-white">
              How to Volunteer
            </h2>
            <div className="w-12 h-1 bg-white mx-auto rounded-full mb-3" />
            <p className="text-xs sm:text-sm md:text-base text-gray-200 max-w-xl mx-auto leading-relaxed">
              Your journey to making a difference starts here
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {volunteerSteps.map(({ step, title, desc, icon: Icon }) => (
              <div
                key={step}
                className="group relative bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-6 sm:p-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-2xl" />
                  </div>
                  <div className="w-8 h-8 bg-[#002147] text-white rounded-full flex items-center justify-center mb-4 text-sm font-bold">
                    {step}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#002147] group-hover:text-orange-600 transition-colors mb-3">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Stories Section */}
      <section id="stories" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-[#002147]">
              Meet Our Volunteers
            </h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mb-3" />
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              Real stories from volunteers making a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {volunteerStories.map(({ name, story, role }) => (
              <div
                key={name}
                className="group relative bg-white p-5 sm:p-6 hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-lg">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                  
                  <blockquote className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    "{story}"
                  </blockquote>
                  
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <div>
                      <p className="font-bold text-[#002147] text-sm">— {name}</p>
                      <p className="text-xs text-orange-600 font-medium">{role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-[#002147]">
              Frequently Asked Questions
            </h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mb-3" />
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              Everything you need to know about volunteering with WANAC
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-200 hover:border-orange-500/50 transition-all duration-300 overflow-hidden"
              >
                <div className="p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-[#002147] mb-3 group-hover:text-orange-600 transition-colors flex items-start gap-3">
                    <span className="text-orange-500 flex-shrink-0 mt-1">•</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="apply" className="relative bg-[#002147] text-white text-center py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/community1.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#002147]/50 to-[#002147]"></div>
        
        <div className="absolute inset-0">
          <div className="absolute top-10 left-5 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-orange-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-5 sm:right-10 w-32 sm:w-40 h-32 sm:h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 uppercase">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200">
              Ready to Make a Difference?
            </span>
          </h2>
          <p className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg text-gray-200 max-w-xl mx-auto leading-relaxed px-4">
            Join our community of volunteers and help support our nation's military and their families.
          </p>
          
          <div className="flex flex-col xs:flex-row justify-center gap-3 sm:gap-4">
            <Link 
              href="/pages/(takeaction)/volunteer" 
              className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-orange-500 overflow-hidden shadow-xl hover:shadow-orange-500/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transform group-hover:scale-105 transition-transform duration-300"></div>
              <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base font-semibold">
                Apply Today
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VolunteerPage;
