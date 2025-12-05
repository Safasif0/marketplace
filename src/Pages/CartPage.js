import React, { useState, useEffect } from 'react';
import './CartPage.css'; // استيراد ملف CSS الخاص بصفحة السلة

const CartPage = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  // حفظ السلة في الـ localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // حساب الإجمالي
  const totalPrice = cart.reduce((total, product) => total + (product.price * product.quantity), 0);

  // دالة لإزالة منتج من السلة
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart); // تحديث السلة
  };

  // دالة لتسجيل الخروج
  const logout = () => {
    setCart([]); // مسح السلة
    localStorage.removeItem('cart'); // مسح السلة من localStorage
    window.location.href = '/'; // العودة للصفحة الرئيسية
  };

  return (
    <div className="cart-container">
      <header className="header">
        <div className="logo">
          <img src="/images/logo.png.jpg" alt="Logo" />
          <h1> TECH HUB Cart</h1>
        </div>
      </header>

      <h2> CART ITEMS </h2>

      {cart.length === 0 ? (
        <p>EMPTY CART</p>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.name} />
              <div className="cart-item-details">
                <h3>{product.name}</h3>
                <p>Price: {product.price} EG</p>
                <p>AMOUNT: {product.quantity}</p>
                <button onClick={() => removeFromCart(product.id)} className="remove-item">REMOVE item </button>
              </div>
            </div>
          ))}

        
          <button onClick={() => window.location.href = '/checkout'} className="checkout-btn">checkout</button>
        </div>
      )}

      <button onClick={logout} className="logout-btn">log out</button>
    </div>
  );
};

export default CartPage;
