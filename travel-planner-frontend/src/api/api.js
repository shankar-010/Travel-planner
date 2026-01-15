import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});
const API_BASE = "http://localhost:8080";

export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  return res.json();
};

export default api;
