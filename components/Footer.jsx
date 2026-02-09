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
    '/lifescore', '/mycoach', '/library', '/events',
    '/career-compass', '/education-compass', '/taskmanagement',
    '/aiinsights', '/admin', '/breakoutrooms',
    '/accountsettings', '/reports', '/corporate-partners',
    '/leadership-giving', '/ways-to-support', '/testimonials', '/pages/vsointakeform', '/pages/programintakeform', '/pages/vabenefitsclaimintakeform'
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
    <footer className="relative bg-gradient-to-b from-slate-50 via-white to-slate-100 text-[#002147] pt-16 pb-12 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-orange-100/20 pointer-events-none animate-gradient"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,33,71,0.08),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,94,26,0.08),transparent_50%)] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#002147] via-[#ff5e1a] to-[#002147]"></div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="transform hover:scale-105 transition-transform duration-300 group">
              <Image
                src="/WANAC N 8 Old Glory.svg"
                width={240}
                height={100}
                className="mb-6 drop-shadow-xl group-hover:drop-shadow-2xl transition-all duration-300"
                alt="WANAC Logo"
              />
            </div>
            <ul className="space-y-3 text-sm font-medium border-l border-[#002147]/10">
              <li className="hover:text-[#002147] transition-all duration-300 cursor-pointer flex items-center gap-2 pl-3 group">
                <span className="w-0 h-[1px] bg-[#002147] transition-all duration-300 group-hover:w-3"></span>
                SHOP MERCH
              </li>
              <li className="hover:text-[#002147] transition-all duration-300 cursor-pointer flex items-center gap-2 pl-3 group">
                <span className="w-0 h-[1px] bg-[#002147] transition-all duration-300 group-hover:w-3"></span>
                HELP CENTER
              </li>
            </ul>
          </div>

          <div className="backdrop-blur-sm bg-white/40 p-6 rounded-lg shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300">
            <ul className="space-y-3 text-sm">
              <li className="hover:text-[#002147] text-slate-600 transition-all duration-300 cursor-pointer pl-3 hover:pl-4 border-l border-transparent hover:border-[#002147]/20">
                VOLUNTEER
              </li>
              <li className="hover:text-[#002147] text-slate-600 transition-all duration-300 cursor-pointer pl-3 hover:pl-4 border-l border-transparent hover:border-[#002147]/20">CORPORATE PARTNERS</li>
              <li className="hover:text-[#002147] text-slate-600 transition-all duration-300 cursor-pointer pl-3 hover:pl-4 border-l border-transparent hover:border-[#002147]/20">LEADERSHIP GIVING</li>
              <li className="hover:text-[#002147] text-slate-600 transition-all duration-300 cursor-pointer pl-3 hover:pl-4 border-l border-transparent hover:border-[#002147]/20">WAYS TO SUPPORT</li>
              <li className="hover:text-[#002147] text-slate-600 transition-all duration-300 cursor-pointer pl-3 hover:pl-4 border-l border-transparent hover:border-[#002147]/20">TESTIMONIALS</li>
              <li className="hover:text-[#002147] text-slate-600 transition-all duration-300 cursor-pointer pl-3 hover:pl-4 border-l border-transparent hover:border-[#002147]/20">OUR STORY</li>
              <li className="hover:text-[#002147] text-slate-600 transition-all duration-300 cursor-pointer pl-3 hover:pl-4 border-l border-transparent hover:border-[#002147]/20">WANAC CAREERS</li>
            </ul>
          </div>

          <div className="backdrop-blur-sm bg-white/40 p-6 rounded-lg shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300">
            <ul className="space-y-3 text-sm">
              <li className="text-[#002147] font-bold mb-4 pb-2 border-b border-[#002147]/10">
                WHY DO WE ALL NEED A COACH
              </li>
              <li className="hover:text-[#002147] text-slate-600 transition-all duration-300 cursor-pointer pl-3 hover:pl-4 border-l border-transparent hover:border-[#002147]/20">OUR APPROACH</li>
              <li className="hover:text-[#002147] text-slate-600 transition-all duration-300 cursor-pointer pl-3 hover:pl-4 border-l border-transparent hover:border-[#002147]/20">SUCCESSFUL PLANNING AND COACHING</li>
              <li className="hover:text-[#002147] text-slate-600 transition-all duration-300 cursor-pointer pl-3 hover:pl-4 border-l border-transparent hover:border-[#002147]/20">HIGH PERFORMANCE COACHING</li>
              <li className="hover:text-[#002147] text-slate-600 transition-all duration-300 cursor-pointer pl-3 hover:pl-4 border-l border-transparent hover:border-[#002147]/20">BOOTS TO COACHING BUSINESS</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="backdrop-blur-sm bg-white/40 p-6 rounded-lg shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300">
              <h3 className="font-bold text-[#002147] text-sm mb-4 pb-2 border-b border-[#002147]/10">CONNECT WITH US</h3>
              <div className="flex items-center gap-6 text-lg justify-center">
                <div className="group">
                  <FaFacebookF className="text-[#1877F2] hover:text-[#0d65e1] transform group-hover:scale-110 transition-all duration-300 cursor-pointer" />
                  <div className="w-full h-0.5 bg-[#1877F2] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
                <div className="group">
                  <FaXTwitter className="text-[#000000] hover:text-[#14171A] transform group-hover:scale-110 transition-all duration-300 cursor-pointer" />
                  <div className="w-full h-0.5 bg-[#000000] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
                <div className="group">

                  <FaYoutube className="text-[#FF0000] hover:text-[#cc0000] transform group-hover:scale-110 transition-all duration-300 cursor-pointer" />
                  <div className="w-full h-0.5 bg-[#FF0000] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
                <div className="group">
                  <FaInstagram className="text-[#E4405F] hover:text-[#d1264a] transform group-hover:scale-110 transition-all duration-300 cursor-pointer" />
                  <div className="w-full h-0.5 bg-[#E4405F] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
                <div className="group">

                  <FaLinkedinIn className="text-[#0A66C2] hover:text-[#084c91] transform group-hover:scale-110 transition-all duration-300 cursor-pointer" />
                  <div className="w-full h-0.5 bg-[#0A66C2] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-lg shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300">
              <h4 className="font-bold mb-3 text-[#002147] text-sm border-b border-[#002147]/10 pb-2">Service member or family?</h4>
              <p className="text-xs text-slate-600 mb-6">Download our app to find events, locations and programs near you.</p>
              <div className="flex gap-3 justify-center">
                <div className="transform hover:scale-105 transition-all duration-300">
                  <Image src="/available-on-the-app-store-logo-png-transparent.png" alt="App Store" width={100} height={35} className="hover:opacity-90 transition-opacity duration-300" />
                </div>
                <div className="transform hover:scale-105 transition-all duration-300">
                  <Image src="/Google-Play-Logo.png" alt="Google Play" width={100} height={20} className="hover:opacity-90 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-xl mx-auto text-center">
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-lg p-6 shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300">
            <h3 className="text-lg font-bold mb-3 text-[#002147] border-b border-[#002147]/10 pb-2">Subscribe to our Newsletter</h3>
            <p className="text-xs text-slate-600 mb-6">Stay updated with our latest programs and initiatives.</p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row items-center gap-3 justify-center"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full sm:w-auto px-4 py-2 text-sm rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#002147] focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#002147] hover:bg-orange-300 text-white px-6 py-2 text-sm rounded-md hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Subscribing...
                  </span>
                ) : 'Subscribe'}
              </button>
            </form>
            {message && (
              <p className={`text-xs mt-4 ${error ? 'text-red-500' : 'text-green-600'} bg-white/80 p-2 rounded-md inline-block shadow-sm`}>
                {message}
              </p>
            )}
          </div>
        </div>

        <div className="text-center text-xs text-slate-600 mt-12 border-t border-slate-200 pt-6">
          <p className="mb-2 hover:text-[#002147] transition-colors duration-300">
            The WANAC Platform is a not-for-profit organization.
          </p>
          <p className="mb-3 hover:text-[#002147] transition-colors duration-300 flex items-center justify-center gap-3">
            <span className="hover:text-[#002147]">400 Continental Blvd Ste 6025</span>
            <span className="text-slate-300">|</span>
            <span className="hover:text-[#002147]">El Segundo, CA 90245</span>
            <span className="text-slate-300">|</span>
            <a href="/pages/privacy" className="hover:text-[#002147] cursor-pointer underline-offset-2 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
