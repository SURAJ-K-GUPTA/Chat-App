import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
const SetAvatar = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: "8000",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(()=>{
    const checkLocalStorage = async()=>{
      if(!localStorage.getItem("chat-app-user")){
        navigate("/login")
      }
    }
    checkLocalStorage()
  },[])
  const setProfilePicture = async (event) => {
    if(selectedAvatar===undefined){
        toast.error("Please select an avatar", toastOptions)
    }
    else{
        const user = await JSON.parse(localStorage.getItem("chat-app-user"));
        const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
            image:avatars[selectedAvatar],
        })
        console.log(data);
        if(data.isSet){
            user.isAvatarImageSet = true;
            user.avatarimage = data.image;
            localStorage.setItem("chat-app-user",JSON.stringify(user))
            navigate('/')
        }else{
            toast.error('Error setting avatar.Please try again',toastOptions)
        }
    }
  };
  useEffect(() => {
    const data = [];
    const fetchAvatar = async () => {
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
        console.log(buffer);
        console.log(data);
      }
      setAvatars(data);
      setIsLoading(false);
    };
    fetchAvatar();
  }, []);

  return (
    <>
    {
        isLoading?<Container>
            <img src={Loader} alt="loader" className="loader" />

        </Container>:(

        
    
      <Container>
        <div className="title-container">
          <h1>Pick an avatar as your profile picture</h1>
        </div>
        <div className="avatars">
          {console.log("avatars", avatars)}
          {avatars && avatars.map((avatar, index) => (
            <div
              key={index}
              className={`avatar ${
                selectedAvatar === index ? "selected" : ""
              } `}
            >
              <img
                src={`data:image/svg+xml;base64,${avatar}`}
                alt="avatar"
                onClick={() => setSelectedAvatar(index)}
              ></img>
            </div>
          ))}
        </div>
        <button className="submit-btn" onClick={(event)=>setProfilePicture(event)}>Set as Profie Picture</button>
      </Container>
      )}
      <ToastContainer />
    </>
  );
};
const Container = styled.div`
display:flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #131324;
height:100vh;
width: 100vw;
.loader{
    max-inline-size: 100%;
}
.title-container{
    h1{
        color: white
    }
}
.avatars{
    display:flex;
    gap:2rem;
    .avatar{
        border:0/4rem solid transparent;
        padding: 0.4rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s ease-in-out;
        img{
            height: 6rem;
        }
    }
    .selected{
        border: 0.4rem solid #4e0eff;
    }
    
}
.submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    cursor: pointer;
    border-radius: 0.4rem;
    text-transform: uppercase;
    &:hover {
      background-color: #997af0;
    }
  }
`;

export default SetAvatar;
