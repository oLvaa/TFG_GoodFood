import React from "react";
import "primeicons/primeicons.css";

const Cart = ({ productosCarrito, borrarProductoCarrito }) => {
  const borrarProducto = (producto) => {
    borrarProductoCarrito(producto);
  };

  return (
    <>
      {productosCarrito !== null ? (
        <div className="space-y-8">
          {productosCarrito.map((producto) => {
            if (producto.tipo === "pack") {
              return (
                <div className="flex items-center justify-between">
                  <div className="flex ">
                    <i
                      className="pi pi-times self-center mr-5 cursor-pointer"
                      onClick={() => {
                        borrarProducto(producto);
                      }}
                    ></i>
                    <img
                      className="object-cover w-16 h-16 rounded-lg mr-5"
                      src={producto.img}
                      alt=""
                    />
                    <div className="flex flex-col">
                      <h3>{producto.nombre}</h3>
                      <p className=" font-normal">
                        {producto.numPlatos} platos
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xl font-normal">{producto.precio}€</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <p>El carrito no tiene productos</p>
      )}
    </>
  );
};

export default Cart;
