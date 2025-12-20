import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../services/buyer.api";
import { useCart } from "../context/CartContext";
import "./HomePage.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { cart, addToCart } = useCart(); // ✅ هنا الاتنين

  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loading">Loading...</div>;

  return (
    <div className="page">
      <div className="container">
        {/* 🔹 Top Actions */}
        <div className="home-actions">
          <img src="images\logo.svg" className="brand-logo-inner" />
          <div>
            {/* 🔔 Flags Button */}
            <Link to="/report-flag" className="flags-btn">
              🚩 Report a Problem
            </Link>
            <Link to="/my-orders" className="my-orders-btn">
              📦 My Orders
            </Link>
          </div>
        </div>

        {/* ✅ زرار يودّي على Cart */}
        <Link to="/cart" className="cart-floating">
          🛒
          <span className="cart-count">{cart.length}</span>
        </Link>
        <div className="products-grid amazon">
          {products.map((product) => (
            <div className="amazon-card" key={product._id}>
              <Link to={`/product/${product._id}`} className="amazon-imgWrap">
                <img src={product.image} alt={product.title} />
              </Link>

              <div className="amazon-body">
                <div className="amazon-price">{product.price.toLocaleString('en-EG')} <sup>EGP</sup></div>
                <div className="amazon-title">{product.title}</div>

                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
