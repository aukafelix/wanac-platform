"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchCommunityById } from "../../../../../services/api/community.service";

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
  const [activeTab, setActiveTab] = useState("posts");

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
    <div className="max-w-2xl mx-auto mt-12 bg-white rounded-xl shadow p-8">
      <button
        className="mb-4 text-blue-600 hover:underline"
        onClick={() => router.back()}
      >
        ← Back to Communities
      </button>
      <h1 className="text-3xl font-bold mb-2">{community.name}</h1>
      <p className="text-gray-700 mb-6">{community.description}</p>
      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 -mb-px border-b-2 font-medium transition-colors duration-200 focus:outline-none ${activeTab === "posts" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-blue-600"}`}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </button>
        <button
          className={`ml-4 px-4 py-2 -mb-px border-b-2 font-medium transition-colors duration-200 focus:outline-none ${activeTab === "chat" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-blue-600"}`}
          onClick={() => setActiveTab("chat")}
        >
          Chat
        </button>
      </div>
      {/* Tab Content */}
      {activeTab === "posts" && (
        <div className="border-t pt-4 mt-4">
          <h2 className="text-xl font-semibold mb-2">Community Posts</h2>
          <form
            className="mb-4 flex flex-col gap-2"
            onSubmit={e => {
              e.preventDefault();
              if (!newPostContent.trim() || !user) return;
              setPosts([{ content: newPostContent, createdAt: new Date(), userName: user.name }, ...posts]);
              setNewPostContent("");
            }}
          >
            <textarea
              className="border rounded p-2 w-full"
              rows={3}
              placeholder="Write a post..."
              value={newPostContent}
              onChange={e => setNewPostContent(e.target.value)}
            />
            <button
              type="submit"
              className="self-end bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={!newPostContent.trim()}
            >
              Post
            </button>
          </form>
          {posts.length === 0 ? (
            <div className="text-gray-500 italic">No posts yet. Be the first to post!</div>
          ) : (
            <ul className="space-y-4">
              {posts.map((post, idx) => (
                <li key={idx} className="border rounded p-3 bg-gray-50">
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
        <div className="border-t pt-4 mt-4">
          <h2 className="text-xl font-semibold mb-2">Community Chat</h2>
          <div className="flex flex-col h-80 bg-gray-50 rounded p-3 mb-2 overflow-y-auto border">
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
    </div>
  );
}
