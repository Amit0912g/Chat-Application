import { useSelector } from "react-redux"
import Login from "../pages/authentication/Login"
import { useMemo } from "react"

const ProtectedRoutes = ({children}) => {
    const {isAuthenticated}=useSelector(state=>state.userReducer)

    const memoizedAuth = useMemo(() => isAuthenticated, [isAuthenticated]);

  return memoizedAuth ? children : <Login />;
  
}

export default ProtectedRoutes