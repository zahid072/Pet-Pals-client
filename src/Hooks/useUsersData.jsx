import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useEffect, useState } from "react";

const useUsersData = () => {
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const email = user?.email
  ? user?.email
  : user?.reloadUserInfo?.providerUserInfo[0].email;
  const axiosSecure = useAxiosSecure();
  const { refetch, data: userData = [] } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const users = await axiosSecure.get("/Users");
      const filter = users.data?.filter(user => user?.email !== email)
      return filter;
    },
  });
  useEffect(() => {
    axiosSecure.get(`/user?email=${user?.email}`).then((res) => {
      if(res.data?.role === "admin"){
        setAdmin(true)
        setLoading(false)
      }else{
        setAdmin(false)
        setLoading(false)
      }
    });
  }, [user]);
  return {userData, refetch, admin, loading};
};

export default useUsersData;
