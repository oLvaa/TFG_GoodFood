import React from "react";
import TablaPedidos from "./Tabla-Pedidos";
import { useQuery } from "@apollo/client";
import { OBTENER_PEDIDOS } from "../../../endpoints";
import CircularProgress from "@mui/material/CircularProgress";

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
