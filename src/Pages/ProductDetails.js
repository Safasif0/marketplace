import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "./api";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/orders/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setOrder(res.data));
  }, [id]);

  if (!order) return <p>Loading...</p>;

  const submitReview = async () => {
    await axios.put(
      `http://localhost:4000/orders/${id}/review`,
      { rating, comment },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    alert("Review submitted ✅");
    navigate("/my-orders");
  };

  return (
    <div className="order-details-page">
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2>Order Details</h2>
      <p>Status: {order.status}</p>

      {order.items.map((i, idx) => (
        <div key={idx}>
          {i.title} × {i.qty}
        </div>
      ))}

      {order.status === "delivered" && !order.rating && (
        <div className="review-box">
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="">Select rating</option>
            {[1,2,3,4,5].map(n => (
              <option key={n} value={n}>{n} ⭐</option>
            ))}
          </select>

          <textarea
            placeholder="Write comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button onClick={submitReview}>Submit</button>
        </div>
      )}

      {order.rating && (
        <div className="order-review">
          ⭐ {order.rating}/5
          <p>{order.comment}</p>
        </div>
      )}

      {/* ⭐ REVIEW SECTION */}
      {order.status === "delivered" && !order.rating && (
        <div className="review-box">
          <h3>Rate this order</h3>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Select rating</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} ⭐
              </option>
            ))}
          </select>

          <textarea
            placeholder="Write your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button onClick={submitReview}>Submit</button>
        </div>
      )}

      {/* ⭐ SHOW REVIEW */}
      {order.rating && (
        <div className="order-review">
          ⭐ {order.rating}/5
          <p>{order.comment}</p>
        </div>
      )}
    </div>
  );
}
