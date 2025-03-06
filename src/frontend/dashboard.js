import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/auth/me") // 🔥 Fetch logged-in user
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
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
