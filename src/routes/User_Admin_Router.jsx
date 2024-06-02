import React from "react";
import useAuth from "../Hooks/useAuth";
import UserHome from "../pages/dashboard/user/UserHome/UserHome";

const User_Admin_Router = () => {
  const { user } = useAuth();

  if (user) {
    return <UserHome />;
  }
};

export default User_Admin_Router;
