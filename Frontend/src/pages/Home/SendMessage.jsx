import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/messageThunk";
const SendMessage = () => {
    const [message,setMessage]=useState("")
    const dispatch=useDispatch()
    const {selectedUser}=useSelector(state=>state.userReducer)
    const handleSendMessage=()=>{
        if (!message.trim()) return;
        dispatch(sendMessageThunk({receiverId:selectedUser?._id,message}))
        setMessage("")
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); 
            handleSendMessage();
        }
    };
  return (
    <div className="flex w-full gap-2 p-3">
        <input
          type="text"
          placeholder="Type here..."
          className="w-full input input-bordered input-primary"
          onChange={(e)=>setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          value={message}
        />
        <button onClick={handleSendMessage} className="btn btn-square btn-outline btn-primary">
            <IoSend></IoSend>
</button>
      </div>)
}

export default SendMessage