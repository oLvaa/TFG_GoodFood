import React from "react";
import Link from "next/link";

const Tarjeta = ({ titulo, texto, img }) => {
  return (
    <Link href="/packs">
      <a>
        <div className={`w-[15.5rem] h-[19.8125rem] bg-contain ${img}`}>
          <div className="ml-[0.575rem] pt-[0.25rem]">
            <h2>{titulo}</h2>
            <p className="text-main font-light text-[0.9375rem]">{texto}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Tarjeta;
