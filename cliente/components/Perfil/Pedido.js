import React from "react";

const Pedido = (props) => {
  console.log(props);
  const {
    creado,
    direccion,
    estado,
    id,
    idPago,
    idUsuario,
    importe,
    info,
    piso,
  } = props.pedido;

  const datosPedido = JSON.parse(info);
  const formatedDate = new Date(parseInt(creado));

  console.log(datosPedido);

  return (
    <div className="bg-white flex flex-col rounded-lg p-8 w-full shadow-md">
      <div>
        <p className="font-bold text-main mb-2">{props.idx + 1}.</p>
      </div>
      <div className="mb-6">
        <div>
          <span className="font-bold">Fecha:</span>{" "}
          {formatedDate.toLocaleDateString()}
        </div>
        <div>
          <span className="font-bold">Dirección:</span> {direccion}
        </div>
        <div>
          <span className="font-bold">Importe total:</span> {importe}€
        </div>
        <div>
          <span className="font-bold">Estado:</span> {estado}
        </div>
      </div>

      <div className="space-y-6">
        {datosPedido.map((item) => (
          <div className="flex items-center space w-full ">
            <img
              className="object-cover w-16 h-16 rounded-lg mr-5"
              src={item.img}
              alt=""
            />
            <div className="flex flex-col mr-auto">
              <div>
                <p className=" font-semibold">{item.nombre}</p>
              </div>
              <div>
                <p>{item.numPlatos} platos</p>
              </div>
            </div>
            <div className="ml-[12rem]">
              <p>{item.precio}€</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pedido;
