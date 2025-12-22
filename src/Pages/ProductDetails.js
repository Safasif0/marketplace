import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // 1️⃣ Product
        const productRes = await axios.get(
          `/products/${id}`
        );
        setProduct(productRes.data);

        // 2️⃣ Reviews
        const reviewsRes = await axios.get(
          `https://backend-production-8943.up.railway.app/orders/product/${id}/reviews`
        );

        const data = reviewsRes.data;

        // ✅ لو Object
        if (data.reviews) {
          setReviews(data.reviews);
          setAverageRating(data.averageRating || 0);
        }
        // ✅ لو Array
        else if (Array.isArray(data)) {
          setReviews(data);
          if (data.length > 0) {
            const avg =
              data.reduce((sum, r) => sum + r.rating, 0) / data.length;
            setAverageRating(avg);
          }
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-details-page">
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2>{product.title}</h2>

      <img
        className="product-details-image"
        src={product.image?.[0]}
        alt={product.title}
      />

      <p>
        <strong>Price:</strong> {product.price} EGP
      </p>

      <p>{product.description}</p>
      <p>Delivery Time: {product.deliveryTime} days</p>

      {/* ⭐ Reviews */}
      <div className="product-rating">
        <h3>
          ⭐ {reviews.length > 0 ? averageRating.toFixed(1) : "No rating yet"} / 5
          {reviews.length > 0 && ` (${reviews.length} reviews)`}
        </h3>

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div className="review-box" key={review._id}>
              <strong>{review.buyerUser?.name || "Anonymous"}</strong>
              <span> — ⭐ {review.rating}</span>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
