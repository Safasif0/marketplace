import { useEffect, useState } from "react";
import axios from "axios";
import "./Flags.css";

function CreateFlag() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "general",
    product: "",
  });

  useEffect(() => {
    axios
      .get("https://backend-production-8943.up.railway.app/products")
      .then((res) => setProducts(res.data))
      .finally(() => setLoadingProducts(false));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://backend-production-8943.up.railway.app/flags", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Flag submitted ✅");
      setForm({
        title: "",
        description: "",
        type: "general",
        product: "",
      });
    } catch (err) {
      console.error(err);
      alert("Flag failed ❌ (check backend console)");
    }
  };

  return (
    <div className="flags-page">
      <div className="flags-card">
        <h1>Report a Problem</h1>

        <form className="flag-form" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Describe the issue"
            value={form.description}
            onChange={handleChange}
          />

          <select name="type" value={form.type} onChange={handleChange}>
            <option value="general">General</option>
            <option value="product">Product</option>
            <option value="order">Order</option>
            <option value="user">User</option>
          </select>

          {form.type === "product" && (
            <select
              name="product"
              value={form.product}
              onChange={handleChange}
              required
              disabled={loadingProducts}
            >
              <option value="">
                {loadingProducts ? "Loading products..." : "Select product"}
              </option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title}
                </option>
              ))}
            </select>
          )}

          <button type="submit">Submit Flag</button>
        </form>
      </div>
    </div>
  );
}

export default CreateFlag;
