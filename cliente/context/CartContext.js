import { createContext } from "react";

const CartContext = createContext({
  numProductosCarrito: 0,
  productosCarrito: null,
  añadirProductoCarrito: () => null,
  getProductosCarrito: () => null,
  borrarProductoCarrito: () => null,
  borrarProductosCarrito: () => null,
});

export default CartContext;
