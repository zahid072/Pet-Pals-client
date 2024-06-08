import useAxiosPublic from './useAxiosPublic';
import { useInfiniteQuery } from '@tanstack/react-query';

const useCampaignData = () => {
    const axiosPublic = useAxiosPublic()
  
    const getCampaign = async ({ pageParam = 1 }) => {
      const res = await axiosPublic.get(
        `/donationCampaign?page=${pageParam}&limit=10`
      );
      return { ...res?.data, prevOffset: pageParam };
    };
      const { data, fetchNextPage, hasNextPage, refetch, isLoading:campaignIsLoading } = useInfiniteQuery({
        queryKey: ["allCampaign"],
        queryFn: getCampaign,
        getNextPageParam: (lastPage) => {
          const nextOffset = lastPage.prevOffset + 1;
          if (nextOffset > Math.ceil(lastPage.campaignCount / 10)) {
            return undefined;
          }
          return nextOffset;
        },
      });
      const allCampaign = data?.pages.reduce((acc, page) => {
        return [...acc, ...page.campaigns];
      }, []);
      return [allCampaign, fetchNextPage, hasNextPage, refetch, campaignIsLoading];
}

export default useCampaignData
