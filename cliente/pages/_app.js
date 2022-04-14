import { useMemo, useState, useEffect } from "react";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client"; //ApolloProvider funciona como el provider del context
import client from "../config/apollo";
import AuthContext from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";

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

  //De esta forma no entra en la app hasta que no haya hecho efecto el useEffect, tanto para saber si está autenticado como si no
  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthContext.Provider>
  );
}

export default MyApp;
