import { MdAssessment, MdGroups } from 'react-icons/md';
import { FaUserTie } from 'react-icons/fa';
import { BsJournalText } from 'react-icons/bs';

export default function HowWeHelp() {
  const supportAreas = [
    {
      id: 1,
      title: "Personal Growth Assessment",
      description: "Take our comprehensive Life Score Assessment to identify your strengths and areas for development in your transition journey.",
      icon: <MdAssessment size={32} />,
      features: ["Personalized insights", "Progress tracking", "Action recommendations"]
    },
    {
      id: 2,
      title: "Transition Coaching",
      description: "Work one-on-one with experienced coaches who understand the unique challenges of military transition.",
      icon: <FaUserTie size={32} />,
      features: ["Customized coaching plans", "Goal setting", "Career guidance"]
    },
    {
      id: 3,
      title: "Reflective Journaling",
      description: "Document your journey and insights with our structured journaling platform designed for personal growth.",
      icon: <BsJournalText size={32} />,
      features: ["Guided prompts", "Progress tracking", "Private space for reflection"]
    },
    {
      id: 4,
      title: "Veteran Community",
      description: "Connect with fellow veterans who understand your journey and share experiences in a supportive environment.",
      icon: <MdGroups size={32} />,
      features: ["Peer support", "Networking", "Shared experiences"]
    }
  ];

  const coachingPhases = [
    {
      id: 1,
      title: "Phase 1: Promise Land Transition",
      description: "Begin your journey with our foundational program designed specifically for military transition.",
      icon: "",
      features: [
        "Military to civilian transition strategy",
        "Identity transformation",
        "Core values alignment",
        "Goal setting framework"
      ]
    },
    {
      id: 2,
      title: "Phase 2: High Performance Coaching",
      description: "Elevate your potential and achieve excellence in your chosen path.",
      icon: "",
      features: [
        "Advanced performance techniques",
        "Leadership development",
        "Strategic decision making",
        "Personal brand building"
      ]
    },
    {
      id: 3,
      title: "Phase 3: Coaching Business Academy",
      description: "Transform your experience into a successful coaching business.",
      icon: "",
      features: [
        "Business model development",
        "Marketing strategies",
        "Client acquisition",
        "Sustainable practice building"
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
          <h1 className="text-5xl font-bold mb-4">YOUR JOURNEY TO SUCCESS START </h1>
          <p className="text-xl max-w-3xl mx-auto px-4">
            The WANAC platform provides comprehensive support through our four-pillar approach and three phase coaching program.
          </p>
        </div>
      </header>
      <section>
          <div className="relative w-full h-10 bg-[#002147] overflow-hidden flex items-center justify-center">
            <nav className="relative z-10 flex space-x-16 px-4">
              <a href="#our-support-pillars" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Our Support Pillars
              </a>
              <a href="#your-coaching-journey" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Your Coaching Journey
              </a>
              <a href="#phase-1" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Phase 1: Promise Land Transition
              </a>
              <a href="#phase-2" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Phase 2: High Performance Coaching
              </a>
              <a href="#phase-3" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Phase 3: Coaching Business Academy
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
        <section id="our-support-pillars" className="bg-gradient-to-b from-white via-gray-50 to-white py-24">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-orange-400 font-semibold text-lg mb-4 block">Our Comprehensive Approach</span>
              <h2 className="text-4xl font-bold text-brand-navy mb-6">
                Our Support Pillars
              </h2>
              <p className="text-xl text-brand-blue">
                Comprehensive support designed to guide you through every step of your transition journey
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {supportAreas.map((area, index) => (
                <div
                  key={area.id}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 overflow-hidden"
                >
                  {/* Decorative Background Element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500"></div>
                  
                  <div className="relative space-y-6">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="p-4 rounded-xl bg-gradient-to-br from-[#002147] to-orange-400 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg"
                        role="img" 
                        aria-label={area.title}
                      >
                        {area.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-brand-navy group-hover:text-orange-400 transition-colors duration-300">
                        {area.title}
                      </h3>
                    </div>
                    <p className="text-lg text-brand-blue leading-relaxed">{area.description}</p>
                    <ul className="space-y-3">
                      {area.features.map((feature, index) => (
                        <li 
                          key={index} 
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-50 transition-colors duration-200 group/item"
                        >
                          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-orange-400/10 group-hover/item:bg-orange-400/20 transition-colors duration-200">
                            <svg 
                              className="w-5 h-5 text-orange-400" 
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
                          <span className="text-gray-700 group-hover/item:text-orange-600 transition-colors duration-200">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Decorative Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#002147] to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coaching Phases Section */}
        <section id="your-coaching-journey" className="bg-gradient-to-br from-white via-gray-50 to-white py-24">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-orange-400 font-semibold text-lg mb-4 block">Transform Your Future</span>
              <h2 className="text-4xl font-bold text-brand-navy mb-6">
                Your Coaching Journey
              </h2>
              <p className="text-xl text-brand-blue">
                A structured three-phase approach designed to transform your military experience into civilian success
              </p>
            </div>

            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#002147] via-orange-400 to-[#002147] hidden lg:block" />

              <div className="space-y-16">
                {coachingPhases.map((phase, index) => (
                  <div
                    key={phase.id}
                    id={`phase-${phase.id}`}
                    className={`relative z-10 flex flex-col lg:flex-row items-center ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } gap-8 lg:gap-16`}
                  >
                    {/* Phase Number & Icon */}
                    <div className="flex-shrink-0 w-full lg:w-1/3">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-[#002147]/20 transform -rotate-3 rounded-2xl transition-transform group-hover:rotate-0 duration-300" />
                        <div className="relative bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 border border-gray-100">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
                          <div className="relative">
                            <div className="flex items-center justify-center mb-6">
                              <span className="text-5xl bg-gradient-to-br from-[#002147] to-orange-400 text-white p-6 rounded-2xl shadow-lg">
                                {phase.icon}
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold text-brand-navy text-center mb-4 group-hover:text-orange-400 transition-colors duration-300">
                              {phase.title}
                            </h3>
                            <p className="text-lg text-brand-blue text-center">
                              {phase.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="w-full lg:w-2/3">
                      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative group overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
                        <div className="relative">
                          <div className="grid sm:grid-cols-2 gap-6">
                            {phase.features.map((feature, featureIndex) => (
                              <div 
                                key={featureIndex}
                                className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50 hover:bg-orange-50 transition-all duration-200 group/item"
                              >
                                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-orange-400/10 group-hover/item:bg-orange-400/20">
                                  <svg 
                                    className="w-5 h-5 text-orange-400" 
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
                                <span className="text-lg text-gray-700 font-medium group-hover/item:text-orange-600 transition-colors duration-200">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Bottom Gradient Line */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#002147] to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
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
                  Ready to Begin Your Transformation?
                </h3>
                <p className="text-lg md:text-xl text-gray-300 mb-12">
                  Take the first step towards your new journey. Our team is here to support you every step of the way.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                  <button
                    className="w-full sm:w-auto bg-white text-[#002147] px-8 py-4 rounded-lg font-semibold hover:bg-[#ff5e1a] hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    aria-label="Start your assessment"
                  >
                    Take Life Score Assessment
                  </button>
                  <button
                    className="w-full sm:w-auto bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#002147] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    aria-label="Schedule a consultation"
                  >
                    Schedule Free Consultation
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
