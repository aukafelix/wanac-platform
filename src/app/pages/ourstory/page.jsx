"use client";

import React from "react";

const OurStory = () => {
  const leadershipTeams = {
    boardOfDirectors: [
      
      {
        name: "Jason B.A. Van Camp",
        title: "Chairman of the Board",
        image: "/executivestaff/jason.jpg",
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
        name: "Clarence Narcisse",
        title: "Executive Director",
        image: "/executivestaff/Anderson Pic.JPG",
        bio: "Leading operations and strategic initiatives"
      },
      {
        name: "Charles Ekanem",
        title: "Deputy Director",
        image: "/executivestaff/chingles1_367397516_6541771792565540_1911467567915577559_n.jpg",
        bio: "Leading operations and strategic initiatives"
      },
      {
        name: "Keason Torian",
        title: "Program Manager",
        image: "/executivestaff/staff-sgt-keason-torian-a-drill-instructor-instructs-3dc2c8-1024.jpg",
        bio: "Leading operations and strategic initiatives"
      },
      
      {
        name: "Gabriella Torian",
        title: "Program Manager ",
        image: "/executivestaff/Gabriella Torian.jpg",
        bio: "Leading operations and strategic initiatives"
      },
    ]
  };

  const LeadershipSection = ({ title, members }) => {
    const firstRow = members.slice(0, 3);
    const lastRow = members.slice(3);
    return (
      <section className="py-12 bg-white rounded-lg shadow-sm mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#002147] relative inline-block font-[Montserrat]" style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>
              {title}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></div>
            </h2>
          </div>
          {/* First row: 3 executives */}
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full justify-items-center">
              {firstRow.map((member, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      style={{ width: '300px', height: '300px' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 bg-white relative">
                    <div className="absolute -top-4 right-6 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center transform rotate-45">
                      <div className="transform -rotate-45">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#002147] mb-2 font-[Montserrat]" style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>{member.name}</h3>
                    <p className="text-blue-600 font-medium text-sm mb-3">{member.title}</p>
                    <div className="h-px w-16 bg-gray-200 mb-3"></div>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Last row: 1 executive centered */}
            {lastRow.length > 0 && (
              <div className="flex justify-center mt-8 w-full">
                {lastRow.map((member, index) => (
                  <div
                    key={index}
                    className="group relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        style={{ width: '300px', height: '300px' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6 bg-white relative">
                      <div className="absolute -top-4 right-6 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center transform rotate-45">
                        <div className="transform -rotate-45">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-[#002147] mb-2 font-[Montserrat]" style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>{member.name}</h3>
                      <p className="text-blue-600 font-medium text-sm mb-3">{member.title}</p>
                      <div className="h-px w-16 bg-gray-200 mb-3"></div>
                      <p className="text-gray-600 text-sm">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="bg-gray-50" style={{ fontFamily: "'Source Sans Pro', Arial, sans-serif" }}>
    

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
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2 leading-tight drop-shadow-lg font-[Montserrat]" style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>
            OUR MISSION
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto mb-4 text-blue-100 font-medium drop-shadow">
            WANAC is committed to empowering transitioning service members, veterans, and professionals by delivering
transformative coaching and training that fosters personal growth, professional excellence, and entrepreneurial
success. Our innovative programs and resources are carefully designed to enable participants to lead impactful lives in
their communities and beyond.
          </p>
        </div>
      </section>


      <section>
        <div className="relative w-full h-16 bg-[#002147] overflow-hidden flex items-center justify-center">
          <nav className="relative z-10 flex space-x-8 px-4">
            <a href="#about" className="group flex flex-col items-center justify-center text-white text-base font-medium transition-colors flex-none no-underline hover:no-underline">
              <div className="flex flex-col items-center w-full h-full px-6 py-3 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                <span className="whitespace-nowrap text-center w-full">ABOUT</span>
                <svg className="w-4 h-4 mt-1 transition-colors" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </a>
            <a href="#mission" className="group flex flex-col items-center justify-center text-white text-base font-medium transition-colors flex-none no-underline hover:no-underline">
              <div className="flex flex-col items-center w-full h-full px-6 py-3 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                <span className="whitespace-nowrap text-center w-full">MISSION</span>
                <svg className="w-4 h-4 mt-1 transition-colors" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </a>
            <a href="#what-sets-apart" className="group flex flex-col items-center justify-center text-white text-base font-medium transition-colors flex-none no-underline hover:no-underline">
              <div className="flex flex-col items-center w-full h-full px-6 py-3 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                <span className="whitespace-nowrap text-center w-full">WHAT SETS APART</span>
                <svg className="w-4 h-4 mt-1 transition-colors" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </a>
            <a href="#core-pillars" className="group flex flex-col items-center justify-center text-white text-base font-medium transition-colors flex-none no-underline hover:no-underline">
              <div className="flex flex-col items-center w-full h-full px-6 py-3 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                <span className="whitespace-nowrap text-center w-full">CORE PILLARS</span>
                <svg className="w-4 h-4 mt-1 transition-colors" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </a>
            <a href="#aspirations" className="group flex flex-col items-center justify-center text-white text-base font-medium transition-colors flex-none no-underline hover:no-underline">
              <div className="flex flex-col items-center w-full h-full px-6 py-3 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                <span className="whitespace-nowrap text-center w-full">STRATEGIC ASPIRATIONS</span>
                <svg className="w-4 h-4 mt-1 transition-colors" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </a>
            <a href="#executive" className="group flex flex-col items-center justify-center text-white text-base font-medium transition-colors flex-none no-underline hover:no-underline">
              <div className="flex flex-col items-center w-full h-full px-6 py-3 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                <span className="whitespace-nowrap text-center w-full">EXECUTIVE STAFF</span>
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

        <section id="what-sets-apart" className="p-12 md:p-20 mb-12">
          <div className="flex flex-col items-center max-w-4xl mx-auto gap-8">
            {/* Text Content */}
            <div className="flex flex-col items-center text-center w-full max-w-4xl">
              <h1 className="text-2xl md:text-3xl font-extrabold mb-2 font-[Montserrat]" style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>
                What Sets WANAC Apart
              </h1>
              <p className="text-base md:text-lg mb-4 text-black font-medium drop-shadow w-full">
                In today's rapidly evolving world, the ability to adapt, lead, and inspire others is more important than ever. At WANAC, we cultivate forward-thinking leaders who not only possess strategic insight and adaptability but also excel in emotional intelligence and resilience—key traits of transformative leadership.
              </p>
              <p className="text-base md:text-lg mb-4 text-black font-medium drop-shadow w-full">
                Our distinctive approach combines rigorous academic insights with real-world experiences, preparing our participants to confidently navigate life's transitions and professional challenges.
              </p>
            </div>
            {/* Image */}
            
          </div>
        </section>
        

        {/* Core Pillars Section */}
        <section id="core-pillars" className="relative bg-[#002147] text-white min-h-[420px] flex items-center justify-center overflow-hidden mb-12">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: "url('/veterancommunity3.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#002147]/90 via-[#002147]/80 to-[#ff5e1a]/40"></div>
          <div className="relative z-10 w-full max-w-3xl mx-auto py-16 px-8 md:py-24 md:px-16 flex flex-col items-center">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center justify-center relative font-[Montserrat]" style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>
              <span className="z-10">Our Core Pillars At WANAC</span>
            </h2>
            <div className="w-full">
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
          </div>
        </section>

        {/* Strategic Aspirations Section */}
        <section id="aspirations" className="p-8 mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight drop-shadow-lg text-[#002147] text-center font-[Montserrat]" style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>Our Strategic Aspirations</h1>
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

        <section className="relative bg-[#002147] rounded-xl p-0 mb-12 min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: 'url("/community1.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#002147]/90 via-[#002147]/80 to-[#ff5e1a]/40"></div>
          <div className="relative z-10 w-full max-w-2xl mx-auto text-center flex flex-col items-center justify-center py-16 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg font-[Montserrat]" style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>Join the WANAC Community</h2>
            <p className="text-white max-w-xl mx-auto mb-6 text-lg md:text-xl drop-shadow">
              Become part of an empowered network dedicated to making meaningful, positive impacts in society. Connect with us
              to start your transformative journey today.
            </p>
            <a
              href="/services"
              className="inline-block bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition text-lg md:text-xl shadow-lg"
            >
              JOIN COMMUNITY &rarr;
            </a>
          </div>
        </section>

        {/* Leadership Sections */}
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#002147] mb-4 font-[Montserrat]" style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>Our Leadership</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated individuals who guide our mission and drive our success in empowering veterans and professionals.
            </p>
          </div>

          {/* Board of Directors Section */}
          {/*
          <section id="board-of-directors">
            <LeadershipSection 
              title="BOARD OF DIRECTORS" 
              members={leadershipTeams.boardOfDirectors} 
            />
          </section>
          */}

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
