import React from "react";
import Tarjeta from "./Tarjeta";

const Seccion2 = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center pt-[5rem]">
        <span className="palabraSpan">PACKS</span> ADAPTADOS A CADA OBJETIVO
      </h1>
      <div className="flex items-center mt-[6.875rem] pb-[8.125rem]">
        <Tarjeta
          titulo="DEFINICIÓN"
          texto="Pierde grasa"
          img="bg-[url('/packs/definicion.png')]"
        />
        <div className="w-[10.813rem] h-[0.188rem] bg-main"></div>
        <Tarjeta
          titulo="RENDIMIENTO"
          texto="Cárgate de energía"
          img="bg-[url('/packs/rendimiento.png')]"
        />
        <div className="w-[10.813rem] h-[0.188rem] bg-main"></div>
        <Tarjeta
          titulo="VOLUMEN"
          texto="Gana masa muscular"
          img="bg-[url('/packs/volumen.png')]"
        />
      </div>
    </div>
  );
};

export default Seccion2;
