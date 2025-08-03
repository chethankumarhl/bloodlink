// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND_URL, // or your backend API URL
  withCredentials: true,
});

export default instance;