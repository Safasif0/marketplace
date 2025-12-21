import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../services/buyer.api";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loading">Loading...</div>;
  if (orders.length === 0) return <h2>No orders yet</h2>;

  return (
    <div className="my-orders-page">
      <Link to="/home">
        <img src="images\logo.svg" className="brand-logo-inner" />
      </Link>

      <h1 className="text-center">My Orders</h1>

      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          <div className="order-header">
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            <span className={`status ${order.status}`}>{order.status}</span>
          </div>

          {order.items.map((item, i) => (
            <div key={i}>
              {item.title} × {item.qty}
            </div>
          ))}

          {order.rating && (
            <div className="order-review">
              ⭐ {order.rating}/5
              <p>{order.comment}</p>
            </div>
          )}

          {order.status === "delivered" && !order.rating && (
          <Link to={`/order-rating/${order._id}`}>
  ✍️ Rate this order
</Link>
          )}

          <strong>Total: {order.totalPrice} EGP</strong>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
