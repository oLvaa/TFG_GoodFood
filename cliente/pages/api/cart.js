import { BASE_PATH, CART } from "../../utils/constants";
import { toast } from "react-toastify";

export function getProductosCarrito() {
  const cart = JSON.parse(localStorage.getItem(CART));

  if (!cart) {
    return null;
  } else {
    return cart;
  }
}

export function añadirProductoCarrito(producto) {
  const cart = getProductosCarrito();
  if (!cart) {
    let _producto = [producto];
    localStorage.setItem(CART, JSON.stringify(_producto));
  } else {
    cart.push(producto);
    localStorage.setItem(CART, JSON.stringify(cart));
  }
  toast.success("Producto añadido al carrito");
}
