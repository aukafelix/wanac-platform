"use client";

import { useState, useEffect } from "react";
import Sidebar from '../../../../../components/dashboardcomponents/sidebar';
import ClientTopbar from '../../../../../components/dashboardcomponents/clienttopbar';
import CommunityFeedWidget from '../../../../../components/dashboardcomponents/widgets/CommunityFeedWidget';
import CommunityChat from '../../../../../components/CommunityChat';
import { FaPlus } from 'react-icons/fa';
import { fetchCommunities, createCommunity, updateCommunity, deleteCommunity, addCommunityPostComment, updateCommunityPostComment, deleteCommunityPostComment } from '../../../../services/api/community.service';
import { postsService } from '../../../../services/api/posts.service';

export default function SocialCommunityMeetupsPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Explore');
  const [communities, setCommunities] = useState([]);
  const [hostingForm, setHostingForm] = useState({ title: '', date: '', time: '', type: '', location: '', link: '' });
  const [loading, setLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { text: "Welcome to the community chat!", sender: "Admin", time: "Now" }
  ]);
  const [actionLoading, setActionLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const handleSend = (text) => {
    setChatMessages(msgs => [
      ...msgs,
      { text, sender: user?.name || 'You', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
  };
  const contacts = [
    { id: 1, name: 'John D.' },
    { id: 2, name: 'Sarah M.' },
    { id: 3, name: 'Michael T.' },
    { id: 4, name: 'Elizabeth R.' },
    { id: 5, name: 'Samantha S.' },
  ];
  const [selectedContact, setSelectedContact] = useState(null);
  const handleSelectContact = (contact) => setSelectedContact(contact);

  useEffect(() => {
    const userData = localStorage.getItem('wanacUser');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    }
    async function fetchData() {
      setLoading(true);
      try {
        const communities = await fetchCommunities();
        setCommunities(Array.isArray(communities) ? communities : []);
        const posts = await postsService.getPosts();
        setPosts(Array.isArray(posts) ? posts : []);
      } catch (e) {
        setCommunities([]);
        setPosts([]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleCreateCommunity = async (communityData) => {
    setActionLoading(true);
    try {
      await createCommunity(communityData);
      const communities = await fetchCommunities();
      setCommunities(Array.isArray(communities) ? communities : []);
    } catch (e) {}
    setActionLoading(false);
  };

  const handleUpdateCommunity = async (communityId, data) => {
    setActionLoading(true);
    try {
      await updateCommunity(communityId, data);
      const communities = await fetchCommunities();
      setCommunities(Array.isArray(communities) ? communities : []);
    } catch (e) {}
    setActionLoading(false);
  };

  const handleDeleteCommunity = async (communityId) => {
    setActionLoading(true);
    try {
      await deleteCommunity(communityId);
      const communities = await fetchCommunities();
      setCommunities(Array.isArray(communities) ? communities : []);
    } catch (e) {}
    setActionLoading(false);
  };

  const handleAddComment = async (comment) => {
    setActionLoading(true);
    try {
      await addCommunityPostComment(comment);
      const communities = await fetchCommunities();
      setCommunities(Array.isArray(communities) ? communities : []);
    } catch (e) {}
    setActionLoading(false);
  };

  const handleUpdateComment = async (commentId, data) => {
    setActionLoading(true);
    try {
      await updateCommunityPostComment(commentId, data);
      const communities = await fetchCommunities();
      setCommunities(Array.isArray(communities) ? communities : []);
    } catch (e) {}
    setActionLoading(false);
  };

  const handleDeleteComment = async (commentId) => {
    setActionLoading(true);
    try {
      await deleteCommunityPostComment(commentId);
      const communities = await fetchCommunities();
      setCommunities(Array.isArray(communities) ? communities : []);
    } catch (e) {}
    setActionLoading(false);
  };

  // Hosting form submit
  const handleCreateEvent = (e) => {
    e.preventDefault();
    // Validation logic
    if (!hostingForm.title || !hostingForm.date || !hostingForm.time || !hostingForm.type) return;
    if (hostingForm.type === 'Physical' && !hostingForm.location) return;
    if (hostingForm.type === 'Online' && !hostingForm.link) return;
    const newCommunity = {
      ...hostingForm,
      rsvps: 0,
      host: user?.name || 'You',
      image: '/images/meetup1.png',
      duration: '60 minutes',
      time: `${hostingForm.date}, ${hostingForm.time}`,
      id: Date.now(),
      type: 'meetup',
      likes: 0,
      reshares: 0,
    };
    handleCreateCommunity(newCommunity);
    setHostingForm({ title: '', date: '', time: '', type: '', location: '', link: '' });
    setSelectedTab('Explore');
  };

  // Main content for each tab
  let mainContent;
  if (loading || actionLoading) {
    mainContent = <div className="pl-8"><p>Loading community data...</p></div>;
  } else if (selectedTab === 'Explore') {
    mainContent = (
      <div className="pl-8">
        <h2 className="text-2xl font-bold mb-6 text-primary">Community Feed & Meetups</h2>
        <CommunityFeedWidget
          feedItems={[...communities].sort((a, b) => (b.id || 0) - (a.id || 0))}
          onPost={postContent => handleCreateCommunity({
            title: 'Community Post',
            description: 'A new post in the community feed.',
            content: postContent
          })}
          onLike={handleUpdateCommunity}
          onReshare={handleDeleteCommunity}
        />
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4 text-primary">All Posts</h3>
          {posts.length === 0 ? (
            <p className="text-gray-500">No posts available.</p>
          ) : (
            <ul className="space-y-4">
              {posts.map(post => (
                <li key={post.id} className="bg-white p-4 rounded shadow border border-gray-100">
                  <div className="text-gray-800 mb-2">{post.content}</div>
                  <div className="text-xs text-gray-500 flex justify-between">
                    <span>By: {post.user_id}</span>
                    <span>{new Date(post.created_at).toLocaleString()}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  } else if (selectedTab === 'Hosting') {
    mainContent = (
      <div className="pl-8">
        <h2 className="text-2xl font-bold mb-6 text-primary">Host a Meetup</h2>
        <form className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-lg" onSubmit={handleCreateEvent}>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input type="text" className="w-full border rounded px-3 py-2" value={hostingForm.title} onChange={e => setHostingForm({ ...hostingForm, title: e.target.value })} required />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Date</label>
              <input type="date" className="w-full border rounded px-3 py-2" value={hostingForm.date} onChange={e => setHostingForm({ ...hostingForm, date: e.target.value })} required />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Time</label>
              <input type="time" className="w-full border rounded px-3 py-2" value={hostingForm.time} onChange={e => setHostingForm({ ...hostingForm, time: e.target.value })} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={hostingForm.type}
              onChange={e => setHostingForm({ ...hostingForm, type: e.target.value, location: '', link: '' })}
              required
            >
              <option value="">Select type</option>
              <option value="Physical">Physical</option>
              <option value="Online">Online</option>
            </select>
          </div>
          {hostingForm.type === 'Physical' && (
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input type="text" className="w-full border rounded px-3 py-2" value={hostingForm.location} onChange={e => setHostingForm({ ...hostingForm, location: e.target.value })} required />
            </div>
          )}
          {hostingForm.type === 'Online' && (
            <div>
              <label className="block text-sm font-medium mb-1">Link</label>
              <input type="text" className="w-full border rounded px-3 py-2" value={hostingForm.link} onChange={e => setHostingForm({ ...hostingForm, link: e.target.value })} required />
            </div>
          )}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"><FaPlus /> Create Meetup</button>
        </form>
      </div>
    );
  } else if (selectedTab === 'Chat') {
    mainContent = (
      <div className="pl-8">
        <CommunityChat
          messages={chatMessages}
          onSend={handleSend}
          user={user}
          contacts={contacts}
          selectedContact={selectedContact}
          onSelectContact={handleSelectContact}
        />
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      {/* Sidebar */}
      <Sidebar className="w-56 bg-white border-r border-gray-200" collapsed={collapsed} setCollapsed={setCollapsed} />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            {/* Tabs at the top */}
            <div className="flex justify-center border-b border-gray-200 mb-8">
              <div className="flex space-x-12">
                {['Explore', 'Hosting', 'Chat'].map(tab => (
                  <button
                    key={tab}
                    className={`text-lg font-medium focus:outline-none pb-1 ${selectedTab === tab ? 'text-black font-semibold border-b-2 border-blue-600' : 'text-gray-500'}`}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            {/* Main content: dynamic content only, no sidebar */}
            <section className="flex-1">{mainContent}</section>
          </div>
        </main>
      </div>
    </div>
  );
}
