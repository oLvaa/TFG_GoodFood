import React from "react";
import { gql, useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "./Table";

const OBTENER_PLATOS = gql`
  query Query {
    obtenerPlatos {
      id
      pack
      enMenu
      nombre
      calorias
      proteina
      carbohidrato
      grasa
      peso
      precio
      img
    }
  }
`;

const Platos = () => {
  const { data, loading, error } = useQuery(OBTENER_PLATOS);
  console.log(data);

  return (
    <div>
      <h1 className="text-[2.5rem] text-oscuro mb-12">Platos</h1>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className="border border-b-0">
          <Table data={data} />
        </div>
      )}
    </div>
  );
};

export default Platos;
