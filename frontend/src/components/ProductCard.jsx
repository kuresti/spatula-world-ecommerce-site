import React from 'react';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart }) {
    return (
        <div className="product-grid">
        <div className="product-card">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <button onClick={() => onAddToCart(product)}>Add to Cart</button>
            </div>
        </div>
        </div>
    );
}

