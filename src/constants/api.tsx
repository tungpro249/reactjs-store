const BASE = `http://localhost:8000/api`;
const LOGIN_API = `${BASE}/auth/login`;
const REGISTER_API = `${BASE}/auth/register`;
const GET_ALL_PRODUCT_API = `${BASE}/products/get-products`;
const getProductDetail = (id: number) => `${BASE}/products/products/${id}`;
const deleteProduct = (id: number) => `${BASE}/products/delete-product/${id}`;
const GET_ALL_CATEGORIES = `${BASE}/categories/get-categories`;
const ADD_CATEGORY_API = `${BASE}/categories/add-category`;
const updateCategory = (id: number) => `${BASE}/categories/update-category/${id}`;
const deleteCategory = (id: number) => `${BASE}/categories/delete-category/${id}`;

export {
  LOGIN_API,
  REGISTER_API,
  GET_ALL_PRODUCT_API,
  getProductDetail,
  deleteProduct,
  GET_ALL_CATEGORIES,
  ADD_CATEGORY_API,
  updateCategory,
  deleteCategory,
};