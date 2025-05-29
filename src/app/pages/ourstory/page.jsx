"use client";

import React from "react";

const OurStory = () => {
  const leadershipTeams = {
    boardOfDirectors: [
      {
        name: "Jason B.A. Van Camp",
        title: "Chairman of the Board",
        image: "path-to-image.jpg",
        bio: "Founder and Executive Chairman"
      },
      {
        name: "Jason B.A. Van Camp",
        title: "Chairman of the Board",
        image: "path-to-image.jpg",
        bio: "Founder and Executive Chairman"
      },
      {
        name: "Jason B.A. Van Camp",
        title: "Chairman of the Board",
        image: "path-to-image.jpg",
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
          <h1 className="text-5xl font-bold mb-4">OUR STORY</h1>
          <p className="text-xl max-w-3xl mx-auto px-4">
            Building a legacy of veteran entrepreneurship and leadership
          </p>
        </div>
      </header>
      <section>
          <div className="relative w-full h-10 bg-[#002147] overflow-hidden flex items-center justify-center">
            <nav className="relative z-10 flex space-x-16 px-4">
              <a href="#about" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                About
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
      <main className="max-w-7xl mx-auto px-4 py-12">

        {/* Mission Section */}
        <section id="about" className="bg-white p-8 rounded-xl shadow-lg mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <h2 className="text-3xl font-bold text-[#002147] tracking-tight">
                  ABOUT WANAC
                </h2>
                <p className="text-gray-600 mt-1 text-base">Empowering Veterans Through Excellence</p>
              </div>
              
              <div className="prose prose-base max-w-none space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#002147] mb-3 flex items-center">
                    <span className="w-6 h-0.5 bg-blue-600 mr-2"></span>
                    Our Mission
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    WANAC is committed to empowering transitioning service members, veterans, and professionals by delivering
                    transformative coaching and training that fosters personal growth, professional excellence, and entrepreneurial
                    success. Our innovative programs and resources are carefully designed to enable participants to lead impactful lives in
                    their communities and beyond.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#002147] mb-3 flex items-center">
                    <span className="w-6 h-0.5 bg-blue-600 mr-2"></span>
                    What Sets WANAC Apart
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      In today's rapidly evolving world, the ability to adapt, lead, and inspire others is more important than ever. At WANAC,
                      we cultivate forward-thinking leaders who not only possess strategic insight and adaptability but also excel in
                      emotional intelligence and resilience—key traits of transformative leadership.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-3">
                      Our distinctive approach combines rigorous academic insights with real-world experiences, preparing our participants
                      to confidently navigate life's transitions and professional challenges.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#002147] mb-3 flex items-center">
                    <span className="w-6 h-0.5 bg-blue-600 mr-2"></span>
                    Core Pillars of WANAC
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      {
                        title: "Clarity and Vision",
                        desc: "Establishing clear personal and professional pathways."
                      },
                      {
                        title: "Energy and Resilience",
                        desc: "Optimizing physical, emotional, and mental well-being."
                      },
                      {
                        title: "Courage and Confidence",
                        desc: "Building the ability to navigate challenges with strength."
                      },
                      {
                        title: "Productivity and Excellence",
                        desc: "Empowering individuals to achieve exceptional results."
                      },
                      {
                        title: "Influence and Leadership",
                        desc: "Enhancing interpersonal skills to inspire and drive change."
                      }
                    ].map((pillar, index) => (
                      <div key={index} className="flex items-start p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
                        <span className="text-blue-600 font-bold mr-2 text-base">0{index + 1}</span>
                        <div>
                          <span className="font-bold text-gray-900">{pillar.title}:</span>
                          <span className="text-gray-700 ml-1 text-sm">{pillar.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#002147] mb-3 flex items-center">
                    <span className="w-6 h-0.5 bg-blue-600 mr-2"></span>
                    Our Strategic Aspirations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      {
                        title: "Attain Excellence",
                        desc: "We are dedicated to excellence in every program, resource, and initiative we undertake."
                      },
                      {
                        title: "Empower Lifelong Success",
                        desc: "We provide comprehensive tools and support to ensure sustainable success."
                      },
                      {
                        title: "Drive Innovation",
                        desc: "We continuously innovate our methodologies to deliver cutting-edge coaching and training solutions."
                      },
                      {
                        title: "Build Strong Community",
                        desc: "We foster an inclusive community, creating meaningful connections among veterans, professionals, and industry leaders."
                      },
                      {
                        title: "Create Opportunity and Access",
                        desc: "We strive to remove barriers, promoting opportunities for personal and professional advancement for traditionally underserved groups."
                      }
                    ].map((aspiration, index) => (
                      <div key={index} className="p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
                        <h4 className="font-semibold text-[#002147] mb-1 text-sm">{aspiration.title}</h4>
                        <p className="text-gray-700 text-sm">{aspiration.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-full flex flex-col gap-4">
              <div className="relative h-2/3 overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/veteran1.jpg"
                  alt="Veterans in professional setting"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h4 className="text-xl font-bold mb-1">Transforming Lives</h4>
                  <p className="text-xs opacity-90">Building tomorrow's leaders through veteran empowerment</p>
                </div>
              </div>
              <div className="relative h-1/3 overflow-hidden rounded-lg bg-[#002147] p-4 text-white flex items-center">
                <div>
                  <h4 className="text-lg font-bold mb-2">Join Our Mission</h4>
                  <p className="text-xs opacity-90 mb-3">Be part of our journey in empowering veterans and creating future leaders.</p>
                  <a href="/contact" className="inline-flex items-center text-xs font-semibold text-white hover:text-blue-200 transition-colors">
                    Learn More 
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
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
        <section className="bg-[#002147] text-white rounded-xl p-8 mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-lg mb-6">
            Support veteran entrepreneurs and help build the next generation of business leaders.
          </p>
          <div className="space-x-4">
            <a
              href="/donate"
              className="inline-block bg-orange-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              target="_blank"
              rel="noreferrer"
            >
              Donate Today
            </a>
            <a
              href="/volunteer"
              className="inline-block border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover: text-blue-900 transition"
              target="_blank"
              rel="noreferrer"
            >
              Volunteer
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OurStory;
