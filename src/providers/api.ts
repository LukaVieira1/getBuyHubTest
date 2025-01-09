import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: apiUrl,
});

export const tmdbApiKey = process.env.NEXT_PUBLIC_API_KEY;

api.interceptors.request.use((config) => {
  config.headers.Accept = "application/json";
  config.headers.Authorization = `Bearer ${tmdbApiKey}`;
  return config;
});
