import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAllPetsData = () => {
  const axiosPublic = useAxiosPublic()
  
const getPets = async ({ pageParam = 1 }) => {
  const res = await axiosPublic.get(
    `/pets?page=${pageParam}&limit=10`
  );
  return { ...res?.data, prevOffset: pageParam };
};
  const { data, fetchNextPage, hasNextPage, refetch, isLoading:allPetsIsLoading } = useInfiniteQuery({
    queryKey: ["allpets"],
    queryFn: getPets,
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.prevOffset + 1;
      if (nextOffset > Math.ceil(lastPage.petsCount / 10)) {
        return undefined;
      }
      return nextOffset;
    },
  });
  const allPets = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.pets];
  }, []);
  return [allPets, fetchNextPage, hasNextPage, refetch, allPetsIsLoading];
};

export default useAllPetsData;
