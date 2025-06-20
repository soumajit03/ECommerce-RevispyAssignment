import axios from 'axios';

const API = axios.create({
  baseURL: 'https://ecommerce-revispyassignmentbackend.onrender.com/api',
});

// ✅ Optional: Global error logger
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ✅ Register a new user
export const registerUser = (formData: {
  name: string;
  email: string;
  password: string;
}) => API.post('/auth/register', formData);

// ✅ Login user (optional if using elsewhere)
export const loginUser = (formData: {
  email: string;
  password: string;
}) => API.post('/auth/login', formData);

// ✅ Fetch paginated categories
export const fetchCategories = (page: number, limit: number) =>
  API.get(`/categories?page=${page}&limit=${limit}`);

// ✅ Save user interests
export const saveUserInterests = (email: string, categoryIds: string[]) =>
  API.post('/interests', { email, categoryIds });

// ✅ Get user interests
export const getUserInterests = (email: string) =>
  API.get(`/interests?email=${encodeURIComponent(email)}`);
