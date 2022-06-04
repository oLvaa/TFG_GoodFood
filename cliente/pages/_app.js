import { useMemo, useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/client"; //ApolloProvider funciona como el provider del context
import client from "../config/apollo";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import {
  getProductosCarrito,
  añadirProductoCarrito,
  contarProductosCarrito,
  borrarProductoCarrito,
  borrarProductosCarrito,
} from "./api/cart";
import { toast, ToastContainer } from "react-toastify";
import { ScrollTop } from "primereact/scrolltop";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Soporte from "../components/Soporte/Soporte";
import "primereact/resources/themes/saga-green/theme.css";

function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [numProductos, setNumProductos] = useState(0);
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [reloadCarrito, setReloadCarrito] = useState(false);
  const [reloadUser, setReloadUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(jwtDecode(token));
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  useEffect(() => {
    setNumProductos(contarProductosCarrito());
    setProductosCarrito(getProductosCarrito());
    setReloadCarrito(false);
  }, [reloadCarrito, auth]);

  const login = (token) => {
    setAuth(jwtDecode(token));
  };

  const logout = () => {
    if (auth) {
      localStorage.removeItem("token");
      setAuth(null);
      router.push("/");
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser, //Función (setReloadUser(true)) para ejecutar el useEffect y volver a leer el Token
    }),
    [auth]
  );

  const añadirProducto = (producto) => {
    const token = localStorage.getItem("token");
    if (token) {
      añadirProductoCarrito(producto);
      setReloadCarrito(true);
    } else {
      toast.warning("Para añadir al carrito tienes que iniciar sesión");
    }
  };

  const borrarProducto = (producto) => {
    borrarProductoCarrito(producto);
    setReloadCarrito(true);
  };

  const borrarProductos = () => {
    borrarProductosCarrito();
    setReloadCarrito(true);
  };

  const cartData = useMemo(
    () => ({
      numProductosCarrito: numProductos,
      productosCarrito: productosCarrito,
      añadirProductoCarrito: (producto) => añadirProducto(producto),
      getProductosCarrito: getProductosCarrito,
      borrarProductoCarrito: (producto) => borrarProducto(producto),
      borrarProductosCarrito: () => borrarProductos(),
    }),
    [numProductos, productosCarrito]
  );

  //De esta forma no entra en la app hasta que no haya hecho efecto el useEffect, tanto para saber si está autenticado como si no
  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
          <ScrollTop threshold={200} />
          <Soporte />
          <ToastContainer
            position="bottom-right"
            autoClose={1000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
          />
        </ApolloProvider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default MyApp;
