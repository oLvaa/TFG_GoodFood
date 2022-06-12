import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { OBTENER_DATOS } from "../../../endpoints";
import CircularProgress from "@mui/material/CircularProgress";
import { Chart } from "primereact/chart";
import "primeicons/primeicons.css";

const Inicio = () => {
  const { loading, error, data } = useQuery(OBTENER_DATOS);
  const [chartData, setChartData] = useState({});
  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  });

  useEffect(() => {
    setChartData({
      labels: [
        "Facturación total",
        "Facturación del mes",
        "Pedidos totales",
        "Pedidos del mes",
      ],
      datasets: [
        {
          data: [300, 50, 100, 50],
          backgroundColor: [
            "rgb(220 38 38)",
            "rgb(244 63 94)",
            "rgb(22 163 74)",
            "rgb(5 150 105)",
          ],
          hoverBackgroundColor: [
            "rgb(220 38 38)",
            "rgb(244 63 94)",
            "rgb(22 163 74)",
            "rgb(5 150 105)",
          ],
        },
      ],
    });
  }, [data]);

  return (
    <div>
      <h1 className="text-[2.5rem] text-oscuro">Inicio</h1>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className="mt-12 space-y-10">
          <div className="flex space-x-10">
            <div className="bg-white flex rounded-lg p-8 items-center w-full shadow-md">
              <div>
                <i className="pi pi-users mr-6 rounded-full text-white !text-[2rem] p-3 bg-blue-600"></i>
              </div>
              <div>
                <div>
                  <p className="font-bold text-[1.4rem]">
                    {data.obtenerDatos.numUsuarios}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-md">Usuarios registrados</p>
                </div>
              </div>
            </div>

            <div className="bg-white flex rounded-lg p-8 items-center w-full shadow-md">
              <div>
                <i className="pi pi-shopping-bag mr-6 rounded-full text-white  !text-[2rem] p-3 bg-teal-500"></i>
              </div>
              <div>
                <div>
                  <p className="font-bold text-[1.4rem]">
                    {data.obtenerDatos.numPlatos}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Platos disponibles</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-10">
            <div className="bg-white flex rounded-lg p-8 items-center w-full shadow-md">
              <div>
                <i className="pi pi-list mr-6 rounded-full text-white !text-[2rem] p-3 bg-green-600"></i>
              </div>
              <div>
                <div>
                  <p className="font-bold text-[1.4rem]">
                    {data.obtenerDatos.pedidosTotales}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-md">Pedidos totales</p>
                </div>
              </div>
            </div>

            <div className="bg-white flex rounded-lg p-8 items-center w-full shadow-md">
              <div>
                <i className="pi pi-shopping-cart mr-6 rounded-full text-white  !text-[2rem] p-3 bg-emerald-600"></i>
              </div>
              <div>
                <div>
                  <p className="font-bold text-[1.4rem]">
                    {data.obtenerDatos.pedidosMes}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Pedidos del mes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-10">
            <div className="bg-white flex rounded-lg p-8 items-center w-full shadow-md">
              <div>
                <i className="pi pi-list mr-6 rounded-full text-white !text-[2rem] p-3 bg-red-600"></i>
              </div>
              <div>
                <div>
                  <p className="font-bold text-[1.4rem]">
                    {data.obtenerDatos.facturacionTotal}€
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-md">Facturación total</p>
                </div>
              </div>
            </div>

            <div className="bg-white flex rounded-lg p-8 items-center w-full shadow-md">
              <div>
                <i className="pi pi-shopping-cart mr-6 rounded-full text-white  !text-[2rem] p-3 bg-rose-500"></i>
              </div>
              <div>
                <div>
                  <p className="font-bold text-[1.4rem]">
                    {data.obtenerDatos.facturacionMes}€
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Facturación del mes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card flex justify-center w-full !mt-[5rem]">
            <Chart
              type="doughnut"
              data={chartData}
              options={lightOptions}
              style={{ position: "relative", width: "40%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Inicio;
