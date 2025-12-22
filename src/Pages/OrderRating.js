import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./OrderRating.css";

export default function OrderRating() {
  const { orderId } = useParams(); // ✅ MATCH ROUTE
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://backend-production-8943.up.railway.app/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setOrder(res.data))
      .catch((err) => {
        console.error(err);
        setOrder(null);
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  const submitRating = () => {
    axios
      .put(
        `https://backend-production-8943.up.railway.app/orders/${orderId}/review`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => navigate("/my-orders"))
      .catch(console.error);
  };

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <div className="order-rating-page">
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2>Rate Your Order</h2>

      <p>
        <strong>Order Date:</strong>{" "}
        {new Date(order.createdAt).toLocaleDateString()}
      </p>

      <ul>
        {order.items.map((item, i) => (
          <li key={i}>
            {item.title} × {item.qty} {/* ✅ MATCH MyOrders */}
          </li>
        ))}
      </ul>

      <div className="rating-box">
        <label>Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={5}>⭐⭐⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={1}>⭐</option>
        </select>

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button onClick={submitRating}>Submit Review</button>
      </div>
    </div>
  );
}
