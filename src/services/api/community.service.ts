import { apiClient } from './config';

const API_BASE = '/api/v1';

// Fetch all communities
export async function fetchCommunities() {
  const res = await apiClient.get(`${API_BASE}/communities`);
  return res.data;
}

// Create a new community
export async function createCommunity(community: any) {
  const res = await apiClient.post(`${API_BASE}/communities/add`, community);
  return res.data;
}

// Update a community by ID
export async function updateCommunity(communityId: number, data: any) {
  const res = await apiClient.put(`${API_BASE}/communities/update/${communityId}`, data);
  return res.data;
}

// Delete a community by ID (assuming ID is sent in body or as a param)
export async function deleteCommunity(communityId: number) {
  const res = await apiClient.delete(`${API_BASE}/communities/delete`, { data: { id: communityId } });
  return res.data;
}

// Add a comment to a community post
export async function addCommunityPostComment(comment: any) {
  const res = await apiClient.post(`${API_BASE}/communities/posts/comment/add`, comment);
  return res.data;
}

// Update a comment on a community post
export async function updateCommunityPostComment(commentId: number, data: any) {
  const res = await apiClient.put(`${API_BASE}/communities/posts/comment/update/${commentId}`, data);
  return res.data;
}

// Delete a comment from a community post
export async function deleteCommunityPostComment(commentId: number) {
  const res = await apiClient.delete(`${API_BASE}/communities/posts/comment/delete/${commentId}`);
  return res.data;
}

// Fetch all community posts
export async function fetchCommunityPosts() {
  const res = await apiClient.get(`${API_BASE}/communities/posts`);
  return res.data;
}

// Update a community post by ID
export async function updateCommunityPost(postId: number, data: any) {
  const res = await apiClient.put(`${API_BASE}/communities/posts/update/${postId}`, data);
  return res.data;
}

// Fetch a single community by ID
export async function fetchCommunityById(communityId: any) {
  const res = await apiClient.get(`${API_BASE}/communities/${communityId}`);
  return res.data;
}

// Add a new feed post
export async function addCommunityFeedPost(post: any) {
  const res = await apiClient.post('https://wanac-api.kuzasports.com/api/v1/communities/posts/add', post);
  return res.data;
}

// Add a new event
export async function addEvent(event: any) {
  const res = await apiClient.post('https://wanac-api.kuzasports.com/api/v1/events/add', event);
  return res.data;
} 