import { useDispatch, useSelector } from "react-redux"
import MessageContainer from "./MessageContainer"
import UserSidebar from "./UserSidebar"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { iniitializeSocket, setOnlineUser } from "../../store/slice/socket/socketSlice"
import { setNewMessages } from "../../store/slice/message/messageSlice"

const Home = () => {
  const {isAuthenticated,userProfile}=useSelector(state=>state.userReducer)
  const {socket}=useSelector(state=>state.socketReducer)
   const navigate=useNavigate()
   const dispatch = useDispatch()
  useEffect(()=>{
    if(!isAuthenticated){
      navigate("/login")
    }
    dispatch(iniitializeSocket(userProfile?._id))
  },[isAuthenticated])

  useEffect(()=>{
    if(!socket) return
    socket.on("onlineUsers",(onlineUsers)=>{
      dispatch(setOnlineUser(onlineUsers))

      socket.on("newMessage",(message)=>{
        dispatch(setNewMessages(message))
        
       
      })
  
  })
  return ()=>{
    socket.close()
  }
  },[socket,dispatch])
  return (
    <div className="flex">
      <UserSidebar> </UserSidebar>
      <MessageContainer></MessageContainer>
    </div>
  )
}

export default Home