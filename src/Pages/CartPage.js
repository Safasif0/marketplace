import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartPage.css";

function CartPage() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven’t added anything yet</p>
        <Link to="/home">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-wrapper">
      {/* LEFT */}
      <div className="cart-left">
        <h1>Your Cart</h1>

        {cart.map((item) => (
          <div className="cart-item" key={item._id}>
            <img src={item.image} alt={item.title} />

            <div className="cart-info">
              <h3>{item.title}</h3>
              <p>{item.price.toLocaleString('en-EG')} EGP</p>

              {/* ➕ / ➖ */}
              <div className="qty-controls">
                <button onClick={() => decreaseQty(item._id)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item._id)}>+</button>
              </div>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item._id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="cart-summary">
        <h2>Order Summary</h2>

        <div className="summary-row">
          <span>Total</span>
          <strong>{total.toLocaleString('en-EG')} EGP</strong>
        </div>

     <Link to="/checkout">
  <button className="checkout-btn">Proceed to Checkout</button>
</Link>
      </div>
    </div>
  );
}

export default CartPage;
