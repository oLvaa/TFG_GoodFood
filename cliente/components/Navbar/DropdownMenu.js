import React, { useState } from "react";
import Link from "next/link";

const DropdownMenu = () => {
  const [abierto, setAbierto] = useState(true);
  return (
    <ul
      className={
        abierto
          ? "list-none absolute shadow-lg rounded-lg  text-fondoBlanco font-semibold text-sm w-36 pt-2"
          : "hidden"
      }
      onClick={() => setAbierto(!abierto)}
    >
      <li>
        <Link href="/menu/original">
          <div className="hover:bg-mainHover rounded-t-lg bg-main cursor-pointer pl-2 py-3 ">
            <a className="cursor-pointer text-sm">Original</a>
          </div>
        </Link>
      </li>
      <li>
        <Link href="/menu/personalizado">
          <div className="hover:bg-mainHover rounded-b-lg bg-main cursor-pointer pl-2 py-3">
            <a className="cursor-pointer text-sm">Personalizado</a>
          </div>
        </Link>
      </li>
    </ul>
  );
};

export default DropdownMenu;
