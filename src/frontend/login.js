import React from "react";

export default function Login() {
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:5000/api/auth/google"; // Backend Google OAuth route
    };

    return (
        <div>
            <h2>Login</h2>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
}
