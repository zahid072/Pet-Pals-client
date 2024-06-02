import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import SignIn from "../pages/auth/SignIn/SignIn";
import SignUp from "../pages/auth/SignUp/SignUp";
import PetListing from "../pages/petListing/PetListing";
import DonationCampaign from "../pages/DonationCampaign/DonationCampaign";
import DashboardRoot from "../pages/dashboard/layout/DashboardRoot";
import User_Admin_Router from "./User_Admin_Router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/petListing",
        element: <PetListing />,
      },
      {
        path: "/donationCampaign",
        element: <DonationCampaign />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardRoot />,
    children: [
      {
        path: "/dashboard",
        element: <User_Admin_Router />,
      },
    ],
  },
]);

export default router;
