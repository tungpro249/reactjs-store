import React, { createContext, useContext, useMemo, useReducer } from "react";
import {
  ADD_CART_SUCCESS,
  DELETE_CART_SUCCESS,
  GET_ALL_CART,
  GET_PRODUCT_DETAIL,
  UPDATE_CART_SUCCESS,
} from "../constants/action";
import { typeProduct } from "../types/typeProduct";

// @ts-ignore
const ProductContext = createContext();
ProductContext.displayName = "ProductContext";

type ProductStateType = {
  products: Array<typeProduct>;
  productDetail: any;
};

type ProductActionType = {
  type: string;
  payload: any;
};

const initialState: ProductStateType = {
  products: [],
  productDetail: [],
};

const reducer = (state: ProductStateType, action: ProductActionType) => {
  switch (action.type) {
    case GET_ALL_CART: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case GET_PRODUCT_DETAIL: {
      return {
        ...state,
        productDetail: action.payload,
      };
    }
    case ADD_CART_SUCCESS: {
      return {
        ...state,
        products: [...action.payload, ...state.products],
      };
    }
    case UPDATE_CART_SUCCESS: {
      const updateProduct = action.payload;
      const updateProducts = state.products.map((product: typeProduct) => {
        if (product.id === updateProduct.id) {
          return updateProduct;
        }
        return product;
      });
      return {
        ...state,
        products: updateProducts,
      };
    }
    case DELETE_CART_SUCCESS: {
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

function ProductContextProvider({ children }: { children: React.ReactElement }) {
  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

const useProductController = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useAppController should be used inside the DataTableContextProvider.");
  }

  return context;
};

const getAllCartSuccess = (dispatch: any, data: any) =>
  dispatch({ type: GET_ALL_CART, payload: data });

const addCartSuccess = (dispatch: any, data: any) =>
  dispatch({ type: ADD_CART_SUCCESS, payload: data });

const updateCartSuccess = (dispatch: any, data: any) =>
  dispatch({ type: UPDATE_CART_SUCCESS, payload: data });

const deleteCartSuccess = (dispatch: any, data: any) =>
  dispatch({ type: DELETE_CART_SUCCESS, payload: data });

export {
  ProductContextProvider,
  useProductController,
  getAllCartSuccess,
  addCartSuccess,
  updateCartSuccess,
  deleteCartSuccess,
};