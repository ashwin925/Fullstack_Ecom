import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/me", {
            withCredentials: true  // ✅ Ensures cookies (JWT) are sent
        })
        .then(response => setUser(response.data))
        .catch(() => navigate("/")); 
    }, [navigate]);
    

    const handleLogout = () => {
        axios.get("http://localhost:5000/api/auth/logout", { withCredentials: true })
            .then(() => navigate("/"));
    };

    return (
        <div className="container mt-5 text-center">
            <h2>Welcome to the Dashboard</h2>
            <p>Only authenticated users can see this page.</p>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
    );
}