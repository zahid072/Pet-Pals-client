import React from "react";
import { FaHome } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { IoMdClose } from "react-icons/io";

const Sidebar = ({ setSidebarOpen }) => {
  const { pathname } = useLocation();

  const { admin } = useAuth();
  return (
    <div className="w-full p-5 relative">
      <button
        onClick={() => {
          setSidebarOpen(false);
        }}
        className="text-xl p-2 lg:hidden block rounded bg-blue-gray-50 absolute top-3 right-3"
      >
        <IoMdClose />
      </button>
      <div>
        <div className="py-10 text-center">
          <h1 className="text-2xl font-semibold">Pet Pals</h1>
        </div>

        {/* admin menu */}
        {admin ? (
          <ul className="flex flex-col gap-2 font-semibold uppercase text-xl">
            <li>
              <NavLink
                to={"/dashboard"}
                className={
                  pathname === "/dashboard"
                    ? "text-white flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              >
                <FaHome /> Admin Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/addItem"}
                className={({ isActive }) =>
                  isActive
                    ? "text-white flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              >
                Add Item
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/manageItem"}
                className={({ isActive }) =>
                  isActive
                    ? "text-white flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              >
                Manage Items
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/manageBooking"}
                className={({ isActive }) =>
                  isActive
                    ? "text-white flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              >
                Manage Bookings
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/allUser"}
                className={({ isActive }) =>
                  isActive
                    ? "text-white flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              >
                <HiOutlineUserGroup /> All User
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="flex flex-col gap-3 font-semibold uppercase text-xl">
            <li>
              <NavLink
                to={"/dashboard"}
                className={
                  pathname === "/dashboard"
                    ? "text-white flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              >
                <FaHome /> User Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/reservation"}
                className={({ isActive }) =>
                  isActive
                    ? "text-white flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              >
                reservation
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/paymentHistory"}
                className={({ isActive }) =>
                  isActive
                    ? "text-white flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              >
                Payment History
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/myCart"}
                className={({ isActive }) =>
                  isActive
                    ? "text-white flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              >
                {" "}
                <span className="relative">my cart </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/myBooking"}
                className={({ isActive }) =>
                  isActive
                    ? "text-white flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              >
                my booking
              </NavLink>
            </li>
          </ul>
        )}
        <div className="divider divide-x-2"></div>
        <ul className="text-xl font-semibold flex flex-col gap-3 mt-4">
          <li>
            <Link className="flex gap-1 items-center" to={"/"}>
              <FaHome></FaHome>Home
            </Link>
          </li>
          <li className="">
            <Link className="flex gap-1 items-center" to={"/ourMenu"}>
              Menu
            </Link>
          </li>
          <li className="">
            <Link className="flex gap-1 items-center" to={"/ourShop"}>
              Shop
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
