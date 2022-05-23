import { createContext } from "react";

const CartContext = createContext({
  productosCarrito: 0,
  añadirProductoCarrito: () => null,
  getProductosCarrito: () => null,
  borrarProductoCarrito: () => null,
  borrarProductosCarrito: () => null,
});

export default CartContext;
