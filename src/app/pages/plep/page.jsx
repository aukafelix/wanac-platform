'use client';

import React from 'react';
import Link from 'next/link';
import InfographicWheel from '../../../../components/infographicWheel';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaCheckCircle, FaStar, FaFlag } from 'react-icons/fa'; // Example icons


const PlepPage = () => {
  const steps = [
    {
      number: 1,
      title: "Initial Assessment",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      description: "Begin your journey with a comprehensive assessment of your goals, experience, and aspirations.",
      details: [
        "Identify your academic interests and career objectives",
        "Evaluate your military experience for academic credits",
        "Develop a personalized education roadmap"
      ]
    },

    {
      number: 2,
      title: "Academic Preparation",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      description: "Get ready for academic success with our comprehensive preparation program.",
      details: [
        "Study skills workshops",
        "Academic writing and research training",
        "Time management and organization strategies"
      ]
    },
    {
      number: 3,
      title: "Guided Coaching",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: "Receive dedicated support throughout your academic journey.",
      details: [
        "One-on-one mentoring sessions",
        "Application and enrollment assistance",
        "VA benefits and financial aid guidance"
      ]
    },

    {
      number: 4,
      title: "Community Building",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: "Join a supportive community of fellow veteran students.",
      details: [
        "Peer mentoring opportunities",
        "Veteran student networking events",
        "Access to alumni network and resources"
      ]
    }
  ];
  const colorClasses = [
    'border-orange-400 bg-orange-50 text-orange-700',
    'border-lime-500 bg-lime-50 text-lime-700',
    'border-blue-400 bg-blue-50 text-blue-700',
    'border-pink-400 bg-pink-50 text-pink-700',
    'border-cyan-400 bg-cyan-50 text-cyan-700',
  ];
  
  // Example icon array (customize as needed)
  const stepIcons = [
    <FaFlag />,
    <FaStar />,
    <FaCheckCircle />
    // ...add more or use logic to pick icons
  ];

  return (
    <div className="bg-white font-sans" style={{ fontFamily: "'Source Sans Pro', 'Montserrat', Arial, sans-serif" }}>
      {/* Hero Section */}
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
          <h1 className="text-5xl font-bold mb-4">
            Promise Land Education Pathway (PLEP)
          </h1>
          <p className="text-xl max-w-3xl mx-auto px-4">
            <b>Your Strategic Pathway to Educational Excellence</b>
          </p>
          <p className="text-xl max-w-3xl mx-auto px-4">
          WANAC's Promise Land Education Pathway (PLEP) provides structured, comprehensive guidance and support
specifically designed for transitioning service members and veterans pursuing higher education. PLEP equips you with
critical tools, personalized coaching, and tailored resources to successfully navigate and excel in your academic
journey.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              Apply Now
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#002147] transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <section>
        <div className="relative w-full h-16 bg-[#002147] overflow-hidden flex items-center justify-center">
          <nav className="relative z-10 flex space-x-8 px-4">
            <a href="#program-overview" className="text-white hover:text-blue-300 transition-colors text-sm font-bold flex flex-col items-center gap-0.5">
              Program Overview
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#how-it-works" className="text-white hover:text-blue-300 transition-colors text-sm font-bold flex flex-col items-center gap-0.5">
              How It Works
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#who-should-enroll" className="text-white hover:text-blue-300 transition-colors text-sm font-bold flex flex-col items-center gap-0.5">
              Who Should Enroll?
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#success-stories" className="text-white hover:text-blue-300 transition-colors text-sm font-bold flex flex-col items-center gap-0.5">
              Success Stories
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
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

      {/* Program Overview Section */}
      <section id="program-overview" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Program Overview</h2>
          <h3 className="text-xl font-semibold mb-6 text-center text-[#002147] border-b-2 border-orange-400 text-center pb-1 mx-auto">A Structured Approach to Your Academic Future</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-orange-200 transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h4 className="font-semibold mb-3">Personalized Planning</h4>
              <p className="text-gray-600">Personalized educational planning aligned with your goals</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-orange-200 transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="font-semibold mb-3">Veteran-Centric Guidance</h4>
              <p className="text-gray-600">Veteran-centric guidance for admissions, financial aid, and academic transitions</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-orange-200 transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2M7 7h10" />
                </svg>
              </div>
              <h4 className="font-semibold mb-3">Targeted Resources</h4>
              <p className="text-gray-600">Targeted academic resources designed specifically for transitioning service members and veterans</p>
            </div>
          </div>
          
        </div>
        <div className="container mx-auto px-4 mt-12">
          <h3 className="text-xl font-semibold mb-6 text-center text-[#002147] border-b-2 border-orange-400 text-center pb-1 mx-auto">
            Comprehensive Support Network
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-orange-200 transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-3">Dedicated Mentors</h4>
              <p className="text-gray-600">Dedicated mentors experienced in veteran-specific educational transitions</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-orange-200 transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-3">Strategic Workshops</h4>
              <p className="text-gray-600">Access to strategic academic workshops and webinars</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-orange-200 transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-3">Peer Support</h4>
              <p className="text-gray-600">Strong peer support through community networking and shared resources</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-4 text-black ">Your Roadmap to the Promise Land</h2>
    <p className="text-center text-gray-700 mb-10 text-lg">
      Follow these key steps to achieve your goals. Each milestone brings you closer to success!
    </p>
    <VerticalTimeline lineColor="#fdba74">
      {steps.map((step, index) => (
        <VerticalTimelineElement
          key={index}
          className="vertical-timeline-element--work"
          contentStyle={{
            background: 'linear-gradient(135deg, #fff7ed 80%, #fdba74 100%)',
            color: '#002147',
            borderRadius: '16px',
            boxShadow: '0 4px 24px 0 rgba(253,186,116,0.15)'
          }}
          contentArrowStyle={{ borderRight: '7px solid #fdba74' }}
          iconStyle={{
            background: '#fdba74',
            color: '#fff',
            boxShadow: '0 0 0 4px #fff7ed, 0 2px 8px 0 rgba(253,186,116,0.25)'
          }}
          icon={stepIcons[index % stepIcons.length]}
          date={<span className="font-bold text-orange-500">{`Step 0${step.number}`}</span>}
        >
          <h3 className="vertical-timeline-element-title text-xl font-bold text-orange-700">{step.title}</h3>
          <p className="text-gray-700 text-base">{step.description}</p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  </div>
</section>

      {/* Who Should Enroll Section */}
      <section id="who-should-enroll" className="py-16 bg-gradient-to-r from-orange-100 via-white to-blue-100 relative overflow-hidden">
        {/* Background image overlay */}
        <div className="absolute inset-0 w-full h-full z-0" style={{
          backgroundImage: 'url("/background4.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.15
        }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-8 text-center">Who Should Enroll?</h2>
          <p className="text-lg text-center text-gray-600 mb-10 max-w-3xl mx-auto">
            PLEP is specifically designed for
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-3">Veterans</h4>
              <p className="text-gray-600">Veterans aiming for higher education post-transition</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-3">Service Members</h4>
              <p className="text-gray-600">Service members exploring academic opportunities and advancement</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-3">Individuals Seeking Support</h4>
              <p className="text-gray-600">Individuals requiring structured, tailored support for educational success</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">John D.</p>
                  <p className="text-sm text-gray-500">U.S. Army Veteran</p>
                </div>
              </div>
              <p className="italic mb-4">
                "PLEP gave me the confidence and clarity to pursue my degree. The tailored support made a real difference."
              </p>
              <p className="text-sm text-gray-600">Now pursuing a Master's in Business Administration</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Sarah M.</p>
                  <p className="text-sm text-gray-500">U.S. Air Force Veteran</p>
                </div>
              </div>
              <p className="italic mb-4">
                "The mentorship and community resources provided by PLEP were crucial in my transition to civilian academics."
              </p>
              <p className="text-sm text-gray-600">Recently graduated with honors in Computer Science</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-[#002147] text-white relative overflow-hidden">
        {/* Background image overlay */}
        <div className="absolute inset-0 w-full h-full z-0" style={{
          backgroundImage: 'url("/background4.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.25
        }}></div>
        {/* Orange and white blurred circles for extra effect */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-72 h-72 bg-orange-500 rounded-full opacity-10 blur-3xl z-10"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-72 h-72 bg-white rounded-full opacity-10 blur-3xl z-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-20">
          <h2 className="text-3xl font-bold mb-6">Start Your Academic Journey Today</h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto">
            Ready to pave your path to academic success? Schedule your free consultation to explore how WANAC's Promise Land
            Education Pathway can help you achieve your educational goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/consultation"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300"
            >
              Schedule Your Free Consultation
            </Link>
            <Link 
              href="/resources"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#002147] transition-colors duration-300"
            >
              Explore Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlepPage; 