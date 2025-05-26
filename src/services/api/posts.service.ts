import { apiClient } from './config';
import { Post, Comment } from './types';

export const postsService = {
  async getPosts(): Promise<Post[]> {
    const response = await apiClient.get<Post[]>('/api/v1/posts');
    return response.data;
  },

  async updatePost(id: string, data: Partial<Post>): Promise<Post> {
    const response = await apiClient.put<Post>(`/api/v1/posts/update/${id}`, data);
    return response.data;
  },

  async deletePost(id: string): Promise<void> {
    await apiClient.delete(`/api/v1/posts/delete/${id}`);
  },

  // Comments
  async addComment(data: Partial<Comment>): Promise<Comment> {
    const response = await apiClient.post<Comment>('/api/v1/posts/comment/add', data);
    return response.data;
  },

  async updateComment(id: string, data: Partial<Comment>): Promise<Comment> {
    const response = await apiClient.put<Comment>(`/api/v1/posts/comment/update/${id}`, data);
    return response.data;
  },

  async deleteComment(id: string): Promise<void> {
    await apiClient.delete(`/api/v1/posts/comment/delete/${id}`);
  },
}; 