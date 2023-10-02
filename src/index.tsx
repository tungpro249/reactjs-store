import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./contexts/app";
import { ProductContextProvider } from "./contexts/productContext";

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <ProductContextProvider>
          <App />
        </ProductContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
