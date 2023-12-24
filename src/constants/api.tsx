const BASE = `http://localhost:8000/api`;
const LOGIN_API = `${BASE}/auth/login`;
const REGISTER_API = `${BASE}/auth/register`;
const CHANGE_PASSWORD_API = `${BASE}/auth/change-password`;
const updateInformation = (id: number) => `${BASE}/auth/change-info/${id}`;
const resetPassword = () => `${BASE}/auth/reset-password`;
const forgotPassword = () => `${BASE}/auth/forgot-password`;
const REGISTER_LOYAL_CUSTOMER = `${BASE}/loyal/register-loyal-customer`;
const getInfoUser = (id: number) => `${BASE}/auth/get-info/${id}`;

const GET_ALL_PRODUCT_API = `${BASE}/products/get-products`;
const ADD_PRODUCT_API = `${BASE}/products/add-product`;
const updateProduct = (id: number) => `${BASE}/products/update-product/${id}`;
const getProductDetail = (id: number) => `${BASE}/products/products/${id}`;
const deleteProduct = (id: number) => `${BASE}/products/delete-product/${id}`;

const GET_ALL_CATEGORIES = `${BASE}/categories/get-categories`;
const ADD_CATEGORY_API = `${BASE}/categories/add-category`;
const updateCategory = (id: number) => `${BASE}/categories/update-category/${id}`;
const deleteCategory = (id: number) => `${BASE}/categories/delete-category/${id}`;

const getAllCart = (userId: number) => `${BASE}/carts/cart/${userId}`;
const addToCart = (userId: number) => `${BASE}/carts/cart/${userId}/add`;
const updateCart = (cartItemId: number) => `${BASE}/carts/cart/item/${cartItemId}`;
const decreaseItemCart = (cartItemId: number) => `${BASE}/carts/cart/item-decrease/${cartItemId}`;
const deleteCart = (cartItemId: number) => `${BASE}/carts/cart/item/${cartItemId}`;

const payment = `${BASE}/orders/payment`;
const GET_ALL_ORDER_ITEMS_API = `${BASE}/orders/orders`;
const getAllOrderDetail = (orderId: number) => `${BASE}/orders/orders/${orderId}`;
const getOrderUser = (userId: number) => `${BASE}/orders/order/${userId}`;
const updateOrder = (orderId: number) => `${BASE}/orders/orders/${orderId}`;
const paymentWithoutAccount = `${BASE}/orders/place-order`;
const deleteOrder = (orderId: number) => `${BASE}/orders/orders/${orderId}`;

const GET_STATISTICAL = `${BASE}/stats`;

export {
  LOGIN_API,
  REGISTER_API,
  CHANGE_PASSWORD_API,
  updateInformation,
  resetPassword,
  REGISTER_LOYAL_CUSTOMER,
  GET_ALL_PRODUCT_API,
  ADD_PRODUCT_API,
  updateProduct,
  getProductDetail,
  deleteProduct,
  GET_ALL_CATEGORIES,
  ADD_CATEGORY_API,
  updateCategory,
  deleteCategory,
  getAllCart,
  addToCart,
  deleteCart,
  updateCart,
  payment,
  GET_ALL_ORDER_ITEMS_API,
  getAllOrderDetail,
  getOrderUser,
  forgotPassword,
  getInfoUser,
  GET_STATISTICAL,
  decreaseItemCart,
  updateOrder,
  paymentWithoutAccount,
  deleteOrder,
};