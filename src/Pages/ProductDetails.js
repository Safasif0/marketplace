import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { cart, addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <div className="page-loading">Loading...</div>;

  return (
    <>
      {/* ✅ Floating Cart Button */}
      {cart.length > 0 && (
        <Link to="/cart" className="cart-floating">
          🛒
          <span className="cart-count">{cart.length}</span>
        </Link>
      )}

      <div className="details-page">
        <div className="details-container">

          {/* IMAGE */}
          <div className="details-image">
            <img src={product.image} alt={product.title} />
          </div>

          {/* INFO */}
          <div className="details-info">
            <h1 className="details-title">{product.title}</h1>

            <div className="details-rating">
              <span className="stars">★★★★☆</span>
              <span className="rating-value">4.2</span>
              <span className="reviews">(120 reviews)</span>
            </div>

            <div className="details-price">
              {product.price} EGP
            </div>

            <p className="details-desc">
              {product.description || "No description provided."}
            </p>

            <p className="details-seller">
              Seller: <strong>{product.seller?.name}</strong>
            </p>

            {/* ✅ Add to Cart */}
            <button
              className="details-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default ProductDetails;
