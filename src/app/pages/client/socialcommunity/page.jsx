"use client";

import { useState, useEffect } from "react";
import Sidebar from '../../../../../components/dashboardcomponents/sidebar';
import ClientTopbar from '../../../../../components/dashboardcomponents/clienttopbar';
import CommunityFeedWidget from '../../../../../components/dashboardcomponents/widgets/CommunityFeedWidget';
import CommunityChat from '../../../../../components/CommunityChat';
import { FaPlus } from 'react-icons/fa';
import { fetchCommunities, createCommunity, updateCommunity, deleteCommunity, addCommunityPostComment, updateCommunityPostComment, deleteCommunityPostComment } from '../../../../services/api/community.service';

const initialMeetups = [
  {
    time: "Friday, Jan 31, 6:00 AM (PST)",
    duration: "60 minutes",
    title: "Leaders: Let's Connect & Collaborate. What book and mentors have shaped your style?",
    host: "Jaclyn Zolnik",
    rsvps: 2,
    image: "/images/meetup1.png",
  },
  {
    time: "Friday, Jan 31, 8:00 AM (PST)",
    duration: "60 minutes",
    title: "EVerything They Forgot to Tell You When You Started Your Business",
    host: "Kevin McKamey",
    rsvps: 21,
    image: "/images/meetup2.png",
  },
  {
    time: "Friday, Jan 31, 9:00 AM (PST)",
    duration: "30 minutes",
    title: "Reclaim Your Relationship With Money - Making It Positive",
    host: "Elizabeth Rosenberg",
    rsvps: 17,
    image: "/images/meetup3.png",
  },
  {
    time: "Friday, Jan 31, 9:30 AM (PST)",
    duration: "30 minutes",
    title: "Mental Health Success Habits",
    host: "Samantha S.",
    rsvps: 10,
    image: "/images/meetup4.png",
  },
];

const initialFeed = [
  {
    id: 1,
    user: 'John D.',
    action: 'posted in Veterans Support',
    time: '10 min ago',
    content: 'Just completed my first week of the transition program!',
    type: 'post',
    likes: 0,
    reshares: 0,
  },
  {
    id: 2,
    user: 'Sarah M.',
    action: 'shared a resource',
    time: '1 hour ago',
    content: 'Found this great article on resume building for veterans.',
    type: 'post',
    likes: 0,
    reshares: 0,
  },
  {
    id: 3,
    user: 'Michael T.',
    action: 'created an event',
    time: '3 hours ago',
    content: 'Virtual coffee meetup this Friday at 10am PT.',
    type: 'post',
    likes: 0,
    reshares: 0,
  },
];

export default function SocialCommunityMeetupsPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Explore');
  const [communities, setCommunities] = useState([]);
  const [hostingForm, setHostingForm] = useState({ title: '', date: '', time: '', location: '' });
  const [loading, setLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { text: "Welcome to the community chat!", sender: "Admin", time: "Now" }
  ]);
  const [actionLoading, setActionLoading] = useState(false);
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
      } catch (e) {
        setCommunities([]);
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
    if (!hostingForm.title || !hostingForm.date || !hostingForm.time || !hostingForm.location) return;
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
    setHostingForm({ title: '', date: '', time: '', location: '' });
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
          onPost={handleCreateCommunity}
          onLike={handleUpdateCommunity}
          onReshare={handleDeleteCommunity}
        />
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
            <label className="block text-sm font-medium mb-1">Location</label>
            <input type="text" className="w-full border rounded px-3 py-2" value={hostingForm.location} onChange={e => setHostingForm({ ...hostingForm, location: e.target.value })} required />
          </div>
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
