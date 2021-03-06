import { createContext } from "react";

const CartContext = createContext({
  numProductosCarrito: 0,
  productosCarrito: null,
  aĆ±adirProductoCarrito: () => null,
  getProductosCarrito: () => null,
  borrarProductoCarrito: () => null,
  borrarProductosCarrito: () => null,
});

export default CartContext;
