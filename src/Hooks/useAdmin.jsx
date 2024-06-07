import  { useEffect, useState } from 'react'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useAdmin = () => {
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const email = user?.email
      ? user?.email
      : user?.reloadUserInfo?.providerUserInfo[0].email;
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/user/admin?email=${email}`).then((res) => {
          setAdmin(res.data.admin);
          setLoading(false);
        });
      }, [user]);
  return {admin, loading}
}

export default useAdmin
