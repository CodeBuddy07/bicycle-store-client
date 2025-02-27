// import axios from "axios";
// import { useMemo } from "react";

// const axiosSecure = axios.create({
//   baseURL: "http://localhost:3000/api",
//   withCredentials: true, 
//   headers: {
//     "Content-Type": "application/json", 
//   },
// });

// // Logout function
// const logout = () => {
//   localStorage.removeItem("accessToken");
//   window.location.href = "/login";
// };

// // Interceptors for request/response handling
// axiosSecure.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`; 
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosSecure.interceptors.response.use(
//   (response) => response, 
//   (error) => {
//     if (error.response?.status === 401) {
//       console.error("Unauthorized. Logging out...");
//       logout();
//     }
//     return Promise.reject(error);
//   }
// );

// const useAxiosSecure = () => {
//   return useMemo(() => axiosSecure, []);
// };

// export default useAxiosSecure;
