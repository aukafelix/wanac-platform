'use client';

// WANAC Coaching Platform - Home Page
import Image from 'next/image';
import Link from 'next/link';
import { FaUserTie, FaQuoteLeft } from 'react-icons/fa';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

// Z-Index Scale
const Z_INDEX = {
  background: 0,
  content: 10,
  overlay: 20,
  modal: 30,
};

// Testimonials Data
const TESTIMONIALS = [
  {
    id: 'veteran-1',
    name: 'Clarence Jacob',
    image: '/veteran1.jpg',
    branch: 'U.S. Army Veteran',
    quote: 'WANAC helped me rediscover my strength and purpose after leaving the military and finding my way in the civilian world.'
  },
  {
    id: 'veteran-2',
    name: 'Stephanie Williams',
    image: '/veteran2.jpg',
    branch: 'U.S. Marine Corps Veteran',
    quote: 'WANAC has been a game-changer for me. The support and guidance I\'ve received have been invaluable in my transition to civilian life.'
  }
];

// Programs Data
const PROGRAMS = [
  {
    title: 'Promise Land Education Pathway (PLEP)',
    desc: 'Navigate your educational journey with structured academic transition support.',
    image: '/promiselandtransition.jpg',
    alt: 'Education Pathway Program',
    highlights: ['Academic Support', 'Mentoring'],
    link: '/pages/wanacplep'
  },
  {
    title: 'Promise Land Career Accelerator (PLCA)',
    desc: 'Accelerate your professional success with comprehensive career management.',
    image: '/transitioncoaching11.jpg',
    alt: 'Career Accelerator Program',
    highlights: ['Career Growth', 'Strategy'],
    link: '/pages/wanaplca'
  },
  {
    title: 'Peak Performance Coaching (PPC)',
    desc: 'Master excellence through our structured 12-session coaching model.',
    image: '/transitionguide.jpg',
    alt: 'Peak Performance Coaching',
    highlights: ['12-Sessions', 'Development'],
    link: '/pages/wanappc'
  },
  {
    title: 'Vetrepreneurship Academy (VETA)',
    desc: 'Build your entrepreneurial legacy with business planning and mentorship.',
    image: '/Performancecoaching.png',
    alt: 'Vetrepreneurship Academy',
    highlights: ['Business', 'Mentorship'],
    link: '/pages/vetaacademy'
  }
];

// Features Data
const FEATURES = [
  {
    id: 'session-booking',
    icon: 'https://cdn.lordicon.com/uoljexdg.json',
    title: 'Session Booking',
    description: 'Easily book your sessions with a simple, intuitive interface that guarantees a smooth user experience.'
  },
  {
    id: 'ai-assistant',
    icon: 'https://cdn.lordicon.com/qvbrkejx.json',
    title: 'AI Assistant',
    description: 'Get personalized assistance with our AI-driven assistant, designed to streamline your tasks and improve productivity.'
  },
  {
    id: 'Fire Team Experience',
      icon: 'https://cdn.lordicon.com/thtrcqvk.json',
    title: 'Fireteams',
    description: 'Connect with fellow veterans in small support and discussion groups, fostering teamwork and camaraderie in your transition journey.'
  }
];

// Management Cards Data
const MANAGEMENT_CARDS = [
  {
    id: 'coaching-preferences',
    icon: 'https://cdn.lordicon.com/dqxvvqzi.json',
    title: 'Coaching Preferences',
    description: 'Customize your coaching experience and set your learning goals',
    ariaLabel: 'Coaching Preferences - Customize your coaching experience'
  },
  {
    id: 'Journaling and Task Management',
    icon: 'https://cdn.lordicon.com/kbtmbyzy.json',
    title: 'Journaling and Task Management',
      description: 'Track your progress with smart journaling and task management tools',
      ariaLabel: 'Journaling and Task Management - Track your progress and manage tasks'
  },
  {
    id: 'Career and Education Compass',
     icon: 'https://cdn.lordicon.com/zhiiqoue.json',
    title: 'Career and Education Compass',
    description: 'Get personalized guidance on your career and education goals',
    ariaLabel: 'Career and Education Compass - Get personalized guidance on your career and education goals'
  }
];

// Scroll Animation Hook
const useScrollAnimation = () => {
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return ref;
};

export default function Homepage() {
  // Handler for management card interactions
  const handleCardInteraction = (cardId) => {
    // Placeholder for future navigation or modal opening
    console.log(`Card clicked: ${cardId}`);
    // TODO: Implement actual navigation or modal logic
  };

  const handleCardKeyDown = (e, cardId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardInteraction(cardId);
    }
  };

  // Initialize scroll animations
  const heroRef = useScrollAnimation();
  const programsRef = useScrollAnimation();
  const featuresRef = useScrollAnimation();
  const testimonialsRef = useScrollAnimation();
  const communityRef = useScrollAnimation();
  const manageRef = useScrollAnimation();

  return (
    <div className="bg-background text-foreground relative overflow-x-hidden">
      <Script src="https://cdn.lordicon.com/lordicon.js" strategy="lazyOnload" />

      {/* Hero Section */}
<section 
  ref={heroRef}
  className="min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] bg-[#002147] text-white py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden"
  aria-label="Hero section with main call to action"
>
  {/* Background with Single Gradient */}
  <div 
    className="absolute inset-0 w-full h-full"
    style={{
      backgroundImage: `linear-gradient(135deg, rgba(0,33,71,0.95) 0%, rgba(0,33,71,0.85) 50%, rgba(255,94,26,0.35) 100%), url('/landingpage4.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      zIndex: Z_INDEX.background
    }}
    aria-hidden="true"
  />
  
  {/*  animated accent */}
  <div className="absolute top-1/4 right-0 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-l from-orange-500/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ zIndex: Z_INDEX.background }} />
  
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative" style={{ zIndex: Z_INDEX.content }}>
    <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
      <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4">
        Empowering Veterans to <span className="block sm:inline">Thrive After Service</span>{' '}
        <span className="text-orange-500 block mt-1">with Community Support</span>
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 max-w-xl leading-relaxed mx-auto lg:mx-0">
        Tailored coaching, smart tools, and a community that understands your journey.
      </p>
      <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center lg:items-start">
                <Link
                  href="/signup"
          className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-center overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 text-sm"
                >
          <span className="relative z-10 flex items-center justify-center gap-2">
          Get Started for Free
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Link>
                <Link
          href="/pages/vsoclaimsupport"
          className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold text-center hover:bg-white hover:text-[#002147] transition-all duration-300 text-sm"
                >
          VSO Claim Support 
                </Link>
              </div>
            </div>
  </div>
</section>

<section 
  ref={programsRef}
  id="how-we-help" 
  className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden scroll-mt-[120px]" 
  style={{ background: 'linear-gradient(160deg, #002147 0%, #FF7D33 15%, #FF5E1A 30%, #002147 50%)' }}
  aria-labelledby="programs-heading"
>
  {/* gradient */}
  <div className="absolute top-1/3 left-0 w-64 md:w-80 h-64 md:h-80 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" style={{ zIndex: Z_INDEX.background }} />
  
  {/* Content Container */}
  <div className="relative max-w-6xl mx-auto" style={{ zIndex: Z_INDEX.content }}>
    {/* Section Header */}
    <div className="mb-10 md:mb-12 text-center">
      <h2 id="programs-heading" className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-white">Our Programs</h2>
      <div className="w-12 h-1 bg-white mx-auto rounded-full" aria-hidden="true"/>
      <p className="mt-3 text-gray-200 text-xs sm:text-sm md:text-base max-w-xl mx-auto">
        Comprehensive support designed specifically for veterans at every stage of their journey
      </p>
    </div>

    {/* Cards Grid */}
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {PROGRAMS.map(({ title, desc, image, alt, highlights, link }) => (
        <div 
          key={title} 
          className="group relative bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col"
        >
          {/* Gradient border effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
            <Image
              src={image}
              alt={alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              loading="lazy"
              className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"/>
          </div>

          {/* Content Container */}
          <div className="relative p-4 sm:p-5 flex flex-col flex-grow">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#002147] group-hover:text-orange-600 transition-colors leading-snug mb-2">
              {title}
            </h3>
            <p className="text-gray-600 text-xs leading-relaxed mb-3 flex-grow">
              {desc}
            </p>

            {/*  pill badges */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {highlights.map((item) => (
                <span 
                  key={item} 
                  className="bg-gradient-to-r from-blue-50 to-orange-50 text-[#002147] px-2 py-0.5 text-xs font-semibold border border-blue-100"
                >
                  {item}
                </span>
              ))}
            </div>

            {/*  button with arrow */}
              <Link
                href={link}
              className="inline-flex items-center justify-center gap-2 w-full px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg hover:shadow-orange-500/50 transform hover:-translate-y-0.5 transition-all duration-300 text-xs mt-auto"
                aria-label={`Learn more about ${title}`}
              >
                Learn More
              <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              </Link>
          </div>
        </div>
      ))}
    </div>
          </div>
      </section>

      <section 
        ref={featuresRef}
        className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#002147] text-white relative overflow-hidden"
        aria-labelledby="features-heading"
      >
        {/* background with cleaner gradient */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0,33,71,0.92) 0%, rgba(0,33,71,0.88) 60%, rgba(255,94,26,0.25) 100%), url('/aIandfeatires.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: Z_INDEX.background
          }}
          aria-hidden="true"
        />
        {/* Subtle accent gradient */}
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-l from-orange-400/10 to-transparent rounded-full blur-3xl" style={{ zIndex: Z_INDEX.background }} />
        
        <div className="max-w-6xl mx-auto text-center relative" style={{ zIndex: Z_INDEX.content }}>
          {/* Section Header */}
          <div className="mb-10 md:mb-12">
            <h2 id="features-heading" className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase">
              Key Web App Features
            </h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mb-3" aria-hidden="true"/>
            <p className="text-xs sm:text-sm md:text-base text-gray-200 max-w-xl mx-auto leading-relaxed">
              Discover the powerful features that make our platform the best choice for veteran success
            </p>
          </div>

          {/* Glassmorphism Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {FEATURES.map((feature) => (
              <div 
                key={feature.id} 
                className="group relative bg-white/5 backdrop-blur-md p-5 sm:p-6 border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-500 hover:scale-105"
              >
                {/* Gradient glow on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                
                <div className="relative">
                  {/* Icon container */}
                  <div className="mb-4 flex justify-center">
                    <div className="p-2.5 sm:p-3 bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
                  <lord-icon
                    src={feature.icon}
                    trigger="hover"
                    colors="primary:#ee8220,secondary:#ffffff"
                        style={{ width: '48px', height: '48px' }}
                        class="sm:w-14 sm:h-14"
                  />
                </div>
                  </div>
                  
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-white group-hover:text-orange-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                  {feature.description}
                </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-10 md:mt-12 flex justify-center">
      <Link
        href="/signup"
              className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 overflow-hidden text-sm"
      >
              <span className="relative z-10 flex items-center justify-center gap-2">
        Start Free Trial Now
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        ref={testimonialsRef}
        className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 text-[#002147] relative overflow-hidden" 
        style={{ background: 'linear-gradient(160deg, #002147 0%, #FF7D33 15%, #FF5E1A 50%, #002147 60%)' }}
        aria-labelledby="testimonials-heading"
      >
        {/* Subtle decorative gradient */}
        <div className="absolute top-0 left-1/3 w-64 md:w-80 h-64 md:h-80 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" style={{ zIndex: Z_INDEX.background }} />
        
        <div className="max-w-5xl mx-auto relative" style={{ zIndex: Z_INDEX.content }}>
          {/* Section Header */}
          <div className="mb-10 md:mb-12 text-center">
            <h2 id="testimonials-heading" className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-white">
              Veteran Voices
            </h2>
            <div className="w-12 h-1 bg-white mx-auto rounded-full mb-3" aria-hidden="true"/>
            <p className="text-xs sm:text-sm md:text-base text-gray-200 max-w-xl mx-auto leading-relaxed">
              Real stories from veterans who found their path forward with WANAC
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div 
              key={testimonial.id}
                className="group relative bg-white p-5 sm:p-6 hover:shadow-2xl transition-all duration-500"
              >
                {/* Gradient accent bar */}
                <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div className="flex flex-col gap-3 sm:gap-4">
                  {/* Quote icon  */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-lg">
                    <FaQuoteLeft className="text-sm sm:text-base" />
                  </div>
                  
                  <blockquote className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  {/* Author info */}
                  <div className="flex items-center gap-2.5 sm:gap-3 pt-3 border-t border-gray-100">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden ring-2 ring-orange-500/20 flex-shrink-0">
                    <Image
                      src={testimonial.image}
                        alt={testimonial.name}
                      fill
                        sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                      <p className="font-bold text-[#002147] text-xs sm:text-sm">{testimonial.name}</p>
                      <p className="text-xs text-orange-600 font-medium">{testimonial.branch}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
        </div>
      </section>

      {/* Community CTA */}
      <section 
        ref={communityRef}
        id="community" 
        className="relative bg-[#002147] text-white text-center py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-[120px]"
        aria-labelledby="community-heading"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/community1.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#002147]/50 to-[#002147]"></div>
        
        {/* Simplified Animated Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-5 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-orange-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-5 sm:right-10 w-32 sm:w-40 h-32 sm:h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 id="community-heading" className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 uppercase">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200">
            Join Our Community
            </span>
          </h2>
          <p className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg text-gray-200 max-w-xl mx-auto leading-relaxed px-4">
            Discover upcoming events, connect with fellow veterans, and make an impact together.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col xs:flex-row justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
            <Link 
              href="/signup" 
              className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-orange-500 overflow-hidden shadow-xl hover:shadow-orange-500/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transform group-hover:scale-105 transition-transform duration-300"></div>
              <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base font-semibold">
                Sign Up
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            
            <Link 
              href="/donate" 
              className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-white overflow-hidden shadow-xl hover:shadow-white/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 transform group-hover:scale-105 transition-transform duration-300"></div>
              <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base font-semibold text-[#002147] group-hover:text-orange-500 transition-colors">
                Donate
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>

        </div>
      </section>

      {/* Manage Experience Section */}
<section 
  ref={manageRef}
  className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden bg-[#002147] text-white"
  aria-labelledby="manage-experience-heading"
>
  {/* Simplified background with cleaner gradient */}
  <div 
    className="absolute inset-0 w-full h-full"
    style={{
      backgroundImage: `linear-gradient(135deg, rgba(0,33,71,0.93) 0%, rgba(0,33,71,0.88) 60%, rgba(255,94,26,0.30) 100%), url('/pexels-rdne-7467965.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center 20%',
      backgroundRepeat: 'no-repeat',
      zIndex: Z_INDEX.background
    }}
    aria-hidden="true"
  />
  
  {/* Subtle accent gradient */}
  <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-orange-400/10 to-transparent rounded-full blur-3xl" style={{ zIndex: Z_INDEX.background }} />
  
  <div className="max-w-5xl mx-auto relative" style={{ zIndex: Z_INDEX.content }}>
    {/* Section Header */}
    <div className="mb-10 md:mb-12">
      <h2 id="manage-experience-heading" className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-white">
    Manage Your Experience
  </h2>
      <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mb-3" aria-hidden="true"/>
      <p className="text-xs sm:text-sm md:text-base text-gray-200 max-w-xl mx-auto leading-relaxed">
        Take control of your coaching journey with powerful management tools
      </p>
    </div>

    {/* M Management Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    {MANAGEMENT_CARDS.map((card) => (
      <div 
        key={card.id}
          className="group relative bg-white/5 backdrop-blur-md p-5 sm:p-6 transition-all duration-500 hover:bg-white/10 hover:scale-105 cursor-pointer border border-white/20 hover:border-orange-500/50"
        role="button"
        tabIndex={0}
        aria-label={card.ariaLabel}
        onClick={() => handleCardInteraction(card.id)}
        onKeyDown={(e) => handleCardKeyDown(e, card.id)}
      >
          {/* Gradient glow on hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
          
          <div className="relative flex flex-col items-center text-white">
            {/* Icon with container */}
            <div className="mb-4 sm:mb-5">
              <div className="p-2.5 sm:p-3 bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
            <lord-icon
              src={card.icon}
              trigger="hover"
              colors="primary:#ee8220,secondary:#ffffff"
                  style={{ width: '40px', height: '40px' }}
                  class="sm:w-14 sm:h-14"
            />
          </div>
            </div>
            
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 group-hover:text-orange-400 transition-colors duration-300">
              {card.title}
            </h3>
            <p className="text-gray-300 text-center leading-relaxed text-xs sm:text-sm group-hover:text-white transition-colors duration-300">
            {card.description}
          </p>
            
            {/* Animated "Learn More" indicator */}
            <div className="mt-4 sm:mt-5 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <span className="text-orange-400 flex items-center gap-2 text-xs font-medium">
              Learn More 
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    ))}
    </div>
  </div>
</section>

    </div>
  );
}
