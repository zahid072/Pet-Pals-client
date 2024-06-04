import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useEffect, useState } from "react";

const useUsersData = () => {
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: userData = [] } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const users = await axiosSecure.get("/Users");
      return users.data;
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
