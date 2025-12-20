import { useState } from "react";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/buyer.api";
import "./CheckoutPage.css";

function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    payment: "cash",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all required fields");
      return;
    }

    // 🛡️ حماية من null
    const hasInvalidItem = cart.some(
      (i) => !i._id || !i.seller
    );
    if (hasInvalidItem) {
      alert("Cart has invalid items, clear cart and add again");
      return;
    }

    try {
      await createOrder({
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
          seller: item.seller,
        })),
        totalPrice: total,
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

        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
        <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" />

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default CheckoutPage;
