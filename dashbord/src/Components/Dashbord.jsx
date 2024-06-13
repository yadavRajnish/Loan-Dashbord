import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";


// bg-[#ECF5FF]


const Dashboard = () => {
  return (
    <div className="flex min-h-screen ">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 p-4">
          <Outlet />
 
         <div>
         </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
