import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./frontend/index";
import Dashboard from "./frontend/dashboard";
import Register from "./frontend/register";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    }, []);

    const handleGoogleLogin = () => {
        window.open("http://localhost:5000/api/auth/google", "_self");
    };

    const handleLogout = () => {
        window.open("http://localhost:5000/api/auth/logout", "_self");
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
                        <Route path="/dashboard" element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
