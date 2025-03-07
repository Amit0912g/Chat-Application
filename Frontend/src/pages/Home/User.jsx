import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slice/user/userSlice";

const User = ({users}) => {
  const dispatch=useDispatch()
  const {selectedUser} =useSelector(state=>state.userReducer)
  const {onlineUsers}=useSelector(state=>state.socketReducer)
  const isUserOnline =onlineUsers?.includes(users?._id)
  
  const handleUserClick=()=>{
    dispatch(setSelectedUser(users))
  }

  return (
    <div onClick={handleUserClick} className={`flex items-center gap-5 px-2 py-1 rounded-lg cursor-pointer ${users?._id=== selectedUser?._id && "bg-gray-700" }`}>
      <div className={`avatar ${isUserOnline && "online"}`}>
        <div className="w-12 rounded-full">
          <img src={users?.avatar} />
        </div>
      </div>
      <div>
        <h2 className="line-clamp-1">{users?.fullName}</h2>
        <p className="text-xs">{users?.username}</p>
      </div>
    </div>
  );
};

export default User;
