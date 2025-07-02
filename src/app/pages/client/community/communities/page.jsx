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
      <div className="border-t pt-4 mt-4">
        <h2 className="text-xl font-semibold mb-2">Community Posts</h2>
        <div className="text-gray-500 italic">(Posts functionality coming soon)</div>
      </div>
    </div>
  );
}
