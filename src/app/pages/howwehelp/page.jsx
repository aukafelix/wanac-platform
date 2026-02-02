import Image from 'next/image';
import { MdSchool, MdWork, MdStar, MdBusiness } from 'react-icons/md';
import { FaUserGraduate } from 'react-icons/fa';

export default function HowWeHelp() {
  const supportAreas = [
    {
      id: 1,
      title: "Promise Land Education Pathway (PLEP)",
      description: "Navigate your educational journey with structured academic transition support and personalized mentoring.",
      icon: <MdSchool size={32} />,
      features: [
        "\u2605 Initial Personalized Assessment",
        "Clarify your educational aspirations and objectives",
        "Develop an individually tailored academic action plan",
        "\u2605 Guided Coaching",
        "Expert assistance navigating college applications and admissions",
        "Tailored guidance on securing veteran-specific financial aid and resources",
        "\u2605 Academic Preparation and Resources",
        "Customized academic readiness programs to build essential study skills",
        "Veteran-friendly tutoring and academic success coaching",
        "\u2605 Community and Network Development",
        "Connect with peers on similar academic journeys",
        "Leverage veteran-specific academic institutions and networks for ongoing support"
      ]
    },
    {
      id: 2,
      title: "Promise Land Career Accelerator (PLCA)",
      description: "Accelerate your professional success with comprehensive career management skills and strategies.",
      icon: <MdWork size={32} />,
      features: [
        "Comprehensive career management skills",
        "Internship and targeted job search strategies",
        "Personal branding, networking, and interviewing mastery",
        "Strategic career decision-making and goal achievement"
      ]
    },
    {
      id: 3,
      title: "Peak Performance Coaching (PPC)",
      description: "Master personal and professional excellence through our structured 12-session coaching model.",
      icon: <MdStar size={32} />,
      features: [
        "12-session structured coaching model",
        "Enhances clarity, energy, courage, productivity, and influence",
        "Personalized sessions and peer group workshops",
        "Proven methodologies for sustained high-performance outcomes"
      ]
    },
    
    {
      id: 4,
      title: "Certified Peak Performance Coach (CPPC)",
      description: "Become a Recognized Coaching Leader",
      icon: <MdBusiness size={32} />,
      features: [
        "In-depth professional certification in peak performance coaching",
        "Master core psychological, physiological, and productivity strategies",
        "Expand your professional opportunities and coaching practice",
        "Gain credibility as a certified performance expert"
      ]
    }
  ];

  return (
    <div className="bg-background text-foreground relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-[70vh] md:min-h-[75vh] bg-[#002147] text-white py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0,33,71,0.95) 0%, rgba(0,33,71,0.85) 50%, rgba(255,94,26,0.35) 100%), url('/landingpage1.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        <div className="absolute top-1/4 right-0 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-l from-orange-500/15 to-transparent rounded-full blur-3xl animate-pulse" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 uppercase">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200">
                Empowering Your Next Chapter
              </span>
            </h1>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mb-3" />
            <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 max-w-3xl mx-auto leading-relaxed">
              At WANAC, we proudly offer specialized programs designed to equip transitioning service members, veterans, and
              aspiring coaches with the skills and knowledge required to succeed personally, professionally, and entrepreneurially.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col xs:flex-row justify-center gap-3 sm:gap-4">
              <a 
                href="/pages/programintakeform" 
                className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-orange-500 overflow-hidden shadow-xl hover:shadow-orange-500/30 transition-all duration-300"
                aria-label="Transition Program Intake Form"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transform group-hover:scale-105 transition-transform duration-300"></div>
                <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base font-semibold">
                  TRANSITION PROGRAM INTAKE
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
              
              <a 
                href="/pages/vsoclaimsupport" 
                className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-white overflow-hidden shadow-xl hover:shadow-white/20 transition-all duration-300"
                aria-label="VA Benefits Claim Intake Form"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 transform group-hover:scale-105 transition-transform duration-300"></div>
                <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base font-semibold text-[#002147] group-hover:text-orange-500 transition-colors">
                  VA BENEFITS CLAIM INTAKE
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="bg-[#002147] py-4">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {[
              { href: "#challenges", label: "UNDERSTANDING CHALLENGES" },
              { href: "#programs", label: "OUR PROGRAMS" },
              { href: "#why-wanac", label: "WHY WANAC?" }
            ].map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className="px-4 py-2 text-white hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-300 text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>
      

      {/* Understanding Your Challenges Section */}
      <section id="challenges" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-[#002147]">
              Understanding Your Challenges
            </h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mb-3" />
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              We recognize the unique obstacles faced by our participants
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Infographic Wheel */}
            <div className="relative w-[320px] h-[320px] mx-auto flex items-center justify-center">
              <div className="absolute left-1/2 top-1/2 w-[320px] h-[320px] -translate-x-1/2 -translate-y-1/2">
                {/* Top */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center">
                  <div className="relative w-16 h-16 overflow-hidden rounded-full shadow-lg mb-2">
                    <Image
                      src="/bussinessacademyphase1.jpg"
                      alt="Career Transitions"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs text-center text-gray-700 font-medium w-24">Career Transitions</span>
                </div>
                {/* Right */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative w-16 h-16 overflow-hidden rounded-full shadow-lg mb-2">
                    <Image
                      src="/aIandfeatires.jpg"
                      alt="Educational Paths"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs text-center text-gray-700 font-medium w-24">Educational Paths</span>
                </div>
                {/* Left */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative w-16 h-16 overflow-hidden rounded-full shadow-lg mb-2">
                    <Image
                      src="/high perfomance coaching.jpg"
                      alt="Entrepreneurial Ventures"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs text-center text-gray-700 font-medium w-24">Entrepreneurial Ventures</span>
                </div>
                {/* Center circle */}
                <div className="absolute left-1/2 top-1/2 w-24 h-24 bg-gradient-to-br from-orange-200 via-white to-blue-200 rounded-full -translate-x-1/2 -translate-y-1/2 border-4 border-white shadow-lg flex items-center justify-center">
                  <span className="text-center text-sm font-bold text-[#002147]">Your Challenges</span>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div>
              <p className="text-sm sm:text-base text-gray-700 mb-6 leading-relaxed">
                We recognize the unique obstacles faced by our participants. Explore the key areas where WANAC supports your journey:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-bold text-[#002147]">Career Transitions:</span>
                    <span className="text-gray-700"> Navigating complex career transitions with confidence</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-bold text-[#002147]">Educational Paths:</span>
                    <span className="text-gray-700"> Overcoming uncertainty about educational paths</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-bold text-[#002147]">Entrepreneurial Ventures:</span>
                    <span className="text-gray-700"> Developing successful entrepreneurial ventures</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden" 
               style={{ background: 'linear-gradient(160deg, #002147 0%, #FF7D33 15%, #FF5E1A 30%, #002147 50%)' }}>
        
        <div className="absolute top-1/3 left-0 w-64 md:w-80 h-64 md:h-80 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative max-w-6xl mx-auto z-10">
          <div className="mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-white">
              Our Programs
            </h2>
            <div className="w-12 h-1 bg-white mx-auto rounded-full mb-3" />
            <p className="text-xs sm:text-sm md:text-base text-gray-200 max-w-xl mx-auto leading-relaxed">
              Comprehensive programs tailored for veterans, transitioning service members, and aspiring coaches
            </p>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {/* VSO Claim Support */}
            <div className="group relative bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-4 sm:p-5 flex flex-col flex-grow">
                <div className="flex items-center mb-3">
                  <MdBusiness size={28} className="text-orange-600 mr-2" />
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#002147] group-hover:text-orange-600 transition-colors leading-snug">
                    VSO Claim Support
                  </h3>
                </div>
                <p className="text-orange-600 font-medium text-xs mb-3">Streamlined Support for VA Claims</p>
                
                <ul className="text-gray-600 text-xs leading-relaxed mb-3 space-y-1.5 flex-grow text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Expert assistance from accredited VSOs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Comprehensive help for disability compensation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Seamless integration with WANAC programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Tailored support for transitioning service members</span>
                  </li>
                </ul>

                <a
                  href="/pages/vsoclaimssupportprogram"
                  className="inline-flex items-center justify-center gap-2 w-full px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg hover:shadow-orange-500/50 transform hover:-translate-y-0.5 transition-all duration-300 text-xs mt-auto"
                >
                  Explore Program
                  <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            {/* PLEP */}
            <div className="group relative bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-4 sm:p-5 flex flex-col flex-grow">
                <div className="flex items-center mb-3">
                  <MdSchool size={28} className="text-orange-600 mr-2" />
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#002147] group-hover:text-orange-600 transition-colors leading-snug">
                    Promise Land Education Pathway (PLEP)
                  </h3>
                </div>
                <p className="text-orange-600 font-medium text-xs mb-3">Navigate Your Educational Journey</p>
                
                <ul className="text-gray-600 text-xs leading-relaxed mb-3 space-y-1.5 flex-grow text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Structured academic transition support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Personalized mentoring through admissions and financial aid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Veteran-specific resources and academic planning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Community-focused academic networking and support</span>
                  </li>
                </ul>

                <a
                  href="/pages/wanacplep"
                  className="inline-flex items-center justify-center gap-2 w-full px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg hover:shadow-orange-500/50 transform hover:-translate-y-0.5 transition-all duration-300 text-xs mt-auto"
                >
                  Explore PLEP
                  <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* PLCA */}
            <div className="group relative bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-4 sm:p-5 flex flex-col flex-grow">
                <div className="flex items-center mb-3">
                  <MdWork size={28} className="text-orange-600 mr-2" />
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#002147] group-hover:text-orange-600 transition-colors leading-snug">
                    Promise Land Career Accelerator (PLCA)
                  </h3>
                </div>
                <p className="text-orange-600 font-medium text-xs mb-3">Accelerate Your Professional Success</p>
                
                <ul className="text-gray-600 text-xs leading-relaxed mb-3 space-y-1.5 flex-grow text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Comprehensive career management skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Internship and targeted job search strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Personal branding, networking, and interviewing mastery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Strategic career decision-making and goal achievement</span>
                  </li>
                </ul>

                <a
                  href="/pages/wanacplca"
                  className="inline-flex items-center justify-center gap-2 w-full px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg hover:shadow-orange-500/50 transform hover:-translate-y-0.5 transition-all duration-300 text-xs mt-auto"
                >
                  Discover PLCA
                  <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* PPC */}
            <div className="group relative bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-4 sm:p-5 flex flex-col flex-grow">
                <div className="flex items-center mb-3">
                  <MdStar size={28} className="text-orange-600 mr-2" />
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#002147] group-hover:text-orange-600 transition-colors leading-snug">
                    Peak Performance Coaching (PPC)
                  </h3>
                </div>
                <p className="text-orange-600 font-medium text-xs mb-3">Master Personal & Professional Excellence</p>
                
                <ul className="text-gray-600 text-xs leading-relaxed mb-3 space-y-1.5 flex-grow text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>12-session structured coaching model</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Enhances clarity, energy, courage, productivity, and influence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Personalized sessions and peer group workshops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Proven methodologies for sustained high-performance outcomes</span>
                  </li>
                </ul>

                <a
                  href="/pages/wanappc"
                  className="inline-flex items-center justify-center gap-2 w-full px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg hover:shadow-orange-500/50 transform hover:-translate-y-0.5 transition-all duration-300 text-xs mt-auto"
                >
                  Learn More
                  <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* CPPC */}
            <div className="group relative bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-4 sm:p-5 flex flex-col flex-grow">
                <div className="flex items-center mb-3">
                  <FaUserGraduate size={28} className="text-orange-600 mr-2" />
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#002147] group-hover:text-orange-600 transition-colors leading-snug">
                    Certified Peak Performance Coach (CPPC)
                  </h3>
                </div>
                <p className="text-orange-600 font-medium text-xs mb-3">Become a Recognized Coaching Leader</p>
                
                <ul className="text-gray-600 text-xs leading-relaxed mb-3 space-y-1.5 flex-grow text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>In-depth professional certification in peak performance coaching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Master core psychological, physiological, and productivity strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Expand your professional opportunities and coaching practice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Gain credibility as a certified performance expert</span>
                  </li>
                </ul>

                <a
                  href="/pages/cppc"
                  className="inline-flex items-center justify-center gap-2 w-full px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg hover:shadow-orange-500/50 transform hover:-translate-y-0.5 transition-all duration-300 text-xs mt-auto"
                >
                  Get Certified
                  <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* VETA */}
            <div className="group relative bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-4 sm:p-5 flex flex-col flex-grow">
                <div className="flex items-center mb-3">
                  <MdBusiness size={28} className="text-orange-600 mr-2" />
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#002147] group-hover:text-orange-600 transition-colors leading-snug">
                    Vetrepreneurship Academy (VETA)
                  </h3>
                </div>
                <p className="text-orange-600 font-medium text-xs mb-3">Build Your Entrepreneurial Legacy</p>
                
                <ul className="text-gray-600 text-xs leading-relaxed mb-3 space-y-1.5 flex-grow text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Comprehensive entrepreneurship and business planning curriculum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Financial modeling, market research, and competitive analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Business model evaluation and customer discovery methods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Extensive mentorship from successful entrepreneurs</span>
                  </li>
                </ul>

                <a
                  href="/pages/vetaacademy"
                  className="inline-flex items-center justify-center gap-2 w-full px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg hover:shadow-orange-500/50 transform hover:-translate-y-0.5 transition-all duration-300 text-xs mt-auto"
                >
                  Join the Academy
                  <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

        

        {/* Why Choose WANAC Section */}
        <section id="why-wanac" className="relative bg-[#002147] text-white text-center py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/jamesthompson.jpg')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#002147]/50 to-[#002147]"></div>
          
          <div className="absolute inset-0">
            <div className="absolute top-10 left-5 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-orange-500/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 right-5 sm:right-10 w-32 sm:w-40 h-32 sm:h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 uppercase">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200">
                Why Choose WANAC?
              </span>
            </h2>
            <p className="mb-8 sm:mb-12 text-sm sm:text-base md:text-lg text-gray-200 max-w-xl mx-auto leading-relaxed">
              Discover what makes WANAC the trusted partner for veteran success
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div className="group relative bg-white/5 backdrop-blur-md p-5 sm:p-6 border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-500 hover:scale-105">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                <div className="relative">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors">
                    Tailored Programs
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    Specifically designed for transitioning service members, veterans, and professionals.
                  </p>
                </div>
              </div>
              
              <div className="group relative bg-white/5 backdrop-blur-md p-5 sm:p-6 border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-500 hover:scale-105">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                <div className="relative">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors">
                    Proven Results
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    Structured, actionable frameworks delivering measurable outcomes.
                  </p>
                </div>
              </div>
              
              <div className="group relative bg-white/5 backdrop-blur-md p-5 sm:p-6 border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-500 hover:scale-105">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                <div className="relative">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors">
                    Dedicated Support
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    Ongoing mentorship, community connections, and robust resources.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col xs:flex-row justify-center gap-3 sm:gap-4">
              <a 
                href="/contact" 
                className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-orange-500 overflow-hidden shadow-xl hover:shadow-orange-500/30 transition-all duration-300"
                aria-label="Contact WANAC"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transform group-hover:scale-105 transition-transform duration-300"></div>
                <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base font-semibold">
                  Contact WANAC
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
              
              <a 
                href="#programs" 
                className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-white overflow-hidden shadow-xl hover:shadow-white/20 transition-all duration-300"
                aria-label="Explore Programs"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 transform group-hover:scale-105 transition-transform duration-300"></div>
                <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base font-semibold text-[#002147] group-hover:text-orange-500 transition-colors">
                  Explore Programs
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>
        
      </div>
  );
}
