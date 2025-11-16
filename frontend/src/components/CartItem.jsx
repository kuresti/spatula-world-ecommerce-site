/********************************
 * Required Resources for CartItem
 ********************************/
import React from 'react';
import './CartItem.css';
import { useCart } from './CartContext';

export default function CartItem({ item }) {
    const { removeItem, setQuantity } = useCart(); // Creates instances of removeItem and setQuantity
    const itemTotal = (item.price || 0) * (item.quantity || 0);
    return (
        <div className="cart-item">
            <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
            </div>
            <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-price">Price: ${item.price}</p>
            </div>

            <div className="cart-item-actions">
                <button 
                    onClick={() => {
                        removeItem(item._id);
                    }}
                >Remove</button>
                <label className="cart-item-quantity">Quantity</label>
                <input // Input box for user to change item quantity.
                    type='number' // Only numbers allowed
                    id={`quantity-${item._id}`}
                    name='quantity' // A unique id is created for quantity
                    min='1' // doesn't allow input to be less than 1
                    className='cart-item-quantity-input'
                    value={item.quantity}
                    onChange={(e) => {
                        const newQuantity = Number(e.target.value); 
                        setQuantity(item._id, newQuantity); // sets the quantity through the reducer
                    }}></input>
                <h3>Subtotal: ${itemTotal.toFixed(2)}</h3>
            </div>
        </div>
    )
}