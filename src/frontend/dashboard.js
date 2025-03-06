import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

export default function Dashboard() {
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/api/auth/me").then(({ data }) => {
            if (data?.role) {
                setRole(data.role);
            } else {
                navigate("/login");
            }
        }).catch(() => navigate("/login"));
    }, [navigate]);

    return (
        <div>
            <h2>Dashboard</h2>
            {role === "admin" ? <p>Welcome Admin</p> : <p>Welcome User</p>}
        </div>
    );
}