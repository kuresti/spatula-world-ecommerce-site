import React from 'react';
import ProductCard from './ProductCard';
import './ProductCard.css'; 
import './ProductList.css';


export default function ProductList({ products }) {
    console.log('products ->', products)
    return (
        <div className="product-list">
            
            {Array.isArray(products) && products.map((product) => (
                <ProductCard
                    key={product._id || product.id}
                    product={product}
                />
            ))}
        </div>
    )
}