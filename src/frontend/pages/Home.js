import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to Our E-Commerce Store</h1>
        <p>Discover amazing products at great prices</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn btn-primary">Get Started</Link>
          <Link to="/login" className="btn btn-secondary">Login</Link>
        </div>
      </header>

      <section className="featured-products">
        <h2>Popular Products</h2>
        {/* Add product cards here */}
      </section>
    </div>
  );
};

export default Home;