import React from 'react';
import ReactDOM from 'react-dom/client';  // تأكد من استخدام 'react-dom/client'
import './index.css';
import App from './App';

// استخدام createRoot بدلاً من render (للإصدارات الحديثة من React)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
