import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/auth/me")
            .then(({ data }) => {
                if (data) navigate("/dashboard");
            })
            .catch(() => {});
    }, [navigate]);

    return (
        <div className="home-container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">E-Commerce</a>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><a className="nav-link" href="/register">Register</a></li>
                        <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
                    </ul>
                </div>
            </nav>

            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="login-card p-4 shadow-lg text-center">
                    <h2 className="mb-3">Welcome to Our E-Commerce Platform</h2>
                    <a href="http://localhost:5000/api/auth/google" className="btn btn-danger w-100">
                        <i className="fab fa-google me-2"></i> Login with Google
                    </a>
                </div>
            </div>
        </div>
    );
}   