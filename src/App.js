import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./frontend/index";
import Dashboard from "./frontend/dashboard";
import Register from "./frontend/register";
import Login from "./frontend/login";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
            .then(response => {
                console.log("✅ User Data:", response.data);
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log("❌ Not Authenticated:", error.response?.data);
                setUser(null);
                setLoading(false);
            });
    }, []);

    const handleGoogleLogin = () => {
        window.open("http://localhost:5000/api/auth/google", "_self");
        setTimeout(() => window.location.reload(), 2000); // ✅ Force refresh after login
    };

    const handleLogout = () => {
        axios.get("http://localhost:5000/api/auth/logout", { withCredentials: true })
            .then(() => {
                setUser(null);
                window.location.reload(); // ✅ Ensure user is logged out completely
            });
    };

    return (
        <Router>
            <div className="container mt-5 text-center">
                {loading ? (
                    <h3>Loading...</h3>
                ) : (
                    <Routes>
                        <Route path="/" element={<Home onLogin={handleGoogleLogin} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login onLogin={handleGoogleLogin} />} />
                        <Route path="/dashboard" element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
                    </Routes>
                )}
            </div>
        </Router>
    ); 
}

export default App;
