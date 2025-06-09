import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCart();

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    alert(`Proceeding to checkout with total: $${getTotalPrice().toFixed(2)}`);
    clearCart();
    setIsOpen(false);
  };

  return (
    <div className="cart-container">
      <button className="cart-button" onClick={toggleCart}>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <circle cx="8" cy="21" r="1"></circle>
          <circle cx="19" cy="21" r="1"></circle>
          <path d="m2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
        </svg>
        {getTotalItems() > 0 && (
          <span className="cart-badge">{getTotalItems()}</span>
        )}
      </button>

      {isOpen && (
        <div className="cart-overlay" onClick={toggleCart}>
          <div className="cart-dropdown" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3>Shopping Cart</h3>
              <button className="cart-close" onClick={toggleCart}>×</button>
            </div>
            
            <div className="cart-items">
              {cart.items.length === 0 ? (
                <p className="cart-empty">Your cart is empty</p>
              ) : (
                cart.items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{item.title}</h4>
                      <p className="cart-item-price">{item.price}</p>
                    </div>
                    <div className="cart-item-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {cart.items.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
                </div>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;