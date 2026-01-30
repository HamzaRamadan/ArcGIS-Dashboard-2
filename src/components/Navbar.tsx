import React from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  brandLogo: string;
  brandPrimary: string;
  brandAccent: string;
  onZoomClick?: () => void;
    onMap2Click?: () => void; 
}

const Navbar: React.FC<NavbarProps> = ({
  brandLogo,
  brandPrimary,
  brandAccent,
  onZoomClick,
}) => {
  const navigate = useNavigate();
  return (
    <nav
      className="w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 shadow-md"
      style={{ backgroundColor: brandPrimary }}
    >
      {/* Left side: Logo + Title */}
      <div className="flex items-center gap-3">
        <img src={brandLogo} alt="logo" className="h-8 sm:h-10" />
        
      </div>

<button
  className="px-3 sm:px-4 py-1.5 sm:py-2 text-white font-semibold rounded-lg hover:opacity-90 transition cursor-pointer"
  style={{ backgroundColor: brandAccent }}
  onClick={() => navigate("/map2")}
>
  Map 2
</button>
      

      {/* Right side: Zoom Button always visible */}
      <button
        className="px-3 sm:px-4 py-1.5 sm:py-2 text-white font-semibold rounded-lg hover:opacity-90 transition cursor-pointer"
        style={{ backgroundColor: brandAccent }}
        onClick={onZoomClick}
      >
        Zoom to Layer
      </button>
    </nav>
  );
};

export default Navbar;
