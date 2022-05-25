import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import DropdownMenu from "./DropdownMenu";
import DropdownPerfil from "./DropdownPerfil";
import Logo from "./Logo";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { Badge } from "primereact/badge";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
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

  //Dialog
  const [displayDialog, setDisplayDialog] = useState(false);

  const onClick = () => {
    setDisplayDialog(true);
  };

  const onHide = () => {
    setDisplayDialog(false);
  };

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHide()}
          className="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => onHide()}
          autoFocus
        />
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
              onClick={() => onClick()}
            />
            <Badge
              onClick={() => onClick()}
              value={`${numProductosCarrito}`}
              severity="danger"
              className="!bg-oscuro"
            />
            <Dialog
              header="Header"
              visible={displayDialog}
              style={{ width: "50vw" }}
              footer={renderFooter()}
              onHide={() => onHide()}
              position="right"
              draggable={false}
              closable={false}
              dismissableMask={true}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <br />
              <p>
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?
              </p>
              <br />
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus. Temporibus autem
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <br />
              <p>
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?
              </p>
              <br />
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus. Temporibus autem
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat.
              </p>
              <br />
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
