"use client";

import React from "react";

const WaysToSupportPage = () => {
  const supportOptions = [
    {
      id: 1,
      title: "Make a Donation",
      description: "Your financial contribution helps us provide essential services to those in need.",
      icon: "",
      link: "/donate",
      buttonText: "Donate Now"
    },
    {
      id: 2,
      title: "Volunteer Your Time",
      description: "Join our community of dedicated volunteers making a difference every day.",
      icon: "",
      link: "/volunteer",
      buttonText: "Volunteer"
    },
    {
      id: 3,
      title: "Corporate Partnerships",
      description: "Partner with us to create meaningful impact while achieving your CSR goals.",
      icon: "",
      link: "/corporatepatners",
      buttonText: "Partner With Us"
    },
    {
      id: 4,
      title: "Leadership Giving",
      description: "Make a significant impact through our leadership giving programs.",
      icon: "",
      link: "/leadershipgiving",
      buttonText: "Learn More"
    }
  ];

  const impactStories = [
    {
      name: "The Johnson Family",
      story: "The support we received from WANAC during our transition was invaluable. The programs helped our children adjust while my spouse was deployed.",
      impact: "Military Family Support"
    },
    {
      name: "Veterans Support Center",
      story: "Thanks to generous donors, we were able to expand our services to reach 200 more veterans in need of mental health resources.",
      impact: "Community Outreach"
    },
    {
      name: "Tech for Troops Initiative",
      story: "Corporate partners helped us provide technology training to 150 veterans transitioning to civilian careers last year.",
      impact: "Career Development"
    }
  ];

  const faqData = [
    {
      question: "How is my donation used?",
      answer: "Your donation directly supports our programs for service members, veterans, and their families. We allocate funds to areas of greatest need, including emergency assistance, transition support, and community programs. WANAC is committed to transparency, with 85% of donations going directly to program services."
    },
    {
      question: "Is my donation tax-deductible?",
      answer: "Yes, WANAC is a registered 501(c)(3) nonprofit organization. Your donations are tax-deductible to the extent allowed by law. You will receive a receipt for your records after making a contribution."
    },
    {
      question: "Can I make a recurring donation?",
      answer: "Absolutely! Our monthly giving program allows you to make automatic recurring donations. This provides us with sustainable support and makes it easier for you to manage your giving throughout the year."
    },
    {
      question: "What are other ways to give besides monetary donations?",
      answer: "There are many ways to support our mission! You can volunteer your time, donate goods or services, participate in fundraising events, create a fundraiser, or consider planned giving options like bequests or charitable trusts."
    }
  ];

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section 
        className="relative bg-[#002147] bg-cover bg-center py-20 px-4"
        aria-label="Hero section"
      >
        <div className="relative max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            WAYS TO SUPPORT WANAC
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white">
            Join us in our mission to empower and support service members, veterans, and their families.
          </p>
          <a
            href="#supportoptions"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors duration-300"
            aria-label="Explore ways to support"
          >
            Explore Ways to Help
          </a>
        </div>
      </section>

      {/* Support Options */}
      <section 
        id="support-options" 
        className="py-20 px-6 bg-gray-50"
        aria-label="Support options"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            How You Can Make A Differance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportOptions.map((option) => (
              <div 
                key={option.id}
                className="bg-white shadow-lg rounded-xl p-8 flex flex-col h-full transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl mb-4 mx-auto">{option.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-center">{option.title}</h3>
                <p className="text-gray-600 text-center mb-6 flex-grow">{option.description}</p>
                <a
                  href={option.link}
                  className="block text-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg font-medium transition-colors duration-300 mt-auto"
                >
                  {option.buttonText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section 
        className="py-20 px-6 bg-white"
        aria-label="Impact stories"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            Your Support Makes An Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {impactStories.map((story, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <p className="italic text-gray-700 mb-6 text-lg flex-grow">"{story.story}"</p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-800 text-lg">— {story.name}</p>
                  <p className="text-orange-500">{story.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Tiers */}
      <section 
        className="py-20 px-6 bg-gray-50"
        aria-label="Donation tiers"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            Every Gift Makes A Differance 
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-xl p-8 border-t-4 border-blue-500">
              <h3 className="text-2xl font-bold mb-4 text-center text-blue-600">Friend</h3>
              <p className="text-4xl font-bold text-center mb-6">$25 - $99</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Recognition in our annual report</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Quarterly newsletter subscription</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>WANAC digital badge</span>
                </li>
              </ul>
              <a
                href="/donate?tier=friend"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-medium transition-colors duration-300"
              >
                Donate as a Friend
              </a>
            </div>
            
            <div className="bg-white shadow-xl rounded-xl p-8 border-t-4 border-orange-500 transform scale-105 relative">
              <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-orange-600">Advocate</h3>
              <p className="text-4xl font-bold text-center mb-6">$100 - $499</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span>All Friend benefits</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span>Personalized thank you message</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span>Exclusive WANAC merchandise</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span>Invitation to annual virtual event</span>
                </li>
              </ul>
              <a
                href="/donate?tier=advocate"
                className="block text-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg font-medium transition-colors duration-300"
              >
                Donate as an Advocate
              </a>
            </div>
            
            <div className="bg-white shadow-lg rounded-xl p-8 border-t-4 border-purple-500">
              <h3 className="text-2xl font-bold mb-4 text-center text-purple-600">Champion</h3>
              <p className="text-4xl font-bold text-center mb-6">$500+</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>All Advocate benefits</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>Recognition on our website</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>VIP access to WANAC events</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>Personal impact report</span>
                </li>
              </ul>
              <a
                href="/donate?tier=champion"
                className="block text-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg font-medium transition-colors duration-300"
              >
                Donate as a Champion
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        className="py-20 px-6 bg-white"
        aria-label="Frequently asked questions"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            Frequently Asked Questions 
          </h2>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300"
                role="region"
                aria-label={`FAQ item ${index + 1}`}
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

      {/* Final CTA */}
      <section 
        className="py-20 px-6 bg-[#002147] text-white"
        aria-label="Call to action"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready To Make A Differance?
          </h2>
          <p className="text-xl mb-8">
            Your support helps us continue our mission of serving those who serve.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a
              href="/donate"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors duration-300"
              aria-label="Donate now"
            >
              Donate Now
            </a>
            <a
              href="/contact"
              className="inline-block bg-white text-[#002147] px-8 py-4 rounded-full text-lg font-medium transition-colors duration-300 hover:bg-gray-100"
              aria-label="Contact us"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WaysToSupportPage;
