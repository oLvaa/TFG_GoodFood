import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="mb-[1.688rem] mt-[0.688rem]">
      <Link href="/">
        <a>
          <img src="/logo.svg" alt="Logo" width={157} />
        </a>
      </Link>
    </div>
  );
};

export default Logo;
