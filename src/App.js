import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import api from "./frontend/api";
import Login from "./frontend/login";
import Dashboard from "./frontend/dashboard";

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/auth/me").then(({ data }) => {
            setUser(data);
        }).catch(() => {
            setUser(null);
        }).finally(() => setLoading(false));
    }, []);

    if (loading) return <h3>Loading...</h3>;

    return (
        <Router>
            <Routes>
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}
