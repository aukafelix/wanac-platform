import { MdSchool, MdWork, MdStar, MdBusiness } from 'react-icons/md';
import { FaUserGraduate } from 'react-icons/fa';
import { BsJournalText } from 'react-icons/bs';

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
    <div style={{ fontFamily: "var(--font-body)" }}>
      {/* Hero Section */}
      <header className="relative bg-[#002147] text-white min-h-[420px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url("/landingpage1.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#002147]/90 via-[#002147]/80 to-[#ff5e1a]/40"></div>
        <div className="relative z-10 py-20 px-4 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg" style={{ fontFamily: "var(--font-heading)" }}>
            Empowering Your Next Chapter
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-6 text-blue-100 font-medium drop-shadow">
          At WANAC, we proudly offer specialized programs designed to equip transitioning service members, veterans, and
          aspiring coaches with the skills and knowledge required to succeed personally, professionally, and entrepreneurially.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-4">
           
            <a
              href="/pages/programintakeform"
              className="w-full sm:w-auto bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#002147] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              aria-label="Program Intake Form"
            >
              TRANSITION PROGRAM INTAKE FORM
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-4">
           
            <a
              href="/pages/programintakeform"
              className="w-full sm:w-auto bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#002147] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              aria-label="Program Intake Form"
            >
              VA BENEFITS CLAIM INTAKE FORM
            </a>
          </div>
        </div>
      </header>

      {/* section Navigation Bar */}
      <section>
        <div className="relative w-full h-16 bg-[#002147] overflow-hidden flex items-center justify-center">
          <nav className="relative z-10 flex space-x-8 px-4">
            <a href="#about" className="group flex flex-col items-center justify-center text-white text-base font-medium transition-colors flex-none no-underline hover:no-underline">
              <div className="flex flex-col items-center w-full h-full px-6 py-3 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                <span className="whitespace-nowrap text-center w-full">UNDERSTANDING CHALLENGES</span>
                <svg className="w-4 h-4 mt-1 transition-colors" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </a>
            <a href="#program-offerings" className="group flex flex-col items-center justify-center text-white text-base font-medium transition-colors flex-none no-underline hover:no-underline">
              <div className="flex flex-col items-center w-full h-full px-6 py-3 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                <span className="whitespace-nowrap text-center w-full">OUR PROGRAMS</span>
                <svg className="w-4 h-4 mt-1 transition-colors" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </a>
            <a href="#why-wanac" className="group flex flex-col items-center justify-center text-white text-base font-medium transition-colors flex-none no-underline hover:no-underline">
              <div className="flex flex-col items-center w-full h-full px-6 py-3 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                <span className="whitespace-nowrap text-center w-full">WHY WANAC?</span>
                <svg className="w-4 h-4 mt-1 transition-colors" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
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
      

      {/* Understanding Your Challenges Section */}
      <section className="relative py-16 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          {/* Infographic Wheel with Icons */}
          <div className="relative w-[320px] h-[320px] mx-auto flex items-center justify-center">
            <div className="absolute left-1/2 top-1/2 w-[320px] h-[320px] -translate-x-1/2 -translate-y-1/2">
              {/* Top */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center">
                <img src="/bussinessacademyphase1.jpg" alt="Career Transitions" className="w-16 h-16 object-cover rounded-full shadow mb-2" />
                <span className="text-xs text-center text-gray-700 font-medium w-24">Career Transitions</span>
              </div>
              {/* Right */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
                <img src="/aIandfeatires.jpg" alt="Educational Paths" className="w-16 h-16 object-cover rounded-full shadow mb-2" />
                <span className="text-xs text-center text-gray-700 font-medium w-24">Educational Paths</span>
              </div>
              {/* Bottom */}
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 flex flex-col items-center">
                <img src="/veterancommunity.png" alt="Entrepreneurial Ventures" className="w-16 h-16 object-cover rounded-full shadow mb-2" />
                <span className="text-xs text-center text-gray-700 font-medium w-24">Entrepreneurial Ventures</span>
              </div>
              {/* Left */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
                <img src="/high perfomance coaching.jpg" alt="High Performance" className="w-16 h-16 object-cover rounded-full shadow mb-2" />
                <span className="text-xs text-center text-gray-700 font-medium w-24">High Performance</span>
              </div>
              {/* Center circle for visual effect */}
              <div className="absolute left-1/2 top-1/2 w-24 h-24 bg-gradient-to-br from-orange-200 via-white to-blue-200 rounded-full -translate-x-1/2 -translate-y-1/2 border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-center text-sm font-bold text-[#002147]">Your Challenges</span>
              </div>
            </div>
          </div>
          {/* Section Text */}
          <div className="max-w-md mx-auto text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002147] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Understanding Your Challenges
            </h2>
            <p className="text-lg text-[#002147] mb-6">
              We recognize the unique obstacles faced by our participants. Explore the key areas where WANAC supports your journey:
            </p>
            <ul className="space-y-3 text-left text-gray-700 text-sm">
              <li><span className="font-semibold text-[#ff5e1a]">Career Transitions:</span> Navigating complex career transitions</li>
              <li><span className="font-semibold text-[#ff5e1a]">Educational Paths:</span> Overcoming uncertainty about educational paths</li>
              <li><span className="font-semibold text-[#ff5e1a]">Entrepreneurial Ventures:</span> Developing entrepreneurial ventures</li>
              <li><span className="font-semibold text-[#ff5e1a]">High Performance:</span> Sustaining high performance personally and professionally</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="Program offerings" className="relative py-16">
        {/* Background image with gradient overlay */}
        <div 
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `linear-gradient(150deg, rgba(0,33,71,0.85) 10%, rgba(255,94,26,0.60) 300%, rgba(255,255,255,0.90) 100%), url('/landingpage4.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Our Programs
            </h2>
            <p className="text-lg text-white">
              Comprehensive programs tailored for veterans, transitioning service members, and aspiring coaches
            </p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {/* VSO Claim Support */}
            <div className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-500 p-4 border border-gray-100 overflow-hidden min-h-[220px] flex flex-col justify-between">
              <div className="flex items-center mb-2">
                <MdBusiness size={32} className="text-orange-400 mr-2" />
                <h3 className="text-lg font-bold text-brand-navy" style={{ fontFamily: "var(--font-heading)" }}>VSO Claim Support</h3>
              </div>
              <p className="text-xs text-brand-blue mb-2">Streamlined Support for VA Claims</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-2 text-xs">
                <li>Expert assistance from accredited Veteran Service Officers (VSOs)</li>
                <li>Comprehensive help for disability compensation, appeals, and benefits</li>
                <li>Seamless integration with WANAC's education and career programs</li>
                <li>Tailored support exclusively for transitioning service members and recently separated veterans</li>
              </ul>
              <a href="/pages/vsoclaimssupportprogram" className="inline-block mt-2 px-3 py-1 bg-orange-400 text-white rounded hover:bg-[#002147] transition-colors duration-300 shadow text-xs font-semibold">Explore VSO Claim Support &rarr;</a>
            </div>
            {/* PLEP */}
            <div className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-500 p-4 border border-gray-100 overflow-hidden min-h-[220px] flex flex-col justify-between">
              <div className="flex items-center mb-2">
                <MdSchool size={32} className="text-orange-400 mr-2" />
                <h3 className="text-lg font-bold text-brand-navy" style={{ fontFamily: "var(--font-heading)" }}>Promise Land Education Pathway (PLEP)</h3>
              </div>
              <p className="text-xs text-brand-blue mb-2">Navigate Your Educational Journey</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-2 text-xs">
                <li>Structured academic transition support</li>
                <li>Personalized mentoring through admissions and financial aid</li>
                <li>Veteran-specific resources and academic planning</li>
                <li>Community-focused academic networking and support</li>
              </ul>
              <a href="/pages/plep" className="inline-block mt-2 px-3 py-1 bg-orange-400 text-white rounded hover:bg-[#002147] transition-colors duration-300 shadow text-xs font-semibold">Explore PLEP &rarr;</a>
            </div>
            {/* PLCA */}
            <div className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-500 p-4 border border-gray-100 overflow-hidden min-h-[220px] flex flex-col justify-between">
              <div className="flex items-center mb-2">
                <MdWork size={32} className="text-orange-400 mr-2" />
                <h3 className="text-lg font-bold text-brand-navy" style={{ fontFamily: "var(--font-heading)" }}>Promise Land Career Accelerator (PLCA)</h3>
              </div>
              <p className="text-xs text-brand-blue mb-2">Accelerate Your Professional Success</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-2 text-xs">
                <li>Comprehensive career management skills</li>
                <li>Internship and targeted job search strategies</li>
                <li>Personal branding, networking, and interviewing mastery</li>
                <li>Strategic career decision-making and goal achievement</li>
              </ul>
              <a href="/pages/plca" className="inline-block mt-2 px-3 py-1 bg-orange-400 text-white rounded hover:bg-[#002147] transition-colors duration-300 shadow text-xs font-semibold">Discover PLCA &rarr;</a>
            </div>
            {/* PPC */}
            <div className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-500 p-4 border border-gray-100 overflow-hidden min-h-[220px] flex flex-col justify-between">
              <div className="flex items-center mb-2">
                <MdStar size={32} className="text-orange-400 mr-2" />
                <h3 className="text-lg font-bold text-brand-navy" style={{ fontFamily: "var(--font-heading)" }}>Peak Performance Coaching (PPC)</h3>
              </div>
              <p className="text-xs text-brand-blue mb-2">Master Personal & Professional Excellence</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-2 text-xs">
                <li>12-session structured coaching model</li>
                <li>Enhances clarity, energy, courage, productivity, and influence</li>
                <li>Personalized sessions and peer group workshops</li>
                <li>Proven methodologies for sustained high-performance outcomes</li>
              </ul>
              <a href="/pages/ppc" className="inline-block mt-2 px-3 py-1 bg-orange-400 text-white rounded hover:bg-[#002147] transition-colors duration-300 shadow text-xs font-semibold">Learn More &rarr;</a>
            </div>
            {/* CPPC */}
            <div className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-500 p-4 border border-gray-100 overflow-hidden min-h-[220px] flex flex-col justify-between">
              <div className="flex items-center mb-2">
                <FaUserGraduate size={32} className="text-orange-400 mr-2" />
                <h3 className="text-lg font-bold text-brand-navy" style={{ fontFamily: "var(--font-heading)" }}>Certified Peak Performance Coach (CPPC)</h3>
              </div>
              <p className="text-xs text-brand-blue mb-2">Become a Recognized Coaching Leader</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-2 text-xs">
                <li>In-depth professional certification in peak performance coaching</li>
                <li>Master core psychological, physiological, and productivity strategies</li>
                <li>Expand your professional opportunities and coaching practice</li>
                <li>Gain credibility as a certified performance expert</li>
              </ul>
              <a href="/pages/cppc" className="inline-block mt-2 px-3 py-1 bg-orange-400 text-white rounded hover:bg-[#002147] transition-colors duration-300 shadow text-xs font-semibold">Get Certified &rarr;</a>
            </div>
            {/* VETA */}
            <div className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-500 p-4 border border-gray-100 overflow-hidden min-h-[220px] flex flex-col justify-between">
              <div className="flex items-center mb-2">
                <MdBusiness size={32} className="text-orange-400 mr-2" />
                <h3 className="text-lg font-bold text-brand-navy" style={{ fontFamily: "var(--font-heading)" }}>Vetrepreneurship Academy (VETA)</h3>
              </div>
              <p className="text-xs text-brand-blue mb-2">Build Your Entrepreneurial Legacy</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-2 text-xs">
                <li>Comprehensive entrepreneurship and business planning curriculum</li>
                <li>Financial modeling, market research, and competitive analysis</li>
                <li>Business model evaluation and customer discovery methods</li>
                <li>Extensive mentorship from successful entrepreneurs</li>
              </ul>
              <a href="/pages/veta" className="inline-block mt-2 px-3 py-1 bg-orange-400 text-white rounded hover:bg-[#002147] transition-colors duration-300 shadow text-xs font-semibold">Join the Academy &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </section>

        

        {/* CTA Section */}
        <section className="relative overflow-hidden" style={{ background: 'linear-gradient(120deg, #FF7D33 0%, #FF5E1A 30%, #002147 100%)' }}>
          {/* Gradient + background image overlay */}
          <div 
            className="absolute inset-0 w-full h-full z-0"
            style={{
              backgroundImage: `linear-gradient(300deg, rgba(255,125,51,0.85) 0%, rgba(255,94,26,0.70) 20%, rgba(0,33,71,0.90) 100%), url('/jamesthompson.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 20%',
              backgroundRepeat: 'no-repeat',
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
            <div className="text-center">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-8" style={{ fontFamily: "var(--font-heading)" }}>
                  Why Choose WANAC?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-white rounded-xl shadow p-6 border border-gray-100 text-left flex flex-col justify-between">
                    <h4 className="font-semibold text-xl mb-2 text-[#002147]" style={{ fontFamily: "var(--font-heading)" }}>Tailored Programs</h4>
                    <p className="text-gray-700">Specifically designed for transitioning service members, veterans, and professionals.</p>
                  </div>
                  <div className="bg-white rounded-xl shadow p-6 border border-gray-100 text-left flex flex-col justify-between">
                    <h4 className="font-semibold text-xl mb-2 text-[#002147]" style={{ fontFamily: "var(--font-heading)" }}>Proven Results</h4>
                    <p className="text-gray-700">Structured, actionable frameworks delivering measurable outcomes.</p>
                  </div>
                  <div className="bg-white rounded-xl shadow p-6 border border-gray-100 text-left flex flex-col justify-between">
                    <h4 className="font-semibold text-xl mb-2 text-[#002147]" style={{ fontFamily: "var(--font-heading)" }}>Dedicated Support</h4>
                    <p className="text-gray-700">Ongoing mentorship, community connections, and robust resources.</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                  <button
                    className="w-full sm:w-auto bg-[#ff5e1a] text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#ff5e1a] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    aria-label="Contact WANAC"
                  >
                    Contact WANAC
                  </button>
                  <button
                    className="w-full sm:w-auto bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#002147] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    aria-label="Explore Programs"
                  >
                    Explore Programs
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-72 h-72 bg-[#ff5e1a] rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-72 h-72 bg-white rounded-full opacity-10 blur-3xl"></div>
        </section>
        
      </div>
  );
}
