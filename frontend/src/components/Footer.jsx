/********************************
 * Imports for Footer.jsx defines
 * a component that renders the
 * Footer of the application.
 ********************************/
import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-chatgpt.svg'
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialFacebook } from "react-icons/sl";


export default function Footer() {

    const links = [
        { label: 'Home', to: '/' },
        { label: 'Products', to: '/products' },
        { label: 'Shopping Cart', to: '/cart' }
    ];

    return (
        <footer className="site-footer" aria-label="Site footer">
            <div className="footer-inner">

                {/*Left: Logo and Title*/}
                <div className="footer-brand">
                    <img src={logo} alt="Spatula World" className="footer-logo" />                 
                    <div className="brand-text">
                        <strong>Spatula World</strong>
                        <div className="subtext">Kitchen tools for everyday chefs</div>
                    </div>                    
                </div>

                {/* Footer Navigation */}
                <nav className="footer-nav" aria-label="Footer navigation">
                    <ul className="footer-links">
                        {links.map(link => (
                            <li key={link.to}>
                                <Link className="footer-link" to={link.to}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Contact / Social Media */}
                <div className="footer-contact">
                    <div className="contact-info">support@spatulaworld.com</div>
                    <div className="contact-info">Mon-Fri 9-5 MST</div>
                    <div className="social-media">
                        <a className="social-media" href="https://instagram.com" target="blank" aria-label="Instagram">
                            <SlSocialInstagram />
                        </a>
                        <a className="social-media" href="https://facebook.com" target="blank" aria-label="Facebook">
                            <SlSocialFacebook />
                        </a>
                    </div>
                     
                </div>

                
            </div>
        </footer>
    )
}
