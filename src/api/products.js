import API from "./axios";

export const getAllProducts = async () => {
  const res = await API.get("/products");
  return res.data;
};
