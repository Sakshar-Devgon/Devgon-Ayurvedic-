import React from "react";
import AppRoutes from "./AppRoutes";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}

export default App;