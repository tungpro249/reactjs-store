import React, { createContext, useContext, useMemo, useReducer } from "react";

// @ts-ignore
const AppContext = createContext();
AppContext.displayName = "AppContext";

type AppStateType = {
  isLogin: boolean;
};

type AppActionType = {
  type: string;
  payload: any;
};

const initialState: AppStateType = {
  isLogin: false,
};

const reducer = (state: AppStateType, action: AppActionType) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        isLogin: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

function AppContextProvider({ children }: { children: React.ReactElement }) {
  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

const useAppController = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppController should be used inside the DataTableContextProvider.");
  }

  return context;
};

const loginSuccess = (dispatch: any, data: any) =>
  dispatch({ type: "LOGIN_SUCCESS", payload: data });

export { AppContextProvider, useAppController, loginSuccess };