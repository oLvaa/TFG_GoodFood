import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div className="w-screen bg-fondoBlanco px-4">
        <div className="max-w-[1246px] mx-auto">{children}</div>
      </div>
    </>
  );
};

export default Layout;
