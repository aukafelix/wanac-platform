"use client";

import { useState } from 'react';
import { FaSearch, FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaComment, FaHeart, FaShare, FaEllipsisH, FaUserCircle, FaPlus } from 'react-icons/fa';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data - replace with actual data fetching in production
  const posts = [
    {
      id: 1,
      author: {
        name: "James Wilson",
        avatar: "/avatars/user1.jpg",
        role: "Army Veteran",
        isVerified: true
      },
      content: "Just completed my first job interview in the civilian sector! The preparation with my WANAC coach really paid off. Feeling confident about the outcome.",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      media: null,
      tags: ["career", "transition", "coaching"]
    },
    {
      id: 2,
      author: {
        name: "Sarah Johnson",
        avatar: "/avatars/coach1.jpg",
        role: "Career Coach",
        isVerified: true
      },
      content: "Excited to announce our upcoming virtual workshop: 'Translating Military Skills to Civilian Resumes'. Join us next Tuesday at 7 PM EST. Limited spots available!",
      timestamp: "5 hours ago",
      likes: 42,
      comments: 15,
      media: "/images/workshop-banner.jpg",
      tags: ["event", "career", "workshop"]
    },
    {
      id: 3,
      author: {
        name: "Michael Rodriguez",
        avatar: "/avatars/user2.jpg",
        role: "Marine Corps Veteran",
        isVerified: false
      },
      content: "Looking for recommendations on financial planning resources specifically for veterans. Has anyone used the VA home loan program recently? Would appreciate any insights or tips!",
      timestamp: "Yesterday",
      likes: 18,
      comments: 23,
      media: null,
      tags: ["finance", "resources", "VA"]
    },
    {
      id: 4,
      author: {
        name: "WANAC Official",
        avatar: "/logo-small.png",
        role: "Organization",
        isVerified: true
      },
      content: "We're proud to announce our new partnership with TechVets, creating 500 new job opportunities for veterans in the technology sector. Check out the link below for more information and how to apply.",
      timestamp: "2 days ago",
      likes: 156,
      comments: 42,
      media: "/images/partnership-announcement.jpg",
      tags: ["news", "jobs", "technology"]
    }
  ];

  const events = [
    {
      id: 1,
      title: "Virtual Networking Mixer",
      date: "2023-11-15",
      time: "7:00 PM - 8:30 PM EST",
      location: "Online (Zoom)",
      description: "Connect with fellow veterans and industry professionals in this casual virtual networking event.",
      attendees: 34,
      image: "/events/networking.jpg"
    },
    {
      id: 2,
      title: "Resume Workshop",
      date: "2023-11-18",
      time: "10:00 AM - 12:00 PM EST",
      location: "Online (Zoom)",
      description: "Learn how to translate your military experience into a compelling civilian resume.",
      attendees: 28,
      image: "/events/resume-workshop.jpg"
    },
    {
      id: 3,
      title: "Veterans Day Celebration",
      date: "2023-11-11",
      time: "11:00 AM - 2:00 PM",
      location: "Central Park, New York City",
      description: "Join us for our annual Veterans Day celebration with food, music, and community.",
      attendees: 120,
      image: "/events/veterans-day.jpg"
    },
    {
      id: 4,
      title: "Mental Health & Wellness Webinar",
      date: "2023-11-22",
      time: "6:00 PM - 7:30 PM EST",
      location: "Online (Zoom)",
      description: "Expert-led session on mental health strategies specifically for veterans.",
      attendees: 45,
      image: "/events/mental-health.jpg"
    }
  ];

  const groups = [
    {
      id: 1,
      name: "Career Transition Support",
      members: 1245,
      description: "A community for veterans navigating the transition to civilian careers.",
      image: "/groups/career.jpg",
      isJoined: true
    },
    {
      id: 2,
      name: "Veteran Entrepreneurs",
      members: 876,
      description: "Connect with fellow veterans building businesses and startups.",
      image: "/groups/entrepreneurs.jpg",
      isJoined: false
    },
    {
      id: 3,
      name: "Military Families",
      members: 2134,
      description: "Support network for families of active duty and veteran service members.",
      image: "/groups/families.jpg",
      isJoined: true
    },
    {
      id: 4,
      name: "Veterans in Technology",
      members: 943,
      description: "Discussion and networking for veterans working in or transitioning to tech.",
      image: "/groups/tech.jpg",
      isJoined: false
    }
  ];

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#002147]">Community</h1>
          <p className="text-gray-600 mt-1">Connect with fellow veterans and coaches</p>
        </div>
      </div>

      {/* Search and Navigation */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search community..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <div className="flex items-center gap-2">
            <button className="bg-[#002147] text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors flex items-center gap-2">
              <FaPlus /> Create Post
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex mt-4 border-b border-gray-200">
          <button
            className={`py-2 px-4 font-medium flex items-center gap-2 ${
              activeTab === 'feed'
                ? 'text-[#002147] border-b-2 border-[#002147]'
                : 'text-gray-500 hover:text-[#002147]'
            }`}
            onClick={() => setActiveTab('feed')}
          >
            Feed
          </button>
          <button
            className={`py-2 px-4 font-medium flex items-center gap-2 ${
              activeTab === 'events'
                ? 'text-[#002147] border-b-2 border-[#002147]'
                : 'text-gray-500 hover:text-[#002147]'
            }`}
            onClick={() => setActiveTab('events')}
          >
            <FaCalendarAlt /> Events
          </button>
          <button
            className={`py-2 px-4 font-medium flex items-center gap-2 ${
              activeTab === 'groups'
                ? 'text-[#002147] border-b-2 border-[#002147]'
                : 'text-gray-500 hover:text-[#002147]'
            }`}
            onClick={() => setActiveTab('groups')}
          >
            <FaUsers /> Groups
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          {/* Create Post Card */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                <FaUserCircle className="w-full h-full text-gray-500" />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Share something with the community..."
                  className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#002147] focus:bg-white"
                />
              </div>
            </div>
            <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
              <button className="flex items-center gap-2 text-gray-500 hover:text-[#002147]">
                <FaCalendarAlt /> Event
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-[#002147]">
                <FaMapMarkerAlt /> Location
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-[#002147]">
                <FaShare /> Share
              </button>
            </div>
          </div>
          
          {/* Posts */}
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} formatDate={formatDate} />
          ))}
        </div>
      )}

      {activeTab === 'groups' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      )}
    </div>
  );
}

// Post Card Component
function PostCard({ post }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden mr-3">
            {post.author.avatar ? (
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-full h-full text-gray-500" />
            )}
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="font-semibold text-[#002147]">{post.author.name}</h3>
              {post.author.isVerified && (
                <span className="ml-1 text-blue-500">✓</span>
              )}
            </div>
            <p className="text-sm text-gray-500">{post.author.role}</p>
            <p className="text-xs text-gray-400">{post.timestamp}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <FaEllipsisH />
        </button>
      </div>
      
      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800">{post.content}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Post Media */}
      {post.media && (
        <div className="w-full h-64 bg-gray-200">
          <img 
            src={post.media} 
            alt="Post media" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-100 flex justify-between">
        <button className="flex items-center gap-1 text-gray-500 hover:text-[#002147]">
          <FaHeart /> <span>{post.likes}</span>
        </button>
        <button className="flex items-center gap-1 text-gray-500 hover:text-[#002147]">
          <FaComment /> <span>{post.comments}</span>
        </button>
        <button className="flex items-center gap-1 text-gray-500 hover:text-[#002147]">
          <FaShare /> Share
        </button>
      </div>
    </div>
  );
}

// Event Card Component
function EventCard({ event, formatDate }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      {/* Event Image */}
      <div className="h-40 bg-gray-200 relative">
        {event.image ? (
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <FaCalendarAlt className="text-gray-400 text-4xl" />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-medium">
          {event.attendees} attending
        </div>
      </div>
      
      {/* Event Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-[#002147]">{event.title}</h3>
        
        <div className="mt-2 space-y-2">
          <div className="flex items-start">
            <FaCalendarAlt className="text-gray-400 mt-1 mr-2" />
            <div>
              <p className="text-gray-700">{formatDate(event.date)}</p>
              <p className="text-gray-600 text-sm">{event.time}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <FaMapMarkerAlt className="text-gray-400 mt-1 mr-2" />
            <p className="text-gray-700">{event.location}</p>
          </div>
        </div>
        
        <p className="mt-3 text-gray-600 text-sm">{event.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <button className="bg-[#002147] text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors">
            RSVP
          </button>
          
          <button className="text-gray-500 hover:text-gray-700">
            <FaShare />
          </button>
        </div>
      </div>
    </div>
  );
}

// Group Card Component
function GroupCard({ group }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      {/* Group Image */}
      <div className="h-32 bg-gray-200">
        {group.image ? (
          <img 
            src={group.image} 
            alt={group.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <FaUsers className="text-gray-400 text-4xl" />
          </div>
        )}
      </div>
      
      {/* Group Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-[#002147]">{group.name}</h3>
        <p className="text-sm text-gray-500">{group.members} members</p>
        
        <p className="mt-2 text-gray-600 text-sm">{group.description}</p>
        
        <div className="mt-4">
          {group.isJoined ? (
            <button className="w-full border border-[#002147] text-[#002147] px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
              Joined
            </button>
          ) : (
            <button className="w-full bg-[#002147] text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors">
              Join Group
            </button>
          )}
        </div>
      </div>
    </div>
  );
}