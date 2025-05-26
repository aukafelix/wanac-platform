import React from "react";
import Link from "next/link";

const CorporatePartnersPage = () => {
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
          <h1 className="text-5xl font-bold mb-4">PARTNER WITH WANAC</h1>
          <p className="text-xl max-w-3xl mx-auto px-4">
            Join us in supporting our military heroes and their families
          </p>
        </div>
      </header>
      <section>
          <div className="relative w-full h-10 bg-[#002147] overflow-hidden flex items-center justify-center">
            <nav className="relative z-10 flex space-x-16 px-4">
              <Link href="#Why-Partner-With-Us" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Why Partner With Us
              </Link>
              <Link href="#Our-Corporate-Partners" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Our Corporate Partners
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

      {/* Why Partner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002147] relative inline-block pb-4">
              Why Partner With Us?
            </h2>
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
              By partnering with the WANAC, your company demonstrates its commitment to the men and women who serve our country. 
              <span className="block mt-2">We offer meaningful opportunities for engagement, recognition, and impact.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 px-4">
            {[
              { 
                title: "Brand Alignment",
                desc: "Associate your business with a trusted and respected nonprofit.",
                icon: ""
              },
              { 
                title: "Employee Engagement",
                desc: "Inspire your team through volunteerism and shared purpose.",
                icon: ""
              },
              { 
                title: "Social Impact",
                desc: "Contribute directly to the morale and wellbeing of service members.",
                icon: ""
              }
            ].map(({ title, desc, icon }, idx) => (
              <div 
                key={idx} 
                className="relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400"></div>
                <div className="p-8 sm:p-10">
                  <div className="text-4xl mb-6">{icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-[#002147] group-hover:text-orange-500 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                    {desc}
                  </p>
                  <div className="mt-6 flex items-center justify-center">
                    <span className="inline-flex items-center text-orange-500 font-medium hover:text-orange-600 transition-colors duration-300">
                      Learn more
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400"></div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="inline-flex items-center px-8 py-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105">
              <span className="text-lg font-semibold">Become a Partner</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Corporate Logos */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10">Our Corporate Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {[...Array(4)].map((_, i) => (
              <img
                key={i}
                src={`/images/partner-logo-${i + 1}.png`}
                alt={`Partner ${i + 1}`}
                className="h-20 mx-auto object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Become a Partner */}
      <section id="become-partner" className="bg-[#002147] text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
        <p className="text-lg mb-6">
          Learn more about how your organization can partner with the WANAC to support our military heroes.
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

export default CorporatePartnersPage;
