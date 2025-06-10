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
        "Structured academic transition support",
        "Personalized mentoring through admissions and financial aid",
        "Veteran-specific resources and academic planning",
        "Community-focused academic networking and support"
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
      title: "Vetrepreneurship Academy (VETA)",
      description: "Build your entrepreneurial legacy with comprehensive business planning and mentorship.",
      icon: <MdBusiness size={32} />,
      features: [
        "Comprehensive entrepreneurship and business planning curriculum",
        "Financial modeling, market research, and competitive analysis",
        "Business model evaluation and customer discovery methods",
        "Extensive mentorship from successful entrepreneurs"
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
    <div>

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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
            Empowering Your Next Chapter
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-6 text-blue-100 font-medium drop-shadow">
            WANAC offers specialized programs to equip transitioning service members, veterans, and aspiring coaches with the skills and knowledge to thrive personally, professionally, and entrepreneurially.
          </p>
        </div>
      </header>

      {/* Sticky Navigation Bar */}
      <div clasnsName="relative w-full h-10 bg-[#002147] overflow-hidden flex items-center justify-center">
        <nav className="sticky top-0 z-30 bg-[#002147] bg-opacity-95 shadow-md">
        <div className="flex items-center justify-center px-4 py-2 space-x-4 md:space-x-10 overflow-x-auto">
          <a href="#our-support-pillars" className="text-white hover:text-orange-400 transition-colors text-sm font-semibold py-1 px-2 border-b-2 border-transparent hover:border-orange-400">
            Program Offerings
          </a>
          <a href="#your-coaching-journey" className="text-white hover:text-orange-400 transition-colors text-sm font-semibold py-1 px-2 border-b-2 border-transparent hover:border-orange-400">
            Program Pathways
          </a>
          <a href="#phase-1" className="text-white hover:text-orange-400 transition-colors text-sm font-semibold py-1 px-2 border-b-2 border-transparent hover:border-orange-400">
            Education & Career
          </a>
          <a href="#phase-2" className="text-white hover:text-orange-400 transition-colors text-sm font-semibold py-1 px-2 border-b-2 border-transparent hover:border-orange-400">
            Peak Performance
          </a>
          <a href="#phase-3" className="text-white hover:text-orange-400 transition-colors text-sm font-semibold py-1 px-2 border-b-2 border-transparent hover:border-orange-400">
            Certification
          </a>
        </div>
      </nav>
      </div>
      

      {/* Understanding Your Challenges Section */}
      <section className="bg-white relative py-16 overflow-hidden">
    
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002147] mb-4">
            Understanding Your Challenges
          </h2>
          <p className="text-lg text-[#002147] mb-8">
            We recognize the unique obstacles faced by our participants:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="flex items-start bg-white/90 rounded-xl shadow p-5 border border-gray-100 space-x-4 hover:shadow-lg transition">
              <span className="mt-1 w-4 h-4 bg-orange-400 rounded-full flex-shrink-0"></span>
              <span className="text-gray-800 font-medium">Navigating complex career transitions</span>
            </div>
            <div className="flex items-start bg-white/90 rounded-xl shadow p-5 border border-gray-100 space-x-4 hover:shadow-lg transition">
              <span className="mt-1 w-4 h-4 bg-orange-400 rounded-full flex-shrink-0"></span>
              <span className="text-gray-800 font-medium">Overcoming uncertainty about educational paths</span>
            </div>
            <div className="flex items-start bg-white/90 rounded-xl shadow p-5 border border-gray-100 space-x-4 hover:shadow-lg transition">
              <span className="mt-1 w-4 h-4 bg-orange-400 rounded-full flex-shrink-0"></span>
              <span className="text-gray-800 font-medium">Developing entrepreneurial ventures</span>
            </div>
            <div className="flex items-start bg-white/90 rounded-xl shadow p-5 border border-gray-100 space-x-4 hover:shadow-lg transition">
              <span className="mt-1 w-4 h-4 bg-orange-400 rounded-full flex-shrink-0"></span>
              <span className="text-gray-800 font-medium">Sustaining high performance personally and professionally</span>
            </div>
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
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Program Offerings
            </h2>
            <p className="text-lg text-white">
              Comprehensive programs tailored for veterans, transitioning service members, and aspiring coaches
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {supportAreas.map((area, index) => (
              <div
                key={area.id}
                className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-500 p-3 border border-gray-100 overflow-hidden min-h-[220px]"
                style={{ minWidth: '0' }}
              >
                {/* Decorative Background Element */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-orange-400/10 rounded-full -mr-6 -mt-6 transition-transform group-hover:scale-125 duration-500"></div>
                  <div className="relative space-y-2">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="p-2 rounded-md bg-gradient-to-br from-[#002147] to-orange-400 text-white group-hover:scale-105 transition-transform duration-300 shadow"
                        role="img" 
                        aria-label={area.title}
                      >
                        {area.icon}
                      </div>
                      <h3 className="text-base font-bold text-brand-navy group-hover:text-orange-400 transition-colors duration-300">
                        {area.title}
                      </h3>
                    </div>
                    <p className="text-xs text-brand-blue leading-snug">{area.description}</p>
                    <ul className="space-y-1">
                      {area.features.map((feature, index) => (
                        <li 
                          key={index} 
                          className="flex items-center space-x-1 p-1 rounded hover:bg-orange-50 transition-colors duration-200 group/item"
                        >
                          <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center rounded-full bg-orange-400/10 group-hover/item:bg-orange-400/20 transition-colors duration-200">
                            <svg 
                              className="w-3 h-3 text-orange-400" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </span>
                          <span className="text-xs text-gray-700 group-hover/item:text-orange-600 transition-colors duration-200">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <a 
                      href={`/pages/${area.title === "Promise Land Education Pathway (PLEP)" ? "plep" :
                             area.title === "Promise Land Career Accelerator (PLCA)" ? "plca" :
                             area.title === "Peak Performance Coaching (PPC)" ? "ppc" : "veta"}`}
                      className="inline-block mt-2 px-3 py-1 bg-[#002147] text-white rounded hover:bg-orange-400 transition-colors duration-300 shadow text-xs"
                    >
                      Learn More
                      <span className="ml-1 inline-block transform group-hover:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </a>
                  </div>
                  {/* Bottom Decorative Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#002147] to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

        
        {/* VSO Claim Support Section */}
        <section className="bg-gradient-to-b from-white via-gray-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">VSO Claim Support</h2>
              <p className="text-lg text-brand-blue mb-4">Streamlined Support for VA Claims</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-brand-navy mb-2">Expert assistance from accredited Veteran Service Officers (VSOs)</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
                  <li>Comprehensive help for disability compensation, appeals, and benefits</li>
                  <li>Seamless integration with WANAC’s education and career programs</li>
                  <li>Tailored support exclusively for transitioning service members and recently separated veterans</li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <img src="/veteran1.jpg" alt="VSO Claim Support" className="rounded-xl shadow-lg w-full max-w-xs object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#002147] transform -skew-y-3 origin-top-right"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                  Why Choose WANAC?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="text-gray-300">
                    <h4 className="font-semibold text-xl mb-2">Tailored Programs</h4>
                    <p>Specifically designed for transitioning service members, veterans, and professionals.</p>
                  </div>
                  <div className="text-gray-300">
                    <h4 className="font-semibold text-xl mb-2">Proven Results</h4>
                    <p>Structured, actionable frameworks delivering measurable outcomes.</p>
                  </div>
                  <div className="text-gray-300">
                    <h4 className="font-semibold text-xl mb-2">Dedicated Support</h4>
                    <p>Ongoing mentorship, community connections, and robust resources.</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                  <button
                    className="w-full sm:w-auto bg-white text-[#002147] px-8 py-4 rounded-lg font-semibold hover:bg-[#ff5e1a] hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
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
