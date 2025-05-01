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
      // Add more board members
    ],
    advisoryBoard: [
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
      // Add more executive staff
    ]
  };

  const LeadershipSection = ({ title, members, type }) => (
    <section className="py-8">
      <h2 className="text-3xl font-bold text-[#002147] mb-6 border-b-2 border-blue-600 pb-2">
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
      {/* Hero Section */}
      <header className="bg-[#002147] text-white py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">OUR STORY</h1>
        <p className="text-xl max-w-3xl mx-auto px-4">
          Building a legacy of veteran entrepreneurship and leadership
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Mission Section */}
        <section className="bg-white p-8 rounded-xl shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-[#002147] mb-6 border-l-4 border-blue-600 pl-4">
            ABOUT WANAC
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">Founded in 2025</span>, WANAC as a
              beacon of hope and opportunity for our nation's veterans. As a
              <span className="text-blue-600 font-medium"> nonprofit created by veterans, for veterans</span>,
              we understand the unique challenges and incredible potential that our service members possess.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Our mission transcends simple business support - we're building a community of
              <span className="italic"> Vetrepreneurs</span> who are ready to make their mark in the
              business world, leveraging the skills and discipline gained through military service.
            </p>
          </div>
        </section>

        {/* Leadership Sections */}
        <LeadershipSection 
          title="BOARD OF DIRECTORS" 
          members={leadershipTeams.boardOfDirectors} 
        />
        <LeadershipSection 
          title="ADVISORY BOARD" 
          members={leadershipTeams.advisoryBoard} 
        />
        <LeadershipSection 
          title="VETERAN ADVISORY BOARD" 
          members={leadershipTeams.veteranAdvisoryBoard} 
          type="veteran"
        />
        <LeadershipSection 
          title="EXECUTIVE STAFF" 
          members={leadershipTeams.executiveStaff} 
        />

        {/* Call to Action */}
        <section className="bg-blue-900 text-white rounded-xl p-8 mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-lg mb-6">
            Support veteran entrepreneurs and help build the next generation of business leaders.
          </p>
          <div className="space-x-4">
            <a
              href="https://www.warriorrising.org/donate/"
              className="inline-block bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              target="_blank"
              rel="noreferrer"
            >
              Donate Today
            </a>
            <a
              href="https://www.warriorrising.org/volunteer/"
              className="inline-block border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition"
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
