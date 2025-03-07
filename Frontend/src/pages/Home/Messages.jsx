import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
const Messages = ({messages}) => {
  
  const {userProfile,selectedUser}=useSelector(state=>state.userReducer)
  
   const messageRef=useRef(null)
   useEffect(()=>{
    if(messageRef.current){
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
     }
   },[])
  return (
    <>
      <div ref={messageRef} className={`chat ${userProfile?._id==messages?.senderId? "chat-end" : "chat-start"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={`${userProfile?._id==messages?.senderId ? userProfile?.avatar:selectedUser?.avatar}`}
            />
          </div>
        </div>
        <div className="chat-header">
     
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">{messages?.message}</div>
        <div className="opacity-50 chat-footer">Delivered</div>
      </div>
      
       
        
    </>
  );
};

export default Messages;
