import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import api from "./frontend/api";
import Login from "./frontend/login";
import Dashboard from "./frontend/dashboard";

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await api.get("/auth/me");
                setUser(data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <Router>
            <Routes>
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute user={user} roles={["user", "seller", "admin"]}>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/admin" element={
                    <ProtectedRoute user={user} roles={["admin"]}>
                        <AdminPanel />
                    </ProtectedRoute>
                } />
                <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
        </Router>
    );
}

const ProtectedRoute = ({ user, roles, children }) => {
    if (!user) return <Navigate to="/login" />;
    if (!roles.includes(user.role)) return <Navigate to="/dashboard" />;
    return children;
};

const AdminPanel = () => <h2>Admin Dashboard</h2>;