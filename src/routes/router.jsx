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
import BrowseCategory from "../pages/BrowseCategory/BrowseCategory";
import PrivateRouter from "./PrivateRouter";
import AdoptionRequest from "../pages/dashboard/user/AdoptionRequest/AdoptionRequest";
import MyAddedPet from "../pages/dashboard/user/myAddedPet/MyAddedPet";
import AllUser from "../pages/dashboard/admin/allUsers/AllUser";
import AllDonation from "../pages/dashboard/admin/allDonation/AllDonation";
import AllPets from "../pages/dashboard/admin/allPets/AllPets";
import CreateDonationCampaign from "../pages/dashboard/user/createDonaitonCampaign/CreateDonationCampaign";
import MyDonationCampaign from "../pages/dashboard/user/myDonationCampaign/MyDonationCampaign";
import MyDonation from "../pages/dashboard/user/myDonation/MyDonation";

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
        path: "/category/:petName",
        element: <BrowseCategory />,
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
    element: (
      <PrivateRouter>
        <DashboardRoot />
      </PrivateRouter>
    ),
    children: [
      {
        path: "/dashboard",
        element: <User_Admin_Router />,
      },
      // ------------------------admin routes------------------------
      {
        path: "/dashboard/users",
        element: <AllUser />,
      },
      {
        path: "/dashboard/allPet",
        element: <AllPets />,
      },
      {
        path: "/dashboard/allDonation",
        element: <AllDonation />,
      },
    // ------------------------user routes------------------------
      {
        path: "/dashboard/myAddedPet",
        element: <MyAddedPet />,
      },
      {
        path: "/dashboard/adoptionRequest",
        element: <AdoptionRequest />,
      },
      {
        path: "/dashboard/createDonationCampaign",
        element: <CreateDonationCampaign />,
      },
      {
        path: "/dashboard/myDonationCampaign",
        element: <MyDonationCampaign />,
      },
      {
        path: "/dashboard/myDonation",
        element: <MyDonation />,
      },
    ],
  },
]);

export default router;
