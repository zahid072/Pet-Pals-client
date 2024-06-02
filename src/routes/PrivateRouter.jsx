import {Navigate, useLocation} from 'react-router-dom'
import useAuth from '../Hooks/useAuth';

const PrivateRouter = ({children}) => {
  const {user, loader} = useAuth();
  const location = useLocation();
  if(loader){
    return <svg className='mx-auto h-screen' version="1.1" id="L1"  x="0px" y="0px" width="160px" height="160px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve"><circle fill="none" stroke="black" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="15" strokeDasharray="14.2472,14.2472" cx="50" cy="50" r="47"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="5s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform></circle><circle fill="none" stroke="black" strokeWidth="1" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray="10,10" cx="50" cy="50" r="39"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="5s" from="0 50 50" to="-360 50 50" repeatCount="indefinite"></animateTransform></circle><g fill="black"><rect x="30" y="35" width="5" height="30"><animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.1"></animateTransform></rect><rect x="40" y="35" width="5" height="30"><animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.2"></animateTransform></rect><rect x="50" y="35" width="5" height="30"><animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.3"></animateTransform></rect><rect x="60" y="35" width="5" height="30"><animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.4"></animateTransform></rect><rect x="70" y="35" width="5" height="30"><animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.5"></animateTransform></rect></g></svg>
  }
  if(user){
    return children;
  }

  return <Navigate state={location.pathname} to={"/signIn"}></Navigate>
}

export default PrivateRouter
