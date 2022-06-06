import React from "react";
import TablaSoporte from "./Tabla-Soporte";
import { useQuery } from "@apollo/client";
import { OBTENER_MENSAJES } from "../../../endpoints";
import CircularProgress from "@mui/material/CircularProgress";

const SoporteDash = () => {
  const { loading, error, data } = useQuery(OBTENER_MENSAJES);

  return (
    <div>
      <h1 className="text-[2.5rem] text-oscuro mb-12">Soporte</h1>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className="border border-b-0">
          <TablaSoporte data={data.obtenerMensajes} />
        </div>
      )}
    </div>
  );
};

export default SoporteDash;
