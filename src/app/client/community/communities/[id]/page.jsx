"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchCommunityById, addCommunityFeedPost, addEvent } from "../../../../../services/api/community.service";
import { getEvents } from "../../../../../services/api/events.service";
import Sidebar from "../../../../../../components/dashboardcomponents/sidebar";
import ClientTopbar from "../../../../../../components/dashboardcomponents/clienttopbar";
import { FaUsers, FaComments, FaCalendarAlt, FaArrowLeft, FaPaperPlane, FaPlus, FaMapMarkerAlt, FaLink, FaClock, FaUser } from "react-icons/fa";

export default function CommunityDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CommunityDetailPageInner />
    </Suspense>
  );
}

function CommunityDetailPageInner() {
  const router = useRouter();
  const params = useParams();
  const communityId = params?.id;

  // Debug logging
  console.log('Community Detail Page - params:', params);
  console.log('Community Detail Page - communityId:', communityId);

  const [collapsed, setCollapsed] = useState(false);
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [user, setUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [activeTab, setActiveTab] = useState("feed"); // Changed default from "meetups" to "feed"
  const [sidebarTab, setSidebarTab] = useState("explore");
  const [feedPosts, setFeedPosts] = useState([]);
  const [newFeedContent, setNewFeedContent] = useState("");
  const [feedLoading, setFeedLoading] = useState(false);
  const [feedError, setFeedError] = useState("");
  const [feedSuccess, setFeedSuccess] = useState("");
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventForm, setEventForm] = useState({ title: '', date: '', time: '', description: '', type: 'online', link: '', location: '' });
  const [eventLoading, setEventLoading] = useState(false);
  const [eventError, setEventError] = useState("");
  const [eventSuccess, setEventSuccess] = useState("");
  const [events, setEvents] = useState([]);
  const [rsvps, setRsvps] = useState({});
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState("");

  // Function to load events for this community
  const loadCommunityEvents = async () => {
    setEventsLoading(true);
    setEventsError("");
    try {
      const data = await getEvents();
      console.log('All events fetched:', data);
      
      let eventList = Array.isArray(data) ? data : (Array.isArray(data.events) ? data.events : []);
      console.log('Event list:', eventList);
      
      // Filter events by current community ID
      const filteredEvents = eventList.filter(event => {
        const matches = event.community_id === communityId || event.community_id === parseInt(communityId);
        if (matches) {
          console.log('Matched event for community:', event);
        }
        return matches;
      });
      
      console.log(`Found ${filteredEvents.length} events for community ${communityId}`);
      setEvents(filteredEvents);
    } catch (error) {
      console.error('Error loading events:', error);
      setEventsError("Failed to load events.");
      setEvents([]);
    } finally {
      setEventsLoading(false);
    }
  };

  useEffect(() => {
    if (!communityId) return;
    setLoading(true);
    fetchCommunityById(communityId)
      .then((data) => {
        setCommunity(data);
        setError("");
        if (data?.name && communityId) {
          try {
            sessionStorage.setItem("wanacCurrentCommunity", JSON.stringify({ id: communityId, name: data.name }));
          } catch (e) {}
        }
      })
      .catch(() => {
        setError("Failed to load community.");
        setCommunity(null);
      })
      .finally(() => setLoading(false));

    const userData = localStorage.getItem("wanacUser");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    }

    // Load events for this community
    loadCommunityEvents();
  }, [communityId]);

  useEffect(() => {
    if (showScheduleModal) {
      setModalVisible(true);
    } else {
      const timeout = setTimeout(() => setModalVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [showScheduleModal]);

  if (loading) {
    return (
      <div className="h-screen flex bg-white font-body">
        <Sidebar className="w-56 bg-white border-r border-gray-200" collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="flex-1 flex flex-col h-full">
          <ClientTopbar user={user} currentCommunity={community?.name} />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002147] mx-auto mb-4"></div>
              <p className="text-gray-600 text-sm">Loading community...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="h-screen flex bg-white font-body">
        <Sidebar className="w-56 bg-white border-r border-gray-200" collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="flex-1 flex flex-col h-full">
          <ClientTopbar user={user} currentCommunity={community?.name} />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  if (!community) {
    return (
      <div className="h-screen flex bg-white font-body">
        <Sidebar className="w-56 bg-white border-r border-gray-200" collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="flex-1 flex flex-col h-full">
          <ClientTopbar user={user} currentCommunity={community?.name} />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 text-sm">Community not found.</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-white font-body">
      {/* Sidebar */}
      <Sidebar
        className="w-56 bg-white border-r border-gray-200"
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} currentCommunity={community?.name} />
        
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-3 sm:px-4 md:px-6 py-3 pb-6 sm:pb-3 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Back Button - larger tap target on mobile */}
        <button
              className="flex items-center gap-1.5 text-[#002147] hover:text-orange-500 font-semibold text-[11px] mb-3 transition-colors py-2 -my-2 px-2 -mx-2 rounded-lg active:bg-gray-100 min-h-[44px] items-center md:min-h-0 md:py-0 md:px-0"
              onClick={() => router.push('/client/community')}
        >
              <FaArrowLeft size={12} className="shrink-0" />
          <span className="hidden sm:inline">Back to Communities</span>
          <span className="sm:hidden">Back</span>
        </button>

            {/* Header Section - stacks on mobile for better readability */}
            <section className="bg-gradient-to-br from-[#002147] to-[#003875] rounded-xl p-3 sm:p-4 shadow-lg relative overflow-hidden mb-3">
              <div className="absolute inset-0 opacity-10">
                <img 
                  src="/veterancommunity.png" 
                  alt="Background" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2 bg-white/20 rounded-full shrink-0">
                    <FaUsers className="text-white text-lg sm:text-xl" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-lg sm:text-xl font-bold text-white mb-0.5 truncate">{community.name || 'Community'}</h1>
                    <p className="text-white/90 text-xs line-clamp-2 sm:line-clamp-none">{community.description || 'Welcome to the community'}</p>
                  </div>
                </div>
                <button
                  className="flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white px-4 py-3 sm:py-1.5 rounded-lg transition-all font-semibold text-[11px] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] shrink-0 w-full sm:w-auto"
                  onClick={() => {
                    if (!user || !user.id) {
                      alert("Please log in to schedule an event.");
                      return;
                    }
                    setShowScheduleModal(true);
                  }}
                  disabled={!user || !user.id}
                  title={!user || !user.id ? "Please log in to schedule an event" : "Schedule a new event"}
                >
                  <FaPlus size={10} /> Schedule Event
                </button>
              </div>
            </section>

            {/* Success Messages */}
            {feedSuccess && (
              <div className="p-2 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2 text-xs mb-3">
                <span>✓</span>
                {feedSuccess}
              </div>
            )}
            {eventSuccess && (
              <div className="p-2 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2 text-xs mb-3">
                <span>✓</span>
                {eventSuccess}
      </div>
            )}

            {/* Tabs - scrollable on mobile, full tap targets */}
            <div className="flex gap-2 mb-3 overflow-x-auto overflow-y-hidden pb-1 -mx-1 px-1">
        {['Feed', 'Chat', 'Meetups'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-4 py-3 sm:py-1.5 rounded-lg border-2 transition-all font-semibold text-[11px] flex items-center gap-1.5 shrink-0 min-h-[44px] justify-center
                    ${activeTab === tab.toLowerCase()
                      ? "bg-[#002147] text-white border-[#002147] shadow-sm"
                      : "bg-white text-gray-700 border-gray-300 hover:border-orange-500 active:bg-gray-50"}
                  `}
          >
                  {tab === 'Feed' && <FaComments size={12} />}
                  {tab === 'Chat' && <FaPaperPlane size={12} />}
                  {tab === 'Meetups' && <FaCalendarAlt size={12} />}
            {tab}
          </button>
        ))}
      </div>

            {/* Tab Content - main content first on mobile for better scroll flow */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-4">
              <div className="flex-1 min-w-0">
                {activeTab === "meetups" && (
                  <section className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-sm font-semibold text-[#002147] flex items-center gap-1.5">
                        <FaCalendarAlt className="text-orange-500" size={12} />
                        Upcoming Events
                        {events.length > 0 && (
                          <span className="text-[10px] font-normal text-gray-500">({events.length})</span>
                        )}
                      </h2>
              <button
                        onClick={loadCommunityEvents}
                        disabled={eventsLoading}
                        className="text-[10px] text-[#002147] hover:text-orange-500 font-semibold transition-colors disabled:opacity-50 flex items-center gap-1"
                        title="Refresh events"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh
              </button>
          </div>
              {eventsLoading ? (
                      <div className="text-center text-gray-400 py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002147] mx-auto mb-2"></div>
                        <p className="text-[10px]">Loading events...</p>
                      </div>
              ) : eventsError ? (
                      <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
                        {eventsError}
                      </div>
              ) : events.length === 0 ? (
                      <div className="text-center border-2 border-dashed border-gray-300 rounded-xl py-8 px-4 bg-gray-50">
                        <div className="flex justify-center mb-3">
                          <div className="p-3 bg-gray-200 rounded-full">
                            <FaCalendarAlt className="w-6 h-6 text-gray-400" />
                          </div>
                        </div>
                        <p className="font-semibold text-gray-700 text-sm mb-1">No Events Yet</p>
                        <p className="text-[10px] text-gray-500">Schedule the first event for this community!</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {events.map(event => (
                          <div key={event.id} className="border-l-4 border-[#002147] pl-3 py-3 sm:py-2 bg-blue-50/50 rounded-lg hover:bg-blue-50 active:bg-blue-50 transition-all">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <FaClock className="text-orange-500" size={10} />
                                  <span className="text-[10px] text-gray-600 font-medium">{event.date} • {event.time}</span>
                                </div>
                                <h3 className="font-bold text-sm text-gray-800 mb-1">{event.title}</h3>
                                {event.description && (
                                  <p className="text-[11px] text-gray-600 mb-2">{event.description}</p>
                                )}
                                <div className="flex flex-wrap gap-2 items-center">
                                  {event.type && (
                                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${event.type === 'Physical' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                      {event.type === 'Physical' ? '📍 In Person' : '💻 Online'}
                                    </span>
                                  )}
                                  {event.location && (
                                    <span className="text-[10px] text-gray-600 flex items-center gap-1">
                                      <FaMapMarkerAlt size={8} />
                                      {event.location}
                                    </span>
                                  )}
                                  {event.link && (
                                    <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 hover:text-blue-800 flex items-center gap-1 underline">
                                      <FaLink size={8} />
                                      Join Link
                                    </a>
                                  )}
                                </div>
                    </div>
                              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-1.5">
                                <span className="text-[10px] text-gray-500">{event.rsvpCount || 0} RSVPs</span>
                      <button
                                  className={`px-4 py-2.5 sm:py-1 rounded-lg font-semibold text-[10px] transition-all min-h-[44px] sm:min-h-0 ${
                                    rsvps[event.id]
                                      ? 'bg-green-100 text-green-700 cursor-default'
                                      : 'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700'
                                  }`}
                        disabled={rsvps[event.id]}
                        onClick={() => setRsvps(prev => ({ ...prev, [event.id]: true }))}
                      >
                                  {rsvps[event.id] ? '✓ RSVPed' : 'RSVP'}
                      </button>
                    </div>
                  </div>
                          </div>
                        ))}
            </div>
                    )}
                  </section>
          )}
          {activeTab === "feed" && (
                  <section className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
                    <h2 className="text-sm font-semibold text-[#002147] mb-3 flex items-center gap-1.5">
                      <FaComments className="text-orange-500" size={12} />
                      Community Feed
                    </h2>
                    
                    {/* Post Form - full-width Post button on mobile */}
              <form
                      className="mb-4"
                onSubmit={async e => {
                  e.preventDefault();
                  if (!newFeedContent.trim() || !user) return;
                  setFeedLoading(true);
                  setFeedError("");
                        setFeedSuccess("");
                  try {
                    const postPayload = {
                      content: newFeedContent,
                      community_id: communityId,
                    };
                    const response = await addCommunityFeedPost(postPayload);
                    setFeedPosts([
                      { content: newFeedContent, userName: user.name, createdAt: new Date(), ...response },
                      ...feedPosts
                    ]);
                    setNewFeedContent("");
                          setFeedSuccess("Post shared successfully!");
                          setTimeout(() => setFeedSuccess(""), 3000);
                  } catch (err) {
                    setFeedError("Failed to post. Please try again.");
                  } finally {
                    setFeedLoading(false);
                  }
                }}
              >
                      <div className="relative mb-2">
                <textarea
                          className="w-full border-2 border-gray-300 rounded-lg px-3 py-3 sm:py-2 text-[11px] sm:text-[11px] focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 focus:outline-none min-h-[88px] sm:min-h-[80px] resize-none"
                          placeholder="Share something with the community..."
                          value={newFeedContent}
                          onChange={e => setNewFeedContent(e.target.value)}
                />
                      </div>
                      {feedError && (
                        <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-[10px] mb-2">
                          {feedError}
                        </div>
                      )}
                      <div className="flex justify-end">
                <button
                  type="submit"
                          className="flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white px-4 py-3 sm:py-1.5 rounded-lg transition-all font-semibold text-[11px] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] w-full sm:w-auto"
                  disabled={!newFeedContent.trim() || feedLoading}
                >
                          <FaPaperPlane size={10} />
                  {feedLoading ? "Posting..." : "Post"}
                </button>
                      </div>
              </form>

                    <hr className="my-3 border-gray-200" />

                    {/* Posts List */}
              {feedPosts.length === 0 ? (
                      <div className="text-center border-2 border-dashed border-gray-300 rounded-xl py-8 px-4 bg-gray-50">
                        <div className="flex justify-center mb-3">
                          <div className="p-3 bg-gray-200 rounded-full">
                            <FaComments className="w-6 h-6 text-gray-400" />
                          </div>
                        </div>
                        <p className="font-semibold text-gray-700 text-sm mb-1">No Posts Yet</p>
                        <p className="text-[10px] text-gray-500">Be the first to share something!</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                  {feedPosts.map((post, idx) => (
                          <div key={idx} className="border border-gray-200 rounded-lg p-3 sm:p-3 bg-gray-50/50 hover:bg-gray-50 active:bg-gray-100 transition-all">
                            <div className="flex items-start gap-2.5 mb-2">
                              <div className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-[#002147] flex items-center justify-center text-white font-bold text-[11px] sm:text-[10px] shrink-0">
                                {post.userName?.[0] || "U"}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-[11px] text-gray-800 truncate">{post.userName || "Unknown"}</div>
                                <div className="text-[9px] text-gray-500">{post.createdAt?.toLocaleString ? post.createdAt.toLocaleString() : 'Just now'}</div>
                              </div>
                            </div>
                            <p className="text-[11px] sm:text-[11px] text-gray-700 mb-3 whitespace-pre-line break-words">{post.content}</p>
                            
                            {/* Comments Section - larger touch targets on mobile */}
                            <div className="pl-3 border-l-2 border-gray-200">
                              <div className="text-[10px] font-semibold text-gray-600 mb-2">
                                💬 Comments ({Array.isArray(comments[post.id]) ? comments[post.id].length : 0})
                              </div>
                        {Array.isArray(comments[post.id]) && comments[post.id].length > 0 ? (
                                <div className="space-y-2 mb-2">
                            {comments[post.id].map((comment, cidx) => (
                                    <div key={cidx} className="bg-white rounded-lg px-2.5 py-2 sm:py-1.5 shadow-sm">
                                      <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 sm:w-5 sm:h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-[9px] sm:text-[8px] flex-shrink-0">
                                          {comment.userName?.[0] || "U"}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <span className="font-semibold text-[10px] text-gray-800">{comment.userName || "Unknown"}:</span>
                                          <span className="text-[10px] text-gray-600 ml-1 break-words">{comment.content}</span>
                                          <div className="text-[8px] text-gray-400 mt-0.5">{comment.createdAt?.toLocaleTimeString ? comment.createdAt.toLocaleTimeString() : ''}</div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-[10px] text-gray-400 italic mb-2">No comments yet.</div>
                        )}
                        <form
                                className="flex gap-2"
                          onSubmit={e => {
                            e.preventDefault();
                            if (!newComment[post.id]?.trim() || !user) return;
                            setComments(prev => ({
                              ...prev,
                              [post.id]: [
                                ...(prev[post.id] || []),
                                { content: newComment[post.id], userName: user.name, createdAt: new Date() }
                              ]
                            }));
                            setNewComment(prev => ({ ...prev, [post.id]: "" }));
                          }}
                        >
                          <input
                                  className="flex-1 border-2 border-gray-300 rounded-lg px-3 py-2 sm:py-1 text-[10px] sm:text-[10px] focus:border-[#002147] focus:ring-1 focus:ring-[#002147]/20 focus:outline-none min-h-[44px] sm:min-h-0"
                            type="text"
                            placeholder="Add a comment..."
                            value={newComment[post.id] || ""}
                            onChange={e => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                          />
                          <button
                            type="submit"
                                  className="bg-[#002147] text-white px-4 py-2 sm:py-1 rounded-lg hover:bg-[#003875] active:bg-[#001a33] disabled:opacity-50 text-[10px] font-semibold transition-all min-h-[44px] sm:min-h-0 shrink-0"
                            disabled={!newComment[post.id]?.trim()}
                          >
                                  Send
                          </button>
                        </form>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                )}
                {activeTab === "chat" && (
                  <section className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-[min(400px,55vh)] sm:h-[450px] lg:h-[500px]">
                    {/* Chat Header */}
                    <div className="flex items-center justify-between px-3 py-2.5 bg-gradient-to-r from-[#002147] to-[#003875] text-white border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                          <FaPaperPlane className="text-sm" />
                        </div>
                        <span className="font-semibold text-sm">Community Chat</span>
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      </div>
                      {user && user.name && (
                        <div className="flex items-center gap-1.5">
                          <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-[10px]">
                            {user.name[0]}
                          </span>
                          <span className="text-[10px] text-white/90">{user.name}</span>
            </div>
          )}
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2 bg-gray-50">
                {chatMessages.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center">
                            <div className="p-3 bg-gray-200 rounded-full inline-block mb-2">
                              <FaPaperPlane className="w-6 h-6 text-gray-400" />
                            </div>
                            <p className="text-gray-500 text-[11px] italic">No messages yet. Start the conversation!</p>
                          </div>
                        </div>
                      ) : (
                        chatMessages.map((msg, idx) => (
                          <div key={idx} className={`flex ${msg.userName === user?.name ? "justify-end" : "justify-start"}`}>
                            {msg.userName !== user?.name && (
                              <div className="flex flex-col items-center mr-2">
                                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#002147] to-[#003875] flex items-center justify-center shadow-sm">
                                  <span className="text-white text-[10px] font-bold">{msg.userName?.[0] || "U"}</span>
                                </span>
                              </div>
                            )}
                            <div className={`max-w-[75%] px-3 py-2 rounded-lg text-[11px] shadow-sm ${
                              msg.userName === user?.name
                                ? "bg-orange-500 text-white rounded-br-none"
                                : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                            }`}>
                              {msg.userName !== user?.name && (
                                <div className="font-semibold text-[#002147] text-[10px] mb-0.5">{msg.userName || "Unknown"}</div>
                              )}
                              <div>{msg.text}</div>
                              <div className={`text-[8px] mt-1 ${msg.userName === user?.name ? "text-white/70" : "text-gray-400"}`}>
                                {msg.createdAt?.toLocaleTimeString ? msg.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                              </div>
                            </div>
                            {msg.userName === user?.name && user && (
                              <div className="flex flex-col items-center ml-2">
                                <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shadow-sm text-orange-600 font-bold text-[10px]">
                                  {user.name ? user.name[0] : "U"}
                                </span>
                              </div>
                            )}
                          </div>
                        ))
                )}
              </div>

                    {/* Input Area - larger touch targets on mobile */}
              <form
                      className="flex gap-2 px-3 py-2.5 sm:py-2 bg-white border-t border-gray-200"
                onSubmit={e => {
                  e.preventDefault();
                  if (!chatInput.trim() || !user) return;
                  setChatMessages([
                    ...chatMessages,
                    { text: chatInput, userName: user.name, createdAt: new Date() }
                  ]);
                  setChatInput("");
                }}
              >
                <input
                        className="flex-1 rounded-lg border-2 border-gray-300 px-3 py-3 sm:py-2 focus:outline-none focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 transition text-[11px] bg-white shadow-sm min-h-[44px] sm:min-h-0"
                  type="text"
                  placeholder="Type a message..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                        disabled={!user}
                />
                <button
                  type="submit"
                        className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold px-4 py-3 sm:py-2 rounded-lg shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 text-[11px] min-h-[44px] sm:min-h-0 shrink-0"
                        disabled={!chatInput.trim() || !user}
                >
                        <FaPaperPlane size={12} />
                  Send
                </button>
              </form>
                  </section>
                )}
              </div>

              {/* Right Sidebar - compact on mobile, horizontal scroll for quick actions */}
              <aside className="lg:w-64 space-y-3 shrink-0">
                {/* Community Info Card - compact on mobile */}
                <div className="bg-gradient-to-br from-[#002147] to-[#003875] rounded-xl shadow-sm p-3 text-white">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                    <FaUsers className="shrink-0" />
                    About This Community
                  </h3>
                  <p className="text-[10px] text-white/90 mb-3 line-clamp-2 sm:line-clamp-none">
                    {community.description || 'Connect and engage with fellow community members.'}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 sm:flex-col sm:gap-1.5">
                    <div className="flex items-center justify-between text-[10px] gap-2">
                      <span className="text-white/80">Members:</span>
                      <span className="font-bold">{community.memberCount || 0}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] gap-2">
                      <span className="text-white/80">Posts:</span>
                      <span className="font-bold">{feedPosts.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] gap-2">
                      <span className="text-white/80">Events:</span>
                      <span className="font-bold">{events.length}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Card - horizontal scroll on mobile for easier tapping */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-3">
                  <h3 className="text-sm font-semibold text-[#002147] mb-2 sm:mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                    <button
                      onClick={() => setActiveTab('feed')}
                      className="w-full p-3 sm:p-2 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 rounded-lg text-[10px] text-left font-medium text-gray-700 transition-colors flex items-center gap-2 min-h-[44px]"
                    >
                      <FaComments className="text-blue-600 shrink-0" size={14} />
                      View Feed
                    </button>
                    <button
                      onClick={() => setActiveTab('chat')}
                      className="w-full p-3 sm:p-2 bg-green-50 hover:bg-green-100 active:bg-green-200 rounded-lg text-[10px] text-left font-medium text-gray-700 transition-colors flex items-center gap-2 min-h-[44px]"
                    >
                      <FaPaperPlane className="text-green-600 shrink-0" size={14} />
                      Open Chat
                    </button>
                    <button
                      onClick={() => setActiveTab('meetups')}
                      className="w-full p-3 sm:p-2 bg-yellow-50 hover:bg-yellow-100 active:bg-yellow-200 rounded-lg text-[10px] text-left font-medium text-gray-700 transition-colors flex items-center gap-2 min-h-[44px]"
                    >
                      <FaCalendarAlt className="text-yellow-600 shrink-0" size={14} />
                      View Events
                    </button>
                    <button
                      onClick={() => {
                        if (!user || !user.id) {
                          alert("Please log in to schedule an event.");
                          return;
                        }
                        setShowScheduleModal(true);
                      }}
                      disabled={!user || !user.id}
                      className="w-full p-3 sm:p-2 bg-orange-50 hover:bg-orange-100 active:bg-orange-200 rounded-lg text-[10px] text-left font-medium text-gray-700 transition-colors flex items-center gap-2 min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed col-span-2 lg:col-span-1"
                      title={!user || !user.id ? "Please log in to schedule an event" : "Schedule a new event"}
                    >
                      <FaPlus className="text-orange-600 shrink-0" size={14} />
                      Schedule Event
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
      {/* Schedule Event Modal */}
      {(showScheduleModal || modalVisible) && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${showScheduleModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={e => {
            if (e.target === e.currentTarget) setShowScheduleModal(false);
          }}
        >
          <div
            className={`bg-white rounded-xl p-4 w-full max-w-md shadow-2xl relative transform transition-all duration-200 ${showScheduleModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition"
              onClick={() => {
                setShowScheduleModal(false);
                setEventError("");
              }}
            >
              ×
            </button>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-orange-100 rounded-full">
                <FaCalendarAlt className="text-orange-600" size={12} />
              </div>
              <h2 className="text-sm font-bold text-[#002147]">Schedule New Event</h2>
            </div>
            <form
              className="space-y-3"
              onSubmit={async e => {
                e.preventDefault();
                setEventLoading(true);
                setEventError("");
                setEventSuccess("");
                try {
                  // Ensure user is logged in
                  if (!user || !user.id) {
                    setEventError("You must be logged in to create an event.");
                    setEventLoading(false);
                    return;
                  }

                  // Ensure community ID exists
                  if (!communityId) {
                    setEventError("Community ID is missing. Please refresh the page and try again.");
                    setEventLoading(false);
                    return;
                  }

                  // Build payload with all required fields
                  const payload = {
                    user_id: parseInt(user.id), // Ensure it's a number
                    community_id: parseInt(communityId), // Ensure it's a number
                    title: eventForm.title.trim(),
                    description: eventForm.description.trim() || null,
                    type: eventForm.type === 'inperson' ? 'Physical' : 'online',
                    date: eventForm.date,
                    time: eventForm.time,
                  };

                  // Add location or link based on event type
                  if (eventForm.type === 'inperson') {
                    payload.location = eventForm.location.trim();
                  } else {
                    payload.link = eventForm.link.trim();
                  }
                  
                  console.log('Creating event with payload:', JSON.stringify(payload, null, 2));
                  console.log('User ID:', user.id, 'Community ID:', communityId);
                  console.log('Payload keys:', Object.keys(payload));
                  
                  const response = await addEvent(payload);
                  console.log('Event created successfully:', response);
                  
                  // Check if there's an error in the response
                  if (response && response.error) {
                    throw new Error(response.error);
                  }
                  
                  setShowScheduleModal(false);
                  setEventForm({ title: '', date: '', time: '', description: '', type: 'online', link: '', location: '' });
                  setEventSuccess("Event scheduled successfully!");
                  setTimeout(() => setEventSuccess(""), 3000);
                  
                  // Reload events for this community
                  await loadCommunityEvents();
                } catch (err) {
                  console.error('Error creating event:', err);
                  if (err.response?.data != null) {
                    console.error('Error response:', err.response.data);
                  }

                  // Show specific error message (axios: response.data may be string or object)
                  const data = err.response?.data;
                  const errorMessage =
                    (typeof data === 'string' ? data : null) ||
                    (data && (data.error || data.message)) ||
                    err.message ||
                    "Failed to schedule event. Please try again.";
                  setEventError(errorMessage);
                } finally {
                  setEventLoading(false);
                }
              }}
            >
              <div>
                <label className="block text-[11px] font-semibold mb-1 text-gray-700">
                  Event Title *
                </label>
              <input
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-1.5 text-[11px] focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 focus:outline-none"
                type="text"
                  placeholder="Enter event title..."
                value={eventForm.title}
                onChange={e => setEventForm(f => ({ ...f, title: e.target.value }))}
                required
              />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold mb-1 text-gray-700">
                    Date *
                  </label>
              <input
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-1.5 text-[11px] focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 focus:outline-none"
                type="date"
                value={eventForm.date}
                onChange={e => setEventForm(f => ({ ...f, date: e.target.value }))}
                required
              />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold mb-1 text-gray-700">
                    Time *
                  </label>
              <input
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-1.5 text-[11px] focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 focus:outline-none"
                type="time"
                value={eventForm.time}
                onChange={e => setEventForm(f => ({ ...f, time: e.target.value }))}
                required
              />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold mb-1 text-gray-700">
                  Description
                </label>
              <textarea
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-1.5 text-[11px] focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 focus:outline-none min-h-[60px] resize-none"
                  placeholder="Describe the event..."
                value={eventForm.description}
                onChange={e => setEventForm(f => ({ ...f, description: e.target.value }))}
              />
              </div>
              <div>
                <label className="block text-[11px] font-semibold mb-1 text-gray-700">
                  Event Type *
                </label>
                <select
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-1.5 text-[11px] focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 focus:outline-none"
                  value={eventForm.type}
                  onChange={e => setEventForm(f => ({ ...f, type: e.target.value }))}
                >
                  <option value="online">💻 Online</option>
                  <option value="inperson">📍 In Person</option>
                </select>
              </div>
              {eventForm.type === 'online' && (
                <div>
                  <label className="block text-[11px] font-semibold mb-1 text-gray-700 flex items-center gap-1">
                    <FaLink size={9} className="text-orange-500" />
                    Meeting Link *
                  </label>
                <input
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-1.5 text-[11px] focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 focus:outline-none"
                  type="url"
                    placeholder="https://zoom.us/j/..."
                  value={eventForm.link}
                  onChange={e => setEventForm(f => ({ ...f, link: e.target.value }))}
                  required
                />
                </div>
              )}
              {eventForm.type === 'inperson' && (
                <div>
                  <label className="block text-[11px] font-semibold mb-1 text-gray-700 flex items-center gap-1">
                    <FaMapMarkerAlt size={9} className="text-orange-500" />
                    Location *
                  </label>
                <input
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-1.5 text-[11px] focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 focus:outline-none"
                  type="text"
                    placeholder="Enter address or location..."
                  value={eventForm.location}
                  onChange={e => setEventForm(f => ({ ...f, location: e.target.value }))}
                  required
                />
                </div>
              )}
              {eventError && (
                <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-[10px]">
                  {eventError}
                </div>
              )}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-3 py-1.5 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold text-[11px] transition-all"
                  onClick={() => {
                    setShowScheduleModal(false);
                    setEventError("");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-semibold text-[11px] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                  disabled={eventLoading}
                >
                  <FaCalendarAlt size={9} />
                  {eventLoading ? "Scheduling..." : "Schedule Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


