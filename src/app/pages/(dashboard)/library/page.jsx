"use client";

import { useState } from 'react';
import { FaSearch, FaBookOpen, FaVideo, FaFileAlt, FaHeadphones, FaDownload, FaBookmark, FaStar, FaFilter } from 'react-icons/fa';

export default function LibraryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data - replace with actual data fetching in production
  const categories = [
    { id: 'all', name: 'All Resources', icon: <FaBookOpen /> },
    { id: 'videos', name: 'Videos', icon: <FaVideo /> },
    { id: 'articles', name: 'Articles', icon: <FaFileAlt /> },
    { id: 'podcasts', name: 'Podcasts', icon: <FaHeadphones /> },
    { id: 'saved', name: 'Saved', icon: <FaBookmark /> }
  ];
  
  const resources = [
    {
      id: 1,
      title: "Transitioning from Military to Civilian Career",
      type: "video",
      author: "Col. James Wilson (Ret.)",
      duration: "45 min",
      thumbnail: "/resources/video-thumbnail-1.jpg",
      description: "Learn effective strategies for translating your military skills to civilian job market requirements.",
      tags: ["career", "transition", "resume"],
      featured: true,
      saved: true
    },
    {
      id: 2,
      title: "Financial Planning for Veterans",
      type: "article",
      author: "Sarah Johnson, CFP",
      readTime: "12 min read",
      thumbnail: "/resources/article-thumbnail-1.jpg",
      description: "A comprehensive guide to managing your finances after military service, including benefits and investment strategies.",
      tags: ["finance", "planning", "benefits"],
      featured: false,
      saved: false
    },
    {
      id: 3,
      title: "Mindfulness Practices for PTSD",
      type: "podcast",
      author: "Dr. Michael Chen",
      duration: "32 min",
      thumbnail: "/resources/podcast-thumbnail-1.jpg",
      description: "Practical mindfulness techniques specifically designed to help veterans manage PTSD symptoms.",
      tags: ["mental health", "mindfulness", "PTSD"],
      featured: true,
      saved: true
    },
    {
      id: 4,
      title: "Veteran Benefits You Might Not Know About",
      type: "article",
      author: "Veterans Affairs Office",
      readTime: "15 min read",
      thumbnail: "/resources/article-thumbnail-2.jpg",
      description: "Discover lesser-known benefits available to veterans and how to apply for them.",
      tags: ["benefits", "VA", "resources"],
      featured: false,
      saved: false
    },
    {
      id: 5,
      title: "Leadership Skills in Civilian Workplace",
      type: "video",
      author: "Maj. Lisa Rodriguez (Ret.)",
      duration: "28 min",
      thumbnail: "/resources/video-thumbnail-2.jpg",
      description: "How to leverage military leadership experience in corporate environments.",
      tags: ["leadership", "career", "skills"],
      featured: false,
      saved: false
    },
    {
      id: 6,
      title: "Veteran Entrepreneurs: Success Stories",
      type: "podcast",
      author: "Veteran Business Network",
      duration: "54 min",
      thumbnail: "/resources/podcast-thumbnail-2.jpg",
      description: "Interviews with veterans who built successful businesses after their military service.",
      tags: ["entrepreneurship", "business", "success"],
      featured: true,
      saved: false
    }
  ];

  // Filter resources based on active category and search query
  const filteredResources = resources.filter(resource => {
    // Filter by category
    if (activeCategory === 'all') {
      // No category filter
    } else if (activeCategory === 'saved') {
      if (!resource.saved) return false;
    } else if (activeCategory === 'videos' && resource.type !== 'video') {
      return false;
    } else if (activeCategory === 'articles' && resource.type !== 'article') {
      return false;
    } else if (activeCategory === 'podcasts' && resource.type !== 'podcast') {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.author.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  // Get resource icon based on type
  const getResourceIcon = (type) => {
    switch(type) {
      case 'video': return <FaVideo className="text-red-500" />;
      case 'article': return <FaFileAlt className="text-blue-500" />;
      case 'podcast': return <FaHeadphones className="text-purple-500" />;
      default: return <FaBookOpen className="text-gray-500" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#002147]">Resource Library</h1>
          <p className="text-gray-600 mt-1">Access valuable resources to support your journey</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <FaFilter /> Filter
            </button>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147]">
              <option>Most Recent</option>
              <option>Most Popular</option>
              <option>A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-2 mb-6 gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${
              activeCategory === category.id
                ? 'bg-[#002147] text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>

      {/* Featured Resources */}
      {activeCategory === 'all' && !searchQuery && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-[#002147] mb-4">Featured Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.filter(r => r.featured).map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      )}

      {/* All Resources */}
      <div>
        <h2 className="text-xl font-semibold text-[#002147] mb-4">
          {searchQuery ? 'Search Results' : activeCategory === 'all' ? 'All Resources' : categories.find(c => c.id === activeCategory)?.name}
        </h2>
        
        {filteredResources.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <FaSearch className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700">No resources found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Resource Card Component
function ResourceCard({ resource }) {
  const getTypeColor = (type) => {
    switch(type) {
      case 'video': return 'bg-red-100 text-red-800';
      case 'article': return 'bg-blue-100 text-blue-800';
      case 'podcast': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'video': return <FaVideo />;
      case 'article': return <FaFileAlt />;
      case 'podcast': return <FaHeadphones />;
      default: return <FaBookOpen />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <div className="relative h-40 bg-gray-200">
        {resource.thumbnail ? (
          <img 
            src={resource.thumbnail} 
            alt={resource.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            {getTypeIcon(resource.type)}
          </div>
        )}
        <div className={`absolute top-2 left-2 ${getTypeColor(resource.type)} px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1`}>
          {getTypeIcon(resource.type)} {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
        </div>
        <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-[#002147]">
          <FaBookmark className={resource.saved ? "text-[#002147]" : ""} />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-[#002147] line-clamp-2">{resource.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{resource.author}</p>
        <p className="text-sm text-gray-500 mt-1">
          {resource.duration || resource.readTime}
        </p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{resource.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {resource.tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Actions */}
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center text-yellow-500">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar className="text-gray-300" />
            <span className="ml-1 text-gray-600 text-sm">(4.0)</span>
          </div>
          
          <button className="text-[#002147] hover:text-blue-700 font-medium text-sm flex items-center gap-1">
            {resource.type === 'article' ? 'Read' : resource.type === 'video' ? 'Watch' : 'Listen'}
            {resource.type === 'article' ? <FaBookOpen /> : resource.type === 'video' ? <FaVideo /> : <FaHeadphones />}
          </button>
        </div>
      </div>
    </div>
  );
}