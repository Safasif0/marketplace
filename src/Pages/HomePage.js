import React, { useState, useEffect } from 'react';
import './HomePage.css'; // import the correct path

  const products = [
    { id: 1, name: 'DELL COMPUTER', price: 1000,image: '/images/COMPUTER.jpeg' },
    { id: 2, name: 'ASUS LABTOB ', price: 1500, image: '/images/ASUS LAB.png' },
    { id: 3, name: 'IPHONE 13 128G ', price: 10000, image:'/images/iphone 13.webp' },
    { id: 4, name: ' HP MOUSE', price: 15000, image: '/images/HP MOUSE.webp' },
    // المزيد من المنتجات هنا...
  ];

const HomePage = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // حفظ السلة في localStorage
  };

  return (
    <div className="home-container">
      <h1>welcome to TECH HUB </h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: {product.price} EG</p>
            <button onClick={() => addToCart(product)}>ADD TO CART</button>
          </div>
        ))}
      </div>
      <button onClick={() => window.location.href = '/cart'}>go to the cart({cart.length})</button>
    </div>
  );
};

export default HomePage;
