"use client";

import React from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";

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
    <div className="bg-white text-gray-800">
     {/*   Hero Section */}
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
        <div className="relative z-10 py-16 text-center">
          <h1 className="text-5xl font-bold mb-4">VOLUNTEER WITH WANAC</h1>
          <p className="text-xl max-w-3xl mx-auto px-4">
            Make a difference in the lives of service members and their families
          </p>
        </div>
      </header>
      <section>
          <div className="relative w-full h-10 bg-[#002147] overflow-hidden flex items-center justify-center">
            <nav className="relative z-10 flex space-x-16 px-4">
              <Link href="#How-to-Volunteer" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                How to Volunteer
              </Link>
              <Link href="#Volunteer-Stories" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Volunteer Stories
              </Link>
              <Link href="#Frequently-Asked-Questions" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Frequently Asked Questions
              </Link>
              <Link href="#Ready-to-Make-a-Difference" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Ready to Make a Difference?
              </Link>
            </nav>
            <div 
              className="absolute inset-0 w-full" 
              style={{
                animation: 'slide 20s linear infinite',
              }}
            >
              <div className="h-full bg-gradient-to-r from-blue-600 via-[#002147] to-blue-600 w-[200%]"></div>
            </div>
          </div>
        </section>

      {/* Steps Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            How to Volunteer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {volunteerSteps.map(({ step, title, desc, icon: Icon }) => (
              <div
                key={step}
                className="bg-white rounded-2xl p-8 transition-all duration-300 ease-in-out
                hover:shadow-[orange-400]
                hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 
                  text-white rounded-2xl flex items-center justify-center mb-6 mx-auto
                  shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300"
                >
                  <Icon className="text-3xl" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">{title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            Meet Our Volunteers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {volunteerStories.map(({ name, story, role }) => (
              <div
                key={name}
                className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <p className="italic text-gray-700 mb-6 text-lg">"{story}"</p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-800 text-lg">— {name}</p>
                  <p className="text-orange-500">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-4 text-[#002147]">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Similar to other pages */}
      <section className="py-20 px-6 bg-[#002147] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8">
            Join our community of volunteers and help support our nation's military and their families.
          </p>
          <Link
            href="/pages/(takeaction)/volunteer"
            className="inline-block bg-orange-500 text-white hover:bg-orange-600 px-8 py-4 rounded-full text-lg font-medium transition-colors duration-300"
          >
            Apply Today
          </Link>
        </div>
      </section>

      {/* Stats Section - Similar to testimonials page */}
      
    </div>
  );
};

export default VolunteerPage;
