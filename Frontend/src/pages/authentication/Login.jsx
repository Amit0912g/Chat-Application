import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {loginUserThunk} from "../../store/slice/user/userThunk.js"

const Login = () => {
   
  const [loginData,setLoginData]=useState({
    username:"",
    password:"",
  })
  const dispatch=useDispatch();
  const navigate=useNavigate()

  const {isAuthenticated}=useSelector(state=>state.userReducer)
  useEffect(()=>{
    if(isAuthenticated) navigate("/")
  })
  const handleSubmit=async(e)=>{
    e.preventDefault()
    dispatch(loginUserThunk(loginData))
  
    setLoginData({
      username:"",
      password:""
    })
    
    navigate("/")
  }
    
  const handleInputChange=(e)=>{
    const {name,value}=e.target
    setLoginData(prev=>({
      ...prev,
      [name]:value
    }))
    
  }
  return (
    <div className="flex items-center justify-center w-full min-h-screen p-6 bg-green-100">
      <div className="max-w-[22rem] min-w-[10rem] w-full bg-base-200 flex flex-col gap-6 px-6 py-14 rounded-lg ">
        <label className="flex items-center gap-2 input input-bordered">
          <FaUser />
          <input type="text" className="grow" name="username" placeholder="Username" value={loginData.username} onChange={handleInputChange} />
        </label>
        <label className="flex items-center gap-2 input input-bordered">
          <FaLock></FaLock>
          <input type="password" className="grow" name="password" onChange={handleInputChange} placeholder="Password" value={loginData.password}/>
        </label>
        <button onClick={handleSubmit} className="text-lg font-bold btn btn-outline btn-primary">
          Log in
        </button>
        <p className="text-sm text-center">
          {" "}
          {"Don't have an account?"}
          <Link to="/signup" className="text-blue-400 underline">
            {" "}
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
