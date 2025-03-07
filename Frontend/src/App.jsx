import Home from "./pages/Home/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/authentication/Login"
import Signup from "./pages/authentication/Signup"
import {Toaster} from "react-hot-toast"
import ProtectedRoutes from "./utilities/ProtectedRoutes"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getUserProfileThunk } from "./store/slice/user/userThunk"


const App = () => {


  const dispatch=useDispatch()
   useEffect(()=>{
 dispatch(getUserProfileThunk())
 
   },[dispatch])
  const routes=createBrowserRouter([
    {
        path:"/",
        element:<ProtectedRoutes>
          <Home></Home>
        </ProtectedRoutes>
    },
    {
        path:"/login",
        element:<Login></Login>
    },
    {
      path:"/signup",
      element:<Signup></Signup>}
])
return (
  <>
<RouterProvider router={routes}></RouterProvider>
<Toaster position="top-center" reverseOrder={false}></Toaster>
  </>
)
}

export default App