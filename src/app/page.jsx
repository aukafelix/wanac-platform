// WANAC Coaching Platform - Home Page
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import GuidedBoardingIntro from '../../components/GuidedBoardingIntro';
import LifeScorePreview from '../../components/LifeScorePreview';
import AIAssistantDemo from '../../components/AIAssistantDemo';
import SessionBookingPreview from '../../components/SessionBookingPreview';
import CommunitySnapshot from '../../components/CommunitySnapshot';
import { FaUserTie, FaQuoteLeft } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Head>
        <title>WANAC Coaching Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hero Section */}
<section className="min-h-[65vh] bg-[#002147] text-white py-24">
  <div className="container mx-auto grid grid-cols-12 px-6">
    <div className="col-start-2 col-span-8 flex flex-col">
      <h1 className="text-5xl font-extrabold max-w-3xl leading-tight uppercase tracking-wide text-heading">
        Empowering Service Members and Veterans through couching and community support
      </h1>
      <p className="text-lg mt-4 max-w-xl text-white">
        Personalized coaching, AI tools and community to help you thrive after Service.
      </p>
      <div className="mt-6 space-x-4">
        <Link
          href="/signup"
          className="border-2 border-white px-6 py-2 rounded font-semibold hover:bg-white hover:text-[white] transition-all"
        >
          Get Started
        </Link>
        <Link href="/login" className="border-2 border-white px-6 py-2 rounded font-semibold hover:bg-white hover:text-background transition-all">
          Log In
        </Link>
      </div>
    </div>
  </div>
</section>



      <section id="how-we-help" className="py-20 px-6 bg-white text-center relative">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,...')] pointer-events-none" />
  
  {/* Section Header */}
  <div className="mb-16">
    <h2 className="text-4xl font-bold mt-2 mb-4 uppercase text-[#002147]">How We Help</h2>
    <div className="w-20 h-1 bg-[#002147] mx-auto rounded-full"/>
  </div>

  {/* Cards Grid */}
  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {[{
      title: 'Transition Coaching',
      desc: 'Helping veterans navigate life after service with clarity and confidence.',
      icon: '',
      image: '/Transitioncoaching.png', // Add your image path
      alt: 'Transition Coaching Session',
      highlights: ['Career Planning', 'Life Skills', 'Personal Growth']
    }, {
      title: 'Performancecoaching',
      desc: 'Equipping veterans to thrive personally and professionally.',
      icon: '',
      image: '/Performancecoaching.png', // Add your image path
      alt: 'Performance Coaching Session',
      highlights: ['Leadership', 'Communication', 'Goal Setting']
    }, {
      title: 'Coaching Academy',
      desc: 'Training veterans to become certified coaches and mentors.',
      icon: '',
      image: '/Transitioncoaching.png', // Add your image path
      alt: 'Coaching Academy Training',
      highlights: ['Certification', 'Mentorship', 'Community']
    }].map(({ title, desc, icon, image, alt, highlights }) => (
      <div 
        key={title} 
        className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={alt}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/50 to-transparent"/>
        </div>

        {/* Content Container */}
        <div className="p-8">
          {/* Icon */}
          <div className="w-16 h-16 bg-[#002147] text-white rounded-full flex items-center justify-center text-2xl mx-auto -mt-16 relative z-10 border-4 border-white group-hover:scale-110 transition-transform">
            {icon}
          </div>

          {/* Content */}
          <h3 className="text-2xl font-semibold my-4 text-[#002147]">{title}</h3>
          <p className="text-gray-600 mb-6">{desc}</p>

          {/* Highlights */}
          <div className="flex flex-wrap justify-center gap-2">
            {highlights.map((item) => (
              <span 
                key={item} 
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

      <section className="py-20 px-6 bg-[#002147] text-white">
  <div className="max-w-7xl mx-auto text-center">
    {/* Section Title */}
    <h2 className="text-3xl font-semibold mb-8">KEY WEB APP FEATURES</h2>
    <p className="text-lg mb-12">Discover the powerful features that make our web app the best choice for your needs.</p>

    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
      {/* Feature 1 */}
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="mb-6">
          <img src="/icons/session-booking.svg" alt="Session Booking" className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-2xl font-semibold mb-4">Session Booking</h3>
        <p className="text-lg text-gray-700">Easily book your sessions with a simple, intuitive interface that guarantees a smooth user experience.</p>
      </div>

      {/* Feature 2 */}
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="mb-6">
          <img src="/icons/ai-assistant.svg" alt="AI Assistant" className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-2xl font-semibold mb-4">AI Assistant</h3>
        <p className="text-lg text-gray-700">Get personalized assistance with our AI-driven assistant, designed to streamline your tasks and improve productivity.</p>
      </div>

      {/* Feature 3 */}
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="mb-6">
          <img src="/icons/real-time-updates.svg" alt="Real-Time Updates" className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-2xl font-semibold mb-4">Real-Time Updates</h3>
        <p className="text-lg text-gray-700">Stay informed with real-time notifications and updates, ensuring you're always in the loop.</p>
      </div>
    </div>
  </div>
</section>

      {/* Community and Testimonial */}
      <section className="py-20 px-6 bg-white text-[#002147]">
        <h2 className="text-4xl font-bold mb-12 text-center uppercase">Testimonials</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-4">
  <div className="flex items-center gap-2">
    <FaUserTie className="text-xl text-heading" />
    <h2 className="text-2xl font-semibold text-heading">Veteran Voices</h2>
  </div>
  <blockquote className="italic text-foreground relative pl-8">
    <FaQuoteLeft className="absolute left-0 top-0 text-gray-400" />
    “WANAC helped me rediscover my strength and purpose after leaving the military.”
    <footer className="mt-4 font-semibold">— U.S. Army Veteran</footer>
  </blockquote>
</div>
<div className="bg-white p-6 rounded-xl shadow flex flex-col gap-4">
  <div className="flex items-center gap-2">
    <FaUserTie className="text-xl text-heading" />
    <h2 className="text-2xl font-semibold text-heading">Veteran Voices</h2>
  </div>
  <blockquote className="italic text-foreground relative pl-8">
    <FaQuoteLeft className="absolute left-0 top-0 text-gray-400" />
    “WANAC helped me rediscover my strength and purpose after leaving the military.”
    <footer className="mt-4 font-semibold">— U.S. Army Veteran</footer>
  </blockquote>
</div>
        </div>
      </section>

      {/* Community CTA */}
<section id="community" className="bg-background text-white text-center py-20 px-6">
  <h2 className="text-4xl font-bold mb-4 uppercase">Join Our Community</h2>
  <p className="mb-6 max-w-2xl mx-auto">
    Discover upcoming events, connect with fellow veterans, and make an impact.
  </p>
  <div className="flex justify-center gap-4 mb-12">
    <Link href="/signup" className="bg-accent text-white px-6 py-3 rounded font-semibold hover:bg-hover transition-all">
      Sign Up
    </Link>
    <Link href="/donate" className="bg-white text-[#002147] text-heading px-6 py-3 rounded font-semibold hover:bg-gray-200 transition-all">
      Donate
    </Link>
  </div>

  {/* Video Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto mt-16">
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src="https://www.youtube.com/embed/VIDEO_ID_1?autoplay=1&mute=1&loop=1&playlist=VIDEO_ID_1"
        title="Community Video 1"
        className="w-full h-full rounded"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src="https://www.youtube.com/embed/VIDEO_ID_2?autoplay=1&mute=1&loop=1&playlist=VIDEO_ID_2"
        title="Community Video 2"
        className="w-full h-full rounded"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src="https://www.youtube.com/embed/VIDEO_ID_3?autoplay=1&mute=1&loop=1&playlist=VIDEO_ID_3"
        title="Community Video 3"
        className="w-full h-full rounded"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src="https://www.youtube.com/embed/VIDEO_ID_4?autoplay=1&mute=1&loop=1&playlist=VIDEO_ID_4"
        title="Community Video 4"
        className="w-full h-full rounded"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  </div>
</section>

      {/* Final Section */}
<section className="py-20 px-6 text-center bg-[#002147]">
  <h2 className="text-3xl font-bold mb-12 uppercase text-white text-heading relative">
    Manage Your Experience
    <span className="block h-1 w-20 bg-blue-400 mx-auto mt-4"></span>
  </h2>
  
  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
    {/* Card 1 */}
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transition-transform hover:transform hover:-translate-y-2 cursor-pointer">
      <div className="flex flex-col items-center text-white">
        <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold mb-3">Coaching Preferences</h3>
        <p className="text-gray-300">Customize your coaching experience and set your learning goals</p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transition-transform hover:transform hover:-translate-y-2 cursor-pointer">
      <div className="flex flex-col items-center text-white">
        <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold mb-3">Subscriptions & Sessions</h3>
        <p className="text-gray-300">Track and manage your subscriptions and upcoming sessions</p>
      </div>
    </div>

    {/* Card 3 */}
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transition-transform hover:transform hover:-translate-y-2 cursor-pointer">
      <div className="flex flex-col items-center text-white">
        <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <h3 className="text-xl font-semibold mb-3">Notification Settings</h3>
        <p className="text-gray-300">Set up your preferred notification preferences</p>
      </div>
    </div>
  </div>
</section>

    </div>
  );
}
