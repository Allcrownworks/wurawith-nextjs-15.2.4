"use client"
import React, { useState } from "react";
import SideNavbar from "../sidenavbar/sidenavbar";
import TopNavbar from "../topnavbar/topnavbar";
import Footer from "../footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Mainapplayout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <SideNavbar 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />

        <div className="flex flex-col flex-1 overflow-hidden">
     
          <TopNavbar 
            toggleSidebar={toggleSidebar} 
          />

          <main className="bg-slate-100 overflow-y-auto flex-1">
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Mainapplayout;
