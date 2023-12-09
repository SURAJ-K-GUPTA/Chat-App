import React, { useState } from "react";
import styled from "styled-components";
import EmojiPicker, {
  Theme
} from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emojiData, event) => {
    setMsg(
      (msg) => msg + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
    );
};
const sendChat = (event) => {
    event.preventDefault();
    if(msg.length>0){
        handleSendMsg(msg);
        setMsg('')
        setShowEmojiPicker(false)
    }
}
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={300}
              height={350}
              lazyLoadEmojis={true}
              theme={Theme.DARK}
              emojiStyle='native'
            />
          )}
        </div>
      </div>
      <form action="" className="input-container" onSubmit={(e)=>sendChat(e)}>
        <input
          type="text"
          placeholder="type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
          color: #ffff00c8;
          cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        bottom: 50px;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3 ;
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

export default ChatInput;
