"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchCommunityById, addCommunityFeedPost } from "../../../../../services/api/community.service";

const sampleMeetups = [
  {
    id: 1,
    date: "Friday, Jan 31, 6:00 AM (PST)",
    duration: "60 minutes",
    title: "Leaders: Let's Connect & Collaborate. What book and mentors have shaped your style?",
    host: { name: "Jaclyn Zolnik", avatar: "/user34.jpg" },
    rsvps: 2,
    image: "/globe.svg",
  },
  {
    id: 2,
    date: "Friday, Jan 31, 8:00 AM (PST)",
    duration: "60 minutes",
    title: "Everything They Forgot to Tell You When You Started Your Business",
    host: { name: "Kevin McKamey", avatar: "/jamesthompson.jpg" },
    rsvps: 21,
    image: "/veteran1.jpg",
  },
  {
    id: 3,
    date: "Friday, Jan 31, 9:00 AM (PST)",
    duration: "30 minutes",
    title: "Reclaim Your Relationship With Money - Making It Positive",
    host: { name: "Elizabeth Rosenberg", avatar: "/veterancommunity3.png" },
    rsvps: 17,
    image: "/veterancommunity.png",
  },
  {
    id: 4,
    date: "Friday, Jan 31, 9:30 AM (PST)",
    duration: "30 minutes",
    title: "Mental Health Success Habits",
    host: { name: "Sarah Lee", avatar: "/testimonial1.jpg" },
    rsvps: 10,
    image: "/testimonial2.jpg",
  },
];

export default function CommunityDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const communityId = searchParams.get("id");

  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [user, setUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [activeTab, setActiveTab] = useState("meetups");
  const [sidebarTab, setSidebarTab] = useState("explore");
  const [feedPosts, setFeedPosts] = useState([]);
  const [newFeedContent, setNewFeedContent] = useState("");
  const [feedLoading, setFeedLoading] = useState(false);
  const [feedError, setFeedError] = useState("");

  useEffect(() => {
    if (!communityId) {
      setError("No community ID provided.");
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchCommunityById(communityId)
      .then((data) => {
        setCommunity(data);
        setError("");
      })
      .catch(() => {
        setError("Failed to load community.");
        setCommunity(null);
      })
      .finally(() => setLoading(false));

    // Load user from localStorage
    const userData = localStorage.getItem("wanacUser");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    }
  }, [communityId]);

  if (loading) {
    return <div className="p-8 text-center">Loading community...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }
  if (!community) {
    return <div className="p-8 text-center text-gray-500">Community not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Tabs */}
      <div className="flex justify-center border-b bg-white sticky top-0 z-10">
        {['Feed', 'Chat', 'Meetups'].map(tab => (
          <button
            key={tab}
            className={`px-8 py-4 text-lg font-medium focus:outline-none transition-colors duration-200 ${activeTab === tab.toLowerCase() ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
            onClick={() => setActiveTab(tab.toLowerCase())}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex max-w-6xl mx-auto mt-8 gap-8 px-4">
        {/* Sidebar */}
        <aside className="w-56 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            {['Explore', 'Going', 'Hosting'].map(tab => (
              <button
                key={tab}
                className={`block w-full text-left px-4 py-2 rounded mb-1 font-medium transition-colors duration-150 ${sidebarTab === tab.toLowerCase() ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-blue-50'}`}
                onClick={() => setSidebarTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition mb-4 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4M3 12h18"/></svg>
            Schedule
          </button>
        </aside>
        {/* Main Content */}
        <main className="flex-1">
          {activeTab === "meetups" && (
            <div className="space-y-4">
              {sampleMeetups.map(event => (
                <div key={event.id} className="flex bg-white rounded-lg shadow p-6 items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-500 mb-1">{event.date} • {event.duration}</div>
                    <div className="text-lg font-semibold mb-2">{event.title}</div>
                    <div className="flex items-center gap-2 mb-1">
                      <img src={event.host.avatar} alt={event.host.name} className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-sm font-medium text-gray-700">{event.host.name}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-6">
                    <img src={event.image} alt="event" className="w-20 h-20 object-cover rounded mb-2" />
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-sm">{event.rsvps} RSVPs</span>
                      <button className="bg-blue-600 text-white px-4 py-1 rounded-full font-semibold hover:bg-blue-700 transition">RSVP</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "feed" && (
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-xl font-semibold mb-4">Community Feed</h2>
              {/* Feed Post Form */}
              <form
                className="mb-6 flex flex-col gap-2"
                onSubmit={async e => {
                  e.preventDefault();
                  if (!newFeedContent.trim() || !user) return;
                  setFeedLoading(true);
                  setFeedError("");
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
                  } catch (err) {
                    setFeedError("Failed to post. Please try again.");
                  } finally {
                    setFeedLoading(false);
                  }
                }}
              >
                <textarea
                  className="border rounded p-2 w-full"
                  rows={3}
                  placeholder="Share something with the community..."
                  value={newFeedContent}
                  onChange={e => setNewFeedContent(e.target.value)}
                />
                <button
                  type="submit"
                  className="self-end bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  disabled={!newFeedContent.trim() || feedLoading}
                >
                  {feedLoading ? "Posting..." : "Post"}
                </button>
              </form>
              {feedError && <div className="text-red-500 text-sm mb-2">{feedError}</div>}
              {/* Feed Posts List */}
              {feedPosts.length === 0 ? (
                <div className="text-gray-500 italic">No posts yet. Be the first to post!</div>
              ) : (
                <ul className="space-y-4">
                  {feedPosts.map((post, idx) => (
                    <li key={idx} className="border rounded p-4 bg-gray-50">
                      <div className="text-gray-800 mb-1">{post.content}</div>
                      <div className="text-xs text-gray-500 mb-1">Posted by <span className="font-semibold">{post.userName || "Unknown"}</span></div>
                      <div className="text-xs text-gray-400">{post.createdAt.toLocaleString()}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {activeTab === "chat" && (
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-xl font-semibold mb-4">Community Chat</h2>
              <div className="flex flex-col h-80 bg-gray-50 rounded p-3 mb-4 overflow-y-auto border">
                {chatMessages.length === 0 ? (
                  <div className="text-gray-500 italic my-auto text-center">No messages yet. Start the conversation!</div>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {chatMessages.map((msg, idx) => (
                      <li key={idx} className="bg-white rounded px-3 py-2 shadow-sm">
                        <span className="font-semibold text-blue-700">{msg.userName || "Unknown"}:</span> {msg.text}
                        <div className="text-xs text-gray-400 text-right">{msg.createdAt.toLocaleTimeString()}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <form
                className="flex gap-2"
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
                  className="flex-1 border rounded p-2"
                  type="text"
                  placeholder="Type a message..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  disabled={!chatInput.trim()}
                >
                  Send
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
