import React, { useState } from "react";
import SimpleDialog from "@mui/material/Dialog";
import InfoPlato from "./InfoPlato";

const Plato = ({ plato }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(plato);
  return (
    <div>
      <div className="h-full flex flex-col justify-center shadow-md rounded-lg transform transition duration-300 hover:scale-110">
        <div onClick={handleOpen} className="cursor-pointer ">
          <img
            className="rounded-t-lg object-cover"
            src={plato.img}
            alt="Plato de comida"
          />
        </div>
        <div className="bg-main rounded-b-lg p-3 h-full">
          <h2 className="text-white text-[1.1rem] font-normal">
            {plato.nombre}
          </h2>
        </div>
      </div>
      <SimpleDialog open={open} onClose={handleClose}>
        <InfoPlato plato={plato} />
      </SimpleDialog>
    </div>
  );
};

export default Plato;
