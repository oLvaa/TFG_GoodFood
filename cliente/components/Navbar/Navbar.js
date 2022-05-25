import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import DropdownMenu from "./DropdownMenu";
import DropdownPerfil from "./DropdownPerfil";
import Logo from "./Logo";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { Badge } from "primereact/badge";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

const Navbar = () => {
  const { auth } = useAuth();
  const { numProductosCarrito } = useCart();
  //Routing de next
  const router = useRouter();
  let path = router.pathname;

  //Para los dropdown
  const [abierto1, setAbierto1] = useState(false);
  const [abierto2, setAbierto2] = useState(false);

  return (
    <div className="w-screen bg-fondoBlanco">
      <div className="flex items-center justify-between mx-auto w-full px-4  max-w-[2000px]">
        <Logo />
        <nav className="list-none flex space-x-16 fuenteMenu font-bold text-lg">
          <li
            className={
              path === "/"
                ? "border-b-2 border-main font-bold"
                : "hover:text-main font-bold"
            }
          >
            <Link href="/">Inicio</Link>
          </li>
          <li
            className={
              path === "/packs" ? "border-b-2 border-main" : "hover:text-main"
            }
          >
            <Link href="/packs">
              <a>Packs</a>
            </Link>
          </li>

          <li
            className={
              path === "/plato-personalizado"
                ? "border-b-2 border-main"
                : "hover:text-main"
            }
          >
            <Link href="/plato-personalizado">
              <a>Plato personalizado</a>
            </Link>
          </li>

          <li
            onMouseEnter={() => setAbierto1(true)}
            onMouseLeave={() => setAbierto1(false)}
          >
            <button
              className={
                path === "/menu/personalizado" || path === "/menu/original"
                  ? "border-b-2 border-main font-light text-[1.1875rem] cursor-pointer"
                  : "font-light text-[1.1875rem] cursor-pointer"
              }
            >
              Menú
            </button>
            {abierto1 && <DropdownMenu />}
          </li>

          <li
            className={
              path === "/testimonios"
                ? "border-b-2 border-main font-bold"
                : "hover:text-main font-bold"
            }
          >
            <Link href="/testimonios">Testimonios</Link>
          </li>
        </nav>

        <nav className="list-none flex space-x-12 relative">
          <li className="p-overlay-badge">
            <Link href="/">
              <a>
                <img src="/Iconos/carrito.svg" alt="Icono carrito" width={33} />
                <Badge value={`${numProductosCarrito}`} severity="danger" />
              </a>
            </Link>
          </li>

          <li
            onMouseEnter={() => setAbierto2(true)}
            onMouseLeave={() => setAbierto2(false)}
          >
            <button>
              {auth ? (
                <img src="/Iconos/perfil.svg" alt="Icono perfil" width={33} />
              ) : (
                <img
                  src="/Iconos/autenticar.svg"
                  alt="Icono autenticar"
                  width={33}
                />
              )}
            </button>
            {abierto2 && <DropdownPerfil />}
          </li>

          <li>
            <Link href="/">
              <a>
                <img src="/Iconos/tarjeta.svg" alt="Icono tarjeta" width={33} />
              </a>
            </Link>
          </li>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
