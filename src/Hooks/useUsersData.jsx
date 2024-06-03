
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUsersData = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: userData = [] } = useQuery({
      queryKey: ["userData"],
      queryFn: async () => {
        const users = await axiosSecure.get("/Users");
        return users.data;
      },
    });
    return [userData, refetch];
}

export default useUsersData
