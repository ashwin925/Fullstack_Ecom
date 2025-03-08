import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import ProductList from '../components/ProductList';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('/auth/me');
        const productsResponse = await axios.get('/products');
        setUser(userResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Welcome {user?.name}</h1>
      <div className="dashboard-content">
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default Dashboard;