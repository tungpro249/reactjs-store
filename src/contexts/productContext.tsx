import React, { createContext, useContext, useMemo, useReducer } from "react";
import { GET_ALL_PRODUCT } from "../constants/action";

// @ts-ignore
const ProductContext = createContext();
ProductContext.displayName = "ProductContext";

type ProductStateType = {
  product: any;
};

type ProductActionType = {
  type: string;
  payload: any;
};

const initialState: ProductStateType = {
  product: [],
};

const reducer = (state: ProductStateType, action: ProductActionType) => {
  switch (action.type) {
    case GET_ALL_PRODUCT: {
      return {
        ...state,
        product: action.payload,
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

const getAllProductSuccess = (dispatch: any, data: any) =>
  dispatch({ type: GET_ALL_PRODUCT, payload: data });

export { ProductContextProvider, useProductController, getAllProductSuccess };