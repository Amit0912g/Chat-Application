import { useDispatch, useSelector } from "react-redux";
import Messages from "./Messages";
import User from "./User";
import SendMessage from "./SendMessage"
import { useEffect } from "react";
import { getMessageThunk } from "../../store/slice/message/messageThunk";


const MessageContainer = () => {
  const {selectedUser} =useSelector(state=>state.userReducer)
  const {messages}=useSelector(state=>state.messageReducer)

  const disptach=useDispatch()
  useEffect(()=>{
    if(selectedUser?._id){
      disptach(getMessageThunk({receiverId:selectedUser?._id}))
    }
  },[selectedUser])
  
  return (
    <>
    {!selectedUser ? (
      <>
      </>
    ):(
      <div className="flex flex-col w-full h-screen pb-3">
    
      <div className="p-3 border-b border-b-white/20">
        <User users={selectedUser} />
      </div>
      <div className="h-full p-3 overflow-y-auto">
        
        {messages?.map((m)=>{
          return(
            
           <Messages key={m?._id} messages={m}></Messages> 
          )
          
        })}
        
      </div>
      <SendMessage></SendMessage>
    </div>
    )}
  
    
    </>
  );
};

export default MessageContainer;
