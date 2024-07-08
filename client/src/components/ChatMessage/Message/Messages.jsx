import React from "react";
import { useSelector } from "react-redux";
import useConversation from "../../../zustand/useConversation";

const Messages = ({ message }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === userInfo._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const chatFlex = fromMe ? "justify-end" : "";
  const profilePic = fromMe
    ? userInfo.username
    : selectedConversation?.[0]?.username;


  const profileName = fromMe
    ? userInfo.username
    : selectedConversation?.[0]?.username;

  return (
    <div>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            {/* <img
              className="bg-gradient-to-r from-fuchsia-500 to-cyan-500"
              alt="Tailwind CSS chat bubble component"
              src={avatar}
            /> */}
          </div>
        </div>
        <div className="chat-header capitalize font-bold">
          {profileName}
        </div>
        <div className={`flex ${chatFlex} items-center`}>
          <div className="chat-bubble m-2">{message.message}</div>
        </div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
    </div>
  );
};

export default Messages;
