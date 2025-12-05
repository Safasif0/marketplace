import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate للتوجيه
import './LoginPage.css'; // استيراد ملف CSS الخاص بصفحة تسجيل الدخول
const LoginPage = () => {
  // الحالة لتخزين اسم المستخدم وكلمة المرور
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // استخدام useNavigate للتوجيه

  // دالة التعامل مع تسجيل الدخول
  const handleLogin = (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة عند تقديم الفورم

    // تحقق من صحة اسم المستخدم وكلمة المرور
    if (username === 'safasifo' && password === 'admin123') {
      // إذا كانت البيانات صحيحة، يتم التوجيه إلى صفحة المنتجات
      navigate('/home'); // توجيه إلى /home (صفحة المنتجات)
    } else {
      alert('inncorect DATA!');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <img src="/images/logo.png.jpg" alt="Logo" />
          <h1>Welcome to TECH HUB</h1>
        </div>
      </header>

      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            className="input-field"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // تحديث اسم المستخدم
          />

          <label>Password</label>
          <input
            className="input-field"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // تحديث كلمة المرور
          />

          <button className="button" type="submit">Login</button>
        </form>
      </div>

      <button className="logout-btn">Logout</button>
    </div>
  );
};

export default LoginPage;
