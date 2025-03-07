import { IoIosSearch } from "react-icons/io";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getOtherUserProfileThunk,
  logoutUserThunk,
} from "../../store/slice/user/userThunk";
import { useEffect, useState } from "react";
const UserSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otherUser, userProfile } = useSelector((state) => state.userReducer);
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState([]);

  const handleLogout = () => {
    dispatch(logoutUserThunk());
    navigate("/login");
  };
  useEffect(() => {
    if (!searchValue) {
      setUser(otherUser);
    } else {
      setUser(
        otherUser.filter(
          (u) =>{
           return u.username.toLowerCase().includes(searchValue.toLowerCase()) ||
            u.fullName.toLowerCase().includes(searchValue.toLowerCase())}
        )
      );
    }
  }, [searchValue,otherUser]);
  useEffect(() => {
    (async () => {
      dispatch(getOtherUserProfileThunk());
    })();
  }, [dispatch]);
  return (
    <div className="max-w-[20em] w-full h-screen  flex flex-col border-r border-r-white/20">
      <h1 className="px-3 mt-3 py-1.5 mx-3 text-xl font-bold bg-black rounded-md text-[#7480FF]">
        CHAT
      </h1>

      <div className="p-3">
        <label className="flex items-center gap-2 input input-bordered">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            className="grow"
            placeholder="Search"
          />
          <IoIosSearch />
        </label>
      </div>

      <div className="flex flex-col h-full gap-3 px-3 overflow-y-scroll">
        {user?.map((users) => {
          return <User key={users?._id} users={users}></User>;
        })}
      </div>
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="w-10 rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
              <img src={userProfile?.avatar} />
            </div>
          </div>
          <h2>{userProfile?.username}</h2>
        </div>
        <button onClick={handleLogout} className="px-4 btn btn-primary btn-sm">
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
