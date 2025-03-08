import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import UserManagement from '../components/UserManagement';

const Admin = () => {
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
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-content">
        <UserManagement users={users} />
        {/* Add other admin components */}
      </div>
    </div>
  );
};

export default Admin;