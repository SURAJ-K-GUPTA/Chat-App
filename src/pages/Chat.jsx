import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Chat = () => {
  const navigate=useNavigate()
  useEffect(()=>{
    const checkLocalStorage = async()=>{
      if(!localStorage.getItem("chat-app-user")){
        navigate("/login")
      }
    }
    checkLocalStorage()
  },[])
  return (
    <div>Chat</div>
  )
}

export default Chat