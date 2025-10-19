"use client";

import React from "react";
import { usePathname } from "next/navigation";

const HelpCenterPage = () => {
  // Sample FAQ data -  this would come from a CMS or API
  const faqCategories = [
    {
      id: 1,
      name: "Getting Started",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      questions: [
        {
          id: 101,
          question: "How do I create an account with WANAC?",
          answer: "Creating an account is simple. Click the 'Sign Up' button in the top right corner of our website. You'll need to provide your name, email address, and create a password. If you're a veteran or service member, you'll have the option to verify your military status during registration for access to additional resources."
        },
        {
          id: 102,
          question: "What services does WANAC offer?",
          answer: "WANAC offers a wide range of services including career coaching, mental health resources, family support programs, transition assistance, educational resources, and community events. Our services are designed specifically for military members, veterans, and their families."
        },
        {
          id: 103,
          question: "Is WANAC available nationwide?",
          answer: "Yes, WANAC provides services nationwide through our online platform. We also have physical locations in several states. Check our 'Locations' page to find the nearest WANAC center to you."
        },
        {
          id: 104,
          question: "Do I need to be a veteran to use WANAC services?",
          answer: "No, WANAC serves active duty military members, veterans, and their family members. Some specialized services may have specific eligibility requirements, but our core resources are available to the entire military community."
        }
      ]
    },
    {
      id: 2,
      name: "Programs & Services",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      questions: [
        {
          id: 201,
          question: "How do I sign up for career coaching?",
          answer: "To sign up for career coaching, log into your WANAC account and navigate to the 'Services' tab. Select 'Career Coaching' and follow the prompts to schedule an appointment with one of our certified coaches. You can choose between virtual or in-person sessions based on availability."
        },
        {
          id: 202,
          question: "What mental health resources are available?",
          answer: "WANAC offers confidential mental health resources including one-on-one counseling, support groups, and self-help tools. We also provide referrals to specialized care when needed. All services are provided by professionals experienced in military and veteran issues."
        },
        {
          id: 203,
          question: "How can I access educational resources?",
          answer: "Educational resources are available through our online learning portal. Once logged in, visit the 'Education' section to access courses, webinars, and materials on topics ranging from GI Bill benefits to professional development and personal growth."
        },
        {
          id: 204,
          question: "Are there programs specifically for military families?",
          answer: "Yes, we offer several programs designed specifically for military families, including spouse employment assistance, children's support groups, relocation resources, and family resilience workshops. Visit the 'Family Programs' section of our website for more information."
        }
      ]
    },
    {
      id: 3,
      name: "Technical Support",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      questions: [
        {
          id: 301,
          question: "I forgot my password. How do I reset it?",
          answer: "To reset your password, click on the 'Login' button, then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you instructions to create a new password. If you don't receive the email within a few minutes, please check your spam folder."
        },
        {
          id: 302,
          question: "How do I update my profile information?",
          answer: "Log into your account and click on your profile icon in the top right corner. Select 'Profile Settings' from the dropdown menu. Here you can update your personal information, communication preferences, and privacy settings."
        },
        {
          id: 303,
          question: "The website isn't loading properly. What should I do?",
          answer: "First, try refreshing your browser or clearing your cache and cookies. Make sure you're using an up-to-date browser like Chrome, Firefox, Safari, or Edge. If problems persist, please contact our technical support team at support@wanac.org with details about the issue you're experiencing."
        },
        {
          id: 304,
          question: "How do I access WANAC on my mobile device?",
          answer: "WANAC is fully accessible through any mobile browser. Simply visit our website on your smartphone or tablet. For the best experience, we also offer a mobile app available for download on both iOS and Android devices through the App Store or Google Play Store."
        }
      ]
    },
    {
      id: 4,
      name: "Benefits & Resources",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      questions: [
        {
          id: 401,
          question: "How does WANAC help with VA benefits?",
          answer: "WANAC provides guidance on navigating VA benefits through our trained benefits advisors. We can help you understand your eligibility, prepare documentation, file claims, and appeal decisions if necessary. Schedule a consultation through the 'Benefits Assistance' section of our website."
        },
        {
          id: 402,
          question: "What employment resources does WANAC offer?",
          answer: "Our employment resources include job boards with military-friendly employers, resume review services, interview preparation, career fairs, networking events, and specialized training programs. We also partner with companies committed to hiring veterans and military spouses."
        },
        {
          id: 403,
          question: "Does WANAC provide financial assistance?",
          answer: "While WANAC doesn't directly provide financial assistance, we connect members with emergency financial resources, grants, and organizations that offer financial support. We also provide financial literacy education and counseling to help build long-term financial stability."
        },
        {
          id: 404,
          question: "How can I access housing resources?",
          answer: "WANAC offers resources for housing assistance including information on VA home loans, rental assistance programs, and transitional housing options. For those facing housing insecurity, we provide connections to emergency housing services and long-term solutions."
        }
      ]
    },
    {
      id: 5,
      name: "Community & Events",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      questions: [
        {
          id: 501,
          question: "How can I find local WANAC events?",
          answer: "Visit the 'Events' section of our website to see upcoming events in your area. You can filter by location, event type, and date. Make sure your profile has your current location to receive notifications about events near you."
        },
        {
          id: 502,
          question: "Can I volunteer with WANAC?",
          answer: "Absolutely! We welcome volunteers from all backgrounds. Visit our 'Volunteer' page to learn about current opportunities and submit an application. We have roles ranging from event support to mentorship programs and administrative assistance."
        },
        {
          id: 503,
          question: "How do I join WANAC's online community?",
          answer: "Once you've created an account, you can access our online community through the 'Community' tab. Here you can join discussion groups, participate in forums, and connect with other members who share similar experiences or interests."
        },
        {
          id: 504,
          question: "Does WANAC offer support groups?",
          answer: "Yes, WANAC facilitates various support groups both online and in-person. Groups focus on topics like transition challenges, PTSD, family support, and more. Check the 'Support Groups' section to find and join a group that meets your needs."
        }
      ]
    }
  ];

  const contactMethods = [
    {
      id: 1,
      name: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      availability: "Available Monday-Friday, 8am-8pm ET",
      action: "Start Chat",
      link: "#chat"
    },
    {
      id: 2,
      name: "Email Support",
      description: "Send us a message anytime",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      availability: "Swift responses within 24 hours",
      action: "Email Us",
      link: "mailto:support@wanac.org"
    },
    {
      id: 3,
      name: "Phone Support",
      description: "Speak directly with our team",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      availability: "Available Monday-Friday, 9am-5pm ET",
      action: "Call Now",
      link: "tel:1-800-123-4567"
    },
    {
      id: 4,
      name: "Schedule a Call",
      description: "Book a time for us to call you",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      availability: "Select a time that works for you",
      action: "Schedule",
      link: "/schedule-call"
    }
  ];

  const popularTopics = [
    { name: "Account Setup", link: "/helpcenter/account-setup" },
    { name: "Career Services", link: "/helpcenter/career-services" },
    { name: "Mental Health Support", link: "/helpcenter/mental-health" },
    { name: "VA Benefits", link: "/helpcenter/va-benefits" },
    { name: "Family Resources", link: "/helpcenter/family-resources" },
    { name: "Education Benefits", link: "/helpcenter/education" }
  ];

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-[#002147] py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">
            HOW CAN WE HELP YOU?
          </h1>
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base bg-white shadow-lg"
              aria-label="Search help center"
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2.5 sm:p-3 hover:bg-orange-600 transition-colors duration-300"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
            {popularTopics.map((topic, index) => (
              <a
                key={index}
                href={topic.link}
                className="bg-orange-400 bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1.5 text-xs sm:text-sm transition-colors duration-300"
              >
                {topic.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-semibold mb-8 sm:mb-10 text-center">
            Get In Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactMethods.map((method) => (
              <div 
                key={method.id}
                className="bg-white shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{method.icon}</div>
                <h3 className="text-base sm:text-lg font-bold mb-2">{method.name}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3">{method.description}</p>
                <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">{method.availability}</p>
                <a
                  href={method.link}
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium transition-colors duration-300"
                >
                  {method.action}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-semibold mb-8 sm:mb-10 text-center">
            Frequently Asked Questions
          </h2>
          
          {faqCategories.map((category) => (
            <div key={category.id} className="mb-10 sm:mb-12">
              <div className="flex items-center mb-6 sm:mb-8">
                <span className="text-xl sm:text-2xl mr-3 sm:mr-4">{category.icon}</span>
                <h3 className="text-lg sm:text-xl font-bold">{category.name}</h3>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {category.questions.map((faq) => (
                  <div 
                    key={faq.id}
                    className="bg-white shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-4 sm:p-6">
                        <h4 className="text-sm sm:text-base font-medium text-gray-800">{faq.question}</h4>
                        <span className="ml-4 sm:ml-6 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </summary>
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 text-sm sm:text-base text-gray-600">
                        <p>{faq.answer}</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Self-Help Resources */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-semibold mb-8 sm:mb-10 text-center">
            Self-Help Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-32 sm:h-40 bg-[url('/images/helpcenter/tutorials.jpg')] bg-cover bg-center"></div>
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Video Tutorials</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Step-by-step video guides to help you navigate our platform and services.
                </p>
                <a
                  href="/helpcenter/tutorials"
                  className="text-orange-500 hover:text-orange-700 font-medium text-sm sm:text-base"
                >
                  Watch Tutorials →
                </a>
              </div>
            </div>
            
            <div className="bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-32 sm:h-40 bg-[url('/images/helpcenter/guides.jpg')] bg-cover bg-center"></div>
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">How-To Guides</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Detailed written instructions for using WANAC services and resources.
                </p>
                <a
                  href="/helpcenter/guides"
                  className="text-orange-500 hover:text-orange-700 font-medium text-sm sm:text-base"
                >
                  Browse Guides →
                </a>
              </div>
            </div>
            
            <div className="bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-32 sm:h-40 bg-[url('/images/helpcenter/community.jpg')] bg-cover bg-center"></div>
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Community Forum</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Connect with other users to share experiences and get advice.
                </p>
                <a
                  href="/community/forum"
                  className="text-orange-500 hover:text-orange-700 font-medium text-sm sm:text-base"
                >
                  Join Discussion →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#002147] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            HELP US IMPROVE
          </h2>
          <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
            We're constantly working to make our help center better. Share your feedback with us.
          </p>
          <a
            href="/feedback"
            className="inline-block bg-orange-500 text-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-medium transition-colors duration-300 hover:bg-orange-600"
          >
            Give Feedback
          </a>
        </div>
      </section>

  
    </div>
  );
};

export default HelpCenterPage;
