"use client";

import React from "react";
import { usePathname } from "next/navigation";

const HelpCenterPage = () => {
  // Sample FAQ data - in a real application, this would come from a CMS or API
  const faqCategories = [
    {
      id: 1,
      name: "Getting Started",
      icon: "",
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
      icon: "🛠️",
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
      icon: "",
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
      icon: "",
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
      icon: "",
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
      icon: "",
      availability: "Available Monday-Friday, 8am-8pm ET",
      action: "Start Chat",
      link: "#chat"
    },
    {
      id: 2,
      name: "Email Support",
      description: "Send us a message anytime",
      icon: "",
      availability: "Responses within 24 hours",
      action: "Email Us",
      link: "mailto:support@wanac.org"
    },
    {
      id: 3,
      name: "Phone Support",
      description: "Speak directly with our team",
      icon: "",
      availability: "Available Monday-Friday, 9am-5pm ET",
      action: "Call Now",
      link: "tel:1-800-123-4567"
    },
    {
      id: 4,
      name: "Schedule a Call",
      description: "Book a time for us to call you",
      icon: "",
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
      <section className="bg-[#002147] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            How Can We Help You?
          </h1>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full px-6 py-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-lg"
              aria-label="Search help center"
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-colors duration-300"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {popularTopics.map((topic, index) => (
              <a
                key={index}
                href={topic.link}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-full text-sm transition-colors duration-300"
              >
                {topic.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method) => (
              <div 
                key={method.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-bold mb-2">{method.name}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <p className="text-sm text-gray-500 mb-6">{method.availability}</p>
                <a
                  href={method.link}
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300"
                >
                  {method.action}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          {faqCategories.map((category) => (
            <div key={category.id} className="mb-16">
              <div className="flex items-center mb-8">
                <span className="text-3xl mr-4">{category.icon}</span>
                <h3 className="text-2xl font-bold">{category.name}</h3>
              </div>
              
              <div className="space-y-6">
                {category.questions.map((faq) => (
                  <div 
                    key={faq.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-6">
                        <h4 className="text-lg font-medium text-gray-800">{faq.question}</h4>
                        <span className="ml-6 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </summary>
                      <div className="px-6 pb-6 pt-2 text-gray-600">
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
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            Self-Help Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-[url('/images/helpcenter/tutorials.jpg')] bg-cover bg-center"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Video Tutorials</h3>
                <p className="text-gray-600 mb-6">
                  Step-by-step video guides to help you navigate our platform and services.
                </p>
                <a
                  href="/helpcenter/tutorials"
                  className="text-orange-500 hover:text-orange-700 font-medium"
                >
                  Watch Tutorials →
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-[url('/images/helpcenter/guides.jpg')] bg-cover bg-center"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">How-To Guides</h3>
                <p className="text-gray-600 mb-6">
                  Detailed written instructions for using WANAC services and resources.
                </p>
                <a
                  href="/helpcenter/guides"
                  className="text-orange-500 hover:text-orange-700 font-medium"
                >
                  Browse Guides →
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-[url('/images/helpcenter/community.jpg')] bg-cover bg-center"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Community Forum</h3>
                <p className="text-gray-600 mb-6">
                  Connect with other users to share experiences and get advice.
                </p>
                <a
                  href="/community/forum"
                  className="text-orange-500 hover:text-orange-700 font-medium"
                >
                  Join Discussion →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-16 px-6 bg-[#002147] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Help Us Improve
          </h2>
          <p className="text-xl mb-8">
            We're constantly working to make our help center better. Share your feedback with us.
          </p>
          <a
            href="/feedback"
            className="inline-block bg-white text-[#002147] px-8 py-4 rounded-full text-lg font-medium transition-colors duration-300 hover:bg-gray-100"
          >
            Give Feedback
          </a>
        </div>
      </section>

  
    </div>
  );
};

export default HelpCenterPage;
