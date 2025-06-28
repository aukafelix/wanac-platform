const API_BASE = "https://wanac-api.kuzasports.com/api/v1";

// Fetch all communities
export async function fetchCommunities() {
  const res = await fetch(`${API_BASE}/communities`, {
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to fetch communities");
  return res.json();
}

// Create a new community
export async function createCommunity(community: any) {
  const res = await fetch(`${API_BASE}/communities/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(community),
  });
  if (!res.ok) throw new Error("Failed to create community");
  return res.json();
}

// Update a community by ID
export async function updateCommunity(communityId: number, data: any) {
  const res = await fetch(`${API_BASE}/communities/update/${communityId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update community");
  return res.json();
}

// Delete a community by ID (assuming ID is sent in body or as a param)
export async function deleteCommunity(communityId: number) {
  const res = await fetch(`${API_BASE}/communities/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({ id: communityId }),
  });
  if (!res.ok) throw new Error("Failed to delete community");
  return res.json();
}

// Add a comment to a community post
export async function addCommunityPostComment(comment: any) {
  const res = await fetch(`${API_BASE}/communities/posts/comment/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(comment),
  });
  if (!res.ok) throw new Error("Failed to add comment");
  return res.json();
}

// Update a comment on a community post
export async function updateCommunityPostComment(commentId: number, data: any) {
  const res = await fetch(`${API_BASE}/communities/posts/comment/update/${commentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update comment");
  return res.json();
}

// Delete a comment from a community post
export async function deleteCommunityPostComment(commentId: number) {
  const res = await fetch(`${API_BASE}/communities/posts/comment/delete/${commentId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete comment");
  return res.json();
} 