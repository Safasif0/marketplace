import { useEffect, useState } from "react";
import { getAllProducts } from "../api/products";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    load();
  }, []);

  return (
    <div>
      <h1>All Products</h1>
      {products.map((p) => (
        <div key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.price} EGP</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
