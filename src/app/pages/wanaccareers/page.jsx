"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Users, 
  Heart, 
  Globe,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  DollarSign
} from "lucide-react";

const WanacCareers = () => {
  const [activeJob, setActiveJob] = useState(null);

  // Job openings data
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Program Manager - Veteran Services",
      department: "Programs",
      location: "El Segundo, CA / Remote",
      type: "Full-time",
      salary: "$75,000 - $95,000",
      description: "Lead strategic initiatives for veteran transition programs, manage program deliverables, and collaborate with stakeholders to ensure program success.",
      requirements: [
        "Bachelor's degree in Business, Social Work, or related field",
        "5+ years experience in program management",
        "Veterans preference - understanding of military culture",
        "Excellent communication and leadership skills",
        "Experience with nonprofit organizations preferred"
      ],
      responsibilities: [
        "Manage multiple veteran support programs simultaneously",
        "Develop and implement program strategies and timelines",
        "Coordinate with coaching staff and external partners",
        "Monitor program metrics and report on outcomes",
        "Lead cross-functional teams to achieve program goals"
      ]
    },
    {
      id: 2,
      title: "Community Outreach Coordinator",
      department: "Community Relations",
      location: "Remote",
      type: "Full-time",
      salary: "$50,000 - $65,000",
      description: "Build and maintain relationships with veteran communities, organize outreach events, and expand WANAC's reach to underserved populations.",
      requirements: [
        "Bachelor's degree in Communications, Marketing, or related field",
        "3+ years experience in community outreach or social services",
        "Strong networking and relationship-building skills",
        "Experience working with veteran or military populations",
        "Proficiency in social media and digital marketing"
      ],
      responsibilities: [
        "Develop and execute community outreach strategies",
        "Build partnerships with veteran service organizations",
        "Organize and coordinate community events and workshops",
        "Manage social media presence and community engagement",
        "Track and report on outreach metrics and impact"
      ]
    },
    {
      id: 3,
      title: "Certified Life Coach - Peak Performance",
      department: "Coaching",
      location: "Remote / Travel Required",
      type: "Full-time",
      salary: "$60,000 - $80,000",
      description: "Provide one-on-one coaching to veterans and service members transitioning to civilian careers, focusing on personal development and professional growth.",
      requirements: [
        "Certified Life Coach (ICF, ACSTH, or equivalent)",
        "3+ years coaching experience, preferably with veterans",
        "Military background strongly preferred",
        "Strong interpersonal and communication skills",
        "Experience with virtual coaching platforms"
      ],
      responsibilities: [
        "Conduct individual and group coaching sessions",
        "Develop personalized coaching plans for clients",
        "Track client progress and outcomes",
        "Participate in team meetings and training sessions",
        "Contribute to program development and improvement"
      ]
    },
    {
      id: 4,
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "El Segundo, CA / Hybrid",
      type: "Full-time",
      salary: "$55,000 - $70,000",
      description: "Drive digital marketing initiatives to increase awareness of WANAC programs and services, manage online presence, and support fundraising efforts.",
      requirements: [
        "Bachelor's degree in Marketing, Communications, or related field",
        "3+ years experience in digital marketing",
        "Proficiency in Google Analytics, social media platforms, and email marketing",
        "Experience with nonprofit marketing preferred",
        "Creative thinking and analytical skills"
      ],
      responsibilities: [
        "Develop and execute digital marketing campaigns",
        "Manage website content and SEO optimization",
        "Create engaging social media content and manage accounts",
        "Support fundraising and donor engagement efforts",
        "Analyze campaign performance and optimize strategies"
      ]
    },
    {
      id: 5,
      title: "Administrative Assistant",
      department: "Operations",
      location: "El Segundo, CA",
      type: "Part-time",
      salary: "$18 - $22/hour",
      description: "Provide administrative support to executive team, manage communications, and assist with daily operations of the organization.",
      requirements: [
        "High school diploma or equivalent required",
        "2+ years administrative experience",
        "Proficiency in Microsoft Office Suite",
        "Strong organizational and communication skills",
        "Ability to work independently and manage multiple tasks"
      ],
      responsibilities: [
        "Manage executive calendars and schedule appointments",
        "Handle incoming calls and correspondence",
        "Assist with document preparation and filing",
        "Support event planning and coordination",
        "Maintain office supplies and equipment"
      ]
    }
  ];

  // Company values
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Service Above Self",
      description: "We put the needs of veterans and their families first, always striving to make a meaningful impact in their lives."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Excellence",
      description: "We work together as one team, leveraging diverse perspectives to achieve exceptional results."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Inclusive Community",
      description: "We foster an environment where everyone feels valued, respected, and empowered to contribute their best."
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Professional Growth",
      description: "We invest in our team's development, providing opportunities for continuous learning and career advancement."
    }
  ];

  // Employee benefits
  const benefits = [
    "Comprehensive health, dental, and vision insurance",
    "401(k) retirement plan with company matching",
    "Generous paid time off and holidays",
    "Professional development and training opportunities",
    "Flexible work arrangements and remote work options",
    "Life and disability insurance",
    "Employee assistance program",
    "Tuition reimbursement for continued education",
    "Wellness programs and gym membership discounts",
    "Volunteer time off for community service"
  ];

  const toggleJob = (jobId) => {
    setActiveJob(activeJob === jobId ? null : jobId);
  };

  return (
    <div className="bg-gray-50" style={{ fontFamily: "'Source Sans Pro', Arial, sans-serif" }}>
      {/* Hero Section */}
      <section className="relative bg-[#002147] text-white min-h-[400px] sm:min-h-[450px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url("/veteran1.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#002147]/90 via-[#002147]/80 to-[#ff5e1a]/40"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 py-12 sm:py-16 px-4 w-full max-w-4xl mx-auto text-center"
        >
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight drop-shadow-lg font-[Montserrat]" 
              style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>
            Join Our Mission
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 sm:mb-8 text-blue-100 font-medium drop-shadow">
            Build a career where your work makes a real difference in the lives of veterans and their families
          </p>
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#openings"
              className="inline-block bg-orange-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 font-semibold hover:bg-orange-700 transition-all duration-300 text-sm shadow-lg"
            >
              View Open Positions
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#culture"
              className="inline-block border-2 border-white text-white px-5 sm:px-6 py-2.5 sm:py-3 font-semibold hover:bg-white hover:text-[#002147] transition-all duration-300 text-sm"
            >
              Learn About Our Culture
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Why Work at WANAC Section */}
      <section id="culture" className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10"
          >
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-[#002147] mb-3 font-[Montserrat]" 
                style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>
              Why Choose WANAC?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              At WANAC, we're more than just an organization – we're a community united by a shared mission to empower veterans and create lasting positive change.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="flex justify-center mb-3 sm:mb-4 text-orange-600">
                  <div className="w-6 h-6 sm:w-8 sm:h-8">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-[#002147] mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Benefits Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10"
          >
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-[#002147] mb-3 font-[Montserrat]" 
                style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>
              Comprehensive Benefits Package
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              We believe in taking care of our team members with competitive benefits and perks that support your well-being and professional growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 hover:bg-orange-50 transition-colors duration-300"
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm sm:text-base">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Job Openings Section */}
      <section id="openings" className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10"
          >
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-[#002147] mb-3 font-[Montserrat]" 
                style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>
              Current Opportunities
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Explore our available positions and find your next career opportunity with WANAC.
            </p>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                {/* Job Header */}
                <div 
                  className="p-4 sm:p-6 cursor-pointer"
                  onClick={() => toggleJob(job.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-[#002147] mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm sm:text-base">{job.description}</p>
                    </div>
                    <div className="ml-3 sm:ml-4">
                      {activeJob === job.id ? (
                        <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                {activeJob === job.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50"
                  >
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <h4 className="font-semibold text-[#002147] mb-2 sm:mb-3 text-sm sm:text-base">Requirements:</h4>
                        <ul className="space-y-1 sm:space-y-2">
                          {job.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#002147] mb-2 sm:mb-3 text-sm sm:text-base">Key Responsibilities:</h4>
                        <ul className="space-y-1 sm:space-y-2">
                          {job.responsibilities.map((resp, respIndex) => (
                            <li key={respIndex} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-6 flex flex-col xs:flex-row gap-2 sm:gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#002147] text-white px-4 sm:px-6 py-2 sm:py-3 font-semibold hover:bg-[#003368] transition-colors duration-300 text-sm"
                      >
                        Apply Now
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="border-2 border-orange-600 text-orange-600 px-4 sm:px-6 py-2 sm:py-3 font-semibold hover:bg-orange-600 hover:text-white transition-colors duration-300 text-sm"
                      >
                        Share Position
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-[#002147] mb-6 font-[Montserrat]" 
                style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>
              How to Apply
            </h2>
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-lg sm:text-xl font-bold text-orange-600">1</span>
                </div>
                <h3 className="font-semibold text-[#002147] mb-2 text-sm sm:text-base">Submit Application</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Send your resume and cover letter for positions that interest you.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-lg sm:text-xl font-bold text-orange-600">2</span>
                </div>
                <h3 className="font-semibold text-[#002147] mb-2 text-sm sm:text-base">Interview Process</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Participate in our collaborative interview process with team members.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-lg sm:text-xl font-bold text-orange-600">3</span>
                </div>
                <h3 className="font-semibold text-[#002147] mb-2 text-sm sm:text-base">Join Our Team</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Welcome aboard! Begin your onboarding and start making an impact.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-[#002147] text-white py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full opacity-20"
          style={{
            backgroundImage: 'url("/community1.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002147]/90 to-[#ff5e1a]/30"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 font-[Montserrat]" 
              style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>
            Ready to Make a Difference?
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 text-blue-100">
            Join our team of dedicated professionals committed to serving those who served our country.
          </p>
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:careers@wanac.org"
              className="inline-block bg-orange-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 font-semibold hover:bg-orange-700 transition-all duration-300 text-sm shadow-lg"
            >
              Email Your Resume
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/pages/Contact&Career"
              className="inline-block border-2 border-white text-white px-5 sm:px-6 py-2.5 sm:py-3 font-semibold hover:bg-white hover:text-[#002147] transition-all duration-300 text-sm"
            >
              Contact Us
            </motion.a>
          </div>
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-blue-200 text-xs sm:text-sm">
              Questions about opportunities? Reach us at <a href="mailto:careers@wanac.org" className="text-orange-300 hover:text-orange-400 underline">careers@wanac.org</a>
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default WanacCareers;
