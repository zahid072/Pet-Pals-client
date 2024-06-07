import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUsersData = () => {
  const { user } = useAuth();
  const email = user?.email
    ? user?.email
    : user?.reloadUserInfo?.providerUserInfo[0].email;
  const axiosSecure = useAxiosSecure();
  const { refetch, data: userData = [] } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const users = await axiosSecure.get("/Users");
      const filtered = users.data?.filter(
        (user) => user?.email !== email && user?.email !== "admin@gmail.com"
      );
      return filtered;
    },
  });
  return { userData, refetch };
};

export default useUsersData;
