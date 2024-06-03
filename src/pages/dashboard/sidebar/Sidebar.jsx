import React, { useState } from "react";
import { FaDonate, FaHome, FaPaw, FaUsers } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoLogoOctocat, IoMdClose } from "react-icons/io";
import { MdOutlineRequestQuote, MdRoundaboutLeft } from "react-icons/md";
import { IoPawOutline } from "react-icons/io5";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";

const Sidebar = ({ setSidebarOpen }) => {
  const { pathname } = useLocation();
  const [admin, setAdmin] = useState(true);

  return (
    <div className="w-full p-5 relative">
      <button
        onClick={() => {
          setSidebarOpen(false);
        }}
        className="text-xl p-2 lg:hidden block rounded bg-blue-gray-50 absolute top-3 right-3"
      >
        <IoMdClose className="text-black" />
      </button>
      <div>
        <div className="py-10 text-center">
          <h1 className="text-2xl font-semibold uppercase font-baloo">
            Pet Pals
          </h1>
        </div>

        {/* admin menu */}
        {admin ? (
          <ul className="flex flex-col gap-4 font-medium uppercase">
            <li>
              <NavLink
                to={"/dashboard"}
                className={
                  pathname === "/dashboard"
                    ? "text-deep-orange-500 flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              ><FaUsers />
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/allPet"}
                className={({ isActive }) =>
                  isActive
                    ? "text-deep-orange-500 flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              ><IoPawOutline />
                All Pets
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/allDonation"}
                className={({ isActive }) =>
                  isActive
                    ? "text-deep-orange-500 flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              ><GiReceiveMoney />
                All Donation
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/dashboard/myAddedPet"}
                className={
                  pathname === "/dashboard/myAddedPet"
                    ? "text-deep-orange-500 flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              ><IoLogoOctocat />
                My added pets
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/adoptionRequest"}
                className={({ isActive }) =>
                  isActive
                    ? "text-deep-orange-500 flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              > 
              <MdOutlineRequestQuote />
                Adoption Request
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/createDonationCampaigns"}
                className={({ isActive }) =>
                  isActive
                    ? "text-deep-orange-500 flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              >
                <svg
                  className="size-5"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  width="256"
                  height="256"
                  viewBox="0 0 256 256"
                  xmlSpace="preserve"
                >
                  <defs></defs>
                  <g
                    style={{
                      stroke: "none",
                      strokeWidth: 0,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "none",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                  >
                    <path
                      d="M 43.174 90 c -2.742 0 -5.45 -1.007 -8.078 -1.983 c -2.884 -1.072 -5.864 -2.18 -8.818 -1.918 l -7.316 0.649 V 58.412 l 3.989 -0.354 c 2.471 -0.223 4.55 0.743 6.551 1.676 c 1.873 0.873 3.641 1.694 5.673 1.531 l 13.063 -2.371 c 4.688 -0.803 7.267 1.895 8.839 4.368 l 14.247 -6.624 c 5.394 -2.424 11.447 0.004 15.082 6.035 c 0.959 1.591 0.427 3.705 -1.187 4.713 c -1.854 1.156 -3.698 2.313 -5.524 3.456 c -15.93 9.981 -29.688 18.603 -35.58 19.117 C 43.801 89.987 43.487 90 43.174 90 z M 27.188 84.059 c 3 0 5.844 1.058 8.604 2.083 c 2.846 1.058 5.538 2.054 8.146 1.825 c 5.414 -0.474 19.636 -9.385 34.693 -18.819 c 1.827 -1.145 3.673 -2.302 5.526 -3.458 c 0.692 -0.433 0.932 -1.323 0.533 -1.984 c -3.086 -5.123 -8.126 -7.231 -12.537 -5.248 l -15.883 7.384 l -0.456 -0.796 c -1.4 -2.441 -3.354 -4.847 -7.231 -4.182 l -13.151 2.383 c -2.655 0.222 -4.75 -0.755 -6.777 -1.7 c -1.842 -0.857 -3.581 -1.664 -5.53 -1.496 l -2.166 0.192 v 24.32 l 5.14 -0.456 C 26.466 84.074 26.829 84.059 27.188 84.059 z"
                      style={{
                        stroke: "none",
                        strokeWidth: 1,
                        strokeDasharray: "none",
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter",
                        strokeMiterlimit: 10,
                        fill: "#fff",
                        fillRule: "nonzero",
                        opacity: 1,
                      }}
                      transform="matrix(1 0 0 1 0 0)"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 39.508 76.28 c -0.467 0 -0.884 -0.328 -0.979 -0.804 c -0.108 -0.542 0.243 -1.068 0.784 -1.177 c 5.155 -1.031 10.95 -3.385 17.69 -7.188 l -1.187 -2.067 c -0.275 -0.479 -0.109 -1.091 0.369 -1.365 c 0.48 -0.273 1.091 -0.11 1.365 0.369 l 1.686 2.938 c 0.274 0.479 0.11 1.09 -0.368 1.364 c -7.304 4.205 -13.572 6.792 -19.163 7.91 C 39.639 76.274 39.573 76.28 39.508 76.28 z"
                      style={{
                        stroke: "none",
                        strokeWidth: 1,
                        strokeDasharray: "none",
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter",
                        strokeMiterlimit: 10,
                        fill: "#fff",
                        fillRule: "nonzero",
                        opacity: 1,
                      }}
                      transform="matrix(1 0 0 1 0 0)"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 17.62 90 H 6.457 c -1.842 0 -3.341 -1.499 -3.341 -3.342 V 56.65 c 0 -1.843 1.499 -3.342 3.341 -3.342 H 17.62 c 1.842 0 3.341 1.499 3.341 3.342 v 30.008 C 20.961 88.501 19.462 90 17.62 90 z M 6.457 55.309 c -0.74 0 -1.341 0.602 -1.341 1.342 v 30.008 c 0 0.74 0.602 1.342 1.341 1.342 H 17.62 c 0.74 0 1.341 -0.602 1.341 -1.342 V 56.65 c 0 -0.74 -0.602 -1.342 -1.341 -1.342 H 6.457 z"
                      style={{
                        stroke: "none",
                        strokeWidth: 1,
                        strokeDasharray: "none",
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter",
                        strokeMiterlimit: 10,
                        fill: "#fff",
                        fillRule: "nonzero",
                        opacity: 1,
                      }}
                      transform="matrix(1 0 0 1 0 0)"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 45 48.876 c -13.475 0 -24.438 -10.963 -24.438 -24.438 S 31.525 0 45 0 c 13.475 0 24.438 10.963 24.438 24.438 S 58.475 48.876 45 48.876 z M 45 2 C 32.627 2 22.562 12.065 22.562 24.438 S 32.627 46.876 45 46.876 c 12.372 0 22.438 -10.065 22.438 -22.438 S 57.372 2 45 2 z"
                      style={{
                        stroke: "none",
                        strokeWidth: 1,
                        strokeDasharray: "none",
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter",
                        strokeMiterlimit: 10,
                        fill: "#fff",
                        fillRule: "nonzero",
                        opacity: 1,
                      }}
                      transform="matrix(1 0 0 1 0 0)"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 47.666 22.953 h -5.332 c -0.931 0 -1.688 -0.757 -1.688 -1.688 v -4.137 c 0 -0.931 0.757 -1.688 1.688 -1.688 h 5.332 c 0.931 0 1.688 0.757 1.688 1.688 c 0 0.552 0.447 1 1 1 s 1 -0.448 1 -1 c 0 -2.033 -1.654 -3.688 -3.688 -3.688 H 46 v -2.329 c 0 -0.552 -0.448 -1 -1 -1 s -1 0.448 -1 1 v 2.329 h -1.666 c -2.034 0 -3.688 1.654 -3.688 3.688 v 4.137 c 0 2.033 1.654 3.688 3.688 3.688 h 5.332 c 0.931 0 1.688 0.757 1.688 1.688 v 4.137 c 0 0.931 -0.757 1.688 -1.688 1.688 h -5.332 c -0.931 0 -1.688 -0.757 -1.688 -1.688 c 0 -0.552 -0.448 -1 -1 -1 s -1 0.448 -1 1 c 0 2.033 1.654 3.688 3.688 3.688 H 44 v 2.622 c 0 0.552 0.448 1 1 1 s 1 -0.448 1 -1 v -2.622 h 1.666 c 2.033 0 3.688 -1.654 3.688 -3.688 V 26.64 C 51.354 24.607 49.699 22.953 47.666 22.953 z"
                      style={{
                        stroke: "none",
                        strokeWidth: 1,
                        strokeDasharray: "none",
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter",
                        strokeMiterlimit: 10,
                        fill: "#fff",
                        fillRule: "nonzero",
                        opacity: 1,
                      }}
                      transform="matrix(1 0 0 1 0 0)"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
                Create Donation Campaign
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/myDonationCampaigns"}
                className={({ isActive }) =>
                  isActive
                    ? "text-deep-orange-500 flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              >
                <FaDonate />
                <span className="relative">My Donation Campaigns</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/myDonation"}
                className={({ isActive }) =>
                  isActive
                    ? "text-deep-orange-500 flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              >
                <GiPayMoney />
                My Donations
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="flex flex-col gap-4 font-medium uppercase">
            <li>
              <NavLink
                to={"/dashboard"}
                className={
                  pathname === "/dashboard"
                    ? "text-deep-orange-500 flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              ><IoLogoOctocat />
                My added pets
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/adoptionRequest"}
                className={({ isActive }) =>
                  isActive
                    ? "text-deep-orange-500 flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              ><MdOutlineRequestQuote />
                Adoption Request
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/createDonationCampaigns"}
                className={({ isActive }) =>
                  isActive
                    ? "text-deep-orange-500 flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              >
                <svg
                  className="size-5"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  width="256"
                  height="256"
                  viewBox="0 0 256 256"
                  xmlSpace="preserve"
                >
                  <defs></defs>
                  <g
                    style={{
                      stroke: "none",
                      strokeWidth: 0,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "none",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                  >
                    <path
                      d="M 43.174 90 c -2.742 0 -5.45 -1.007 -8.078 -1.983 c -2.884 -1.072 -5.864 -2.18 -8.818 -1.918 l -7.316 0.649 V 58.412 l 3.989 -0.354 c 2.471 -0.223 4.55 0.743 6.551 1.676 c 1.873 0.873 3.641 1.694 5.673 1.531 l 13.063 -2.371 c 4.688 -0.803 7.267 1.895 8.839 4.368 l 14.247 -6.624 c 5.394 -2.424 11.447 0.004 15.082 6.035 c 0.959 1.591 0.427 3.705 -1.187 4.713 c -1.854 1.156 -3.698 2.313 -5.524 3.456 c -15.93 9.981 -29.688 18.603 -35.58 19.117 C 43.801 89.987 43.487 90 43.174 90 z M 27.188 84.059 c 3 0 5.844 1.058 8.604 2.083 c 2.846 1.058 5.538 2.054 8.146 1.825 c 5.414 -0.474 19.636 -9.385 34.693 -18.819 c 1.827 -1.145 3.673 -2.302 5.526 -3.458 c 0.692 -0.433 0.932 -1.323 0.533 -1.984 c -3.086 -5.123 -8.126 -7.231 -12.537 -5.248 l -15.883 7.384 l -0.456 -0.796 c -1.4 -2.441 -3.354 -4.847 -7.231 -4.182 l -13.151 2.383 c -2.655 0.222 -4.75 -0.755 -6.777 -1.7 c -1.842 -0.857 -3.581 -1.664 -5.53 -1.496 l -2.166 0.192 v 24.32 l 5.14 -0.456 C 26.466 84.074 26.829 84.059 27.188 84.059 z"
                      style={{
                        stroke: "none",
                        strokeWidth: 1,
                        strokeDasharray: "none",
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter",
                        strokeMiterlimit: 10,
                        fill: "#fff",
                        fillRule: "nonzero",
                        opacity: 1,
                      }}
                      transform="matrix(1 0 0 1 0 0)"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 39.508 76.28 c -0.467 0 -0.884 -0.328 -0.979 -0.804 c -0.108 -0.542 0.243 -1.068 0.784 -1.177 c 5.155 -1.031 10.95 -3.385 17.69 -7.188 l -1.187 -2.067 c -0.275 -0.479 -0.109 -1.091 0.369 -1.365 c 0.48 -0.273 1.091 -0.11 1.365 0.369 l 1.686 2.938 c 0.274 0.479 0.11 1.09 -0.368 1.364 c -7.304 4.205 -13.572 6.792 -19.163 7.91 C 39.639 76.274 39.573 76.28 39.508 76.28 z"
                      style={{
                        stroke: "none",
                        strokeWidth: 1,
                        strokeDasharray: "none",
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter",
                        strokeMiterlimit: 10,
                        fill: "#fff",
                        fillRule: "nonzero",
                        opacity: 1,
                      }}
                      transform="matrix(1 0 0 1 0 0)"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 17.62 90 H 6.457 c -1.842 0 -3.341 -1.499 -3.341 -3.342 V 56.65 c 0 -1.843 1.499 -3.342 3.341 -3.342 H 17.62 c 1.842 0 3.341 1.499 3.341 3.342 v 30.008 C 20.961 88.501 19.462 90 17.62 90 z M 6.457 55.309 c -0.74 0 -1.341 0.602 -1.341 1.342 v 30.008 c 0 0.74 0.602 1.342 1.341 1.342 H 17.62 c 0.74 0 1.341 -0.602 1.341 -1.342 V 56.65 c 0 -0.74 -0.602 -1.342 -1.341 -1.342 H 6.457 z"
                      style={{
                        stroke: "none",
                        strokeWidth: 1,
                        strokeDasharray: "none",
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter",
                        strokeMiterlimit: 10,
                        fill: "#fff",
                        fillRule: "nonzero",
                        opacity: 1,
                      }}
                      transform="matrix(1 0 0 1 0 0)"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 45 48.876 c -13.475 0 -24.438 -10.963 -24.438 -24.438 S 31.525 0 45 0 c 13.475 0 24.438 10.963 24.438 24.438 S 58.475 48.876 45 48.876 z M 45 2 C 32.627 2 22.562 12.065 22.562 24.438 S 32.627 46.876 45 46.876 c 12.372 0 22.438 -10.065 22.438 -22.438 S 57.372 2 45 2 z"
                      style={{
                        stroke: "none",
                        strokeWidth: 1,
                        strokeDasharray: "none",
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter",
                        strokeMiterlimit: 10,
                        fill: "#fff",
                        fillRule: "nonzero",
                        opacity: 1,
                      }}
                      transform="matrix(1 0 0 1 0 0)"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 47.666 22.953 h -5.332 c -0.931 0 -1.688 -0.757 -1.688 -1.688 v -4.137 c 0 -0.931 0.757 -1.688 1.688 -1.688 h 5.332 c 0.931 0 1.688 0.757 1.688 1.688 c 0 0.552 0.447 1 1 1 s 1 -0.448 1 -1 c 0 -2.033 -1.654 -3.688 -3.688 -3.688 H 46 v -2.329 c 0 -0.552 -0.448 -1 -1 -1 s -1 0.448 -1 1 v 2.329 h -1.666 c -2.034 0 -3.688 1.654 -3.688 3.688 v 4.137 c 0 2.033 1.654 3.688 3.688 3.688 h 5.332 c 0.931 0 1.688 0.757 1.688 1.688 v 4.137 c 0 0.931 -0.757 1.688 -1.688 1.688 h -5.332 c -0.931 0 -1.688 -0.757 -1.688 -1.688 c 0 -0.552 -0.448 -1 -1 -1 s -1 0.448 -1 1 c 0 2.033 1.654 3.688 3.688 3.688 H 44 v 2.622 c 0 0.552 0.448 1 1 1 s 1 -0.448 1 -1 v -2.622 h 1.666 c 2.033 0 3.688 -1.654 3.688 -3.688 V 26.64 C 51.354 24.607 49.699 22.953 47.666 22.953 z"
                      style={{
                        stroke: "none",
                        strokeWidth: 1,
                        strokeDasharray: "none",
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter",
                        strokeMiterlimit: 10,
                        fill: "#fff",
                        fillRule: "nonzero",
                        opacity: 1,
                      }}
                      transform="matrix(1 0 0 1 0 0)"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
                Create Donation Campaign
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/myDonationCampaigns"}
                className={({ isActive }) =>
                  isActive
                    ? "text-deep-orange-500 flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              >
                {" "}
                <FaDonate />
                <span className="relative">My Donation Campaigns</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/myDonation"}
                className={({ isActive }) =>
                  isActive
                    ? "text-deep-orange-500 flex items-center gap-1"
                    : "flex items-center gap-1"
                }
              >
                <GiPayMoney />
                My Donations
              </NavLink>
            </li>
          </ul>
        )}
        <div className="w-full h-[2px] bg-blue-gray-100 my-4"></div>
        <ul className="text-xl font-semibold flex flex-col gap-3 mt-4">
          <li>
            <Link className="flex gap-1 items-center" to={"/"}>
              <FaHome></FaHome>Home
            </Link>
          </li>
          <li className="">
            <Link className="flex gap-1 items-center" to={"/petListing"}>
              <FaPaw /> PetListing
            </Link>
          </li>
          <li className="">
            <Link className="flex gap-1 items-center" to={"/about"}>
              <MdRoundaboutLeft />
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
