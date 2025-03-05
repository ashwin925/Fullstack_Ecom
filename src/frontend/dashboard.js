import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/auth/me", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: "include", // Important! Sends cookies with request
        })
        .then(res => res.json())
        .then(data => {
            if (data?.email) {
                console.log("✅ Logged-in User:", data);
            } else {
                console.log("❌ No user found, redirecting to login...");
                window.location.href = "/login";
            }
        })
        .catch(err => console.log("Error fetching user:", err));
    }, []);
    
    

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