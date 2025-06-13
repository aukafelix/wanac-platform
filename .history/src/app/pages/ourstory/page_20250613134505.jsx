"use client";

import React from "react";

const OurStory = () => {
  const leadershipTeams = {
    boardOfDirectors: [
      {
        name: "Jason B.A. Van Camp",
        title: "Chairman of the Board",
        image: ".png",
        bio: "Founder and Executive Chairman"
      },
      {
        name: "Jason B.A. Van Camp",
        title: "Chairman of the Board",
        image: "",
        bio: "Founder and Executive Chairman"
      },
      {
        name: "Jason B.A. Van Camp",
        title: "Chairman of the Board",
        image: "",
        bio: "Founder and Executive Chairman"
      },
    ],
    executiveStaff: [
      {
        name: "Ken Vance",
        title: "Chief Executive Officer",
        image: "path-to-image.jpg",
        bio: "Leading operations and strategic initiatives"
      },
      {
        name: "Ken Vance",
        title: "Chief Executive Officer",
        image: "path-to-image.jpg",
        bio: "Leading operations and strategic initiatives"
      },
      {
        name: "Ken Vance",
        title: "Chief Executive Officer",
        image: "path-to-image.jpg",
        bio: "Leading operations and strategic initiatives"
      },
    ]
  };

  const LeadershipSection = ({ title, members }) => (
    <section className="py-12 bg-white rounded-lg shadow-sm mb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#002147] relative inline-block">
            {title}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></div>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="aspect-w-4 aspect-h-5 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6 bg-white relative">
                <div className="absolute -top-4 right-6 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center transform rotate-45">
                  <div className="transform -rotate-45">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-[#002147] mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium text-sm mb-3">{member.title}</p>
                
                <div className="h-px w-16 bg-gray-200 mb-3"></div>
                
                {member.bio && (
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                )}
                
                <div className="mt-4 flex space-x-3">
                  <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    Contact
                  </button>
                  <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="bg-gray-50">
    {/*   Hero Section */}
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
            ABOUT WANAC
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-6 text-blue-100 font-medium drop-shadow">
            WANAC offers specialized programs to equip transitioning service members, veterans, and aspiring coaches with the skills and knowledge to thrive personally, professionally, and entrepreneurially.
          </p>
        </div>
      </header>
      <section>
        <div className="relative w-full h-10 bg-[#002147] overflow-hidden flex items-center justify-center">
          <nav className="relative z-10 flex space-x-8 px-4">
            <a href="#about" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
              About
            </a>
            <a href="#mission" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
              Mission
            </a>
            <a href="#what-sets-apart" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
              What Sets Apart
            </a>
            <a href="#core-pillars" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
              Core Pillars
            </a>
            <a href="#aspirations" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
              Aspirations
            </a>
            <a href="#board" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
              Board of Directors
            </a>
            <a href="#executive" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
              Executive Staff
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

      {/* Main Content */}
         <section className="relative bg-[#002147] text-white min-h-[420px] flex items-center justify-center overflow-hidden">
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
            OUR MISSION
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-6 text-blue-100 font-medium drop-shadow">
            WANAC offers specialized programs to equip transitioning service members, veterans, and aspiring coaches with the skills and knowledge to thrive personally, professionally, and entrepreneurially.
          </p>
        </div>
      </section>

        <section>
          <div className="w-full">
            <img 
              src="/veterancommunity.png" 
              alt="WANAC Community" 
              className="w-full h-[260px] md:h-[340px] object-cover object-center mb-6"
              style={{ display: 'block', borderRadius: 0, boxShadow: 'none' }}
            />
          </div>
        </section>

        <section id="what-sets-apart" className="p-8 mb-12 text-center">
          <h3 className="text-xl font-bold text-[#002147] mb-3 flex items-center justify-center">
            What Sets WANAC Apart
          </h3>
          <div className="mx-auto max-w-2xl">
            <p className="text-gray-700 leading-relaxed">In today's rapidly evolving world, the ability to adapt, lead, and inspire others is more important than ever. At WANAC,
we cultivate forward-thinking leaders who not only possess strategic insight and adaptability but also excel in
emotional intelligence and resilience—key traits of transformative leadership.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">Our distinctive approach combines rigorous academic insights with real-world experiences, preparing our participants
            to confidently navigate life's transitions and professional challenges.
            </p>
          </div>
        </section>

        {/* Core Pillars Section */}
        <section id="core-pillars" className="p-7 mb-12 bg-[#002147] relative" style={{
            backgroundImage: "url('/veterancommunity3.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
            backgroundColor: '#002147',
            position: 'relative'
          }}>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center justify-center relative">
            <span className="z-10 ">Our Core Pillars of WANAC</span>
          </h2>
          <div className="mx-auto max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Clarity and Vision",
                  desc: "Establishing clear personal and professional pathways.",
                  icon: (
                    <svg className="w-6 h-6 text-blue-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  )
                },
                {
                  title: "Energy and Resilience",
                  desc: "Optimizing physical, emotional, and mental well-being.",
                  icon: (
                    <svg className="w-6 h-6 text-blue-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  )
                },
                {
                  title: "Courage and Confidence",
                  desc: "Building the ability to navigate challenges with strength.",
                  icon: (
                    <svg className="w-6 h-6 text-blue-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
                  )
                },
                {
                  title: "Productivity and Excellence",
                  desc: "Empowering individuals to achieve exceptional results.",
                  icon: (
                    <svg className="w-6 h-6 text-blue-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/></svg>
                  )
                },
                {
                  title: "Influence and Leadership",
                  desc: "Enhancing interpersonal skills to inspire and drive change.",
                  icon: (
                    <svg className="w-6 h-6 text-blue-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 17l4 4 4-4m-4-5v9"/><circle cx="12" cy="7" r="4"/></svg>
                  )
                }
              ].map((pillar, index, arr) => {
                if (index < 4) {
                  return (
                    <div key={index} className="flex flex-col items-center bg-white rounded-lg shadow p-3 hover:shadow-md transition-shadow border border-gray-100">
                      {pillar.icon}
                      <h4 className="font-bold text-base text-[#002147] mb-1 text-center">{pillar.title}</h4>
                      <p className="text-gray-700 text-xs text-center">{pillar.desc}</p>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className="flex justify-center mt-4">
              <div className="flex flex-col items-center bg-white rounded-lg shadow p-3 hover:shadow-md transition-shadow border border-gray-100 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
                {[
                  {
                    title: "Influence and Leadership",
                    desc: "Enhancing interpersonal skills to inspire and drive change.",
                    icon: (
                      <svg className="w-6 h-6 text-blue-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 17l4 4 4-4m-4-5v9"/><circle cx="12" cy="7" r="4"/></svg>
                    )
                  }
                ].map((pillar, index) => (
                  <React.Fragment key={index}>
                    {pillar.icon}
                    <h4 className="font-bold text-base text-[#002147] mb-1 text-center">{pillar.title}</h4>
                    <p className="text-gray-700 text-xs text-center">{pillar.desc}</p>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Aspirations Section */}
        <section id="aspirations" className="p-8 mb-12">
          <h3 className="text-xl font-bold text-[#002147] mb-8 text-center">Our Strategic Aspirations</h3>
          {/* Simple Infographic Row */}
          <div className="w-full overflow-x-auto">
            <div className="flex md:grid md:grid-cols-5 gap-6 md:gap-8 items-stretch justify-center min-w-[600px] md:min-w-0">
              {[
                {
                  title: "Attain Excellence",
                  desc: "We are dedicated to excellence in every program, resource, and initiative we undertake.",
                  icon: (
                    <svg className="w-8 h-8 text-blue-600 mb-2 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>
                  )
                },
                {
                  title: "Empower Lifelong Success",
                  desc: " We provide comprehensive tools and support to ensure sustainable success",
                  icon: (
                    <svg className="w-8 h-8 text-blue-600 mb-2 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  )
                },
                {
                  title: "Drive Innovation",
                  desc: "We continuously innovate our methodologies to deliver cutting-edge coaching and training solutions",
                  icon: (
                    <svg className="w-8 h-8 text-blue-600 mb-2 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  )
                },
                {
                  title: "Build Strong Community",
                  desc: "We foster an inclusive community, creating meaningful connections among veterans,professionals, and industry leaders",
                  icon: (
                    <svg className="w-8 h-8 text-blue-600 mb-2 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21h13a2 2 0 002-2v-2a7 7 0 00-14 0v2a2 2 0 002 2z"/></svg>
                  )
                },
                {
                  title: "Create Opportunity",
                  desc: "We strive to remove barriers, promoting opportunities for personal and professional advancement for traditionally underserved groups.",
                  icon: (
                    <svg className="w-8 h-8 text-blue-600 mb-2 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/></svg>
                  )
                }
              ].map((aspiration, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow min-w-[220px] md:min-w-0"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-2">
                    {aspiration.icon}
                  </div>
                  <h4 className="font-semibold text-[#002147] mb-2 text-center text-base">{aspiration.title}</h4>
                  <p className="text-gray-700 text-sm text-center">{aspiration.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#002147] rounded-xl p-8 mb-12 text-center flex flex-col items-center justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Join the WANAC Community</h2>
          <p className="text-white max-w-xl mx-auto mb-6 text-base md:text-lg">
            Become part of an empowered network dedicated to making meaningful, positive impacts in society. Connect with us
            to start your transformative journey today.
          </p>
          <a
            href="/services"
            className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white-700 transition text-base md:text-lg"
          >
            Explore Our Services &rarr;
          </a>
        </section>

        {/* Leadership Sections */}
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#002147] mb-4">Our Leadership</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated individuals who guide our mission and drive our success in empowering veterans and professionals.
            </p>
          </div>

          <section id="board">
            <LeadershipSection 
              title="BOARD OF DIRECTORS" 
              members={leadershipTeams.boardOfDirectors} 
            />
          </section>
          
          <section id="executive">
            <LeadershipSection 
              title="EXECUTIVE STAFF" 
              members={leadershipTeams.executiveStaff} 
            />
          </section>
        </div>

        {/* Call to Action */}
        
    </div>
  );
}

export default OurStory;
