import React, { useState, useEffect } from 'react';
import './CheckoutPage.css'; // استيراد ملف CSS الخاص بصفحة إتمام الدفع
const CheckoutPage = () => {
  // جلب السلة من localStorage
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  
  useEffect(() => {
    if (cart.length === 0) {
      window.location.href = "/cart"; // إذا كانت السلة فارغة، يتم التوجيه إلى صفحة السلة
    }
  }, [cart]);

  const totalPrice = cart.reduce((total, item) => total + item.price, 0); // حساب السعر الإجمالي

  const handleCheckout = () => {
    // هنا يمكننا إضافة الكود الخاص بمعالجة الدفع
    alert('PAYMENT DONE!');
    localStorage.removeItem('cart'); // مسح السلة بعد الدفع
    window.location.href = "/home"; // العودة إلى الصفحة الرئيسية
  };

  return (
    <div className="checkout-container">
      <h2>CheckOut</h2>
      {cart.length === 0 ? (
        <p>Empty cart you can't checkout</p>
      ) : (
        <div>
          <h3>Product details:</h3>
          {cart.map((product) => (
            <div key={product.id} className="checkout-item">
              <img src={product.image} alt={product.name} />
              <div>
                <h3>{product.name}</h3>
                <p>Price: {product.price} EG</p>
              </div>
            </div>
          ))}
          <div className="total-price">
            <h3>total: {totalPrice} EG</h3>
          </div>
          <button onClick={handleCheckout}>BUY NOW</button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
