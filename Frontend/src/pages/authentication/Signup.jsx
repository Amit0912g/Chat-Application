import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserThunk } from "../../store/slice/user/userThunk";
import toast from "react-hot-toast";

const Signup = () => {
  const [signupData, setsignupData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    gender:"male"
    
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isAuthenticated}=useSelector(state=>state.userReducer)
  useEffect(()=>{
    if(isAuthenticated) navigate("/")
  })
  
  const handleSignUp = async(e) => {
    e.preventDefault();
    if(signupData.password!==signupData.confirmPassword){
      return toast.error("Password does not match")}
   const response= await  dispatch(registerUserThunk(signupData));
    setsignupData({
      username: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      gender:""
    });
  
    if(response?.payload?.success){
      navigate("/login");
    }

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setsignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen p-6 bg-green-100">
      <div className="max-w-[25rem] min-w-[10rem] w-full bg-base-200 flex flex-col gap-6 px-6 py-8 rounded-lg ">
        <label className="flex items-center gap-2 input input-bordered">
          <FaUser />
          <input
            type="text"
            className="grow"
            placeholder="Full Name"
            onChange={handleInputChange}
            name="fullName"
            value={signupData.fullName}
          />
        </label>
        <label className="flex items-center gap-2 input input-bordered">
          <FaUser />
          <input
            type="text"
            className="grow"
            placeholder="Username"
            onChange={handleInputChange}
            name="username"
            value={signupData.username}
          />
        </label>
        <label className="flex items-center gap-2 input input-bordered">
          <FaLock></FaLock>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            onChange={handleInputChange}
            name="password"
            value={signupData.password}
          />
        </label>
        <label className="flex items-center gap-2 input input-bordered">
          <FaLock></FaLock>
          <input
            type="password"
            className="grow"
            placeholder="Confirm Password"
            onChange={handleInputChange}
            name="confirmPassword"
            value={signupData.confirmPassword}
          />
        </label>
        <div className="flex items-center gap-2 input input-bordered">
          <label htmlFor="male" className="flex items-center gap-3">
            <input
              type="radio"
              name="gender"
              className="radio radio-primary"
              id="male"
              value="male"
              onChange={handleInputChange}

            />
            Male
          </label>
          <label htmlFor="female" className="flex items-center gap-3 ml-3 ">
            <input
              type="radio"
              name="gender"
              id="female"
              className="radio radio-primary"
              value="female"
              onChange={handleInputChange}
            />
            Female
          </label>
        </div>

        <button
          onClick={handleSignUp}
          className="text-lg font-bold btn btn-outline btn-primary"
        >
          Sign up
        </button>
        <p className="text-sm text-center">
          {" "}
          {"Already have an account?"}
          <Link to="/login" className="text-blue-400 underline">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
