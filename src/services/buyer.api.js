import API from "./api";

// PRODUCTS
export const getAllProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);

// ORDERS
export const createOrder = (data) => API.post("/orders", data);
export const getMyOrders = () => API.get("/orders/my");
// FLAGS
export const createFlag = (data) => API.post("/flags", data);