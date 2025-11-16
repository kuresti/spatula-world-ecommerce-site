import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import ProductList from './components/ProductList';
import { getProducts } from './services/productService';
import ShoppingCart from './components/pages/ShoppingCart';
import CheckoutSuccess from './components/CheckoutSuccess';
import CheckoutCancel from './components/CheckoutCancel';


function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (error) {
        setError(error.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
      <div className="page">
      <Header cartCount={3} />
      <main id="main">
          <Routes>
            {/* Home Page Route*/}
            <Route path="/" element={<Home />} />
            {/* Products Page Route*/}
            <Route path="/products" element={
              loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> :
              <ProductList products={products} />
            } />
          {/* Shopping Cart Page Route */}
          <Route path="/cart" element={
            <ShoppingCart />
          } />
          {/* Checkout-success Route */}
          <Route path="/checkout-success" element={
            <CheckoutSuccess />
          } />
          {/* Checkout-cancel Route */}
          <Route path="/checkout-cancel" element={
            <CheckoutCancel />
          } />
          </Routes>
      </main>
        <Footer />
      </div>
  );
}

export default App;