import React from "react";
import Link from "next/link";

const LeadershipGivingPage = () => {
  return (
    <div className="text-gray-800 bg-white">
      {/* Hero Section */}
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
          <h1 className="text-5xl font-bold mb-4">LEADERSHIP GIVING</h1>
          <p className="text-xl max-w-3xl mx-auto px-4">
            Make a lasting impact through philanthropic leadership and transform the lives of service members and their families.
          </p>
        </div>
      </header>
      <section>
          <div className="relative w-full h-10 bg-[#002147] overflow-hidden flex items-center justify-center">
            <nav className="relative z-10 flex space-x-16 px-4">
              <Link href="#How-to-Volunteer" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                How to Volunteer
              </Link>
              <Link href="#Volunteer-Stories" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Volunteer Stories
              </Link>
              <Link href="#Frequently-Asked-Questions" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Frequently Asked Questions
              </Link>
              <Link href="#Ready-to-Make-a-Difference" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Ready to Make a Difference?
              </Link>
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

      {/* Gift Options */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Ways to Make a Major Impact</h2>
          <p className="text-gray-700 mb-8">
            Join a dedicated community of supporters through meaningful gift opportunities.
          </p>
          <div className=" items-center justify-center text-left">
            <p>
            The WANAC Leadership Circle honors individuals and family foundations who annually contribute $10,000 or more to support our mission of empowering veterans through personalized coaching and transition support. Leadership-level giving plays a vital role in ensuring WANAC has the flexibility to deliver consistent, high-impact programming while also responding swiftly to urgent needs within the veteran community.

For years, WANAC has stood beside veterans as they navigate the often complex journey from military to civilian life—providing guidance, connection, and empowerment every step of the way. Members of the Leadership Circle are unique in that their involvement is tailored to align with their philanthropic goals and giving level.

By joining the Leadership Circle, you can take pride in knowing your generosity directly fuels the success of transitioning service members and their families. Your gift enables WANAC to stay responsive, resourceful, and resilient—meeting veterans where they are with the support they deserve. Members also receive exclusive benefits, including recognition at key events, early access to special programs, and national acknowledgment of your commitment to our veteran community.

Together, we can ensure no veteran navigates transition alone—and that every service member finds strength, purpose, and opportunity beyond their service.
            </p>
          </div>
        </div>
      </section>

      {/* Want to make a difference? */}
      <section id="get-involved" className="bg-[#002147] text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Want To Learn More?</h2>
        <p className="text-lg mb-6">
          Make a difference that endures for generations.
        </p>
        <a
          href="/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-500 text-white hover:bg-orange-200 text-white px-6 py-3 text-lg font-medium rounded-full"
        >
          Get Involved
        </a>
      </section>

      {/* Leadership Circle Benefits */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#002147]">Leadership Circle Benefits</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">Join an exclusive community of philanthropic leaders making a lasting impact on veterans' lives</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Founder's Circle */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-orange-500 relative group">
              <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg rounded-tr-xl">
                PREMIER LEVEL
              </div>
              <h3 className="text-2xl font-bold text-[#002147] mb-3">Founder's Circle</h3>
              <p className="text-2xl text-orange-500 font-bold mb-6">$1,000,000 or more</p>
              <div className="space-y-6 text-left">
                <p className="text-gray-700 font-medium bg-orange-50 p-3 rounded-lg">All the benefits listed below, plus:</p>
                <ul className="space-y-4">
                  <li className="flex items-start group-hover:transform group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-orange-500 mr-3 mt-1">•</span>
                    <span>Premier recognition at an annual WANAC Stewardship event</span>
                  </li>
                  <li className="flex items-start group-hover:transform group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-orange-500 mr-3 mt-1">•</span>
                    <span>Personal presentation of an American Flag flown over an overseas USO center to honor your support, with a personal letter and certificate</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Liberty Circle */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-orange-400 group">
              <h3 className="text-2xl font-bold text-[#002147] mb-3">Liberty Circle</h3>
              <p className="text-2xl text-orange-500 font-bold mb-6">$500,000-$999,999</p>
              <div className="space-y-6 text-left">
                <p className="text-gray-700 font-medium bg-orange-50 p-3 rounded-lg">All the benefits listed below, plus:</p>
                <ul className="space-y-4">
                  <li className="flex items-start group-hover:transform group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-orange-500 mr-3 mt-1">•</span>
                    <span>Special invitation to attend a WANAC VIP Lunch/Dinner</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Executive Circle */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-orange-300 group">
              <h3 className="text-2xl font-bold text-[#002147] mb-3">Executive Circle</h3>
              <p className="text-2xl text-orange-500 font-bold mb-6">$250,000-$499,999</p>
              <div className="space-y-6 text-left">
                <p className="text-gray-700 font-medium bg-orange-50 p-3 rounded-lg">All the benefits listed below, plus:</p>
                <ul className="space-y-4">
                  <li className="flex items-start group-hover:transform group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-orange-500 mr-3 mt-1">•</span>
                    <span>Exclusive access to WANAC leadership events and networking opportunities</span>
                  </li>
                  <li className="flex items-start group-hover:transform group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-orange-500 mr-3 mt-1">•</span>
                    <span>Recognition in WANAC's annual impact report</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* President's Circle */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-orange-200 group">
              <h3 className="text-2xl font-bold text-[#002147] mb-3">President's Circle</h3>
              <p className="text-2xl text-orange-500 font-bold mb-6">$100,000-$249,999</p>
              <div className="space-y-6 text-left">
                <p className="text-gray-700 font-medium bg-orange-50 p-3 rounded-lg">All the benefits listed below, plus:</p>
                <ul className="space-y-4">
                  <li className="flex items-start group-hover:transform group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-orange-500 mr-3 mt-1">•</span>
                    <span>Quarterly briefings on WANAC's impact and initiatives</span>
                  </li>
                  <li className="flex items-start group-hover:transform group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-orange-500 mr-3 mt-1">•</span>
                    <span>Priority invitations to special WANAC events</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="give-now" className="bg-[#002147] text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Leadership Circle</h2>
        <p className="text-lg mb-6">
          Make a difference that endures for generations.
        </p>
        <a
          href="/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-500 text-white hover:bg-orange-200 text-white px-6 py-3 text-lg font-medium rounded-full"
        >
          Contact Our Team
        </a>
      </section>
    </div>
  );
};

export default LeadershipGivingPage;
