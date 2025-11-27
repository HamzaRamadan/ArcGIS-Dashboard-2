/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface NavbarProps {
  brandLogo: string;
  brandPrimary: string;
  brandAccent: string;
  onZoomClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  brandLogo,
  brandPrimary,
  brandAccent,
  onZoomClick
}) => {
  return (
    <nav
      className="w-full flex items-center justify-between px-6 py-4 shadow-md"
      style={{ backgroundColor: brandPrimary }}
    >
      <div className="flex items-center gap-3">
        <img src={brandLogo} alt="logo" className="h-10" />
        <h1 className="text-white font-bold text-xl">Dashboard ArcGIS</h1>
      </div>

      <button
        className="px-4 py-2 text-white font-semibold rounded-lg"
        style={{ backgroundColor: brandAccent }}
        onClick={onZoomClick}
      >
        Zoom to Layer
      </button>

    </nav>
  );
};

export default Navbar;
