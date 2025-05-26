// WANAC Coaching Platform - Donation Page
"use client";

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegCreditCard, FaRegHeart, FaRegCalendarAlt, FaRegCheckCircle } from 'react-icons/fa';

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState(50);
  const [donationType, setDonationType] = useState('one-time');
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [donationComplete, setDonationComplete] = useState(false);

  const handleAmountSelect = (amount) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(value);
    if (value) {
      setDonationAmount(parseInt(value, 10));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setDonationComplete(true);
    }, 2000);
  };

  return (
    <div className="bg-white text-[#002147]">
      <Head>
        <title>Donate | WANAC Coaching Platform</title>
        <meta name="description" content="Support veterans through your donation to WANAC" />
      </Head>

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
          <h1 className="text-5xl font-bold mb-4">YOUR DONATION MAKES A DIFFERENCE</h1>
          <p className="text-xl max-w-3xl mx-auto px-4">
            Your support helps us provide essential coaching services to veterans transitioning to civilian life.
          </p>
        </div>
      </header>
      <section>
          <div className="relative w-full h-10 bg-[#002147] overflow-hidden flex items-center justify-center">
            <nav className="relative z-10 flex space-x-16 px-4">
              <Link href="#How-to-Volunteer" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Support our Mission
              </Link>
              <Link href="#Volunteer-Stories" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Donations At Work
              </Link>
              <Link href="#Frequently-Asked-Questions" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Frequently Asked Questions
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

      {donationComplete ? (
        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl text-green-500 mb-6 flex justify-center">
              <FaRegCheckCircle />
            </div>
            <h2 className="text-3xl font-bold mb-4">Thank You for Your Donation!</h2>
            <p className="text-xl mb-8">
              Your contribution of ${donationAmount} will help us continue our mission to support veterans and service members.
            </p>
            <p className="mb-8">
              A receipt has been sent to your email address. Please check your inbox for confirmation details.
            </p>
            <Link 
              href="/"
              className="bg-[#002147] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#003167] transition-all"
            >
              Return to Homepage
            </Link>
          </div>
        </section>
      ) : (
        <>
          {/* Donation Form Section */}
          <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Support Our Mission</h2>
                <p className="mb-6">
                  Your donation helps us provide essential coaching services to veterans transitioning to civilian life. 
                  We're committed to ensuring every service member has the support they need to thrive after their military service.
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold mb-4">Your Impact</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 mt-1">★</span>
                      <span><strong>$25</strong> provides resources for our online coaching library</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 mt-1">★</span>
                      <span><strong>$50</strong> supports one hour of one-on-one coaching for a veteran</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 mt-1">★</span>
                      <span><strong>$100</strong> helps train peer mentors in our community</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 mt-1">★</span>
                      <span><strong>$250</strong> sponsors a veteran through our transition program</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 mt-1">★</span>
                      <span><strong>$500</strong> funds a workshop for veterans and their families</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Other Ways to Support</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/corporatepatners" className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-all">
                      <h4 className="font-semibold">Corporate Partnerships</h4>
                      <p className="text-sm text-gray-600">Partner with us to support veterans</p>
                    </Link>
                    <Link href="/volunteer" className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-all">
                      <h4 className="font-semibold">Volunteer</h4>
                      <p className="text-sm text-gray-600">Give your time and expertise</p>
                    </Link>
                    <Link href="/leadershipgiving" className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-all">
                      <h4 className="font-semibold">Leadership Giving</h4>
                      <p className="text-sm text-gray-600">Make a significant impact</p>
                    </Link>
                    <Link href="/waystosupport" className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-all">
                      <h4 className="font-semibold">More Ways to Help</h4>
                      <p className="text-sm text-gray-600">Discover additional opportunities</p>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold mb-6 text-center">Make Your Donation</h3>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Donation Type</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                            donationType === 'one-time' 
                              ? 'bg-[#002147] text-white border-[#002147]' 
                              : 'bg-white text-[#002147] border-gray-300 hover:bg-gray-50'
                          }`}
                          onClick={() => setDonationType('one-time')}
                        >
                          <FaRegCreditCard />
                          <span>One-time</span>
                        </button>
                        <button
                          type="button"
                          className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                            donationType === 'monthly' 
                              ? 'bg-[#002147] text-white border-[#002147]' 
                              : 'bg-white text-[#002147] border-gray-300 hover:bg-gray-50'
                          }`}
                          onClick={() => setDonationType('monthly')}
                        >
                          <FaRegCalendarAlt />
                          <span>Monthly</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Select Amount</label>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {[25, 50, 100, 250, 500, 1000].map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            className={`p-3 rounded-lg border ${
                              donationAmount === amount && !customAmount
                                ? 'bg-[#002147] text-white border-[#002147]'
                                : 'bg-white text-[#002147] border-gray-300 hover:bg-gray-50'
                            }`}
                            onClick={() => handleAmountSelect(amount)}
                          >
                            ${amount}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="text"
                          placeholder="Custom Amount"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          className="w-full p-3 pl-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Personal Information</label>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Full Name"
                          required
                          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          required
                          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number (Optional)"
                          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Payment Information</label>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Card Number"
                          required
                          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            required
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="CVC"
                            required
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Zip/Postal Code"
                          required
                          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span className="text-sm text-gray-600">
                          I'd like to cover the transaction fee so 100% of my donation goes to WANAC
                        </span>
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={`w-full bg-orange-500 text-white p-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-all ${
                        isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaRegHeart />
                          {donationType === 'monthly' ? `Donate $${donationAmount} Monthly` : `Donate $${donationAmount}`}
                        </>
                      )}
                    </button>
                    
                    <p className="text-xs text-gray-500 mt-4 text-center">
                      Your donation is tax-deductible. WANAC is a 501(c)(3) nonprofit organization.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* Impact Stories */}
          <section className="py-16 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Your Donation at Work</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Michael S.",
                    role: "U.S. Army Veteran",
                    image: "/pexels-rdne-7467965.jpg",
                    quote: "The coaching I received through WANAC helped me find direction after 12 years of service. I'm now running my own business and mentoring other veterans."
                  },
                  {
                    name: "Sarah T.",
                    role: "U.S. Navy Veteran",
                    image: "/Veteran2.jpg",
                    quote: "WANAC's transition coaching gave me the confidence to pursue a career in healthcare. The community support made all the difference during a challenging time."
                  },
                  {
                    name: "James R.",
                    role: "U.S. Marine Corps Veteran",
                    image: "/veteran1.jpg",
                    quote: "After struggling with my transition, WANAC connected me with a coach who understood my experience. Today, I'm thriving in my civilian career."
                  }
                ].map((story, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md">
                    <div className="h-48 relative">
                      <Image 
                        src={story.image} 
                        alt={story.name} 
                        layout="fill" 
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-6">
                      <blockquote className="italic mb-4">"{story.quote}"</blockquote>
                      <div className="font-semibold">{story.name}</div>
                      <div className="text-sm text-gray-600">{story.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {[
                  {
                    question: "Is my donation tax-deductible?",
                    answer: "Yes, WANAC is a registered 501(c)(3) nonprofit organization. Your donation is tax-deductible to the extent allowed by law."
                  },
                  {
                    question: "How is my donation used?",
                    answer: "Your donation directly supports our coaching programs, community resources, and technology platform that helps veterans transition to civilian life and thrive after service."
                  },
                  {
                    question: "Can I make a donation in honor of someone?",
                    answer: "Yes, you can dedicate your donation in honor or memory of someone. Please include this information in the notes section during checkout."
                  },
                  {
                    question: "Do you accept donations other than money?",
                    answer: "Yes, we accept in-kind donations, volunteer time, and professional services. Please contact us directly to discuss non-monetary donations."
                  },
                  {
                    question: "Can I set up a recurring donation?",
                    answer: "Yes, you can choose to make your donation monthly by selecting the 'Monthly' option on our donation form."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <p className="mb-4">Have more questions about donating?</p>
                <Link 
                  href="/helpcenter" 
                  className="text-[#002147] font-semibold hover:underline"
                >
                  Visit our Help Center
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
