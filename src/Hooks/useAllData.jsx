import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useAllData = () => {
  const axiosPublic = useAxiosPublic();
  const {searchTerm} = useAuth()
  const { refetch, data: allPetsData = [] } = useQuery({
    queryKey: ["allPetsData"],
    queryFn: async () => {
      const pets = await axiosPublic.get("/pets");
      return pets.data;
    },
  });
  const { refetch: petListingRefetch, data: petListingData = [] } = useQuery({
    queryKey: ["petListingData"],
    queryFn: async () => {
      const pets = await axiosPublic.get("/pets/search", {
        params: { name: searchTerm }});
      return pets.data;
    },
  });
  return [allPetsData, refetch, petListingData, petListingRefetch];
};

export default useAllData;
