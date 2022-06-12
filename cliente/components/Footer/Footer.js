import React from "react";
import Link from "next/dist/client/link";

const Footer = () => {
  return (
    <div className="w-screen bg-fondoGris px-4">
      <div className="max-w-[1246px] mx-auto py-[6.25rem]">
        <div className="flex justify-between">
          <div>
            <h3 className="mb-[1rem]">CONECTA CON NOSOTROS</h3>
            <div className="flex space-x-[2.8125rem]">
              <img
                className="cursor-pointer"
                src="/Iconos/instagram.svg"
                alt=""
                width={36}
              />
              <img
                className="cursor-pointer"
                src="/Iconos/facebook.svg"
                alt=""
                width={36}
              />
              <img
                className="cursor-pointer"
                src="/Iconos/twitter.svg"
                alt=""
                width={36}
              />
            </div>
          </div>
          <div>
            <h3 className="mb-[1rem]">ÚNETE A NUESTRO NEWSLETTER</h3>
            <form action="" className=" flex rounded-md">
              <input
                type="text"
                placeholder="Correo electrónico"
                className="py-[1rem] px-[0.5625rem] border w-full focus:outline-none focus:placeholder:text-transparent placeholder:italic focus-wit rounded-l-md"
              />
              <button className="px-[1rem]  bg-oscuro hover text-fondoBlanco text-[1rem] rounded-r-md">
                Suscribir
              </button>
            </form>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="mt-[4.6875rem]">
            <h3 className="mb-[1rem]">SOPORTE</h3>
            <p className="text-contrasteGris">soporte@goodfood.com</p>
          </div>
          <div className="mt-[2.375rem]">
            <Link href="/">
              <a>
                <img src="/logo.svg" alt="Logo" width={157} />
              </a>
            </Link>
          </div>
        </div>

        <div className="flex justify-between text-contrasteGris mt-[4.6875rem]">
          <div className="flex justify-between w-[25.3125rem]">
            <div className="flex flex-col">
              <Link href="/packs">
                <a>Packs</a>
              </Link>
              <Link href="/plato-personalizado">
                <a>Plato personalizado</a>
              </Link>
              <Link href="/menu/original">
                <a>Menú original</a>
              </Link>
              <Link href="/menu/personalizado">
                <a>Menú personalizado</a>
              </Link>
            </div>
          </div>
          <div className="flex flex-col text-contrasteGris text-right">
            <Link href="/">
              <a>©2022 Good Food</a>
            </Link>
            {/* <Link href="/">
              <a>Aviso legal</a>
            </Link>
            <Link href="/">
              <a>Política de privacidad</a>
            </Link>
            <Link href="/">
              <a>Política de cookies</a>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
