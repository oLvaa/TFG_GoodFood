import React from "react";

const Tarjeta = ({ numero, titulo, texto, icono, alt }) => {
  return (
    <div className="flex flex-col items-center bg-fondoGris h-fit">
      <div className="self-end flex items-center justify-center bg-main w-[1.875rem]">
        <div className="font-bold text-[1.125rem] text-fondoBlanco mt-[0.25rem]">
          {numero}
        </div>
      </div>
      <h2>{titulo}</h2>
      <p className="w-[9.063rem] mx-[1.563rem] mt-[0.938rem] mb-[1.563rem] text-[1.125rem] font-light">
        {texto}
      </p>
      <div className="w-[2.25rem] mb-[0.625rem]">
        <img src={icono} alt={alt} />
      </div>
    </div>
  );
};

export default Tarjeta;
