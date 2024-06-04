import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllData = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: allPetsData = [] } = useQuery({
    queryKey: ["allPetsData"],
    queryFn: async () => {
      const pets = await axiosSecure.get("/pets");
      return pets.data;
    },
  });
  return [allPetsData, refetch];
};

export default useAllData;
