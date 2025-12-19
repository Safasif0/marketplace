import { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import "./CheckoutPage.css";

function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    payment: "cash",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all required fields");
      return;
    }

    // ✅ لو seller مش موجود هنوقف ونقولك
    const hasMissingSeller = cart.some((i) => !i.seller);
    if (hasMissingSeller) {
      alert("Some cart items missing seller id. Clear cart and add again.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/orders", {
        buyer: {
          name: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
        },
        items: cart.map((item) => ({
          product: item._id,
          title: item.title,
          price: item.price,
          qty: item.qty,
          seller: item.seller, // ✅ دلوقتي ثابت
        })),
        totalPrice: total,
        paymentMethod: form.payment,
      });

      alert("Order placed successfully ✅");
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="checkout-wrapper">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h1>Checkout</h1>

        <label>Full Name *</label>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />

        <label>Phone *</label>
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="01XXXXXXXXX" />

        <label>Address *</label>
        <textarea name="address" value={form.address} onChange={handleChange} placeholder="Street, building, apartment" />

        <label>City</label>
        <input name="city" value={form.city} onChange={handleChange} placeholder="Cairo" />

        <label>Payment Method</label>
        <select name="payment" value={form.payment} onChange={handleChange}>
          <option value="cash">Cash on Delivery</option>
          <option value="card">Credit Card (UI Only)</option>
        </select>

        <button type="submit" className="place-order-btn">Place Order</button>
      </form>

      <div className="checkout-summary">
        <h2>Order Summary</h2>

        {cart.map((item) => (
          <div key={item._id} className="summary-item">
            <span>{item.title} × {item.qty}</span>
            <strong>{item.price * item.qty} EGP</strong>
          </div>
        ))}

        <div className="summary-total">
          <span>Total</span>
          <strong>{total} EGP</strong>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
