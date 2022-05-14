import React, { useEffect } from "react";

const Filtro = ({ platos, setFiltered, packActivo, setPackActivo }) => {
  useEffect(() => {
    const filtered = platos.filter((plato) => plato.pack.includes(packActivo));
    setFiltered(filtered);
  }, [packActivo]);

  return (
    <div className="mb-[3.125rem] flex space-x-[4.5rem]">
      <button
        onClick={() => setPackActivo("Definición")}
        className={`text-[1.5rem] font-bold w-[11.875rem] ${
          packActivo === "Definición" ? "border-b-2 border-main" : ""
        }`}
      >
        Definición
      </button>
      <button
        onClick={() => setPackActivo("Rendimiento")}
        className={`text-[1.5rem] font-bold w-[11.875rem] ${
          packActivo === "Rendimiento" ? "border-b-2 border-main" : ""
        }`}
      >
        Rendimiento
      </button>
      <button
        onClick={() => setPackActivo("Volumen")}
        className={`text-[1.5rem] font-bold w-[11.875rem] ${
          packActivo === "Volumen" ? "border-b-2 border-main" : ""
        }`}
      >
        Volumen
      </button>
    </div>
  );
};

export default Filtro;
