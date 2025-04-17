"use client"
import Image from "next/image";
// import { Mail, Bell, LogOut } from "lucide-react"; // Import Lucide icons
import Link from "next/link";
import WURA from "./WURA .svg"; // Import the SVG logo
import { Bell, LogOut, Mail } from "lucide-react";
interface TopNavbarProps {
  toggleSidebar: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="flex items-center justify-between bg-yellow-500 px-4 py-3">
      <div className="flex items-center space-x-4">
        {/* Toggle Menu Icon for Smaller Devices */}
        <button
          className="text-2xl focus:outline-none text-slate-500 block md:hidden transition-all duration-300"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>
        <div className="text-lg font-bold"><Image src={WURA} alt="WURA Logo" className="h-10" />
        </div>
      </div>
      {/* Login Button (Hidden on Smaller Devices) */}
   {/* Icons on the right */}
      <div className="flex items-center gap-5">
        {/* Mail Icon */}
        <Mail className="w-4 h-4 text-slate-700 hover:text-gray-500 cursor-pointer" />

        {/* Bell Icon */}
        <Bell className="w-4 h-4 text-slate-700 hover:text-gray-500 cursor-pointer" />

        {/* Logout Icon with Text Link */}
        <Link
          href="/logout" // Replace with your logout route
          className="flex items-center gap-2 text-slate-700 hover:text-gray-500 no-underline"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Logout</span>
        </Link>
      </div>    </nav>
  );
};

export default TopNavbar;