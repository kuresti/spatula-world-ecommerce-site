/********************************
 * Required Resources
 ********************************/
import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';


export default function Home() {
    return (
        <>
            <section className="hero">
                <div className="hero-overlay">
                    <h1>Welcome to Spatula World</h1>
                    <p>Flip, stir, and serve with the world's finest spatulas.</p>
                    <Link
                        to="/products"
                        className="primary">Shop Now</Link>
                </div>
            </section>
            {/*Asked chatGPT5 for content for the paragraphs 11/13/25 */}
            <section className="intro">
                <h2>Why Spatula World?</h2>
                <p>
                    Discover top-quality kitchen tools designed to make every flip, stir,
                    and scrape a joy. Built to last, loved by home cooks and chefs alike.
                </p>
            </section>
        </>
    );
}