import { useState, useEffect } from "react";
import "./cart.css";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🟡 Load cart items from backend
    const fetchCart = async () => {
        setLoading(true);
        try {
        const res = await fetch("http://localhost:8000/api/cart");
        const data = await res.json();
        setCartItems(data.items || []);
        } catch (err) {
        console.error("Failed to fetch cart:", err);
        }
        setLoading(false);
    };

    // 🔁 Update quantity or add item
    const updateQuantity = async (id, quantity) => {
        if (quantity === 0) {
        return removeItem(id);
        }
        try {
        await fetch("http://localhost:8000/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: id, quantity }),
        });
        fetchCart(); // Refresh cart
        } catch (err) {
        console.error("Failed to update quantity:", err);
        }
    };

    // ❌ Remove item from cart
    const removeItem = async (id) => {
        try {
        await fetch(`http://localhost:8000/api/cart/${id}`, { method: "DELETE" });
        fetchCart(); // Refresh cart
        } catch (err) {
        console.error("Failed to remove item:", err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const shipping = subtotal > 35 ? 0 : 5.99;
    const total = subtotal + tax + shipping;

    return (
        <div className="cart-page">
        <div className="cart-container">
            <div className="cart-header">
            <h1>Shopping Cart ({cartItems.length} items)</h1>
            </div>

            {loading ? (
            <p>Loading cart...</p>
            ) : cartItems.length === 0 ? (
            <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Add some items to get started!</p>
                <button className="continue-shopping-btn">Continue Shopping</button>
            </div>
            ) : (
            <div className="cart-content">
                <div className="cart-items">
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                    <div className="item-image">
                        <img src={item.image || "/placeholder.svg"} alt={item.name} />
                    </div>
                    <div className="item-details">
                        <h3>{item.name}</h3>
                        <p className="item-price">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span className="quantity">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <div className="item-total">
                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                        🗑️
                    </button>
                    </div>
                ))}
                </div>

                <div className="cart-summary">
                <h3>Order Summary</h3>
                <div className="summary-line"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="summary-line"><span>Tax:</span><span>${tax.toFixed(2)}</span></div>
                <div className="summary-line"><span>Shipping:</span><span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
                <div className="summary-line total"><span>Total:</span><span>${total.toFixed(2)}</span></div>
                <button className="checkout-btn">Proceed to Checkout</button>
                <p className="free-shipping-note">
                    {shipping > 0 && `Add $${(35 - subtotal).toFixed(2)} more for FREE shipping!`}
                </p>
                </div>
            </div>
            )}
        </div>
        </div>
    );
};

export default Cart;
