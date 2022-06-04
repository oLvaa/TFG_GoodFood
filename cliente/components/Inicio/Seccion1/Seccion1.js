import React from "react";
import Reviews from "./Reviews";

const Seccion1 = () => {
  return (
    <>
      <div className="flex justify-between h-[44.6956rem] items-center">
        <div className="max-w-[25.313rem]">
          <h1>
            <span className="palabraSpan">Buena</span> comida,
            <br /> para <span className="palabraSpan">buenos</span>
            <br /> momentos
          </h1>

          <p className="mt-4 mb-8">
            Comer es una necesidad, hacerlo de forma inteligente es un arte
          </p>

          <button className="text-center bg-oscuro hover:bg-black text-fondoBlanco rounded-full px-[1.325rem] py-[0.5rem] text-[1rem]">
            Crea tu plato
          </button>
          <Reviews />
        </div>
        <div className="w-[35.625rem]">
          <img
            src="/Img/plato-inicio.png"
            alt="plato"
            className="w-full h-auto"
          />
        </div>
      </div>
    </>
  );
};

export default Seccion1;
