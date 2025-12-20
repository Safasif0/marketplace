import { useEffect, useState } from "react";
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

  if (orders.length === 0)
    return <h2 className="empty-orders">No orders yet</h2>;

  return (
    <div className="my-orders-page">
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          <div className="order-header">
            <span>
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </span>
            <span className={`status ${order.status}`}>
              {order.status}
            </span>
          </div>

          {order.items.map((item, i) => (
            <div className="order-item" key={i}>
              <span>
                {item.title} × {item.qty}
              </span>
              <strong>{item.price * item.qty} EGP</strong>
            </div>
          ))}
<span className={`status ${order.status}`}>
  {order.status}
</span>

          <div className="order-total">
            Total: <strong>{order.totalPrice} EGP</strong>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
