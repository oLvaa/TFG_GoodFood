import React from "react";

const Seccion4 = () => {
  return (
    <div>
      <h1 className="text-center mt-[5.625rem]">
        ELIGE TU <span className="palabraSpan">MENÚ</span>
      </h1>
      <div className="flex justify-between mt-[7.5rem] items-center">
        <div className="w-[32rem] ">
          <img src="/Img/menu-semanal.jpg" alt="tuppers con comida" />
        </div>
        <div className="w-[32.813rem] flex flex-col">
          <h2>
            ¡Suscríbete a nuestro menú
            <span className="palabraSpan"> semanal</span>!
          </h2>
          <p className="mt-[2.1875rem]">
            Menú de 14 platos creado por los mejores nutricionistas para
            mantener una dieta saludable y equilibrada. Este se compone por
            alimentos de origen natural, frescos y con un alto valor energético.
          </p>
          <svg
            className="mt-[3.125rem] w-[3rem] self-center cursor-pointer"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="hover:fill-mainHover"
              d="M3.125 25C3.125 29.3265 4.40795 33.5558 6.8116 37.1531C9.21526 40.7504 12.6317 43.5542 16.6288 45.2099C20.6259 46.8655 25.0243 47.2987 29.2676 46.4547C33.5109 45.6106 37.4087 43.5272 40.468 40.468C43.5272 37.4087 45.6106 33.5109 46.4547 29.2676C47.2987 25.0243 46.8655 20.6259 45.2099 16.6288C43.5542 12.6317 40.7504 9.21526 37.1531 6.8116C33.5558 4.40795 29.3265 3.125 25 3.125C19.1984 3.125 13.6344 5.42968 9.53204 9.53204C5.42968 13.6344 3.125 19.1984 3.125 25ZM12.5 23.4375H31.4844L22.7656 14.6766L25 12.5L37.5 25L25 37.5L22.7656 35.2703L31.4844 26.5625H12.5V23.4375Z"
              fill="#60992D"
            />
          </svg>
        </div>
      </div>

      <div className="flex justify-between flex-row-reverse mt-[9.125rem] mb-[12rem] items-center">
        <div className="w-[32rem] ">
          <img src="/Img/menu-personalizado.jpg" alt="tuppers con comida" />
        </div>
        <div className="w-[32.813rem] flex flex-col">
          <h2>
            ¡O diseña tu propio menú a
            <span className="palabraSpan"> medida</span>!
          </h2>
          <p className="mt-[2.1875rem]">
            Elige la cantidad de comidas por semana que quieres, a más comidas,
            menor precio. Y después, diseña tu propio menú a partir de nuestors
            platos originales o usa los tuyos propios.
          </p>

          <svg
            className="mt-[3.125rem] w-[3rem] self-center cursor-pointer"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="hover:fill-mainHover"
              d="M3.125 25C3.125 29.3265 4.40795 33.5558 6.8116 37.1531C9.21526 40.7504 12.6317 43.5542 16.6288 45.2099C20.6259 46.8655 25.0243 47.2987 29.2676 46.4547C33.5109 45.6106 37.4087 43.5272 40.468 40.468C43.5272 37.4087 45.6106 33.5109 46.4547 29.2676C47.2987 25.0243 46.8655 20.6259 45.2099 16.6288C43.5542 12.6317 40.7504 9.21526 37.1531 6.8116C33.5558 4.40795 29.3265 3.125 25 3.125C19.1984 3.125 13.6344 5.42968 9.53204 9.53204C5.42968 13.6344 3.125 19.1984 3.125 25ZM12.5 23.4375H31.4844L22.7656 14.6766L25 12.5L37.5 25L25 37.5L22.7656 35.2703L31.4844 26.5625H12.5V23.4375Z"
              fill="#60992D"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Seccion4;
