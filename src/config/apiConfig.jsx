import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://e-comm-backend-ten-mauve.vercel.app/api",
  withCredentials: true,
});

// // 🔐 Attach token automatically
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     // console.log("token", token);

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error),
// );
