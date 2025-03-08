import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/auth/me", { withCredentials: true }) 
            .then(({ data }) => {
                if (data) {
                    setUser(data);
                } else {
                    navigate("/login"); 
                }
            })
            .catch(() => navigate("/login"));
    }, [navigate]);

    return (
        <div>
            <h2>Dashboard</h2>
            {user ? (
                <>
                    <p>Welcome, {user.name}!</p>
                    <img src={user.avatar} alt="Profile" />
                    <button onClick={() => api.get("/auth/logout").then(() => navigate("/login"))}>
                        Logout
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
