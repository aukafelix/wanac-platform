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
        "Personalized mentoring for admissions",
        "Veteran-specific resources",
        "Academic networking support"
      ]
    },
    {
      id: 2,
      title: "Promise Land Career Accelerator (PLCA)",
      description: "Accelerate your professional success with comprehensive career management skills and strategies.",
      icon: <MdWork size={32} />,
      features: [
        "Career management skills",
        "Internship search strategies",
        "Personal branding",
        "Strategic career planning"
      ]
    },
    {
      id: 3,
      title: "Peak Performance Coaching (PPC)",
      description: "Master personal and professional excellence through our structured 12-session coaching model.",
      icon: <MdStar size={32} />,
      features: [
        "12-session structured model",
        "Personalized coaching",
        "Peer group workshops",
        "High-performance outcomes"
      ]
    },
    {
      id: 4,
      title: "Vetrepreneurship Academy (VETA)",
      description: "Build your entrepreneurial legacy with comprehensive business planning and mentorship.",
      icon: <MdBusiness size={32} />,
      features: [
        "Business planning curriculum",
        "Financial modeling",
        "Market research",
        "Entrepreneur mentorship"
      ]
    }
  ];

  const coachingPhases = [
    {
      id: 1,
      title: "Promise Land Education & Career Programs",
      description: "Begin your journey with our specialized education and career transition programs.",
      imagePath: "/promiselandtransition.jpg",
      features: [
        "Structured academic transition support",
        "Career management skills",
        "Personalized mentoring",
        "Strategic planning"
      ]
    },
    {
      id: 2,
      title: "Peak Performance Coaching",
      description: "Master personal and professional excellence through our comprehensive coaching program.",
      imagePath: "/highperfomacecoaching.jpg",
      features: [
        "12-session coaching model",
        "Enhanced clarity and productivity",
        "Personal development",
        "Performance optimization"
      ]
    },
    {
      id: 3,
      title: "Certified Peak Performance Coach (CPPC)",
      description: "Become a recognized coaching leader with our professional certification program.",
      imagePath: "/bussinessacademyphase1.jpg",
      features: [
        "Professional certification",
        "Core coaching strategies",
        "Practice development",
        "Industry credibility"
      ]
    }
  ];

  return (
      <div>
        
      {/*   Hero Section */}
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
          <h1 className="text-5xl font-bold mb-4">Empowering Your Next Chapter</h1>
          <p className="text-xl max-w-3xl mx-auto px-4">
            At WANAC, we proudly offer specialized programs designed to equip transitioning service members, veterans, and
            aspiring coaches with the skills and knowledge required to succeed personally, professionally, and entrepreneurially.
          </p>
        </div>
      </header>
      <section>
          <div className="relative w-full h-10 bg-[#002147] overflow-hidden flex items-center justify-center">
            <nav className="relative z-10 flex space-x-16 px-4">
              <a href="#our-support-pillars" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Program Offerings
              </a>
              <a href="#your-coaching-journey" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Program Pathways
              </a>
              <a href="#phase-1" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Education & Career
              </a>
              <a href="#phase-2" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Peak Performance
              </a>
              <a href="#phase-3" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Certification
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

        {/* Support Areas Section */}
        <section id="our-support-pillars" className="bg-gradient-to-b from-white via-gray-50 to-white py-16">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">
                Program Offerings
              </h2>
              <p className="text-lg text-brand-blue">
                Comprehensive programs tailored for veterans, transitioning service members, and aspiring coaches
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {supportAreas.map((area, index) => (
                <div
                  key={area.id}
                  className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border border-gray-100 overflow-hidden"
                >
                  {/* Decorative Background Element */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange-400/10 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500"></div>
                  
                  <div className="relative space-y-4">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="p-3 rounded-lg bg-gradient-to-br from-[#002147] to-orange-400 text-white group-hover:scale-110 transition-transform duration-300 shadow-md"
                        role="img" 
                        aria-label={area.title}
                      >
                        {area.icon}
                      </div>
                      <h3 className="text-xl font-bold text-brand-navy group-hover:text-orange-400 transition-colors duration-300">
                        {area.title}
                      </h3>
                    </div>
                    <p className="text-base text-brand-blue leading-relaxed">{area.description}</p>
                    <ul className="space-y-2">
                      {area.features.map((feature, index) => (
                        <li 
                          key={index} 
                          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-50 transition-colors duration-200 group/item"
                        >
                          <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-orange-400/10 group-hover/item:bg-orange-400/20 transition-colors duration-200">
                            <svg 
                              className="w-4 h-4 text-orange-400" 
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
                          <span className="text-sm text-gray-700 group-hover/item:text-orange-600 transition-colors duration-200">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <a 
                      href={`/pages/${area.title === "Promise Land Education Pathway (PLEP)" ? "plep" :
                             area.title === "Promise Land Career Accelerator (PLCA)" ? "plca" :
                             area.title === "Peak Performance Coaching (PPC)" ? "ppc" : "veta"}`}
                      className="inline-block mt-4 px-5 py-2 bg-[#002147] text-white rounded-lg hover:bg-orange-400 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-sm"
                    >
                      Learn More
                      <span className="ml-2 inline-block transform group-hover:translate-x-1 transition-transform duration-200">
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
        </section>

        {/* Coaching Phases Section */}
        <section id="your-coaching-journey" className="bg-gradient-to-br from-white via-gray-50 to-white py-16">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-orange-400 font-semibold text-base mb-3 block">Transform Your Future</span>
              <h2 className="text-3xl font-bold text-brand-navy mb-4">
                Your Coaching Journey
              </h2>
              <p className="text-lg text-brand-blue">
                A structured three-phase approach designed to transform your military experience into civilian success
              </p>
            </div>

            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#002147] via-orange-400 to-[#002147] hidden lg:block" />

              <div className="space-y-12">
                {coachingPhases.map((phase, index) => (
                  <div
                    key={phase.id}
                    id={`phase-${phase.id}`}
                    className={`relative z-10 flex flex-col lg:flex-row items-center ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } gap-8 lg:gap-16`}
                  >
                    {/* Phase Image & Content */}
                    <div className="flex-shrink-0 w-full lg:w-1/3">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-[#002147]/20 transform -rotate-2 rounded-xl transition-transform group-hover:rotate-0 duration-300" />
                        <div className="relative bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 border border-gray-100">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-400/10 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500" />
                          <div className="relative">
                            <div className="flex items-center justify-center mb-4">
                              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
                                <img
                                  src={phase.imagePath}
                                  alt={phase.title}
                                  className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
                                />
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-brand-navy text-center mb-3 group-hover:text-orange-400 transition-colors duration-300">
                              {phase.title}
                            </h3>
                            <p className="text-base text-brand-blue text-center">
                              {phase.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="w-full lg:w-2/3">
                      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 relative group overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-400/10 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500" />
                        <div className="relative">
                          <div className="grid sm:grid-cols-2 gap-4">
                            {phase.features.map((feature, featureIndex) => (
                              <div 
                                key={featureIndex}
                                className="flex items-start space-x-2 p-3 rounded-lg bg-gray-50 hover:bg-orange-50 transition-all duration-200 group/item"
                              >
                                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-orange-400/10 group-hover/item:bg-orange-400/20">
                                  <svg 
                                    className="w-4 h-4 text-orange-400" 
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
                                <span className="text-sm text-gray-700 font-medium group-hover/item:text-orange-600 transition-colors duration-200">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Bottom Gradient Line */}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#002147] to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      </div>
                    </div>

                    {/* Connection Dot */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-orange-400 hidden lg:block">
                      <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-75" />
                    </div>
                  </div>
                ))}
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
