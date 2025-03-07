import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add JWT to headers
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;