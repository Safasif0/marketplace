import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Add to cart (يثبت seller + يحل مشكلة image array)
  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        )
      );
      return;
    }

    const normalized = {
      _id: product._id,
      title: product.title,
      price: product.price,
      qty: 1,
      // image ممكن تكون Array أو String
      image: Array.isArray(product.image) ? product.image[0] : product.image,
      // seller ممكن تكون Object أو id
      seller: product.seller?._id || product.seller,
    };

    setCart([...cart, normalized]);
  };

  const increaseQty = (id) => {
    setCart(cart.map((item) => (item._id === id ? { ...item, qty: item.qty + 1 } : item)));
  };

  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
