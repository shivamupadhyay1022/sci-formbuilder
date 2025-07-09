
import React from "react";
import { Menu } from "lucide-react";

interface MobileSidebarToggleProps {
  onClick: () => void;
}
const MobileSidebarToggle: React.FC<MobileSidebarToggleProps> = ({ onClick }) => (
  <button
    className="fixed z-40 left-4 top-3 p-2 rounded-full bg-white border border-border shadow-md md:hidden"
    aria-label="Open sidebar"
    onClick={onClick}
  >
    <Menu className="h-6 w-6" />
  </button>
);

export default MobileSidebarToggle;
