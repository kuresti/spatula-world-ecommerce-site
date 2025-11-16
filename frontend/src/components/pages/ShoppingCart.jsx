/********************************
 * Required Resources for ShoppingCart
 ********************************/
import React from 'react';
import { useCart } from '../CartContext';
import CartItem from '../CartItem';
import { Link } from 'react-router-dom';
import API from '../../services/api';


export default function ShoppingCart() {
    const { items, total, clearCart } = useCart();
    const [ loading, setLoading ] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleCheckout = async () => {
        try {
            setLoading(true);
            setError(null);

            // Send min data needed to backend
            const payload = {
                items: items.map((item) => ({
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
            };

            const res = await API.post('/checkout/create-session', payload); // sends axios api call to backend to create a checkout session
            const { url } = res.data;

            if (url) {
                window.location.href = url; // redirect to stripe checkout
            } else {
                setError('No checkout URL returned from server.');
            }
        } catch (error) {
            console.error(error);
            setError('Failed to start checkout. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // If the cart is empty message and link to continue shopping
    if (items.length === 0) {
        return (
            <main className="cart-page container">
                <h1>Your Cart</h1>
                <section className="cart-empty">
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added any spatulas yet.</p>
                    <Link className="continue-shopping" to="/products">Continue Shopping</Link>
                </section>
            </main>
        );
    }

    // If cart has items in it
    return (
        <main className="cart-page container">
            <h1>Your Cart</h1>

            <div className="cart-layout">
                {/* Left: items-list */}
                <section className="cart-items">
                    {items.map((item) => (
                        <CartItem
                            key={item._id || item.id}
                            item={item}
                        />
                    ))}
                </section>

                {/* Right: summary */}
                <aside className="cart-summary">
                    <h2>Order Summary</h2>
                    <p>Items: {items.length}</p>
                    <p>
                        <strong>Total: ${total.toFixed(2)}</strong>
                    </p>
                    {error && (
                        <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>
                    )}
                    
                    <button
                        type="button"
                        className="btn-primary"
                        onClick={handleCheckout} //calls handleCheckout to start checkout session and send checkout data to Stripe
                        disabled={loading}>
                            {loading ? 'Redirecting...' : 'Proceed to Secure Checkout'}
                    </button>
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={clearCart}>Clear Cart</button>
                </aside>
            </div>
        </main>
    );
}

