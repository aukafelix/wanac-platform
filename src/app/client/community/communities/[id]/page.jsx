"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchCommunityById, addCommunityFeedPost, addEvent } from "../../../../../services/api/community.service";
import { getEvents } from "../../../../../services/api/events.service";

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
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventForm, setEventForm] = useState({ title: '', date: '', time: '', description: '', type: 'online', link: '', location: '' });
  const [eventLoading, setEventLoading] = useState(false);
  const [eventError, setEventError] = useState("");
  const [events, setEvents] = useState([]);
  const [rsvps, setRsvps] = useState({});
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState("");

  useEffect(() => {
    if (!communityId) return;
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

    const userData = localStorage.getItem("wanacUser");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    }

    setEventsLoading(true);
    getEvents()
      .then(data => {
        let eventList = Array.isArray(data) ? data : (Array.isArray(data.events) ? data.events : []);
        setEvents(eventList);
        setEventsError("");
      })
      .catch(() => {
        setEventsError("Failed to load events.");
        setEvents([]);
      })
      .finally(() => setEventsLoading(false));
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
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2">
        <button
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-base mb-2"
          onClick={() => router.back()}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back to Communities
        </button>
      </div>
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
        <aside className="w-56 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            {['Explore'].map(tab => (
              <button
                key={tab}
                className={`block w-full text-left px-4 py-2 rounded mb-1 font-medium transition-colors duration-150 ${sidebarTab === tab.toLowerCase() ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-blue-50'}`}
                onClick={() => setSidebarTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition mb-4 flex items-center justify-center gap-2"
            onClick={() => setShowScheduleModal(true)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4M3 12h18"/></svg>
            Schedule
          </button>
        </aside>
        <main className="flex-1">
          {activeTab === "meetups" && (
            <div className="space-y-4">
              {eventsLoading ? (
                <div className="text-center text-gray-500">Loading events...</div>
              ) : eventsError ? (
                <div className="text-center text-red-500">{eventsError}</div>
              ) : events.length === 0 ? (
                <div className="text-center text-gray-400 italic">No events scheduled yet. Be the first to schedule one!</div>
              ) : (
                events.map(event => (
                  <div key={event.id} className="flex bg-white rounded-lg shadow p-6 items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-500 mb-1">{event.date} • {event.time}</div>
                      <div className="text-lg font-semibold mb-2">{event.title}</div>
                      {event.description && <div className="text-gray-700 mb-2">{event.description}</div>}
                      {event.type && <div className="text-xs text-blue-700 mb-1">{event.type === 'Physical' ? 'In Person' : 'Online'}</div>}
                      {event.location && <div className="text-xs text-gray-500">Location: {event.location}</div>}
                      {event.link && <div className="text-xs text-blue-600">Link: <a href={event.link} target="_blank" rel="noopener noreferrer" className="underline">{event.link}</a></div>}
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-6">
                      <span className="text-gray-500 text-sm mb-2">{event.rsvpCount || 0} RSVPs</span>
                      <button
                        className={`bg-blue-600 text-white px-4 py-1 rounded-full font-semibold hover:bg-blue-700 transition ${rsvps[event.id] ? 'opacity-50' : ''}`}
                        disabled={rsvps[event.id]}
                        onClick={() => setRsvps(prev => ({ ...prev, [event.id]: true }))}
                      >
                        {rsvps[event.id] ? 'RSVPed' : 'RSVP'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          {activeTab === "feed" && (
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-xl font-semibold mb-4">Community Feed</h2>
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
              {feedPosts.length === 0 ? (
                <div className="text-gray-500 italic">No posts yet. Be the first to post!</div>
              ) : (
                <ul className="space-y-4">
                  {feedPosts.map((post, idx) => (
                    <li key={idx} className="border rounded p-4 bg-gray-50">
                      <div className="text-gray-800 mb-1">{post.content}</div>
                      <div className="text-xs text-gray-500 mb-1">Posted by <span className="font-semibold">{post.userName || "Unknown"}</span></div>
                      <div className="text-xs text-gray-400">{post.createdAt.toLocaleString()}</div>
                      <div className="mt-4 pl-4 border-l">
                        <div className="font-semibold text-sm mb-2 text-blue-700">Comments</div>
                        {Array.isArray(comments[post.id]) && comments[post.id].length > 0 ? (
                          <ul className="space-y-2 mb-2">
                            {comments[post.id].map((comment, cidx) => (
                              <li key={cidx} className="bg-white rounded px-3 py-2 shadow-sm">
                                <span className="font-semibold text-blue-700">{comment.userName || "Unknown"}:</span> {comment.content}
                                <div className="text-xs text-gray-400 text-right">{comment.createdAt.toLocaleTimeString()}</div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-gray-400 italic mb-2">No comments yet.</div>
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
                            className="flex-1 border rounded p-2"
                            type="text"
                            placeholder="Add a comment..."
                            value={newComment[post.id] || ""}
                            onChange={e => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                          />
                          <button
                            type="submit"
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
                            disabled={!newComment[post.id]?.trim()}
                          >
                            Comment
                          </button>
                        </form>
                      </div>
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
      {(showScheduleModal || modalVisible) && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 transition-opacity duration-200 ${showScheduleModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={e => {
            if (e.target === e.currentTarget) setShowScheduleModal(false);
          }}
        >
          <div
            className={`bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative transform transition-all duration-200 ${showScheduleModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Schedule Event</h2>
            <form
              className="flex flex-col gap-4"
              onSubmit={async e => {
                e.preventDefault();
                setEventLoading(true);
                setEventError("");
                try {
                  const payload = {
                    type: eventForm.type === 'inperson' ? 'Physical' : 'online',
                    date: eventForm.date,
                    time: eventForm.time,
                    location: eventForm.type === 'inperson' ? eventForm.location : undefined,
                    link: eventForm.type === 'online' ? eventForm.link : undefined,
                    title: eventForm.title,
                    description: eventForm.description,
                    community_id: communityId,
                  };
                  await addEvent(payload);
                  setShowScheduleModal(false);
                  setEventForm({ title: '', date: '', time: '', description: '', type: 'online', link: '', location: '' });
                  setEventsLoading(true);
                  getEvents()
                    .then(data => {
                      let eventList = Array.isArray(data) ? data : (Array.isArray(data.events) ? data.events : []);
                      setEvents(eventList);
                      setEventsError("");
                    })
                    .catch(() => {
                      setEventsError("Failed to load events.");
                      setEvents([]);
                    })
                    .finally(() => setEventsLoading(false));
                } catch (err) {
                  setEventError("Failed to schedule event. Please try again.");
                } finally {
                  setEventLoading(false);
                }
              }}
            >
              <input
                className="border rounded p-2"
                type="text"
                placeholder="Event Title"
                value={eventForm.title}
                onChange={e => setEventForm(f => ({ ...f, title: e.target.value }))}
                required
              />
              <input
                className="border rounded p-2"
                type="date"
                value={eventForm.date}
                onChange={e => setEventForm(f => ({ ...f, date: e.target.value }))}
                required
              />
              <input
                className="border rounded p-2"
                type="time"
                value={eventForm.time}
                onChange={e => setEventForm(f => ({ ...f, time: e.target.value }))}
                required
              />
              <textarea
                className="border rounded p-2"
                rows={3}
                placeholder="Description"
                value={eventForm.description}
                onChange={e => setEventForm(f => ({ ...f, description: e.target.value }))}
              />
              <div className="flex gap-4 items-center">
                <label className="font-medium">Type:</label>
                <select
                  className="border rounded p-2 flex-1"
                  value={eventForm.type}
                  onChange={e => setEventForm(f => ({ ...f, type: e.target.value }))}
                >
                  <option value="online">Online</option>
                  <option value="inperson">In Person</option>
                </select>
              </div>
              {eventForm.type === 'online' && (
                <input
                  className="border rounded p-2"
                  type="url"
                  placeholder="Online Event Link (Zoom, Google Meet, etc.)"
                  value={eventForm.link}
                  onChange={e => setEventForm(f => ({ ...f, link: e.target.value }))}
                  required
                />
              )}
              {eventForm.type === 'inperson' && (
                <input
                  className="border rounded p-2"
                  type="text"
                  placeholder="Event Location/Address"
                  value={eventForm.location}
                  onChange={e => setEventForm(f => ({ ...f, location: e.target.value }))}
                  required
                />
              )}
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={() => setShowScheduleModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  disabled={eventLoading}
                >
                  {eventLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
            {eventError && <div className="text-red-500 text-sm mb-2">{eventError}</div>}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={() => setShowScheduleModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


