import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <header className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 mb-4">Welcome to Our E-Commerce Store</h1>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/register" className="btn btn-light btn-lg">Get Started</Link>
            <Link to="/login" className="btn btn-outline-light btn-lg">Login</Link>
          </div>
        </div>
      </header>

      <section className="container py-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="alert alert-info">
          Featured products will be displayed here
        </div>
      </section>
    </div>
  );
};

export default Home;