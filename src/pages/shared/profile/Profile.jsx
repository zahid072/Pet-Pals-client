import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";
import { FaOpencart } from "react-icons/fa";

const Profile = ({setIsProfile}) => {
    const { user, logOut } = useAuth();
    const handleSignOut = () => {
        setIsProfile(false)
        logOut();
      };
  return (
    <div className="bg-white border-2 p-5 rounded absolute top-14 md:-left-28 -left-24  shadow-xl">
        <div>
            <Link className="font-bold hover:bg-blue-gray-100 rounded px-3 py-1 flex items-center gap-2" to={"/dashboard"}><FaOpencart className="text-xl"/>Dashboard</Link>
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
