import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import api from "./frontend/api";
import Login from "./frontend/login";
import Dashboard from "./frontend/dashboard";

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/auth/me")
            .then(({ data }) => {
                if (data && data.role) {
                    setUser(data);
                } else {
                    setUser(null);
                }
            })
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <h3>Loading...</h3>;

    return (
        <Router>
            <Routes>
                {/* If not logged in, go to login */}
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />

                {/* Only logged-in users can access Dashboard */}
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />

                {/* Example: Admin-only route (extend if needed) */}
                <Route
                    path="/admin"
                    element={user && user.role === "admin" ? <h2>Admin Panel</h2> : <Navigate to="/dashboard" />}
                />

                {/* Default Route */}
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}
