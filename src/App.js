import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import Home from "./frontend/index";
import Dashboard from "./frontend/dashboard";
import Register from "./frontend/register";
import Login from "./frontend/login"; // Ensure this file exists

const AppRoutes = () => {
    const { user, loading } = useAuth();

    if (loading) return <h3 className="loading-text">Loading...</h3>;

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
}

export default App;
