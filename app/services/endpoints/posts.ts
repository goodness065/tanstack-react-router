import { api } from '../index';
import { queryClient } from '../index';
import type { CreatePostRequest, UpdatePostRequest } from '../../dto/request/posts';
import type { Post } from '../../dto/response/posts';

export const postsService = {
  async getPosts(): Promise<Post[]> {
    const response = await api.get('/posts');
    return response.data;
  },

  async getPost(id: number): Promise<Post> {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  async createPost(data: CreatePostRequest): Promise<Post> {
    const response = await api.post('/posts', data);
    queryClient.invalidateQueries({ queryKey: ['posts'] });
    return response.data;
  },

  async updatePost(id: number, data: UpdatePostRequest): Promise<Post> {
    const response = await api.patch(`/posts/${id}`, data);
    queryClient.invalidateQueries({ queryKey: ['posts'] });
    return response.data;
  },

  async deletePost(id: number): Promise<void> {
    await api.delete(`/posts/${id}`);
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
}; 