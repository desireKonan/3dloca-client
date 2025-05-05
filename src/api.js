import axios from "axios";

const api = axios.create({
  baseURL: "https://api.3dloca.com/api/v1",
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export default api;
