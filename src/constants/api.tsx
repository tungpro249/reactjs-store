const BASE = `http://localhost:8000/api`;
const LOGIN_API = `${BASE}/auth/login`;
const REGISTER_API = `${BASE}/auth/register`;
const GET_ALL_PRODUCT_API = `${BASE}/products/get-products`;
const getProductDetail = (id: number) => `${BASE}/products/products/${id}`;
const deleteProduct = (id: number) => `${BASE}/products/delete-product/${id}`;
const GET_ALL_CATEGORIES = `${BASE}/categories/get-categories`;

export {
  LOGIN_API,
  REGISTER_API,
  GET_ALL_PRODUCT_API,
  getProductDetail,
  deleteProduct,
  GET_ALL_CATEGORIES,
};