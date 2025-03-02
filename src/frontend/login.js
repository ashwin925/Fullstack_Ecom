import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css"; // Custom styling

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
            .then(response => {
                if (response.data) {
                    navigate("/dashboard");
                }
            })
            .catch(err => console.error(err));
    }, [navigate]);

    return (
        <div className="login-page">
            <div className="background-animation"></div> {/* Cool animated background */}
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
