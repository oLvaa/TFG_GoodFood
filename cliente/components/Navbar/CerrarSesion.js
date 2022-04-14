import React from "react";

const CerrarSesion = ({ logout }) => {
  return (
    <div>
      <button
        onClick={logout}
        className="hover:bg-mainHover rounded-b-lg bg-main cursor-pointer pl-2 py-3 w-full text-left"
      >
        <span className="cursor-pointer text-sm">Cerrar sesión</span>
      </button>
    </div>
  );
};

export default CerrarSesion;
