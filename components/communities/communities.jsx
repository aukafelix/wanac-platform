import React, { useState } from "react";

const Communities = () => {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);

  const handlePost = () => {
    if (post.trim() === "") return;
    setPosts([{ content: post, id: Date.now() }, ...posts]);
    setPost("");
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      {/* Top Navigation */}
      <div className="flex justify-end items-center px-8 py-4 border-b bg-white">
        <div className="flex-1" />
        <div className="flex items-center space-x-8">
          <span className="font-semibold text-lg">Explore</span>
          <span className="text-gray-500 cursor-pointer">Hosting</span>
          <span className="text-gray-500 cursor-pointer">Chat</span>
        </div>
        <div className="flex-1 flex justify-end items-center space-x-4">
          <div className="relative">
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">3</span>
            <svg width="24" height="24" fill="none" className="text-gray-400">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" fill="currentColor"/>
            </svg>
          </div>
          <span className="rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center">
            <svg width="24" height="24" fill="none" className="text-gray-400">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </span>
          <span className="text-gray-700 font-medium">Ian Odundo</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mt-12 px-4">
        <h1 className="text-3xl font-bold mb-8">WANAC Community</h1>
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">Community Feed</h2>
          <textarea
            className="w-full border rounded p-3 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
            rows={3}
            placeholder="Share something with the community…"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
            onClick={handlePost}
          >
            Post
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">All Posts</h2>
          {posts.length === 0 ? (
            <p className="text-gray-500">No posts available.</p>
          ) : (
            <ul>
              {posts.map((p) => (
                <li key={p.id} className="bg-white rounded shadow p-4 mb-3">
                  {p.content}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Communities;
