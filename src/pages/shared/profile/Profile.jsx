import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";
import { Avatar } from "@material-tailwind/react";

const Profile = ({ setIsProfile }) => {
  const { user, logOut } = useAuth();
  const handleSignOut = () => {
    setIsProfile(false);
    logOut();
  };
  return (
    <div className="bg-white border-2 p-5 rounded absolute top-14 md:-left-48 -left-36  shadow-xl">
      <div className="w-full my-4 flex items-center justify-center flex-col gap-3">
        <Avatar
          src={user?.photoURL}
          alt={user?.displayName}
          className="border mx-auto size-12 border-blue-gray-300 bg-blue-gray-50/50 object-contain p-1"
        />
        <h3>
          <span className="font-semibold">Name:</span> {user?.displayName}
        </h3>
        <p className="text-nowrap">
          {" "}
          <span className="font-semibold">Email:</span> {user?.email}
        </p>
      </div>
      <div className="py-3 border-y-2">
        <Link
          className="font-bold hover:bg-blue-gray-100 rounded px-3 py-1 flex items-center gap-2"
          to={"/dashboard"}
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
              clipRule="evenodd"
            />
          </svg>
          Dashboard
        </Link>
      </div>
      <button
        onClick={handleSignOut}
        className=" bg-deep-orange-500 text-white btn-hover mt-5 px-3 py-2 font-semibold rounded text-nowrap"
      >
        <span>Sign Out</span>
      </button>
    </div>
  );
};

export default Profile;
