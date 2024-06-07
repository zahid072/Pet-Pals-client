import useAdmin from "../Hooks/useAdmin";
import AdminRouteSkeleton from "../components/skeletonLoader/AdminRouteSkeleton";
import AllUser from "../pages/dashboard/admin/allUsers/AllUser";
import MyAddedPet from "../pages/dashboard/user/myAddedPet/MyAddedPet";

const User_Admin_Router = () => {
  const { admin, loading } = useAdmin();
  if (loading) {
    return <AdminRouteSkeleton />;
  }
  if (admin) {
    return <AllUser />;
  } else {
    return <MyAddedPet />;
  }
};

export default User_Admin_Router;
