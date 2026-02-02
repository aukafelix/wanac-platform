"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../../components/dashboardcomponents/sidebar";
import ClientTopbar from "../../../../components/dashboardcomponents/clienttopbar";
import { FaPlus, FaUsers, FaSearch, FaInfoCircle, FaComments, FaGlobe, FaLightbulb } from "react-icons/fa";
import {
  fetchCommunities,
  createCommunity,
} from "../../../../src/services/api/community.service";

export default function CommunityPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Explore');
  const [communities, setCommunities] = useState([]);
  const [loadingCommunities, setLoadingCommunities] = useState(true);
  const [communityError, setCommunityError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCommunity, setNewCommunity] = useState({
    name: "",
    description: "",
  });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createSuccess, setCreateSuccess] = useState("");
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentCommunity, setCurrentCommunity] = useState(null);
  const router = useRouter();

  // Load user data and last-viewed community from storage
  useEffect(() => {
    const userData = localStorage.getItem("wanacUser");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  // Fetch communities data - runs on every mount
  useEffect(() => {
    let isMounted = true;
    
    const loadCommunities = async () => {
      setLoadingCommunities(true);
      setCommunityError("");
      
      try {
        const data = await fetchCommunities();
        console.log("Fetched data:", data);

        if (isMounted) {
          let comms = Array.isArray(data)
            ? data
            : Array.isArray(data.communites?.data)
            ? data.communites.data
            : [];

          setCommunities(comms);
        }
      } catch (error) {
        console.error("Error fetching communities:", error);
        if (isMounted) {
          setCommunityError("Failed to load communities.");
          setCommunities([]);
        }
      } finally {
        if (isMounted) {
          setLoadingCommunities(false);
        }
      }
    };

    loadCommunities();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, []); // Keep empty array to run on mount - Next.js will remount on navigation
  

  const handleCreateCommunity = async (e) => {
    e.preventDefault();
    setCreating(true);
    setCreateError("");
    setCreateSuccess("");
    if (!newCommunity.name.trim() || !newCommunity.description.trim()) {
      setCreateError("Name and description are required.");
      setCreating(false);
      return;
    }
    try {
      const payload = {
        name: newCommunity.name,
        description: newCommunity.description,
      };
      const created = await createCommunity(payload);
      setCommunities([created, ...communities]);
      setShowCreateModal(false);
      setNewCommunity({ name: "", description: "" });
      setCreateSuccess("Community created successfully!");
      setTimeout(() => setCreateSuccess(""), 3000);
    } catch (err) {
      setCreateError("Failed to create community.");
    } finally {
      setCreating(false);
    }
  };

  // Filter communities based on search
  const filteredCommunities = communities.filter(comm =>
    searchQuery.trim()
      ? comm.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comm.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

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
        <ClientTopbar user={user} currentCommunity={currentCommunity?.name} />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-6 py-3 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Main Content */}
              <div className="flex-1 space-y-3">
                {/* Header Section */}
                <section className="bg-gradient-to-br from-[#002147] to-[#003875] rounded-xl p-4 shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <img 
                      src="/veterancommunity.png" 
                      alt="Background" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-full">
                        <FaUsers className="text-white text-xl" />
                      </div>
                      <div>
                        <h1 className="text-xl font-bold text-white mb-1">Communities</h1>
                        <p className="text-white/90 text-xs">Connect, share, and grow together</p>
                      </div>
                    </div>
                    <button
                      className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg transition-all font-semibold text-[11px] shadow-sm"
                      onClick={() => setShowCreateModal(true)}
                    >
                      <FaPlus size={10} /> Create
                    </button>
                  </div>
                </section>

                {/* Success/Error Messages */}
                {createSuccess && (
                  <div className="p-2 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2 text-xs">
                    <span>✓</span>
                    {createSuccess}
                  </div>
                )}
                {communityError && (
                  <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2 text-xs">
                    <span>⚠</span>
                    {communityError}
                  </div>
                )}

                {/* Current community card - when user has a last-viewed community */}
                {currentCommunity && (
                  <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-white/80 rounded-lg">
                          <FaUsers className="text-[#002147]" size={14} />
                        </div>
                        <div>
                          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Your current community</p>
                          <p className="text-sm font-bold text-[#002147]">{currentCommunity.name}</p>
                        </div>
                      </div>
                      <button
                        className="flex items-center gap-1.5 bg-gradient-to-r from-[#002147] to-[#003875] hover:from-[#003875] hover:to-[#002147] text-white font-semibold py-1.5 px-3 rounded-lg transition-all text-[11px]"
                        onClick={() => router.push(`/client/community/communities/${currentCommunity.id}`)}
                      >
                        <FaComments size={10} />
                        View Community
                      </button>
                    </div>
                  </section>
                )}

                {/* Search Bar */}
                <section className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
                  <div className="relative">
                    <FaSearch className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={10} />
                    <input
                      type="text"
                      placeholder="Search communities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full border-2 border-gray-300 rounded-lg pl-8 pr-3 py-1.5 text-[11px] focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 focus:outline-none"
                    />
                  </div>
                </section>

                {/* Communities List */}
                <section className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-[#002147] flex items-center gap-1.5">
                      <FaGlobe className="text-orange-500" size={12} />
                      All Communities
                      {communities.length > 0 && (
                        <span className="text-[10px] font-normal text-gray-500">({filteredCommunities.length})</span>
                      )}
                    </h2>
                  </div>

                  {loadingCommunities ? (
                    <div className="text-center text-gray-400 py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002147] mx-auto mb-2"></div>
                      <p className="text-[10px]">Loading communities...</p>
                    </div>
                  ) : filteredCommunities.length === 0 ? (
                    <div className="text-center border-2 border-dashed border-gray-300 rounded-xl py-8 px-4 bg-gray-50">
                      <div className="flex justify-center mb-3">
                        <div className="p-3 bg-gray-200 rounded-full">
                          <FaUsers className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                      <p className="font-semibold text-gray-700 text-sm mb-1">
                        {searchQuery ? "No matches found" : "No Communities Yet"}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        {searchQuery ? "Try a different search term" : "Be the first to create a community!"}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {filteredCommunities.map((comm) => (
                        <div
                          key={comm.id}
                          className={`rounded-lg border-2 p-3 flex flex-col bg-white hover:shadow-lg transition-all group cursor-pointer ${
                            selectedCommunityId === comm.id
                              ? "ring-2 ring-blue-500 border-blue-500 shadow-md"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                          onClick={() => setSelectedCommunityId(comm.id)}
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <div className="p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                              <FaUsers className="text-[#002147] text-sm" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-sm text-gray-800 group-hover:text-[#002147] transition truncate">
                              {comm.name || (
                                <span className="italic text-gray-400">
                                  Untitled
                                </span>
                              )}
                            </h3>
                          </div>
                            </div>
                          <p className="text-[11px] text-gray-600 mb-3 line-clamp-2 min-h-[32px]">
                            {comm.description || (
                              <span className="italic text-gray-400">No description</span>
                            )}
                          </p>
                          <div className="mt-auto pt-2 border-t border-gray-100">
                          <button
                              className="w-full bg-gradient-to-r from-[#002147] to-[#003875] hover:from-[#003875] hover:to-[#002147] text-white font-semibold py-1.5 px-3 rounded-lg transition-all text-[10px] flex items-center justify-center gap-1.5"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (comm.id) {
                                router.push(`/client/community/communities/${comm.id}`);
                              } else {
                                alert("Community ID is missing!");
                              }
                            }}
                          >
                              <FaComments size={9} />
                            View Community
                          </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>

              {/* Right Sidebar */}
              <aside className="lg:w-64 space-y-3">
                {/* Tips Card */}
                <div className="bg-gradient-to-br from-[#002147] to-[#003875] rounded-xl shadow-sm p-3 text-white">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                    <FaLightbulb />
                    Community Tips
                  </h3>
                  <ul className="space-y-2 text-[10px] text-white/90">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>Join communities to connect with peers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>Share experiences and learn from others</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>Create your own community on topics you care about</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>Engage in meaningful conversations</span>
                    </li>
                  </ul>
                </div>

                {/* Stats Card */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-3">
                  <h3 className="text-sm font-semibold text-[#002147] mb-3">Community Stats</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="text-[10px] font-medium text-gray-700">Total Communities</span>
                      <span className="text-sm font-bold text-[#002147]">{communities.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-[10px] font-medium text-gray-700">Your Communities</span>
                      <span className="text-sm font-bold text-green-600">0</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                      <span className="text-[10px] font-medium text-gray-700">Active Now</span>
                      <span className="text-[10px] font-bold text-orange-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        {Math.floor(communities.length * 0.3)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info Card */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-3">
                  <h3 className="text-sm font-semibold text-[#002147] mb-3 flex items-center gap-1.5">
                    <FaInfoCircle className="text-orange-500" />
                    About Communities
                  </h3>
                  <div className="space-y-2">
                    <div className="p-2 bg-blue-50 rounded text-[10px] text-gray-700">
                      <strong>Connect:</strong> Meet veterans and service members
                    </div>
                    <div className="p-2 bg-green-50 rounded text-[10px] text-gray-700">
                      <strong>Share:</strong> Exchange stories and experiences
                    </div>
                    <div className="p-2 bg-yellow-50 rounded text-[10px] text-gray-700">
                      <strong>Support:</strong> Give and receive peer support
                    </div>
                    <div className="p-2 bg-orange-50 rounded text-[10px] text-gray-700">
                      <strong>Grow:</strong> Learn and develop together
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>

                {/* Create Community Modal */}
                {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-4 w-full max-w-md shadow-2xl relative">
                      <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition"
              onClick={() => {
                setShowCreateModal(false);
                setCreateError("");
              }}
            >
              ×
                      </button>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <FaUsers className="text-[#002147]" size={12} />
              </div>
              <h2 className="text-sm font-bold text-[#002147]">Create New Community</h2>
            </div>
            <form onSubmit={handleCreateCommunity} className="space-y-3">
                        <div>
                <label className="block text-[11px] font-semibold mb-1 text-gray-700">
                  Community Name *
                          </label>
                          <input
                            type="text"
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-1.5 text-[11px] focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 focus:outline-none"
                  placeholder="Enter community name..."
                            value={newCommunity.name}
                            onChange={(e) =>
                              setNewCommunity({
                                ...newCommunity,
                                name: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                <label className="block text-[11px] font-semibold mb-1 text-gray-700">
                  Description *
                          </label>
                          <textarea
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-1.5 text-[11px] focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 focus:outline-none min-h-[80px] resize-none"
                  placeholder="Describe your community..."
                            value={newCommunity.description}
                            onChange={(e) =>
                              setNewCommunity({
                                ...newCommunity,
                                description: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        {createError && (
                <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-[10px]">
                  {createError}
                </div>
              )}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-3 py-1.5 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold text-[11px] transition-all"
                  onClick={() => {
                    setShowCreateModal(false);
                    setCreateError("");
                  }}
                >
                  Cancel
                </button>
                        <button
                          type="submit"
                  className="px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-semibold text-[11px] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                          disabled={creating}
                        >
                  <FaPlus size={9} />
                  {creating ? "Creating..." : "Create Community"}
                        </button>
              </div>
                      </form>
                    </div>
                  </div>
                )}
    </div>
  );
}
