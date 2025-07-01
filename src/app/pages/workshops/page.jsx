import React from "react";
import Link from "next/link";

const WorkshopsPage = () => {
  // Sample workshop data - in a real application, this would come from a CMS or API
  const workshops = [
    {
      id: 1,
      title: "Military to Civilian Career Transition",
      description: "Learn how to translate your military skills into civilian terms and position yourself for success in the job market.",
      date: "June 15, 2024",
      time: "1:00 PM - 3:00 PM ET",
      format: "Virtual",
      instructor: "James Wilson, Career Coach",
      category: "Career Development",
      spots: "25 spots available",
      image: "/promiselandtransition.jpg",
      registrationLink: "/workshops/register/1"
    },
    {
      id: 2,
      title: "Financial Planning for Veterans",
      description: "Understand your benefits, plan for retirement, and build financial security with strategies tailored for veterans.",
      date: "June 22, 2024",
      time: "10:00 AM - 12:00 PM ET",
      format: "In-Person",
      location: "WANAC Center, Washington DC",
      instructor: "Maria Rodriguez, Financial Advisor",
      category: "Financial Wellness",
      spots: "15 spots available",
      image: "/Performancecoaching.png",
      registrationLink: "/workshops/register/2"
    },
    {
      id: 3,
      title: "Mindfulness for Military Families",
      description: "Practical techniques to manage stress and build resilience for service members and their families.",
      date: "July 5, 2024",
      time: "6:00 PM - 7:30 PM ET",
      format: "Virtual",
      instructor: "Dr. Sarah Thompson, Psychologist",
      category: "Mental Health",
      spots: "Unlimited spots",
      image: "/landingpage1.jpg",
      registrationLink: "/workshops/register/3"
    }
  ];

  const categories = [
    "All Categories",
    "Career Development",
    "Financial Wellness",
    "Mental Health",
    "Benefits & Resources",
    "Business",
    "Family Support",
    "Education"
  ];

  const formats = [
    "All Formats",
    "Virtual",
    "In-Person",
    "Hybrid"
  ];

  const featuredWorkshop = workshops[0]; // Using the Career Transition workshop as featured

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      quote: "The career transition workshop gave me the confidence and tools I needed to land a job that values my military experience.",
      name: "Captain Lisa Martinez",
      role: "US Army Veteran",
      workshop: "Military to Civilian Career Transition"
    },
    {
      id: 2,
      quote: "The financial planning workshop helped me understand my benefits and create a solid plan for my family's future.",
      name: "Sergeant David Park",
      role: "US Marine Corps",
      workshop: "Financial Planning for Veterans"
    },
    {
      id: 3,
      quote: "As a military spouse, the employment workshop opened my eyes to career opportunities I hadn't considered before.",
      name: "Jennifer Adams",
      role: "Military Spouse",
      workshop: "Military Spouse Employment Workshop"
    }
  ];

  return (
    <div className="bg-white text-gray-800">
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
          <h1 className="text-5xl font-bold mb-4">WORKSHOPS & EVENTS</h1>
          <p className="text-xl max-w-3xl mx-auto px-4">
            Develop skills and connect with others through our specialised programs and events.
          </p>
        </div>
      </header>
      <section>
          <div className="relative w-full h-16 bg-[#002147] overflow-hidden flex items-center justify-center">
            <nav className="relative z-10 flex space-x-16 px-4">
              <Link href="#Featured-Workshop" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Featured Workshop
              </Link>
              <Link href="#Upcoming-Workshops" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Upcoming Workshops
              </Link>
              <Link href="#Frequently-Asked-Questions" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Past Workshops
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

      {/* Featured Workshop */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8">Featured Workshop</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5">
                <img 
                  src="/transitioncoaching11.jpg" 
                  alt={featuredWorkshop.title} 
                  className="w-full h-full object-cover"
                  style={{ minHeight: "400px" }}
                />
              </div>
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <span className="bg-orange-100 text-orange-600 text-xs font-medium px-3 py-1 rounded-full">
                    {featuredWorkshop.category}
                  </span>
                  <span className="ml-3 bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                    {featuredWorkshop.format}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {featuredWorkshop.title}
                </h3>
                <p className="text-gray-600 mb-6">{featuredWorkshop.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-gray-500">{featuredWorkshop.date}</p>
                      <p className="text-gray-500">{featuredWorkshop.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div>
                      <p className="font-medium">Instructor</p>
                      <p className="text-gray-500">{featuredWorkshop.instructor}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{featuredWorkshop.spots}</span>
                  <a
                    href={featuredWorkshop.registrationLink}
                    className="inline-block bg-orange-500 hover:bg-orange-500 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-300"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 px-6" id="upcoming-workshops">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h2 className="text-3xl font-semibold mb-4 md:mb-0">Upcoming Workshops</h2>
            <div className="flex flex-wrap gap-3">
              <select className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Sort By: Date (Soonest)</option>
                <option value="">Sort By: Date (Latest)</option>
                <option value="">Sort By: Name (A-Z)</option>
                <option value="">Sort By: Name (Z-A)</option>
              </select>
              <select className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                {formats.map((format, index) => (
                  <option key={index} value={format === "All Formats" ? "" : format}>
                    {format}
                  </option>
                ))}
              </select>
              <select className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                {categories.map((category, index) => (
                  <option key={index} value={category === "All Categories" ? "" : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops.map((workshop) => (
              <div 
                key={workshop.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col border border-gray-100"
              >
                <div className="h-48 relative">
                  <img 
                    src={workshop.image} 
                    alt={workshop.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white text-orange-600 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {workshop.format}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center mb-4">
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                      {workshop.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    {workshop.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">{workshop.description}</p>
                  <div className="border-t border-gray-100 pt-4 mb-4">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700">{workshop.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">{workshop.time}</span>
                    </div>
                    {workshop.location && (
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-gray-700">{workshop.location}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-gray-700">{workshop.instructor}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm text-gray-500">{workshop.spots}</span>
                    <a
                      href={workshop.registrationLink}
                      className="text-orange-600 hover:text-orange-800 font-medium transition-colors duration-300"
                    >
                      Register →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center">
            <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
              <a
                href="#"
                className="relative inline-flex items-center rounded-l-md px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-orange-600"
                aria-current="page"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              >
                2
              </a>
              <a
                href="#"
                className="relative hidden md:inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              >
                3
              </a>
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              >
                Next
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            What Participants Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <svg className="h-8 w-8 text-orange-500 mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="italic text-gray-700 mb-6">{testimonial.quote}</p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-800">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                  <p className="text-orange-600 text-sm mt-1">Workshop: {testimonial.workshop}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Workshop */}
      <section className="py-20 px-6 bg-[#002147] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Don't See What You're Looking For?
          </h2>
          <p className="text-xl mb-8">
            Let us know what topics you'd like to see in future workshops.
          </p>
          <a
            href="/contact?subject=Workshop%20Request"
            className="inline-block bg-orange-400 text- white px-8 py-4 rounded-full text-lg font-medium transition-colors duration-300 hover:bg-gray-100"
          >
            Request a Workshop
          </a>
        </div>
      </section>

      {/* Host Information */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="md:flex items-center bg-gray-50 rounded-xl overflow-hidden">
            <div className="md:w-1/2 p-12">
              <h2 className="text-3xl font-bold mb-6">Host a Workshop at Your Location</h2>
              <p className="text-gray-600 mb-8">
                WANAC offers on-site workshops for organizations, military bases, and community groups. Our expert facilitators can deliver customized content for your specific needs.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Customized content for your audience</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Expert facilitators with military background</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Interactive and engaging format</span>
                </li>
              </ul>
              <a
                href="/host-workshop"
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-300"
              >
                Learn More About Hosting
              </a>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/pexels-matthew-hintz-834554-9845006.jpg" 
                alt="Workshop facilitation" 
                className="w-full h-full object-cover"
                style={{ minHeight: "400px" }}
              />
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default WorkshopsPage;