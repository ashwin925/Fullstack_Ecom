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
        api.get("/auth/me").then(({ data }) => {
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
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Login />} /> 
                </Routes>
            )}
        </Router>
    );
}

export default App;