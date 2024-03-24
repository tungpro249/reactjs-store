import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./contexts/app";
import { ProductContextProvider } from "./contexts/productContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <AppContextProvider>
      <ProductContextProvider>
        <App />
      </ProductContextProvider>
    </AppContextProvider>
  </BrowserRouter>
);
