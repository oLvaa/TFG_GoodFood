import React from "react";

const ContenedorMain = ({ children }) => {
  return (
    <div className="flex flex-col  items-center bg-fondoBlanco p-5 pb-28 min-h-[44.6956rem]">
      {children}
    </div>
  );
};

export default ContenedorMain;
