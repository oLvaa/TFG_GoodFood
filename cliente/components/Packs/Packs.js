//import { Grid, Item } from "@mui/material";
import Grid from "@mui/material/Grid";

import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Contenedor from "../Contenedor";
import Plato from "./Plato";
import Filtro from "./Filtro";
import CircularProgress from "@mui/material/CircularProgress";
import useCart from "../../hooks/useCart";

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

const Packs = () => {
  const [filtered, setFiltered] = useState([]);
  const [packActivo, setPackActivo] = useState("Definición");
  const [precio, setPrecio] = useState();
  const [numPlatos, setNumPlatos] = useState();
  const { añadirProductoCarrito } = useCart();

  useEffect(() => {
    let _precio = 0;
    let num = 0;
    filtered.forEach((plato) => {
      _precio += plato.precio;
      num++;
    });
    setPrecio(_precio);
    setNumPlatos(num);
  }, [filtered]);

  const { loading, error, data } = useQuery(OBTENER_PLATOS);

  return (
    <Contenedor>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <>
          <h1 className="mb-[8rem] mt-12 text-center text-4xl">
            PACK PARA <span className="palabraSpan">DEFINICIÓN</span>
          </h1>
          <Filtro
            platos={data.obtenerPlatos}
            setFiltered={setFiltered}
            packActivo={packActivo}
            setPackActivo={setPackActivo}
          />
          <p className="mb-[8rem] text-center text-md">
            Platos bajos en carbohidratos y calorías para ayudar a la pérdida de
            peso
          </p>
          {filtered.length > 0 ? (
            <>
              <Grid container spacing={8} columns={{ xs: 1, sm: 8, md: 12 }}>
                {filtered.map((plato) => {
                  return (
                    <Grid item xs={2} sm={4} md={4} key={plato.id}>
                      <Plato plato={plato} />
                    </Grid>
                  );
                })}
              </Grid>
              <div className="mt-[4rem]">
                <button
                  onClick={() => {
                    let packCarrito = {};
                    packCarrito.nombre = `Pack ${filtered[0]?.pack}`;
                    packCarrito.valores = filtered;
                    añadirProductoCarrito(packCarrito);
                  }}
                  className="bg-oscuro hover:bg-black text-white flex items-center p-3 rounded-md"
                >
                  <div className="mr-10 text-lg">
                    {precio}€<br></br>
                    {numPlatos} platos
                  </div>
                  <div className="text-xl">Añadir al carro</div>
                </button>
              </div>
            </>
          ) : (
            <div>No se encontraron platos</div>
          )}
        </>
      )}
    </Contenedor>
  );
};

export default Packs;
