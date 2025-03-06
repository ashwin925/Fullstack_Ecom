import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import "./login.css";

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/auth/me")
            .then(({ data }) => {
                if (data) navigate("/dashboard");
            })
            .catch(() => {});
    }, [navigate]);

    return (
        <div className="login-page">
            <div className="background-animation"></div>
            <div className="login-container">
                <div className="glass-card">
                    <h2>Welcome Back</h2>
                    <p>Sign in to continue</p>
                    <a href="http://localhost:5000/api/auth/google" className="login-btn">
                        <i className="fab fa-google"></i> Login with Google
                    </a>
                </div>
            </div>
        </div>
    );
}
