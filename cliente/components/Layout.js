import React from "react";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>PROV Ecommerce - Delivery</title>
      </Head>

      <div className="w-screen bg-fondoBlanco px-4">
        <div className="max-w-[1246px] mx-auto">{children}</div>
      </div>
    </>
  );
};

export default Layout;
