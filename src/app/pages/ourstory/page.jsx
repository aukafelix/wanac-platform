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
      // Add more board members
    ],
    advisoryBoard: [
      {
        name: "John Smith",
        title: "Strategic Advisor",
        expertise: "Veteran Affairs & Business Development",
        image: "path-to-image.jpg"
      },
      {
        name: "John Smith",
        title: "Strategic Advisor",
        expertise: "Veteran Affairs & Business Development",
        image: "path-to-image.jpg"
      },
      {
        name: "John Smith",
        title: "Strategic Advisor",
        expertise: "Veteran Affairs & Business Development",
        image: "path-to-image.jpg"
      },
      // Add more advisory board members
    ],
    veteranAdvisoryBoard: [
      {
        name: "Sarah Johnson",
        title: "Veteran Advisor",
        service: "U.S. Marine Corps",
        expertise: "Entrepreneurship",
        image: "path-to-image.jpg"
      },{
        name: "Sarah Johnson",
        title: "Veteran Advisor",
        service: "U.S. Marine Corps",
        expertise: "Entrepreneurship",
        image: "path-to-image.jpg"
      },
      {
        name: "Sarah Johnson",
        title: "Veteran Advisor",
        service: "U.S. Marine Corps",
        expertise: "Entrepreneurship",
        image: "path-to-image.jpg"
      },
      // Add more veteran advisors
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
      // Add more executive staff
    ]
  };

  const LeadershipSection = ({ title, members, type }) => (
    <section className="py-8">
      <h2 className="text-3xl text-center font-bold text-[#002147] mb-6 border-b-2 border-blue-600 pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="aspect-w-1 aspect-h-1 mb-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
            <p className="text-blue-600 font-medium">{member.title}</p>
            {type === 'veteran' && (
              <p className="text-gray-600 mt-2">{member.service}</p>
            )}
            {member.expertise && (
              <p className="text-gray-700 mt-2">{member.expertise}</p>
            )}
            {member.bio && (
              <p className="text-gray-600 mt-2 text-sm">{member.bio}</p>
            )}
          </div>
        ))}
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
              <a href="#advisory" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Advisory Board
              </a>
              <a href="#veteran" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Veteran Advisory
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
            <div>
              <h2 className="text-3xl font-bold text-[#002147] mb-6 border-l-4 border-blue-600 pl-4">
                ABOUT WANAC
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold">WANAC </span> is a 
                  purpose-driven coaching platform designed to empower military veterans as they transition 
                  into civilian life. As a <span className="text-blue-600 font-medium">nonprofit created by 
                  veterans, for veterans</span>, we understand the unique challenges faced by veterans—from 
                  adapting to civilian culture to navigating mental health and career reintegration.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Our mission is to provide tailored coaching services that address the personal, professional, 
                  and emotional needs of transitioning veterans, enabling them to thrive beyond military service.
                </p>
                <div className="mt-6">
                  <h3 className="text-2xl font-semibold text-[#002147] mb-4">What We Offer</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2"></span>
                      <div>
                        <span className="font-semibold">Personalized Coaching Services:</span> One-on-one coaching 
                        sessions tailored to specific goals, from career advancement to entrepreneurship.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2"></span>
                      <div>
                        <span className="font-semibold">Group Workshops:</span> Interactive sessions on key topics 
                        such as translating military skills, resume writing, and leadership development.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2"></span>
                      <div>
                        <span className="font-semibold">Peer Support Network:</span> A vibrant community where 
                        veterans can connect, share experiences, and build lasting camaraderie.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2"></span>
                      <div>
                        <span className="font-semibold">Resource Hub:</span> An extensive library of digital 
                        resources, including articles, guides, videos, and webinars.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2"></span>
                      <div>
                        <span className="font-semibold">Mentorship Programs:</span> Connect with trained mentors—many 
                        of whom are veterans themselves—offering guidance through lived experience.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative h-full flex items-center">
              <img
                src="/veteran1.jpg"
                alt="Veterans in professional setting"
                className="w-full h-ful object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-blue-900 opacity-20 rounded-lg"></div>
            </div>
          </div>
        </section>

        {/* Leadership Sections */}
        <section id="board">
          <LeadershipSection 
            title="BOARD OF DIRECTORS" 
            members={leadershipTeams.boardOfDirectors} 
          />
        </section>
        <section id="advisory">
          <LeadershipSection 
            title="ADVISORY BOARD" 
            members={leadershipTeams.advisoryBoard} 
          />
        </section>
        <section id="veteran">
          <LeadershipSection 
            title="VETERAN ADVISORY BOARD" 
            members={leadershipTeams.veteranAdvisoryBoard} 
            type="veteran"
          />
        </section>
        <section id="executive">
          <LeadershipSection 
            title="EXECUTIVE STAFF" 
            members={leadershipTeams.executiveStaff} 
          />
        </section>

        {/* Call to Action */}
        <section className="bg-[#002147] text-white rounded-xl p-8 mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-lg mb-6">
            Support veteran entrepreneurs and help build the next generation of business leaders.
          </p>
          <div className="space-x-4">
            <a
              href="/donate"
              className="inline-block bg-orange-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
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
