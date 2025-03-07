import React, { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const { data } = await api.post("/auth/login", { email, password });
          localStorage.setItem("token", data.token);
          // Redirect based on role
          navigate(data.role === "admin" ? "/admin" : "/dashboard");
        } catch (error) {
          // Display detailed error
          alert(
            error.response?.data?.message || 
            error.message || 
            "Login failed. Check the console."
          );
          console.error("Login error details:", error.response?.data || error);
        }
      };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" required 
                    onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" required 
                    onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}