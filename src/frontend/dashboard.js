import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      credentials: "include", // Ensures cookies are sent
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <button onClick={() => (window.location.href = "http://localhost:5000/api/auth/logout")}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
