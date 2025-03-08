import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import UserManagement from '../components/UserManagement';

const Admin = ({ user }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Admin Dashboard</h1>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Welcome, {user?.name}</h2>
          <p className="card-text">You have administrator privileges</p>
        </div>
      </div>
      <UserManagement users={users} />
    </div>
  );
};

export default Admin;