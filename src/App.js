import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    }, []);

    const handleGoogleLogin = () => {
        window.open("http://localhost:5000/api/auth/google", "_self");
    };

    const handleLogout = () => {
        window.open("http://localhost:5000/api/auth/logout", "_self");
    };

    return (
        <div className="container text-center mt-5">
            <h1 className="mb-4">OAuth Google Authentication</h1>

            {loading ? (
                <h3>Loading...</h3>
            ) : user ? (
                <>
                    <h2>Welcome, {user.name}!</h2>
                    <p>Email: {user.email}</p>
                    <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <button className="btn btn-primary mt-3" onClick={handleGoogleLogin}>
                    Login with Google
                </button>
            )}
        </div>
    );
}

export default App;
