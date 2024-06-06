import {Navigate, useLocation} from 'react-router-dom'
import useAuth from '../Hooks/useAuth';
import SkeletonLoader from '../components/skeletonLoader/SkeletonLoader';


const PrivateRouter = ({children}) => {
  const {user, loader} = useAuth();
  const location = useLocation();
  if(loader){
    return <SkeletonLoader/>
  }
  if(user){
    return children;
  }

  return <Navigate state={location.pathname} to={"/signIn"}></Navigate>
}

export default PrivateRouter
