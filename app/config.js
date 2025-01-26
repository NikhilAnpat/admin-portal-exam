import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "https://mamun-reza-freeshops-backend.vercel.app/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request Interceptor: ", config);
    return config;
  },
  (error) => {
    console.error("Request Error: ", error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log("Response Interceptor: ", response);
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized - Token expired or invalid");
        window.location.href = "/login"; // Redirect to login if token is invalid
      } else if (error.response.status === 403) {
        console.error("Forbidden - You don't have permission.");
      } else {
        console.error(`Error ${error.response.status}: ${error.response.data.message}`);
      }
    } else {
      console.error("Network or Server Error: ", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
