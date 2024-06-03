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
              ? "w-80 h-screen z-50 bg-blue-gray-700 delay-03 text-white lg:static absolute left-0"
              : "lg:w-1/4 h-screen z-50 md:bg-blue-gray-700 text-white lg:static delay-03 absolute right-full"
          }
        >
          <Sidebar setSidebarOpen={setSidebarOpen} />
        </div>
        <button
          onClick={handleSidebar}
          className=" py-2 text-3xl lg:hidden block rounded-r top-[40%] z-10 bg-[#ff663b72] text-white absolute -left-1"
        >
          <FaChevronRight />
        </button>

        <div className="lg:w-3/4 w-full p-5 bg-blue-gray-100 h-screen">
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
