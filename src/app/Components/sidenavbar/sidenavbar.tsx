'use client';

import { TbLayoutDashboardFilled, TbClockHour9Filled } from "react-icons/tb";
import { BsBriefcase } from "react-icons/bs";
import { RiHotelFill } from "react-icons/ri";
import { LiaGraduationCapSolid } from "react-icons/lia";
import { HiHomeModern } from "react-icons/hi2";
import { GiEyeShield } from "react-icons/gi";
import { PiHandshake } from "react-icons/pi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import Link from "next/link";
import profile from "./profile_small.jpg";
import { usePathname } from "next/navigation";
import { FaChurch } from "react-icons/fa";
import Image from "next/image";
import clsx from "clsx";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={clsx(
          "flex items-center gap-3 p-2 hover:bg-blue-300 hover:shadow-md",
          {
            "bg-blue-200": isActive,
          }
        )}
      >
        {children}
      </Link>
    );
  };

  return (
    <aside
      className={clsx(
        "bg-gray-600 text-white transition-all duration-300 ease-in-out flex flex-col justify-between overflow-hidden absolute top-0 left-0 h-screen z-50 md:relative",
        {
          "w-60 lg:w-44 md:w-32": isSidebarOpen,
          "w-0 md:w-14": !isSidebarOpen,
        }
      )}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex flex-row">
        {isSidebarOpen && (
          <h1 className="text-md md:xl font-bold flex items-center flex-col">
            <Image
              src={profile}
              alt="profile_small"
              width={56}
              height={56}
              className="mx-auto mb-6 rounded-full"
            />
            Admin Dashboard
          </h1>
        )}
        <button
          className="text-2xl focus:outline-none text-white md:block"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>
      </div>

      {/* Sidebar Links */}
      <ul className="flex-1 p-2">
        <li>
          <NavLink href="/dashboard">
            <TbLayoutDashboardFilled className="size-6 text-slate-100" />
            {isSidebarOpen && <span>Dashboard</span>}
          </NavLink>
        </li>
        <li>
          <NavLink href="/administration">
            <BsBriefcase className="size-6 text-slate-100" />
            {isSidebarOpen && <span>Administration</span>}
          </NavLink>
        </li>
        <li>
          <NavLink href="/buynowpaylater">
            <TbClockHour9Filled className="size-6 text-slate-100" />
            {isSidebarOpen && <span>Buy Now Pay Later</span>}
          </NavLink>
        </li>
        <li>
          <NavLink href="/churchfinancial">
            <FaChurch className="size-6 text-slate-100" />
            {isSidebarOpen && <span>Church Financial</span>}
          </NavLink>
        </li>
        <li>
          <NavLink href="/hotelfinancial">
            <RiHotelFill className="size-6 text-slate-100" />
            {isSidebarOpen && <span>Hotel Financial</span>}
          </NavLink>
        </li>
        <li>
          <NavLink href="/realestate">
            <HiHomeModern className="size-6 text-slate-100" />
            {isSidebarOpen && <span>Real Estate</span>}
          </NavLink>
        </li>
        <li>
          <NavLink href="/supermarket">
            <MdOutlineShoppingCart className="size-6 text-slate-100" />
            {isSidebarOpen && <span>Super Market</span>}
          </NavLink>
        </li>
        <li>
          <NavLink href="/insurance">
            <GiEyeShield className="size-6 text-slate-100" />
            {isSidebarOpen && <span>Insurance</span>}
          </NavLink>
        </li>
        <li>
          <NavLink href="/tax">
            <SlCalender className="size-6 text-slate-100" />
            {isSidebarOpen && <span>Tax</span>}
          </NavLink>
        </li>
        <li>
          <NavLink href="/businessfinancial">
            <PiHandshake className="size-6 text-slate-100" />
            {isSidebarOpen && <span>Business Financial</span>}
          </NavLink>
        </li>
        <li>
          <NavLink href="/schoolandpayment">
            <LiaGraduationCapSolid className="size-6 text-slate-100" />
            {isSidebarOpen && <span>Schools And Payment</span>}
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;