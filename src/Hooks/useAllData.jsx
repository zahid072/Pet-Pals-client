import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useAllData = () => {
  const axiosPublic = useAxiosPublic();
  const { user, searchTerm } = useAuth();
  // const { refetch:userPetRefetch, data: userPetsData = [] } = useQuery({
  //   queryKey: ["userAddedPets"],
  //   queryFn: async () => {
  //     const pets = await axiosPublic.get("/pets/userAdded", {
  //       params: { email: user?.email },
  //     });
  //     return pets.data;
  //   },
  // });
  const { refetch: petListingRefetch, data: petListingData = [] } = useQuery({
    queryKey: ["petListingData"],
    queryFn: async () => {
      const pets = await axiosPublic.get(
        `/pets/search?name=${searchTerm?.name}&category=${searchTerm?.category}`
      );
      return pets.data;
    },
  });
  return [petListingData, petListingRefetch];
};

export default useAllData;
