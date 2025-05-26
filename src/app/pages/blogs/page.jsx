"use client";

import React from "react";
import Link from "next/link";
import { FaBookOpen, FaCalendarAlt, FaQuestionCircle } from "react-icons/fa";

const BlogsPage = () => {
  // Sample blog data -  this would come from a CMS or API
  const blogPosts = [
    {
      id: 1,
      title: "5 Ways to Support Military Families During Deployment",
      excerpt: "Deployment can be a challenging time for military families. Here are five practical ways you can provide support and make a difference.",
      author: "Captain Maria Rodriguez",
      date: "June 15, 2023",
      category: "Family Support",
      readTime: "5 min read",
      image: "/images/blogs/military-family-support.jpg",
      slug: "support-military-families-deployment"
    },
    {
      id: 2,
      title: "Transitioning to Civilian Life: A Veteran's Guide",
      excerpt: "Making the switch from military to civilian life presents unique challenges. This comprehensive guide offers practical advice for a smoother transition.",
      author: "Sergeant James Wilson",
      date: "July 3, 2023",
      category: "Career Development",
      readTime: "8 min read",
      image: "/images/blogs/veteran-transition.jpg",
      slug: "transitioning-civilian-life-guide"
    },
    {
      id: 3,
      title: "Mental Health Resources for Veterans: What You Need to Know",
      excerpt: "Navigating mental health services can be overwhelming. This article breaks down the resources available specifically for veterans and their families.",
      author: "Dr. Sarah Thompson",
      date: "August 12, 2023",
      category: "Mental Health",
      readTime: "6 min read",
      image: "/images/blogs/veteran-mental-health.jpg",
      slug: "mental-health-resources-veterans"
    },
    {
      id: 4,
      title: "How Corporate America Can Better Support Veteran Employees",
      excerpt: "Companies are increasingly recognizing the unique skills veterans bring to the workplace. Learn how businesses can create more supportive environments.",
      author: "Michael Chen, HR Director",
      date: "September 5, 2023",
      category: "Employment",
      readTime: "7 min read",
      image: "/images/blogs/corporate-veteran-support.jpg",
      slug: "corporate-support-veteran-employees"
    },
    {
      id: 5,
      title: "The Impact of Community Service on Veteran Reintegration",
      excerpt: "Research shows that community service can play a crucial role in helping veterans reintegrate into civilian life. Here's why it matters.",
      author: "Dr. Robert Johnson",
      date: "October 18, 2023",
      category: "Community",
      readTime: "4 min read",
      image: "/images/blogs/veteran-community-service.jpg",
      slug: "community-service-veteran-reintegration"
    },
    {
      id: 6,
      title: "Financial Planning Tips for Military Families",
      excerpt: "Military life comes with unique financial challenges and opportunities. These planning strategies can help secure your family's financial future.",
      author: "Lisa Martinez, Financial Advisor",
      date: "November 10, 2023",
      category: "Financial Wellness",
      readTime: "9 min read",
      image: "/images/blogs/military-financial-planning.jpg",
      slug: "financial-planning-military-families"
    },
    {
      id: 7,
      title: "The Role of Technology in Modern Veteran Support Services",
      excerpt: "From telehealth to online communities, technology is transforming how veterans receive support. Explore the latest innovations making a difference.",
      author: "Tech Specialist David Park",
      date: "December 7, 2023",
      category: "Technology",
      readTime: "6 min read",
      image: "/images/blogs/veteran-tech-support.jpg",
      slug: "technology-veteran-support-services"
    },
    {
      id: 8,
      title: "Supporting Children of Military Personnel: School Resources",
      excerpt: "Children in military families face unique educational challenges. Discover what resources schools are providing to support these students.",
      author: "Education Specialist Emily Taylor",
      date: "January 22, 2024",
      category: "Education",
      readTime: "5 min read",
      image: "/images/blogs/military-children-education.jpg",
      slug: "supporting-military-children-school"
    },
    {
      id: 9,
      title: "WANAC's Impact: 2023 Year in Review",
      excerpt: "A look back at the programs, initiatives, and lives changed through WANAC's work over the past year, with stories from those we've served.",
      author: "WANAC Leadership Team",
      date: "February 1, 2024",
      category: "Organization News",
      readTime: "10 min read",
      image: "/images/blogs/wanac-year-review.jpg",
      slug: "wanac-impact-year-review"
    }
  ];

  const categories = [
    "All Categories",
    "Family Support",
    "Career Development",
    "Mental Health",
    "Employment",
    "Community",
    "Financial Wellness",
    "Technology",
    "Education",
    "Organization News"
  ];

  const featuredPost = blogPosts[8]; // Using the Year in Review post as featured

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
          <h1 className="text-5xl font-bold mb-4">WANAC BLOGS</h1>
          <p className="text-xl max-w-3xl mx-auto px-4">
            Stay updated with the latest news, insights, and resources from WANAC.
          </p>
        </div>
      </header>
      <section>
          <div className="relative w-full h-10 bg-[#002147] overflow-hidden flex items-center justify-center">
            <nav className="relative z-10 flex space-x-16 px-4">
              <Link href="#Featured-Workshop" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                Featured Blog
              </Link>
              <Link href="#Upcoming-Workshops" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                All Blogs
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

      {/* Featured Post */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8">Featured Articles</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover"
                  style={{ minHeight: "400px" }}
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <span className="bg-orange-100 text-orange-600 text-xs font-medium px-3 py-1 rounded-full">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-4">{featuredPost.date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  <Link href={`/resources/blogs/${featuredPost.slug}`} className="hover:text-orange-600 transition-colors duration-300">
                    {featuredPost.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-gray-500">{featuredPost.readTime}</span>
                  <Link 
                    href={`/resources/blogs/${featuredPost.slug}`}
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  category === "All Categories" 
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

      {/* Blog Posts Grid */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 8).map((post) => (
              <div 
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="h-48 relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center mb-4">
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm ml-4">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    <Link href={`/resources/blogs/${post.slug}`} className="hover:text-orange-600 transition-colors duration-300">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <Link 
                      href={`/resources/blogs/${post.slug}`}
                      className="text-orange-500 hover:text-orange-700 font-medium transition-colors duration-300"
                    >
                      Read More →
                    </Link>
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
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-orange-500"
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
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
                ...
              </span>
              <a
                href="#"
                className="relative hidden md:inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              >
                8
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              >
                9
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

      {/* Newsletter Signup */}
      <section className="py-20 px-6 bg-[#002147] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-lg text-white mb-8">
            Subscribe to our newsletter to receive the latest articles, resources, and updates.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-colors duration-300"
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs text-white mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from WANAC.
            </p>
          </form>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-20 px-6 bg-[#002147]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-white font-semibold mb-12 text-center animate-fadeIn">
            Explore More Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slideUp">
              <div className="text-4xl mb-6 mx-auto w-16 h-16 flex items-center justify-center bg-orange-100 text-orange-500 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <FaBookOpen className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-orange-500 transition-colors duration-300">Blog Articles</h3>
              <p className="text-gray-600 mb-6">
                Read our latest articles on military life, veteran resources, and community stories.
              </p>
              <Link
                href="/resources/blogs"
                className="inline-flex items-center text-orange-500 hover:text-orange-700 font-medium group-hover:translate-x-2 transition-transform duration-300"
              >
                Read Articles <span className="ml-2">→</span>
              </Link>
            </div>
            
            <div className="group bg-white rounded-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slideUp [animation-delay:200ms]">
              <div className="text-4xl mb-6 mx-auto w-16 h-16 flex items-center justify-center bg-orange-100 text-orange-500 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <FaCalendarAlt className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-orange-500 transition-colors duration-300">Workshops & Events</h3>
              <p className="text-gray-600 mb-6">
                Join our virtual and in-person events designed to support your journey.
              </p>
              <Link
                href="/resources/workshops"
                className="inline-flex items-center text-orange-500 hover:text-orange-700 font-medium group-hover:translate-x-2 transition-transform duration-300"
              >
                View Calendar <span className="ml-2">→</span>
              </Link>
            </div>
            
            <div className="group bg-white rounded-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slideUp [animation-delay:400ms]">
              <div className="text-4xl mb-6 mx-auto w-16 h-16 flex items-center justify-center bg-orange-100 text-orange-500 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <FaQuestionCircle className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-orange-500 transition-colors duration-300">Help Center</h3>
              <p className="text-gray-600 mb-6">
                Find answers to common questions and access support resources.
              </p>
              <Link
                href="/resources/helpcenter"
                className="inline-flex items-center text-orange-500 hover:text-orange-700 font-medium group-hover:translate-x-2 transition-transform duration-300"
              >
                Get Help <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
