import React from "react";

const InfoPlato = ({ plato }) => {
  const {
    nombre,
    calorias,
    proteina,
    carbohidrato,
    grasa,
    ingredientes,
    peso,
  } = plato;
  return (
    <div className="flex p-6 items-center">
      <div className="w-[50rem] mr-6">
        <img className="rounded-lg" src={plato.img} alt="Plato de comida" />
      </div>
      <div className="flex flex-col space-y-6">
        <h2 className="text-[1.25rem] text-main">{nombre}</h2>
        <p className="text-sm">
          <span className="font-bold">Peso: </span>
          {peso}g
        </p>
        <p className="text-[0.7rem]">
          <span className="font-bold">Ingredientes: </span>
          {ingredientes}
        </p>
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-sm text-center">{calorias}</p>
            <p className="text-sm">Calorias</p>
          </div>
          <div>
            <p className="font-bold text-sm text-center">{proteina}g</p>
            <p className="text-sm">Proteina</p>
          </div>
          <div>
            <p className="font-bold text-sm text-center">{carbohidrato}g</p>
            <p className="text-sm">Carbohidratos</p>
          </div>
          <div>
            <p className="font-bold text-sm text-center">{grasa}g</p>
            <p className="text-sm">Grasas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPlato;
