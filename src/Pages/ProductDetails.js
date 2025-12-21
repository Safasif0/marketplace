import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviewsData, setReviewsData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const productData = res.data;
        setProduct(productData);

        // ⭐ build reviews data safely
        const reviews = productData.reviews || [];
        const numReviews = reviews.length;
        const averageRating =
          numReviews > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / numReviews
            : 0;

        setReviewsData({
          reviews,
          numReviews,
          averageRating,
        });
      })
      .catch(console.error);
  }, [id]);

  if (!product) return <p>Loading...</p>;

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

      {/* ⭐ RATING */}
      {reviewsData && reviewsData.numReviews > 0 && (
        <div className="product-rating">
          <h3>
            ⭐ {reviewsData.averageRating.toFixed(1)} / 5 (
            {reviewsData.numReviews} reviews)
          </h3>

          {reviewsData.reviews.map((r, i) => (
            <div className="review-box" key={i}>
              <strong>{r.buyerName || "Anonymous"}</strong>
              <span> — ⭐ {r.rating}</span>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
