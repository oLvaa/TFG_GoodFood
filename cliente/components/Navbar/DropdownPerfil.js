import React, { useState } from "react";
import Link from "next/link";
import CerrarSesion from "./CerrarSesion";
import useAuth from "../../hooks/useAuth";

const DropdownPerfil = () => {
  const [abierto, setAbierto] = useState(true);
  const { logout, auth, setReloadUser } = useAuth();

  return (
    <div
      className={
        abierto
          ? "absolute left-0 rounded-lg shadow-lg  text-fondoBlanco font-semibold text-sm w-full pt-2"
          : "hidden"
      }
    >
      {auth ? (
        <div>
          <div className="rounded-t-lg bg-main pl-2 py-3 border-b">
            <p className="text-sm">Logueado como</p>
            <p className="text-sm font-bold">{auth.email}</p>
          </div>
          <div onClick={() => setAbierto(!abierto)}>
            {auth.admin && (
              <a href="/dashboard/inicio" className="cursor-pointer text-sm ">
                <div className="hover:bg-mainHover bg-main cursor-pointer pl-2 py-3">
                  Dashboard
                </div>
              </a>
            )}

            {/* <Link href="/">
              <div className="hover:bg-mainHover bg-main cursor-pointer pl-2 py-3 ">
                <a className="cursor-pointer text-sm">Mis datos</a>
              </div>
            </Link> */}

            <Link href="/pedidos">
              <div className="hover:bg-mainHover bg-main cursor-pointer pl-2 py-3 ">
                <a className="cursor-pointer text-sm">Pedidos</a>
              </div>
            </Link>

            <Link href="/">
              <div className="hover:bg-mainHover bg-main cursor-pointer pl-2 py-3 ">
                <a className="cursor-pointer text-sm">Suscripciones</a>
              </div>
            </Link>

            <Link href="/">
              <div className="hover:bg-mainHover bg-main cursor-pointer pl-2 py-3 border-b ">
                <a className="cursor-pointer text-sm">Mis Platos</a>
              </div>
            </Link>
            <CerrarSesion logout={logout} />
          </div>
        </div>
      ) : (
        <div>
          <Link href="/registro">
            <div className="hover:bg-mainHover bg-main cursor-pointer pl-2 py-3 rounded-t-lg">
              <a className="cursor-pointer text-sm">Crear cuenta</a>
            </div>
          </Link>
          <Link href="/login">
            <div className="hover:bg-mainHover bg-main cursor-pointer pl-2 py-3 rounded-b-lg">
              <a className="cursor-pointer text-sm">Iniciar sesión</a>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DropdownPerfil;
