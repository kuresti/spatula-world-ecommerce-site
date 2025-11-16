/********************************
 * Header.jsx imports React and
 * defines a component that renders 
 * the header of the application.
 ********************************/
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoImage from '../assets/logo-chatgpt.svg';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from './CartContext';

// Array for navigation links
const defaultLinks = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Shopping Cart", to: "/cart" }
]


export default function Header({
    logo = logoImage,
    links = defaultLinks, }) {
    
    const { count } = useCart();

    return (
        <header className="site-header">
            
            <div className="header-inner">
                {/*Left: Logo and Title*/}
                <div className="brand">
                    <Link to="/" aria-label="Spatula World home">
                        <img src={logo} alt="Spatula World" className="logo" />
                    </Link>
                </div>

                {/*Center: Navigation links*/}         
                
                <nav className="primary-nav" aria-label="Primary navigation">
                    <ul className="nav-list">
                        {links.map(link => (
                            <li key={link.to} className="nav-item">
                                <Link to={link.to} className="nav-link">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    </nav>
                    

                {/* Right: Actions (cart) */}
                <div className="header-actions">
                    <Link
                        to="/cart"
                        className="cart-link"
                        aria-label={`Shopping cart with ${count} items${count === 1 ? '' : 's'}`}>
                        {/*Asked chatGPT where to get a shopping cart icon, it suggested using react-icons 11/11/2025*/}
                        <FaShoppingCart className="cart-icon" />
                        {count > 0 && <span className="cart-badge">{count}</span>}
                    </Link>
                </div>

            </div>
        </header>
    )
}