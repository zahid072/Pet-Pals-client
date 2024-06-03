import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../pages/shared/navbar/Nav";
import Footer from "../pages/shared/footer/Footer";

const Root = () => {
  return (
    <div className="font-poppins bg-blue-gray-50">
      {/* navbar */}
      <div>
        <Nav />
      </div>
      {/* outlet */}
      <div>
        <Outlet />
      </div>
      {/* footer */}
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default Root;
