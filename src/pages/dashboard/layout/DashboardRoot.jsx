import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../../shared/footer/Footer";
import { FaChevronRight } from "react-icons/fa";

const DashboardRoot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebar = () => {
    setSidebarOpen(true);
  };
  return (
    <div>
      <div className="flex relative">
        <div
          className={
            sidebarOpen
              ? "w-72 h-screen z-50 bg-amber-500 lg:static absolute left-0"
              : "lg:w-1/5 h-screen z-50 md:bg-amber-500 lg:static absolute right-full"
          }
        >
          <Sidebar setSidebarOpen={setSidebarOpen} />
        </div>
        <button
          onClick={handleSidebar}
          className=" py-2 text-3xl lg:hidden block rounded-r top-[40%] z-10 bg-deep-orange-500 text-white absolute left-0"
        >
          <FaChevronRight />
        </button>

        <div className="lg:w-4/5 w-full p-5 bg-blue-gray-100 h-screen">
          <Outlet />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardRoot;
