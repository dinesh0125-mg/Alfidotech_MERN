import axios from 'axios';

const API_BASE = 'https://jsonplaceholder.typicode.com';

const client = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Posts API
export const getPosts = () => client.get('/posts');
export const getPost = (id) => client.get(`/posts/${id}`);
export const createPost = (data) => client.post('/posts', data);
export const updatePost = (id, data) => client.put(`/posts/${id}`, data);
export const deletePost = (id) => client.delete(`/posts/${id}`);

// Comments for a post
export const getComments = (postId) => client.get(`/posts/${postId}/comments`);

export default client;
