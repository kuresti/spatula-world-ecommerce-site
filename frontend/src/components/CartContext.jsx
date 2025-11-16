/********************************
 * Required Resources for CartContext.
 * This component will provide a shared
 * store with read anywhere props for
 * ProductCard, Header, and a Cart Page
 ********************************/
//11/14/25 asked chatGPT why my useCart function was
//coming up 'not defined'. Found out I was importing
//the hooks for CartContext incorrectly. Changed
//my import to the correct form.
//import * as React from 'react';
import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);

const initialState = { items: [] }; // The initialState is set at an empty items array

// id helper
const getId = (product) => product?._id ?? product?.id;

/********************************
 * The cartReducer function provides
 * centralized, predictable state
 * updated for the cart and other
 * components that use the cart.
 ********************************/
function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const product = action.payload; // Gets the product from the payload
            const id = getId(product); // Gets the id from the payload with getId
            
            const existing = state.items.find(i => getId(i) === id); // Checks to see if the product is already in cart
           if (existing) {
                return {
                    ...state,
                    items: state.items.map(i =>
                        getId(i) === id ? { ...i, quantity: (i.quantity ?? 1) + 1 } : i // returns new state object with the 
                    ),                                                                  // products quantity incremented by 1
                };
            }
            return { ...state, items: [...state.items, { ...product, quantity: 1 }] }; // adds a new product to card with count 1
            }
        case 'REMOVE_ITEM': {
            const id = action.payload;
            return {
                ...state, items: state.items.filter(i => getId(i) !== id) // remove a product from the cart by filtering out id
            };
        }
        case 'SET_QUANTITY': {
            const { id, quantity } = action.payload;
            if (quantity <= 0) {
                return { ...state, items: state.items.filter(i => getId(i) !== id)}; // If the quantity is  0 or negative removes the item
            }
            return {
                ...state, items: state.items.map(i => getId(i) === id ? { ...i, quantity } : i), // If positive the quantity is updated
            };
        }
        case 'CLEAR': {
            return { ...state, items: [] }; // Empties the cart
        }
        case 'HYDRATE':
            return action.payload || state; // replaces current cart with data saved in localStorage
        default:
            return state; // If an action isn't recognized the current state is returned
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState); // hooks the reducer to React, state is the current state
    // dispatcher is a function called to perform one of the actions above
    
    // Load the cart from localStorage
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('cart_state'));
            if (saved?.items) dispatch({ type: 'HYDRATE', payload: saved }); // dispatch() is called to run HYDRATE action to restore the cart_state
        } catch {/*ignore*/ }
    }, []); // [] means it runs only the first render

    useEffect(() => { // runs when state is changed
        localStorage.setItem('cart_state', JSON.stringify(state));// serializes the state and stores it in localStorage
    }, [state]);

    const value = useMemo(() => { // Calculates things that depend on the cart
        const count = state.items.reduce((sum, i) => sum + (i.quantity ?? 0), 0); // Total number of items in the cart
        const total = state.items.reduce((sum, i) => sum + (Number(i.price) || 0) * (i.quantity ?? 0), 0); // Total price of all items in cart
    // Calculations are rerun only when state changes
    
    return { // public APi defined for the context
        items: state.items,
        count,
        total,

        addItem: (product) => dispatch({ type: 'ADD_ITEM', payload: product }),
        removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
        setQuantity: (id, quantity) => dispatch({ type: 'SET_QUANTITY', payload: { id, quantity } }),
        clearCart: () => dispatch({ type: 'CLEAR' }),
        };
  }, [state]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>; // wraps all child components with access to the cart context.
}

// useCart custom hook
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() { 
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');

    return context;
}



