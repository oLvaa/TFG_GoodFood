import { useMemo, useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/client"; //ApolloProvider funciona como el provider del context
import client from "../config/apollo";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { getProductosCarrito, añadirProductoCarrito } from "./api/cart";
import { toast, ToastContainer } from "react-toastify";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  //AUTENTICACIÓN
  const [auth, setAuth] = useState(undefined);
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
    } else {
      toast.warning("Para añadir al carrito tienes que iniciar sesión");
    }
  };

  const cartData = useMemo(
    () => ({
      productosCarrito: 0,
      añadirProductoCarrito: (producto) => añadirProducto(producto),
      getProductosCarrito: getProductosCarrito,
      borrarProductoCarrito: () => null,
      borrarProductosCarrito: () => null,
    }),
    []
  );

  //De esta forma no entra en la app hasta que no haya hecho efecto el useEffect, tanto para saber si está autenticado como si no
  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={2500}
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
