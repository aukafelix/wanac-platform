"use client";

import React from "react";
import Image from 'next/image';

const OurStory = () => {
  const leadershipTeams = {
    boardOfDirectors: [
      {
        name: "Jason B.A. Van Camp",
        title: "Chairman of the Board",
        image: "/executivestaff/jason.jpg",
        bio: "Founder and Executive Chairman with extensive military and business leadership experience"
      }
    ],
    executiveStaff: [
      {
        name: "Clarence Narcisse",
        title: "Executive Director",
        image: "/executivestaff/Anderson Pic.JPG",
        bio: "Experienced leader with 15+ years in program management and strategic development. Former military officer specializing in organizational transformation and veteran support services."
      },
      {
        name: "Charles Ekanem",
        title: "Deputy Director",
        image: "/executivestaff/chingles1_367397516_6541771792565540_1911567577915577559_n.jpg",
        bio: "Strategic operations expert with a proven track record in program implementation and community outreach. Dedicated to empowering veterans through innovative coaching methodologies."
      },
      {
        name: "Keason Torian",
        title: "Program Manager",
        image: "/executivestaff/staff-sgt-keason-torian-a-drill-instructor-instructs-3dc2c8-1024.jpg",
        bio: "Former Staff Sergeant and drill instructor with extensive experience in leadership development and training. Specializes in transition coaching and career acceleration programs."
      },
      {
        name: "Gabriella Torian",
        title: "Program Manager",
        image: "/executivestaff/Gabriella Torian.jpg",
        bio: "Program management specialist focused on educational pathways and professional development. Expert in creating structured learning environments for veteran success."
      }
    ]
  };

  const LeadershipSection = ({ title, members }) => {
    return (
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-[#002147]">
              {title}
            </h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mb-3" />
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              Meet the dedicated individuals who guide our mission and drive our success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {members.map((member, index) => (
              <div
                key={index}
                className="group relative bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"/>
                </div>

                <div className="relative p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-bold text-[#002147] group-hover:text-orange-600 transition-colors mb-2 leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-orange-600 font-medium text-sm mb-3">{member.title}</p>
                  <div className="h-px w-16 bg-gray-200 mb-3"></div>
                  <p className="text-gray-600 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Static core pillars data
  const corePillars = [
    {
      title: "Clarity & Vision",
      description: "Establishing clear personal and professional pathways.",
      color: "#2563eb" // Tailwind blue-600
    },
    {
      title: "Energy & Resilience",
      description: "Optimizing physical, emotional, and mental well-being.",
      color: "#16a34a" // Tailwind green-600
    },
    {
      title: "Courage & Confidence",
      description: "Building the ability to navigate challenges with strength.",
      color: "#ea580c" // Tailwind orange-600
    },
    {
      title: "Productivity & Excellence",
      description: "Empowering individuals to achieve exceptional results.",
      color: "#eab308" // Tailwind yellow-500
    },
    {
      title: "Influence & Leadership",
      description: "Enhancing interpersonal skills to inspire and drive change.",
      color: "#7c3aed" // Tailwind purple-600
    },
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
                Our Story
              </span>
            </h1>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mb-3" />
            <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 max-w-3xl mx-auto leading-relaxed">
              WANAC is committed to empowering transitioning service members, veterans, and professionals by delivering
              transformative coaching and training that fosters personal growth, professional excellence, and entrepreneurial
              success. Our innovative programs and resources are carefully designed to enable participants to lead impactful lives in
              their communities and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="bg-[#002147] py-4">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {[
              { href: "#about", label: "ABOUT" },
              { href: "#mission", label: "MISSION" },
              { href: "#what-sets-apart", label: "WHAT SETS US APART" },
              { href: "#core-pillars", label: "CORE PILLARS" },
              { href: "#aspirations", label: "STRATEGIC ASPIRATIONS" },
              { href: "#executive", label: "EXECUTIVE STAFF" }
            ].map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className="nav-button px-4 py-2 text-white text-sm font-medium rounded-md"
                style={{ 
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#fb923c';
                  e.target.style.backgroundColor = 'rgba(249, 115, 22, 0.2)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-[#002147]">
              About WANAC
            </h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mb-3" />
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              Founded with purpose, driven by passion, dedicated to veteran success
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#002147]">Our Story</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Founded by Jason B.A. Van Camp, WANAC emerged from a vision to bridge 
                the gap between military service and civilian success. Our organization 
                was born from the understanding that veterans possess unique strengths 
                that, when properly channeled, can lead to extraordinary achievements.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Since our inception, we have been committed to providing comprehensive 
                support that addresses the multifaceted challenges veterans face during 
                their transition to civilian life. Our approach combines practical skills 
                development with emotional intelligence training and strategic career planning.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, WANAC stands as a beacon of hope and transformation, having helped 
                thousands of veterans and service members successfully navigate their 
                post-military careers and build meaningful, impactful lives.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src="/community1.jpg"
                  alt="WANAC Community"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section id="mission" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden" 
               style={{ background: 'linear-gradient(160deg, #002147 0%, #FF7D33 15%, #FF5E1A 30%, #002147 50%)' }}>
        <div className="absolute top-1/3 left-0 w-64 md:w-80 h-64 md:h-80 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-white">
            Our Mission
          </h2>
          <div className="w-12 h-1 bg-white mx-auto rounded-full mb-6" />
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 max-w-3xl mx-auto leading-relaxed">
            To empower transitioning service members, veterans, and professionals by delivering
            transformative coaching and training that fosters personal growth, professional excellence, and entrepreneurial
            success. Our innovative programs and resources are carefully designed to enable participants to lead impactful lives in
            their communities and beyond.
          </p>
        </div>
      </section>

      <section id="what-sets-apart" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-[#002147]">
              What Sets WANAC Apart
            </h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mb-3" />
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              Our distinctive approach to veteran empowerment and professional development
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                In today's rapidly evolving world, the ability to adapt, lead, and inspire others is more important than ever. At WANAC, we cultivate forward-thinking leaders who not only possess strategic insight and adaptability but also excel in emotional intelligence and resilience—key traits of transformative leadership.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                Our distinctive approach combines rigorous academic insights with real-world experiences, preparing our participants to confidently navigate life's transitions and professional challenges.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src="/high perfomance coaching.jpg"
                  alt="What Sets WANAC Apart"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section id="core-pillars" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#002147] text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0,33,71,0.92) 0%, rgba(0,33,71,0.88) 60%, rgba(255,94,26,0.25) 100%), url('/veterancommunity3.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-l from-orange-400/10 to-transparent rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase">
              Our Core Pillars At WANAC
            </h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mb-3" />
            <p className="text-xs sm:text-sm md:text-base text-gray-200 max-w-xl mx-auto leading-relaxed">
              The fundamental principles that guide our approach to veteran empowerment
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
            {corePillars.slice(0, 3).map((pillar, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white/5 backdrop-blur-md p-5 sm:p-6 border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-500 hover:scale-105"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                
                <div className="relative text-center">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: pillar.color }}
                  >
                    <div className="w-8 h-8 bg-white/30 rounded-full"></div>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-white group-hover:text-orange-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl">
              {corePillars.slice(3).map((pillar, idx) => (
                <div 
                  key={idx} 
                  className="group relative bg-white/5 backdrop-blur-md p-5 sm:p-6 border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-500 hover:scale-105"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                  
                  <div className="relative text-center">
                    <div 
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: pillar.color }}
                    >
                      <div className="w-8 h-8 bg-white/30 rounded-full"></div>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-white group-hover:text-orange-400 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Aspirations Section */}
      <section id="aspirations" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 uppercase text-[#002147]">
              Our Strategic Aspirations
            </h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mb-3" />
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              Our commitment to excellence drives everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {[
              { 
                title: "Attain Excellence",
                desc: "We are dedicated to excellence in every program, resource, and initiative we undertake.",
                icon: (
                  <svg className="w-8 h-8 text-orange-600 mb-2 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>
                )
              },
              {
                title: "Empower Lifelong Success",
                desc: "We provide comprehensive tools and support to ensure sustainable success",
                icon: (
                  <svg className="w-8 h-8 text-orange-600 mb-2 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                )
              },
              {
                title: "Drive Innovation",
                desc: "We continuously innovate our methodologies to deliver cutting-edge coaching and training solutions",
                icon: (
                  <svg className="w-8 h-8 text-orange-600 mb-2 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                )
              },
              {
                title: "Build Strong Community",
                desc: "We foster an inclusive community, creating meaningful connections among veterans, professionals, and industry leaders",
                icon: (
                  <svg className="w-8 h-8 text-orange-600 mb-2 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21h13a2 2 0 002-2v-2a7 7 0 00-14 0v2a2 2 0 002 2z"/></svg>
                )
              },
              {
                title: "Create Opportunity",
                desc: "We strive to remove barriers, promoting opportunities for personal and professional advancement for traditionally underserved groups.",
                icon: (
                  <svg className="w-8 h-8 text-orange-600 mb-2 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/></svg>
                )
              }
            ].map((aspiration, index) => (
              <div
                key={index}
                className="group relative bg-white border border-gray-100 p-4 sm:p-5 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col items-center text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative flex flex-col items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-3 group-hover:bg-orange-200 transition-colors duration-300">
                    {aspiration.icon}
                  </div>
                  <h4 className="font-bold text-[#002147] mb-3 text-sm sm:text-base group-hover:text-orange-600 transition-colors duration-300">{aspiration.title}</h4>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{aspiration.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="relative bg-[#002147] text-white text-center py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/community1.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#002147]/50 to-[#002147]"></div>
        
        <div className="absolute inset-0">
          <div className="absolute top-10 left-5 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-orange-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-5 sm:right-10 w-32 sm:w-40 h-32 sm:h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 uppercase">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200">
              Join the WANAC Community
            </span>
          </h2>
          <p className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg text-gray-200 max-w-xl mx-auto leading-relaxed px-4">
            Become part of an empowered network dedicated to making meaningful, positive impacts in society. Connect with us
            to start your transformative journey today.
          </p>
          
          <div className="flex flex-col xs:flex-row justify-center gap-3 sm:gap-4">
            <a 
              href="/services" 
              className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-orange-500 overflow-hidden shadow-xl hover:shadow-orange-500/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transform group-hover:scale-105 transition-transform duration-300"></div>
              <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base font-semibold">
                JOIN COMMUNITY
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Executive Staff Section */}
      <section id="executive">
        <LeadershipSection 
          title="EXECUTIVE STAFF" 
          members={leadershipTeams.executiveStaff} 
        />
      </section>

      {/* Call to Action */}
    </div>
  );
};

export default OurStory;
