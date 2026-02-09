"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CoachSidebar from "../../../../components/dashboardcomponents/CoachSidebar";
import ClientTopbar from "../../../../components/dashboardcomponents/clienttopbar";
import { FaPlus, FaUsers } from "react-icons/fa";
import {
  fetchCommunities,
  createCommunity,
} from "../../../../src/services/api/community.service";

// Component that uses searchParams
export default function CommunityContent() {
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCommunityId = searchParams.get('id');

  useEffect(() => {
    const userData = localStorage.getItem("wanacUser");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    }
    async function fetchData() {
      setLoadingCommunities(true);
      try {
        // Always fetch from the shared service so both portals see the same communities
        const communities = await fetchCommunities();
        setCommunities(Array.isArray(communities) ? communities : []);
      } catch (e) {
        setCommunities([]);
      }
      setLoadingCommunities(false);
    }
    fetchData();
  }, []);

  const handleCreateCommunity = async (e) => {
    e.preventDefault();
    setCreating(true);
    setCreateError("");
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
    } catch (err) {
      setCreateError("Failed to create community.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      {/* Sidebar */}
      <CoachSidebar
        className="w-56 bg-white border-r border-gray-200"
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        {/* Main Content */}
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 sm:px-4 md:px-12 py-4 md:py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1 space-y-8">
                {/* Community Creation & List */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                      <FaUsers className="text-primary" /> Communities
                    </h2>
                    <button
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-orange-500 transition text-sm"
                      onClick={() => setShowCreateModal(true)}
                    >
                      <FaPlus /> Create Community
                    </button>
                  </div>
                  {loadingCommunities ? (
                    <p className="text-gray-500 text-sm">
                      Loading communities...
                    </p>
                  ) : communityError ? (
                    <p className="text-red-500 text-sm">{communityError}</p>
                  ) : communities.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                      No communities yet. Be the first to create one!
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {communities.map((comm) => (
                        <div
                          key={comm.id}
                          className={`rounded-lg border p-4 flex flex-col bg-white shadow hover:shadow-md transition group cursor-pointer ${
                            selectedCommunityId === comm.id
                              ? "ring-2 ring-blue-500 border-blue-500"
                              : ""
                          }`}
                          onClick={() => router.push(`/coach/community?id=${comm.id}`)}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <FaUsers className="text-blue-600 text-xl" />
                            <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-700 transition">
                              {comm.name || (
                                <span className="italic text-gray-400">
                                  Untitled
                                </span>
                              )}
                            </h3>
                          </div>
                          {comm.name && (
                            <div className="mb-2">
                              <span className="text-xs text-gray-500 font-medium">
                                Name:{" "}
                              </span>
                              <span className="text-sm text-gray-700">
                                {comm.name}
                              </span>
                            </div>
                          )}
                          <hr className="mb-2 border-gray-200" />
                          <p className="text-sm text-gray-600 mb-2 min-h-[40px]">
                            {comm.description || (
                              <span className="italic text-gray-400"></span>
                            )}
                          </p>
                          <button
                            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (comm.id) {
                                router.push(`/coach/community/communities?id=${comm.id}`);
                              } else {
                                alert("Community ID is missing!");
                              }
                            }}
                          >
                            View Community
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
                {/* Create Community Modal */}
                {showCreateModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg relative">
                      <button
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                        onClick={() => setShowCreateModal(false)}
                      >
                        &times;
                      </button>
                      <h3 className="text-xl font-bold mb-4">
                        Create Community
                      </h3>
                      <form
                        onSubmit={handleCreateCommunity}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
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
                          <label className="block text-sm font-medium mb-1">
                            Description
                          </label>
                          <textarea
                            className="w-full border rounded px-3 py-2"
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
                          <p className="text-red-500 text-sm">{createError}</p>
                        )}
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-orange-500 transition w-full"
                          disabled={creating}
                        >
                          {creating ? "Creating..." : "Create"}
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

