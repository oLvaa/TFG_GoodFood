import React from "react";

const Reviews = () => {
  return (
    <>
      <div className="bg-fondoGris rounded-full flex justify-between items-center w-[13.25rem] mt-[5.938rem]">
        <div className="flex m-2.5 mr-0">
          <img src="/Iconos/estrella.svg" alt="" width={27} />
          <img src="/Iconos/estrella.svg" alt="" width={27} />
          <img src="/Iconos/estrella.svg" alt="" width={27} />
          <img src="/Iconos/estrella.svg" alt="" width={27} />
          <img src="/Iconos/estrella.svg" alt="" width={27} />
        </div>
        <div className="grow text-center">
          <p className="text-[1rem] font-semibold mt-[0.25rem]">4,8/5</p>
        </div>
      </div>
      <div className="w-[13.25rem] text-center mt-2">
        <p className="text-[0.8rem]">Con un total de 1788 reviews</p>
      </div>
    </>
  );
};

export default Reviews;
