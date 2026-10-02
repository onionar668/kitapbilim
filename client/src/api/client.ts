import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL ?? '/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const storedToken = localStorage.getItem('auth_token');
if (storedToken) {
  api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
}

export function setAuthToken(token: string | null): void {
  if (token) {
    localStorage.setItem('auth_token', token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem('auth_token');
    delete api.defaults.headers.common.Authorization;
  }
}
