import axios from 'axios';

const API = axios.create({
  baseURL: 'https://ecommerce-revispyassignmentbackend.onrender.com/api', // Your backend URL
});

// Auth APIs
export const registerUser = (data: { name: string; email: string; password: string }) =>
  API.post('/auth/register', data);

export const loginUser = (data: { email: string; password: string }) =>
  API.post('/auth/login', data);

// Category APIs
export const fetchCategories = (page: number, limit: number) =>
  API.get(`/categories?page=${page}&limit=${limit}`);

// User Interests APIs
export const getUserInterests = (email: string) =>
  API.get(`/interests?email=${encodeURIComponent(email)}`);

export const saveUserInterests = (email: string, categoryIds: string[]) =>
  API.post('/interests', { email, categoryIds });

export default API;
