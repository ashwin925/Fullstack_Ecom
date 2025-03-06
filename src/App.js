import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import api from "./frontend/api";
import Home from "./frontend/index";
import Dashboard from "./frontend/dashboard";
import Login from "./frontend/login";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/api/auth/me").then(({ data }) => {
            setUser(data);
            setLoading(false);
        }).catch(() => {
            setUser(null);
            setLoading(false);
        });
    }, []);

    return (
        <Router>
            {loading ? <h3>Loading...</h3> : (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
                </Routes>
            )}
        </Router>
    );
}

export default App;
