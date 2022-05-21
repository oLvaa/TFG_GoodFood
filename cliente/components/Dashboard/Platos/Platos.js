import React from "react";
import { gql, useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "./Table";

const OBTENER_PLATOS = gql`
  query ObtenerPlatos {
    obtenerPlatos {
      id
      nombre
      img
      imgID
      pack
      enMenu
      precio
      peso
      calorias
      proteina
      carbohidrato
      grasa
      ingredientes
    }
  }
`;

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
          <Table data={data.obtenerPlatos} />
        </div>
      )}
    </div>
  );
};

export default Platos;
