import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import Pedidos from "../../components/Dashboard/Pedidos/Pedidos";

const pedidos = () => {
  return (
    <Dashboard>
      <div>
        <Pedidos />
      </div>
    </Dashboard>
  );
};

export default pedidos;
