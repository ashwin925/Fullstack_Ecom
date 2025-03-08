import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from './frontend/api/axios';
import PrivateRoute from './frontend/components/PrivateRoute';
import Navbar from './frontend/components/Navbar';
import Home from './frontend/pages/Home';
import Login from './frontend/pages/Login';
import Register from './frontend/pages/register';
import Dashboard from './frontend/pages/dashboard';
import Admin from './frontend/pages/Admin';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get('/auth/me');
        setUser(data);
      } catch (error) {
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    if (localStorage.getItem('token')) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="full-page-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute user={user} allowedRoles={['user', 'admin']}>
                <Dashboard user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute user={user} allowedRoles={['admin']}>
                <Admin user={user} />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;