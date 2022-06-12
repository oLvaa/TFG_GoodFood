import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { OBTENER_PEDIDOS_USUARIO } from "../../endpoints";
import useAuth from "../../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import ContenedorMain from "../Contenedor";
import Pedido from "./Pedido";

const Pedidos = () => {
  const { auth } = useAuth();

  const { loading, error, data } = useQuery(OBTENER_PEDIDOS_USUARIO, {
    variables: {
      idUsuario: auth.id,
    },
  });

  return (
    <ContenedorMain>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <div>
          <h2>Pedidos</h2>
          {data.obtenerPedidosUsuario === 0 ? (
            <div className="flex justify-center items-center h-[40rem]">
              <h3 className="text-oscuro">No se encontraron pedidos</h3>
            </div>
          ) : (
            <div className=" space-y-10 mt-10">
              {data.obtenerPedidosUsuario.map((pedido, idx) => (
                <Pedido pedido={pedido} idx={idx} />
              ))}
            </div>
          )}
        </div>
      )}
    </ContenedorMain>
  );
};

export default Pedidos;
