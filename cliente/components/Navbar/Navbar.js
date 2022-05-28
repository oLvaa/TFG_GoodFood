import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import DropdownMenu from "./DropdownMenu";
import DropdownPerfil from "./DropdownPerfil";
import Cart from "../Carrito/Cart";
import Pago from "../Carrito/Pago";
import Logo from "./Logo";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { Badge } from "primereact/badge";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

const Navbar = () => {
  const { auth } = useAuth();
  const { numProductosCarrito, productosCarrito, borrarProductoCarrito } =
    useCart();

  //Routing de next
  const router = useRouter();
  let path = router.pathname;

  //Para los dropdown
  const [abierto1, setAbierto1] = useState(false);
  const [abierto2, setAbierto2] = useState(false);

  //Dialog
  const [displayDialog, setDisplayDialog] = useState(false);
  const [displayPagoDialog, setDisplayPagoDialog] = useState(false);

  //Precio total
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let suma = 0;

    if (productosCarrito) {
      productosCarrito.forEach((producto) => {
        suma += producto.precio;
      });
    }

    setTotal(suma);
  }, [productosCarrito]);

  const onDisplayDialog = () => {
    setDisplayDialog(true);
  };

  const onDisplayPagoDialog = () => {
    setDisplayDialog(false);
    setDisplayPagoDialog(true);
  };

  const onHide = () => {
    setDisplayDialog(false);
  };

  const onPagoHide = () => {
    setDisplayPagoDialog(false);
  };

  const renderFooter = () => {
    return (
      <div className="flex flex-col">
        <Divider />
        <div className="flex justify-center">
          <p className="text-xl font-normal">
            Total: <span className="text-2xl font-bold">{total}€</span>
          </p>
        </div>
        <Divider />
        <button
          className="blackButton text-lg w-full flex justify-center p-1"
          disabled={total === 0 ? true : false}
          onClick={() => {
            onDisplayPagoDialog();
          }}
        >
          Hacer pedido
        </button>
      </div>
    );
  };

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
          <li className="p-overlay-badge cursor-pointer">
            <img
              src="/Iconos/carrito.svg"
              alt="Icono carrito"
              width={33}
              onClick={() => onDisplayDialog()}
            />
            <Badge
              onClick={() => onDisplayDialog()}
              value={`${numProductosCarrito}`}
              severity="danger"
              className="!bg-oscuro"
            />
            <Dialog
              visible={displayDialog}
              style={{ width: "50vw" }}
              footer={renderFooter()}
              onHide={() => onHide()}
              position="center"
              draggable={false}
              closable={false}
              dismissableMask={true}
              blockScroll={true}
            >
              <Cart
                productosCarrito={productosCarrito}
                borrarProductoCarrito={borrarProductoCarrito}
              />
            </Dialog>
            <Dialog
              visible={displayPagoDialog}
              style={{ width: "50vw" }}
              onHide={() => onPagoHide()}
              position="center"
              draggable={false}
              closable={false}
              dismissableMask={true}
              blockScroll={true}
            >
              <Pago productosCarrito={productosCarrito} />
            </Dialog>
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
