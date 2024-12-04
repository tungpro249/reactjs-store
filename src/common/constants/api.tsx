const BASE_URL = `http://localhost:8000/api`;
const LOGIN_API = `${BASE_URL}/auth/login`;
const REGISTER_API = `${BASE_URL}/auth/register`;
const CHANGE_PASSWORD_API = `${BASE_URL}/auth/change-password`;
const updateInformation = (id: number) => `${BASE_URL}/auth/change-info/${id}`;
const resetPassword = () => `${BASE_URL}/auth/reset-password`;
const forgotPassword = () => `${BASE_URL}/auth/forgot-password`;
const REGISTER_LOYAL_CUSTOMER = `${BASE_URL}/loyal/register-loyal-customer`;
const getInfoUser = (id: number) => `${BASE_URL}/auth/get-info/${id}`;

const GET_ALL_PRODUCT_API = `${BASE_URL}/products/get-products`;
const ADD_PRODUCT_API = `${BASE_URL}/products/add-product`;
const updateProduct = (id: number) => `${BASE_URL}/products/update-product/${id}`;
const getProductDetail = (id: number) => `${BASE_URL}/products/products/${id}`;
const deleteProduct = (id: number) => `${BASE_URL}/products/delete-product/${id}`;

const GET_ALL_CATEGORIES = `${BASE_URL}/categories/get-categories`;
const ADD_CATEGORY_API = `${BASE_URL}/categories/add-category`;
const updateCategory = (id: number) => `${BASE_URL}/categories/update-category/${id}`;
const deleteCategory = (id: number) => `${BASE_URL}/categories/delete-category/${id}`;

const getAllCart = (userId: number) => `${BASE_URL}/carts/cart/${userId}`;
const addToCart = (userId: number) => `${BASE_URL}/carts/cart/${userId}/add`;
const updateCart = (cartItemId: number) => `${BASE_URL}/carts/cart/item/${cartItemId}`;
const decreaseItemCart = (cartItemId: number) => `${BASE_URL}/carts/cart/item-decrease/${cartItemId}`;
const deleteCart = (cartItemId: number) => `${BASE_URL}/carts/cart/item/${cartItemId}`;

const payment = `${BASE_URL}/orders/payment`;

const GET_ALL_ORDER_ITEMS_API = `${BASE_URL}/orders/orders`;
const getAllOrderDetail = (orderId: number) => `${BASE_URL}/orders/orders/${orderId}`;
const getOrderUser = (userId: number) => `${BASE_URL}/orders/order/${userId}`;
const updateOrder = (orderId: number) => `${BASE_URL}/orders/orders/${orderId}`;
const paymentWithoutAccount = `${BASE_URL}/orders/place-order`;
const deleteOrder = (orderId: number) => `${BASE_URL}/orders/orders/${orderId}`;

const GET_STATISTICAL = `${BASE_URL}/stats`;

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