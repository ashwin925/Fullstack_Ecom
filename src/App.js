import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
            .then(response => {
                setUser(response.data);
            })
            .catch(() => setUser(null));
    }, []);

    const handleGoogleLogin = () => {
        window.open("http://localhost:5000/api/auth/google", "_self");
    };

    const handleLogout = () => {
        window.open("http://localhost:5000/api/auth/logout", "_self");
    };

    return (
        <div className="container text-center mt-5">
            <h1>OAuth Google Authentication</h1>
            {user ? (
                <>
                    <h2>Welcome, {user.name}!</h2>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <button className="btn btn-primary" onClick={handleGoogleLogin}>Login with Google</button>
            )}
        </div>
    );
}

export default App;
