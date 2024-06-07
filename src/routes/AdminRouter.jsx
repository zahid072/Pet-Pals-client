import React from "react";
import { Navigate } from "react-router-dom";
import AdminRouteSkeleton from "../components/skeletonLoader/AdminRouteSkeleton";
import useAdmin from "../Hooks/useAdmin";

const AdminRouter = ({ children }) => {
  const { admin, loading } = useAdmin();
  if (loading) {
    return <AdminRouteSkeleton />;
  }
  if (admin) {
    return children;
  }

  return <Navigate to={"/dashboard"}></Navigate>;
};

export default AdminRouter;
