import useAuth from "../Hooks/useAuth";
import AllUser from "../pages/dashboard/admin/allUsers/AllUser";
import MyAddedPet from "../pages/dashboard/user/myAddedPet/MyAddedPet";

const User_Admin_Router = () => {
  const { user } = useAuth();
  if (user) {
    return <AllUser />;
  }
};

export default User_Admin_Router;

