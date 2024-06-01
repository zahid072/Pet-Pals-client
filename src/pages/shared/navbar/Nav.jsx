import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Nav = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const { pathname } = useLocation();

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
        <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
          <div className="flex items-center justify-between text-blue-gray-900">
            <Typography
              as="a"
              href="#"
              className="mr-4 cursor-pointer py-1.5 font-semibold text-2xl"
            >
              <Link to={"/"}> Pet Pals</Link>
            </Typography>
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-x-1">
                <Link to={"/signIn"}>
                  {" "}
                  <button className="hidden bg-[#ADD8E6] lg:inline-block px-3 py-2 font-semibold rounded">
                    <span>Sign in</span>
                  </button>
                </Link>
              </div>
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
          <MobileNav open={openNav}>
            {navList}
            <div className="flex items-center gap-x-1">
              <Button fullWidth variant="gradient" size="sm" className="">
                <span>Sign in</span>
              </Button>
            </div>
          </MobileNav>
        </Navbar>
      </div>
    </div>
  );
};

export default Nav;
