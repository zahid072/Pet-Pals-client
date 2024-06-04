import useUsersData from "../Hooks/useUsersData";
import AllUser from "../pages/dashboard/admin/allUsers/AllUser";
import MyAddedPet from "../pages/dashboard/user/myAddedPet/MyAddedPet";

const User_Admin_Router = () => {
  const {admin}=useUsersData()
  if (admin) {
    return <AllUser />;
  }else{
    return<MyAddedPet/>
  }
};

export default User_Admin_Router;

