

import React, { useState } from "react";
import TopNavbar from "./topnavbar/topnavbar";
import SideNavbar from "./sidenavbar/sidenavbar";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
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

          <main className="p-6 bg-gray-100 overflow-y-auto flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
