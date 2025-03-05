import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",  // ✅ Backend API URL
    withCredentials: true,  // ✅ Ensures cookies (JWT) are sent with requests
});

export default api;
