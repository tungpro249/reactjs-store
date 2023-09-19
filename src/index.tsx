import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./contexts/app";
import { ProductContextProvider } from "./contexts/productContext";

ReactDOM.render(
  <BrowserRouter>
    <AppContextProvider>
      <ProductContextProvider>
        <App />
      </ProductContextProvider>
    </AppContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
