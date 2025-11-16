/********************************
 * Required Resources
 ********************************/
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
require('dotenv').config();

const stripe = Stripe(process.env.STRIPE_KEY);

/********************************
 * POST /api/checkout/create-session
 * Expects: { items: [{ name, price, quantity }]}
 ********************************/
router.post('/create-session', async (req, res) => {
    try {
        const { items } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'No items provided' });
        }

        // Convert cart items into Stripe line items
        const lineItems = items.map((item) => {
            const unitAmount = Math.round(Number(item.price) * 100);

            if (!item.name || !unitAmount || unitAmount <= 0 || !item.quantity) { //check on product data
                throw new Error('Invalid cart item data');
            }

            return {
                price_data: {
                    currency: 'usd', 
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: unitAmount,
                },
                quantity: item.quantity,
            };
        });

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: lineItems, // an array of obj that include the products and quantity of the order.
            success_url: `${process.env.FRONTEND_URL}/checkout-success`, // Set up to redirect t checkout-success when order is successful (not working right now)
            cancel_url: `${process.env.FRONTEND_URL}/checkout-cancel`, // Set up to show if order is unsuccessful or cancelled.
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session', error.message);
        res.status(500).json({ message: 'Failed to create checkout session' });
    }
});

module.exports = router;