import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartFloatingButton.css";

function CartFloatingButton() {
  const { cart } = useCart();

  if (cart.length === 0) return null; // ❌ ميظهرش لو فاضي

  return (
    <Link to="/cart" className="cart-floating">
      🛒
      <span className="cart-count">{cart.length}</span>
    </Link>
  );
}

export default CartFloatingButton;
