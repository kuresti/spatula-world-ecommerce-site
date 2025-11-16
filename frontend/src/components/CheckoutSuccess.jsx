import React from 'react';

export default function CheckoutSuccess() {
    return (
        <section className="container">
            console.log('CheckoutSuccess rendered')
            <h1>Thank you for your order!</h1>
            <p>Your payment was successful.</p>
        </section>
    );
}