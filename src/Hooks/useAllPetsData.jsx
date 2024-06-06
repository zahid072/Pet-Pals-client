import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";


const getPets = async ({ pageParam = 1 }) => {
  const res = await axios.get(
    `http://localhost:5000/pets?page=${pageParam}&limit=10`
  );
  return { ...res?.data, prevOffset: pageParam };
};
const useAllPetsData = () => {
  const { data, fetchNextPage, hasNextPage, refetch, isLoading:allPetsIsLoading } = useInfiniteQuery({
    queryKey: ["pets"],
    queryFn: getPets,
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.prevOffset + 1;
      if (nextOffset > Math.ceil(lastPage.petsCount / 10)) {
        return undefined;
      }
      return nextOffset;
    },
  });
  console.log(hasNextPage);
  const allPets = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.pets];
  }, []);
  return [allPets, fetchNextPage, hasNextPage, refetch, allPetsIsLoading];
};

export default useAllPetsData;
