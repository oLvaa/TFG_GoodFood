import React from "react";
import Tarjeta from "./Tarjeta";

const Seccion3 = () => {
  return (
    <div>
      <div className="flex items-center justify-between h-[35rem]">
        <div className="w-[18.75rem] text-center">
          <h1>
            <span className="palabraSpan">CREA</span>
            <br></br>
            <span className="text-[3rem]">tu</span>
            <br></br> PROPIO <br></br>
            <span className="palabraSpan">PLATO</span>
          </h1>
        </div>
        <div className="flex items-center">
          <Tarjeta
            numero="1"
            titulo="FABRICA"
            texto="Eligiendo la cantidad de macronutrientes y los alimentos"
            icono="/Iconos/engranaje.svg"
            alt="Icono engranaje"
          />
          <div className="w-[3.25rem] m-[1.1875rem]">
            <img src="/Iconos/flecha.svg" alt="flecha" />
          </div>
          <div className="relative">
            <Tarjeta
              numero="2"
              titulo="AÑADE"
              texto="A tu lista de platos y añádelo a tu carrito o a tu menú"
              icono="/Iconos/bookmark.svg"
              alt="Icono bookmark"
            />
            <button className="absolute bg-oscuro hover:bg-black font-bold text-[0.875rem] text-fondoBlanco rounded-full w-[12.188rem] mt-[1.25rem]">
              IR AHORA
            </button>
          </div>

          <div className="w-[3.25rem] m-[1.1875rem]">
            <img src="/Iconos/flecha.svg" alt="flecha" />
          </div>
          <Tarjeta
            numero="3"
            titulo="COMPARTE"
            texto="Exporta tus platos para que tus amigos puedan disfrutarlos"
            icono="/Iconos/compartir.svg"
            alt="Icono compartir"
          />
        </div>
      </div>
    </div>
  );
};

export default Seccion3;
