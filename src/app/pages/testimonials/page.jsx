import React from "react";
import Link from "next/link";

const TestimonialsPage = () => {
  const testimonials = [
    {
      id: 1,
      name: "Captain Sarah Johnson",
      role: "US Army Veteran",
      quote: "WANAC provided me with the support and resources I needed during my transition to civilian life. Their coaching program helped me discover a new career path that leverages my military experience.",
      image: "/images/testimonials/sarah-johnson.jpg",
      category: "Veterans"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Military Spouse",
      quote: "When my wife was deployed, WANAC's family support programs were a lifeline for our children and me. The community they've built truly understands the unique challenges military families face.",
      image: "/images/testimonials/michael-rodriguez.jpg",
      category: "Military Families"
    },
    {
      id: 3,
      name: "Lieutenant Commander David Chen",
      role: "Active Duty Navy",
      quote: "The mental health resources provided by WANAC have been invaluable for my unit. Their understanding of military culture makes their programs particularly effective.",
      image: "/images/testimonials/david-chen.jpg",
      category: "Active Duty"
    },
    {
      id: 4,
      name: "Emily Williams",
      role: "Program Participant",
      quote: "After struggling with adjustment issues, WANAC's coaching program helped me rebuild my confidence and find purpose. I'm now helping other veterans navigate similar challenges.",
      image: "/images/testimonials/emily-williams.jpg",
      category: "Program Participants"
    },
    {
      id: 5,
      name: "Sergeant James Thompson",
      role: "National Guard",
      quote: "The career transition workshops were exactly what I needed to translate my military skills into civilian terms. Within two months, I had multiple job offers.",
      image: "/images/testimonials/james-thompson.jpg",
      category: "Career Development"
    },
    {
      id: 6,
      name: "Rebecca Martinez",
      role: "Military Child",
      quote: "Growing up in a military family wasn't always easy, but WANAC's youth programs gave me a place to connect with others who understood. Now as an adult, I volunteer to give back.",
      image: "/images/testimonials/rebecca-martinez.jpg",
      category: "Youth Programs"
    },
    {
      id: 7,
      name: "Colonel Robert Wilson",
      role: "Retired Air Force",
      quote: "After 25 years of service, I wasn't sure what was next. WANAC's mentorship program paired me with someone who had walked the same path, making all the difference in my transition.",
      image: "/images/testimonials/robert-wilson.jpg",
      category: "Mentorship"
    },
    {
      id: 8,
      name: "Lisa Anderson",
      role: "Corporate Partner",
      quote: "Partnering with WANAC has allowed our company to meaningfully support veterans while also gaining exceptional talent. Their approach to corporate partnerships is thoughtful and impactful.",
      image: "/images/testimonials/lisa-anderson.jpg",
      category: "Partners"
    },
    {
      id: 9,
      name: "Dr. Thomas Parker",
      role: "WANAC Volunteer",
      quote: "Volunteering with WANAC has been one of the most rewarding experiences of my life. Seeing the direct impact of our programs on service members and their families is incredibly fulfilling.",
      image: "/images/testimonials/thomas-parker.jpg",
      category: "Volunteers"
    }
  ];

  const categories = [
    "All",
    "Veterans",
    "Military Families",
    "Active Duty",
    "Program Participants",
    "Career Development",
    "Youth Programs",
    "Mentorship",
    "Partners",
    "Volunteers"
  ];

  const videoTestimonials = [
    {
      id: 1,
      name: "Major Jennifer Adams",
      role: "US Marine Corps Veteran",
      videoUrl: "https://www.youtube.com/embed/example1",
      thumbnail: "/images/testimonials/video-thumbnail-1.jpg",
      description: "Jennifer shares how WANAC's programs helped her family during multiple deployments and her eventual transition to civilian life."
    },
    {
      id: 2,
      name: "The Sanchez Family",
      role: "Military Family",
      videoUrl: "https://www.youtube.com/embed/example2",
      thumbnail: "/images/testimonials/video-thumbnail-2.jpg",
      description: "The Sanchez family discusses how WANAC's support programs helped them navigate the challenges of military life together."
    },
    {
      id: 3,
      name: "Tech Sergeant Kevin Miller",
      role: "Air Force Veteran",
      videoUrl: "https://www.youtube.com/embed/example3",
      thumbnail: "/images/testimonials/video-thumbnail-3.jpg",
      description: "Kevin explains how WANAC's career transition program helped him find meaningful employment after his military service."
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
          <h1 className="text-5xl font-bold mb-4">STORIES OF IMPACT</h1>
          <p className="text-xl max-w-3xl mx-auto px-4">
            Hear from the people who have been impacted by WANAC's programs.
          </p>
        </div>
      </header>
      <section>
          <div className="relative w-full h-10 bg-[#002147] overflow-hidden flex items-center justify-center">
            <nav className="relative z-10 flex space-x-16 px-4">
              <Link href="#How-to-Volunteer" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Featured Testimonial
              </Link>
              <Link href="#Volunteer-Stories" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                VideoTestimonials
              </Link>
              <Link href="#Frequently-Asked-Questions" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Share Your Story
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

      {/* Featured Testimonial */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-full relative">
                  <img 
                    src="/images/testimonials/featured-testimonial.jpg" 
                    alt="Featured testimonial" 
                    className="w-full h-full object-cover"
                    style={{ minHeight: "400px" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 md:hidden"></div>
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="text-5xl text-orange-500 mb-6">"</div>
                <blockquote className="text-xl md:text-2xl italic mb-8 text-gray-700">
                  WANAC didn't just help me find a job – they helped me find my purpose after service. Their holistic approach to veteran support addresses the mind, body, and spirit in ways I hadn't experienced with other organizations.
                </blockquote>
                <div className="flex items-center">
                  <img 
                    src="/images/testimonials/featured-person.jpg" 
                    alt="Master Sergeant William Taylor" 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-bold text-lg">Master Sergeant William Taylor</p>
                    <p className="text-orange-500">US Army, Retired</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">FILTER TESTIMONIAL</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  category === "All" 
                    ? "bg-orange-500 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-64 relative">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {testimonial.category}
                  </div>
                </div>
                <div className="p-6">
                  <blockquote className="italic text-gray-700 mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <p className="font-bold text-gray-800">{testimonial.name}</p>
                    <p className="text-orange-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            VIDEO TESTIMONIALS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videoTestimonials.map((video) => (
              <div 
                key={video.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={`${video.name} video thumbnail`} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{video.name}</h3>
                  <p className="text-orange-500 mb-4">{video.role}</p>
                  <p className="text-gray-600 mb-4">{video.description}</p>
                  <a 
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-orange-500 hover:bg-orange-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                  >
                    Watch Video
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="py-20 px-6 bg-[#002147] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            SHARE YOUR WANAC STORY
          </h2>
          <p className="text-xl mb-8">
            Has WANAC made a difference in your life? We'd love to hear about your experience.
          </p>
          <a
            href="/contact?subject=My%20WANAC%20Story"
            className="inline-block bg-white text-[#002147] px-8 py-4 rounded-full text-lg font-medium transition-colors duration-300 hover:bg-gray-100"
          >
            Share Your Story
          </a>
        </div>
      </section>

      {/* Testimonial Stats */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">95%</div>
              <p className="text-gray-700">of program participants report improved well-being</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">10,000+</div>
              <p className="text-gray-700">service members and families supported annually</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">87%</div>
              <p className="text-gray-700">of veterans find employment within 6 months</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;