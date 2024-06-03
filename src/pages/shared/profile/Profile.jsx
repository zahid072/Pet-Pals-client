import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";

const Profile = ({setIsProfile}) => {
    const { user, logOut } = useAuth();
    const handleSignOut = () => {
        setIsProfile(false)
        logOut();
      };
  return (
    <div className="bg-white border-2 p-5 rounded absolute top-14 md:-left-24 -left-16  shadow-xl">
        <div>
            <Link className="font-bold" to={"/dashboard"}>Dashboard</Link>
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
