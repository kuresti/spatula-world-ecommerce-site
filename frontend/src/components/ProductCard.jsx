import React from 'react';
import './ProductCard.css';
import { useCart } from './CartContext';


/********************************
 * Props needed for ProductCard
 * a product object that contains
 * name, description, price, and
 * for future stock to disable the
 * button when an product is out of stock.
 ********************************/
export default function ProductCard({ product }) {
    const { addItem } = useCart();
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
                    <button 
                        onClick={() => {
                            console.log('Adding to cart', product);
                            addItem(product);
                        }}
                    >Add to Cart</button>
            </div>
        </div>
        </div>
    );
}

