// My Coach page for WANAC Coaching Platform
import Link from 'next/link';
import Image from 'next/image';
import {
  FaUser,
  FaCalendarCheck,
  FaEnvelope,
  FaPhone,
  FaVideo,
  FaFileAlt,
  FaStar,
  FaGraduationCap,
  FaBriefcase,
  FaHandshake,
} from 'react-icons/fa';

export default function MyCoachPage() {
  // This would typically come from an API or database
  const coachData = {
    name: "Sarah Smith",
    title: "Senior Performance Coach",
    image: "/public/coach-placeholder.jpg", // You'll need to add this image
    bio: "Sarah is a certified performance coach with over 10 years of experience helping veterans transition to civilian life. She specializes in career development, stress management, and personal growth.",
    expertise: ["Career Transition", "Leadership Development", "Stress Management", "Goal Setting"],
    education: ["Certified Professional Coach (ICF)", "Master's in Psychology", "Military Veteran"],
    experience: "12+ years coaching experience with 200+ veterans successfully coached",
    email: "sarah.smith@wanac.org",
    phone: "(555) 123-4567",
    availability: "Monday-Friday, 9AM-5PM ET",
    upcomingSessions: [
      { date: "Apr 6, 2025", time: "11:00 AM", topic: "Monthly Check-in" },
      { date: "Apr 20, 2025", time: "2:00 PM", topic: "Goal Review" }
    ],
    sharedResources: [
      { title: "Transition Guide", type: "PDF", date: "Mar 15, 2025" },
      { title: "Stress Management Techniques", type: "Video", date: "Mar 10, 2025" }
    ]
  };

  return (
    <section className="min-h-screen bg-brand-blue">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#002147] mb-8">My Coach</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coach Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden relative">
                  {/* Replace with actual coach image */}
                  <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-400">
                    <FaUser />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-brand-navy">{coachData.name}</h2>
                <p className="text-brand-blue">{coachData.title}</p>
                
                <div className="flex mt-4 space-x-3">
                  <button className="flex items-center gap-2 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
                    <FaEnvelope /> Message
                  </button>
                  <button className="flex items-center gap-2 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
                    <FaVideo /> Schedule
                  </button>
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                <div>
                  <h3 className="font-semibold text-brand-navy flex items-center gap-2">
                    <FaEnvelope className="text-sm" /> Email
                  </h3>
                  <p className="text-brand-blue">{coachData.email}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-brand-navy flex items-center gap-2">
                    <FaPhone className="text-sm" /> Phone
                  </h3>
                  <p className="text-brand-blue">{coachData.phone}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-brand-navy flex items-center gap-2">
                    <FaCalendarCheck className="text-sm" /> Availability
                  </h3>
                  <p className="text-brand-blue">{coachData.availability}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Coach Details and Sessions */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Coach */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-brand-navy mb-4">About Your Coach</h2>
              <p className="text-brand-blue mb-6">{coachData.bio}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-brand-navy flex items-center gap-2 mb-2">
                    <FaStar className="text-sm" /> Areas of Expertise
                  </h3>
                  <ul className="list-disc list-inside text-brand-blue">
                    {coachData.expertise.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-brand-navy flex items-center gap-2 mb-2">
                    <FaGraduationCap className="text-sm" /> Education & Certifications
                  </h3>
                  <ul className="list-disc list-inside text-brand-blue">
                    {coachData.education.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-brand-navy flex items-center gap-2 mb-2">
                  <FaBriefcase className="text-sm" /> Experience
                </h3>
                <p className="text-brand-blue">{coachData.experience}</p>
              </div>
            </div>
            
            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-brand-navy mb-4 flex items-center gap-2">
                <FaCalendarCheck /> Upcoming Sessions
              </h2>
              
              {coachData.upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {coachData.upcomingSessions.map((session, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-4 last:border-0">
                      <div>
                        <p className="font-medium text-brand-navy">{session.topic}</p>
                        <p className="text-sm text-brand-blue">{session.date} at {session.time}</p>
                      </div>
                      <button className="bg-[#002147] text-white px-3 py-1 text-sm rounded hover:bg-orange-500 transition">
                        Join
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-brand-blue">No upcoming sessions scheduled.</p>
              )}
              
              <button className="mt-6 w-full bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition flex items-center justify-center gap-2">
                <FaCalendarCheck /> Schedule New Session
              </button>
            </div>
            
            {/* Shared Resources */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-brand-navy mb-4 flex items-center gap-2">
                <FaFileAlt /> Resources From Your Coach
              </h2>
              
              {coachData.sharedResources.length > 0 ? (
                <div className="space-y-4">
                  {coachData.sharedResources.map((resource, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-4 last:border-0">
                      <div>
                        <p className="font-medium text-brand-navy">{resource.title}</p>
                        <p className="text-sm text-brand-blue">{resource.type} • Shared on {resource.date}</p>
                      </div>
                      <button className="bg-[#002147] text-white px-3 py-1 text-sm rounded hover:bg-orange-500 transition">
                        View
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-brand-blue">No resources have been shared yet.</p>
              )}
              
              <Link href="/library" className="mt-6 w-full bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition flex items-center justify-center gap-2">
                <FaFileAlt /> View All Resources
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
