import React, { useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Spinner,
  Collapse,
} from "@material-tailwind/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Profile from "../profile/Profile";

const Nav = () => {
  const [isProfile, setIsProfile] = useState(false);
  const { user, navLoader } = useAuth();
  const [openNav, setOpenNav] = useState(false);
  const { pathname } = useLocation();

  const handleModal = (e) => {
    e.stopPropagation();
    setIsProfile(!isProfile);
  };
  window.addEventListener("click", () => {
    setIsProfile(false);
  });

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal  "
      >
        <NavLink
          to={"/"}
          className="flex items-center justify-center py-3 px-2  relative text-center"
        >
          Home
          <div
            className={
              pathname === "/"
                ? " absolute  w-full h-full border-y-4 border-black rounded-lg"
                : ""
            }
          ></div>
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal  "
      >
        <NavLink
          to={"/petListing"}
          className="flex items-center justify-center py-3 px-2 relative text-center"
        >
          Pet Listing
          <div
            className={
              pathname === "/petListing"
                ? " absolute  w-full h-full border-y-4 border-black rounded-lg"
                : ""
            }
          ></div>
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal  "
      >
        <NavLink
          to={"/donationCampaign"}
          className="flex items-center justify-center py-3 px-2 relative text-center"
        >
          Donation Campaigns
          <div
            className={
              pathname === "/donationCampaign"
                ? " absolute  w-full h-full border-y-4 border-black rounded-lg"
                : ""
            }
          ></div>
        </NavLink>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to={"/about"}
          className="flex items-center justify-center py-3 px-2  relative text-center"
        >
          About Us
          <div
            className={
              pathname === "/about"
                ? " absolute  w-full h-full border-y-4 border-black rounded-lg"
                : ""
            }
          ></div>
        </NavLink>
      </Typography>
    </ul>
  );
  return (
    <div>
      <div className="max-h-[768px] max-w-[1540px] w-full">
        <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 lg:px-8">
          <div className="flex items-center justify-between text-blue-gray-900">
            <Typography
              className="mr-4 cursor-pointer font-semibold text-2xl"
            >
              <Link to={"/"}> <img className="md:h-16 h-10" src="https://i.ibb.co/2Pxqzqc/OIG1-bygu-CHc-CZay-YDa-Ko7jcp-prev-u.png" alt="" /></Link>
            </Typography>
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-2">
              {!navLoader ? (
                <>
                  <div className="relative">
                    {user && (
                      <div
                        onClick={handleModal}
                        className="border-4 border-deep-purple-400 size-14 cursor-pointer rounded-full hover:shadow-lg"
                      >
                        <img
                          className="size-full rounded-full"
                          src={
                            user?.photoURL
                              ? user?.photoURL
                              : "https://i.ibb.co/gw2zx3L/user.png"
                          }
                          alt=""
                        />
                      </div>
                    )}
                    {isProfile && <Profile setIsProfile={setIsProfile} />}
                  </div>
                  <div className="flex items-center gap-x-1">
                    {!user ? (
                      <Link to={"/signIn"}>
                        {" "}
                        <button className="hidden bg-deep-orange-500 text-white btn-hover lg:inline-block px-3 py-2 font-semibold rounded">
                          <span>Sign in</span>
                        </button>
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              ) : (
                <Spinner />
              )}

              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>
          <Collapse open={openNav}>
            {navList}
            <div className="flex items-center gap-x-1">
              {!user ? (
                <Link to={"/signIn"}>
                  {" "}
                  <button className="bg-[#e1613a] lg:hidden px-3 py-2 btn-hover font-semibold rounded">
                    <span>Sign in</span>
                  </button>
                </Link>
              ) : (
                ""
              )}
            </div>
          </Collapse>
        </Navbar>
      </div>
    </div>
    
  );
};

export default Nav;
