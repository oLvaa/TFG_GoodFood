//import { Grid, Item } from "@mui/material";
import Grid from "@mui/material/Grid";

import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Contenedor from "../Contenedor";
import Plato from "./Plato";
import Filtro from "./Filtro";
import CircularProgress from "@mui/material/CircularProgress";

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
    }
  }
`;

const datos = [
  {
    id: 1,
    pack: "Definición",
    nombre: "Texas Outlaw BBQ Chicken",
    calorias: 250,
    proteina: 40,
    carbohidrato: 85,
    grasa: 25,
    ingredientes:
      "Zucchini, Shrimp, Bell Pepper, Quinoa, Olive Oil, Jalapeno, Lime Juice, Cilantro, Parsley, Green Onion, Minced Garlic, Salt, Mint, Black Pepper",
    peso: 300,
    precio: 7.5,
    img: "/prueba.jpg",
  },
  {
    id: 2,
    pack: "Definición",
    nombre: "Grandma's Roast Turkey with Cranberry Sauce",
    calorias: 250,
    proteina: 40,
    carbohidrato: 85,
    grasa: 25,
    ingredientes:
      "Zucchini, Shrimp, Bell Pepper, Quinoa, Olive Oil, Jalapeno, Lime Juice, Cilantro, Parsley, Green Onion, Minced Garlic, Salt, Mint, Black Pepper",
    peso: 300,
    precio: 7.5,
    img: "/prueba.jpg",
  },
  {
    id: 3,
    pack: "Definición",
    nombre: "Plato 3",
    calorias: 250,
    proteina: 40,
    carbohidrato: 85,
    grasa: 25,
    ingredientes:
      "Zucchini, Shrimp, Bell Pepper, Quinoa, Olive Oil, Jalapeno, Lime Juice, Cilantro, Parsley, Green Onion, Minced Garlic, Salt, Mint, Black Pepper",
    peso: 300,
    precio: 7.5,
    img: "/prueba.jpg",
  },
  {
    id: 4,
    pack: "Rendimiento",
    nombre: "Plato 4",
    calorias: 250,
    proteina: 40,
    carbohidrato: 85,
    grasa: 25,
    ingredientes:
      "Zucchini, Shrimp, Bell Pepper, Quinoa, Olive Oil, Jalapeno, Lime Juice, Cilantro, Parsley, Green Onion, Minced Garlic, Salt, Mint, Black Pepper",
    peso: 300,
    precio: 7.5,
    img: "/prueba.jpg",
  },
  {
    id: 5,
    pack: "Rendimiento",
    nombre: "Plato 5",
    calorias: 250,
    proteina: 40,
    carbohidrato: 85,
    grasa: 25,
    ingredientes:
      "Zucchini, Shrimp, Bell Pepper, Quinoa, Olive Oil, Jalapeno, Lime Juice, Cilantro, Parsley, Green Onion, Minced Garlic, Salt, Mint, Black Pepper",
    peso: 300,
    precio: 7.5,
    img: "/prueba.jpg",
  },
  {
    id: 6,
    pack: "Rendimiento",
    nombre: "Plato 6",
    calorias: 250,
    proteina: 40,
    carbohidrato: 85,
    grasa: 25,
    ingredientes:
      "Zucchini, Shrimp, Bell Pepper, Quinoa, Olive Oil, Jalapeno, Lime Juice, Cilantro, Parsley, Green Onion, Minced Garlic, Salt, Mint, Black Pepper",
    peso: 300,
    precio: 7.5,
    img: "/prueba.jpg",
  },

  {
    id: 7,
    pack: "Volumen",
    nombre: "Plato 7",
    calorias: 250,
    proteina: 40,
    carbohidrato: 85,
    grasa: 25,
    ingredientes:
      "Zucchini, Shrimp, Bell Pepper, Quinoa, Olive Oil, Jalapeno, Lime Juice, Cilantro, Parsley, Green Onion, Minced Garlic, Salt, Mint, Black Pepper",
    peso: 300,
    precio: 7.5,
    img: "/prueba.jpg",
  },
  {
    id: 8,
    pack: "Volumen",
    nombre: "Plato 8",
    calorias: 250,
    proteina: 40,
    carbohidrato: 85,
    grasa: 25,
    ingredientes:
      "Zucchini, Shrimp, Bell Pepper, Quinoa, Olive Oil, Jalapeno, Lime Juice, Cilantro, Parsley, Green Onion, Minced Garlic, Salt, Mint, Black Pepper",
    peso: 300,
    precio: 7.5,
    img: "/prueba.jpg",
  },
];

const Packs = () => {
  const [filtered, setFiltered] = useState([]);
  const [packActivo, setPackActivo] = useState("Definición");

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
          <Grid container spacing={8} columns={{ xs: 1, sm: 8, md: 12 }}>
            {filtered.map((plato) => {
              return (
                <Grid item xs={2} sm={4} md={4} key={plato.id}>
                  <Plato plato={plato} />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </Contenedor>
  );
};

export default Packs;
