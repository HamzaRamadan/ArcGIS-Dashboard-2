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
  onZoomClick,
}) => {
  return (
    <nav
      className="w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 shadow-md"
      style={{ backgroundColor: brandPrimary }}
    >
      {/* Left side: Logo + Title */}
      <div className="flex items-center gap-3">
        <img src={brandLogo} alt="logo" className="h-8 sm:h-10" />
        
      </div>

      {/* Right side: Zoom Button always visible */}
      <button
        className="px-3 sm:px-4 py-1.5 sm:py-2 text-white font-semibold rounded-lg hover:opacity-90 transition"
        style={{ backgroundColor: brandAccent }}
        onClick={onZoomClick}
      >
        Zoom to Layer
      </button>
    </nav>
  );
};

export default Navbar;
