import { BASE_PATH, CART } from "../../utils/constants";
import { size } from "lodash";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

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
  producto.id = uuid();
  if (!cart) {
    let _producto = [producto];
    localStorage.setItem(CART, JSON.stringify(_producto));
  } else {
    cart.push(producto);
    localStorage.setItem(CART, JSON.stringify(cart));
  }
  toast.success("Producto añadido al carrito");
}

export function contarProductosCarrito() {
  const cart = getProductosCarrito();

  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
}

export function borrarProductoCarrito(producto) {
  const cart = getProductosCarrito();

  let filteredCart = cart.filter((item) => {
    return item.id !== producto.id;
  });

  if (size(filteredCart) > 0) {
    localStorage.setItem(CART, JSON.stringify(filteredCart));
  } else {
    localStorage.removeItem(CART);
  }
}

export function borrarProductosCarrito() {
  localStorage.removeItem(CART);
}
