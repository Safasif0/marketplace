import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {debugger;setProduct(res.data)})
      .catch(console.error);
  }, [id]);

  if (!product) return <p>Loading...</p>;


  return (
    <div className="product-details-page">
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2>Product Details</h2>
      <img className="product-details-image" src={product.image} alt={product.title}></img>
      <p><strong>{product.title}</strong></p>
      <p>Price: {product.price}<sup>EGP</sup></p>
      <p>Description: {product.description}</p>
      <p>Delivery Time: {product.deliveryTime} days</p>
      <p>Status: {product.status}</p>
    </div>
  );
}
