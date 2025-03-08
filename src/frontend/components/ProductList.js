import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {products.map(product => (
        <div key={product.id} className="col">
          <div className="card h-100">
            <img 
              src={product.image || 'https://via.placeholder.com/300'} 
              className="card-img-top" 
              alt={product.name}
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">${product.price}</p>
              <button className="btn btn-primary">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;