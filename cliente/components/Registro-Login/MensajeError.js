import React from "react";

const MensajeError = ({ error }) => {
  return (
    <div className="flex items-center mt-[-0.5rem] mb-[0.5rem] space-x-2">
      <svg
        className="h-4 w-4 text-red-700"
        width="3"
        height="3"
        viewBox="0 0 1024 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M512 64C630.817 64 744.768 111.2 828.784 195.216C912.8 279.232 960 393.183 960 512C960 630.817 912.8 744.768 828.784 828.784C744.768 912.8 630.817 960 512 960C393.183 960 279.232 912.8 195.216 828.784C111.2 744.768 64 630.817 64 512C64 393.183 111.2 279.232 195.216 195.216C279.232 111.2 393.183 64 512 64V64ZM512 256C503.875 255.993 495.837 257.681 488.401 260.956C480.964 264.23 474.293 269.02 468.812 275.019C463.331 281.017 459.162 288.093 456.57 295.794C453.978 303.495 453.021 311.652 453.76 319.744L477.12 576.128C478.026 584.748 482.091 592.727 488.532 598.526C494.973 604.326 503.333 607.535 512 607.535C520.667 607.535 529.027 604.326 535.468 598.526C541.909 592.727 545.974 584.748 546.88 576.128L570.176 319.744C570.914 311.658 569.959 303.506 567.371 295.809C564.783 288.113 560.619 281.04 555.146 275.042C549.672 269.045 543.008 264.254 535.579 260.975C528.151 257.696 520.12 256.002 512 256V256ZM512 768C525.579 768 538.602 762.606 548.204 753.004C557.806 743.402 563.2 730.379 563.2 716.8C563.2 703.221 557.806 690.198 548.204 680.596C538.602 670.994 525.579 665.6 512 665.6C498.421 665.6 485.398 670.994 475.796 680.596C466.194 690.198 460.8 703.221 460.8 716.8C460.8 730.379 466.194 743.402 475.796 753.004C485.398 762.606 498.421 768 512 768V768Z"
          fill="rgb(185 28 28)"
        />
      </svg>
      <p className="text-sm text-red-700">{error}</p>
    </div>
  );
};

export default MensajeError;
