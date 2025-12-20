import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Signup from "./Pages/Signup";
import HomePage from "./Pages/HomePage";
import ProtectedRoute from "./Components/ProtectedRoute";
import ProductDetails from "./Pages/ProductDetails";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import MyOrders from "./Pages/MyOrders";
import { CartProvider } from "./context/CartContext";
import FlagsList from "./Pages/FlagsList";
import CreateFlag from "./Pages/CreateFlag";

const isAuthenticated = () => !!localStorage.getItem("token");

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route
          path="/my-orders"
          element={isAuthenticated() ? <MyOrders /> : <Navigate to="/login" />}
        />

        <Route
          path="/orders/:id"
          element={isAuthenticated() ? <ProductDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/report-flag"
          element={isAuthenticated() ? <CreateFlag /> : <Navigate to="/login" />}
        />

        <Route
          path="/flags"
          element={isAuthenticated() ? <FlagsList /> : <Navigate to="/login" />}
        />
        
      </Routes>
    </CartProvider>
  );
}

export default App;
