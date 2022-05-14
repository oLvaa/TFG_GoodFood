import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import Platos from "../../components/Dashboard/Platos/Platos";

const platos = () => {
  return (
    <Dashboard>
      <div>
        <Platos />
      </div>
    </Dashboard>
  );
};

export default platos;
