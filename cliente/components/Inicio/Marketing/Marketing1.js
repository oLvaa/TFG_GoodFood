import React from "react";

const Marketing1 = () => {
  return (
    <div className="w-screen bg-fondoGris px-4">
      <div className="max-w-[1246px] mx-auto">
        <div className="flex justify-between items-center h-[5.625rem]">
          <div className="w-[15.5625rem]">
            <img
              src="/Img/Logo-Mkt1.png"
              alt="Logo Men´sHealth"
              className="w-full h-auto "
            />
          </div>
          <div className="w-[15.5625rem]">
            <img
              src="/Img/Logo-Mkt2.png"
              alt="Logo Runner´s"
              className="w-full h-auto "
            />
          </div>
          <div className="w-[15.5625rem]">
            <img
              src="/Img/Logo-Mkt3.png"
              alt="Logo Women´sHealth"
              className="w-full h-auto "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing1;
