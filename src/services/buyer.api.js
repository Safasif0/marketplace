import API from "./api";;

export const createOrder = (data) => API.post("/orders", data);

export const getAllProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);

// ✅ My Orders (Buyer)
export const getMyOrders = () => API.get("/orders/my");
