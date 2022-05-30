import React from "react";
import TablaPedidos from "./Tabla-Pedidos";
import { gql, useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";

const OBTENER_PEDIDOS = gql`
  query Query {
    obtenerPedidos {
      id
      importe
      info
      idUsuario
      idPago
      direccion
      estado
      piso
      creado
    }
  }
`;

const Pedidos = () => {
  const { loading, error, data } = useQuery(OBTENER_PEDIDOS);

  return (
    <div>
      <h1 className="text-[2.5rem] text-oscuro mb-12">Pedidos</h1>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className="border border-b-0">
          <TablaPedidos data={data.obtenerPedidos} />
        </div>
      )}
    </div>
  );
};

export default Pedidos;
