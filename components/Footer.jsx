'use client';

import { useState } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaXTwitter } from 'react-icons/fa6';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer({ hideFooter = false }) {
  const pathname = usePathname();

  const footerExcludedPaths = [
    '/dashboard', '/login', '/signup', '/signin', '/register',
    '/client', '/coach', '/admin', '/settings', '/appointments',
    '/messages', '/community', '/journal', '/aichatbot',
    '/lifescore', '/mycoach', '/library',
  ];

  const shouldHideFooter =
    hideFooter ||
    footerExcludedPaths.some(path => pathname?.startsWith(path));

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError(false);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong.');

      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (err) {
      setMessage(err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (shouldHideFooter) return null;

  return (
    <footer className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100 text-[#002147] pt-20 pb-12 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 via-transparent to-blue-100/40 pointer-events-none animate-gradient"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,140,50,0.08),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,33,71,0.08),transparent_50%)] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-blue-500 to-orange-500"></div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div className="transform hover:scale-105 transition-transform duration-300 group">
              <Image 
                src="/WANAC N 8 Old Glory.svg" 
                width={300} 
                height={120} 
                className="mb-6 drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300" 
                alt="WANAC Logo" 
              />
            </div>
            <ul className="space-y-4 text-sm font-semibold">
              <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer flex items-center gap-2 group">
                <span className="w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-4"></span>
                SHOP MERCH
              </li>
              <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer flex items-center gap-2 group">
                <span className="w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-4"></span>
                HELP CENTER
              </li>
            </ul>
          </div>

          <div className="backdrop-blur-sm bg-white/30 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <ul className="space-y-4 text-sm font-semibold">
              <li className="text-[#ff5e1a] hover:text-orange-600 transition-all duration-300 cursor-pointer flex items-center gap-2 group">
                VOLUNTEER
              </li>
              <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer pl-6 hover:pl-8">CORPORATE PARTNERS</li>
              <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer pl-6 hover:pl-8">LEADERSHIP GIVING</li>
              <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer pl-6 hover:pl-8">WAYS TO SUPPORT</li>
              <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer pl-6 hover:pl-8">TESTIMONIALS</li>
            </ul>
          </div>

          <div className="backdrop-blur-sm bg-white/30 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <ul className="space-y-4 text-sm font-semibold">
              <li className="text-[#ff5e1a] hover:text-orange-600 transition-all duration-300 cursor-pointer flex items-center gap-2 group">
                WHY DO WE ALL NEED A COACH
              </li>
              <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer pl-6 hover:pl-8">OUR APPROACH</li>
              <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer pl-6 hover:pl-8">SUCCESSFUL PLANNING AND COACHING</li>
              <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer pl-6 hover:pl-8">HIGH PERFORMANCE COACHING</li>
              <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer pl-6 hover:pl-8">BOOTS TO COACHING BUSINESS</li>
            </ul>
          </div>

          <div className="space-y-8">
            <div className="backdrop-blur-sm bg-white/30 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="font-bold text-[#ff5e1a] text-base mb-6">CONNECT WITH US</h3>
              <div className="flex items-center gap-6 text-xl">
                <div className="group">
                  <FaFacebookF className="hover:text-orange-500 transform group-hover:scale-125 transition-all duration-300 cursor-pointer" />
                  <div className="w-full h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
                <div className="group">
                  <FaXTwitter className="hover:text-orange-500 transform group-hover:scale-125 transition-all duration-300 cursor-pointer" />
                  <div className="w-full h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
                <div className="group">
                  <FaYoutube className="hover:text-orange-500 transform group-hover:scale-125 transition-all duration-300 cursor-pointer" />
                  <div className="w-full h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
                <div className="group">
                  <FaInstagram className="hover:text-orange-500 transform group-hover:scale-125 transition-all duration-300 cursor-pointer" />
                  <div className="w-full h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
                <div className="group">
                  <FaLinkedinIn className="hover:text-orange-500 transform group-hover:scale-125 transition-all duration-300 cursor-pointer" />
                  <div className="w-full h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-blue-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <h4 className="font-bold mb-3 text-[#002147]">Service member or family?</h4>
              <p className="text-sm mb-6 text-gray-600">Download our app to find events, locations and programs near you.</p>
              <div className="flex gap-4 justify-center">
                <div className="transform hover:scale-105 transition-all duration-300">
                  <Image src="/png-transparent-app-store-apple-google-play-apple-text-logo-mobile-phones.png" alt="App Store" width={120} height={40} className="hover:opacity-90 transition-opacity duration-300" />
                </div>
                <div className="transform hover:scale-105 transition-all duration-300">
                  <Image src="/png-transparent-get-it-on-google-play-button.png" alt="Google Play" width={120} height={40} className="hover:opacity-90 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold mb-3 text-[#002147]">Subscribe to our Newsletter</h3>
            <p className="text-sm text-gray-600 mb-6">Stay updated with our latest programs and initiatives.</p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-[#ff5e1a] to-orange-600 text-white px-8 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Subscribing...
                  </span>
                ) : 'Subscribe'}
              </button>
            </form>
            {message && (
              <p className={`text-sm mt-4 ${error ? 'text-red-500' : 'text-green-600'} bg-white/80 p-3 rounded-lg inline-block`}>
                {message}
              </p>
            )}
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 mt-16 border-t border-gray-200 pt-8">
          <p className="mb-3 hover:text-[#002147] transition-colors duration-300">
            The WANAC Platform is a not-for-profit organization.
          </p>
          <p className="mb-4 hover:text-[#002147] transition-colors duration-300 flex items-center justify-center gap-2">
            <span className="hover:text-orange-500">+1 (888) 484 3876</span>
            <span className="text-gray-300">|</span>
            <span className="hover:text-orange-500">PO Box 968</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
