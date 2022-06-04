import React from "react";
import { useQuery } from "@apollo/client";
import { OBTENER_PLATOS } from "../../../endpoints";
import CircularProgress from "@mui/material/CircularProgress";
import TablaPlatos from "./Tabla-Platos";

const Platos = () => {
  const { loading, error, data } = useQuery(OBTENER_PLATOS);

  return (
    <div>
      <h1 className="text-[2.5rem] text-oscuro mb-12">Platos</h1>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className="border border-b-0">
          <TablaPlatos data={data.obtenerPlatos} />
        </div>
      )}
    </div>
  );
};

export default Platos;
