import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
            .then(response => {
                if (response.data) {
                    navigate("/dashboard");  // ✅ Redirect logged-in users
                }
            })
            .catch(err => console.error(err));
    }, [navigate]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">E-Commerce</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><a className="nav-link" href="/register">Register</a></li>
                            <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-5 text-center">
                <h1>Welcome to Our E-Commerce Platform</h1>
                <p>Register or Login to continue.</p>
                <a href="http://localhost:5000/api/auth/google" className="btn btn-danger">Login with Google</a>
            </div>
        </div>
    );
}
