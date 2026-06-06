// Centralised API base URL handling so the frontend (e.g. on Vercel) can talk
// to a backend hosted on a different origin (e.g. Railway).
//
// In local development the Express server embeds Vite and serves both the API
// and the frontend from the same origin, so VITE_API_BASE_URL is unset and all
// requests stay relative ("/api/...").
//
// In production set VITE_API_BASE_URL to the backend origin, e.g.
//   VITE_API_BASE_URL=https://your-app.up.railway.app
const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export const apiUrl = (path: string): string => `${API_BASE}${path}`;

export const api = (path: string, init?: RequestInit): Promise<Response> =>
  fetch(apiUrl(path), init);
