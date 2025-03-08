import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import ProductList from '../components/ProductList'; // Ensure correct casing

const Dashboard = ({ user }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Welcome {user?.name}</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Dashboard;