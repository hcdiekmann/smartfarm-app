import React from "react";

const LogoAndName: React.FC = () => {
  return (
    <div>
      <img
        alt="Logo"
        className="mx-auto w-16 h-16 md:w-32 md:h-32"
        height="48"
        src="assets/logo_white.svg"
        style={{
          aspectRatio: "48/48",
          objectFit: "cover",
        }}
        width="48"
      />
      <div className="text-center text-white text-2xl md:text-4xl font-baloo">
        Smart Farming Africa
      </div>
    </div>
  );
};

export default LogoAndName;
