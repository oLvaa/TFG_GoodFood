import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import WorkInProgress from "../../components/WorkInProgress";

const descuentos = () => {
  return (
    <Dashboard>
      <div>
        <h1 className="text-[2.5rem] text-oscuro">Descuentos</h1>
        <WorkInProgress />
      </div>
    </Dashboard>
  );
};

export default descuentos;
