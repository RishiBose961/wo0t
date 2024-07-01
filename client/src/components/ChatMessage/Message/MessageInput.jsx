import React, { useRef, useState } from "react";
import { useScoketContext } from "../../../context/ScoketContext";
import useSendMessage from "../../../hooks/useSendMessage";
import useTypingfun from "../../../hooks/useTypingfun";
import useConversation from "../../../zustand/useConversation";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { socket } = useScoketContext();
  const { sendMessage, loading } = useSendMessage();
  const { typingIndicator } = useTypingfun();

  const { selectedConversation, selectedtyping } = useConversation();

  const receiver = selectedConversation[0]?._id;
  const conversationId = selectedConversation[1];

  const typingTimeoutRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    socket.emit("typing", value, receiver, conversationId);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing", "", receiver, conversationId); // Send an empty message to indicate stopping typing
    }, 1000); // 1 second delay after user stops typing
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) return;

    await sendMessage(message);
    setMessage("");
    socket.emit("typing", "", receiver, conversationId); // Send an empty message to indicate
  };

  return (
    <div>
      <div>
      {selectedtyping === conversationId ? <p>{typingIndicator}</p> : ""}
      </div>
    

      <div className="flex justify-center items-center space-x-4 mb-20">
        <input
          type="text"
          id="UserEmail"
          placeholder="Type Message"
          value={message}
          onChange={handleInputChange}
          className="mt-1 w-full rounded-md px-2 border-gray-200 h-10 text-xl shadow-sm sm:text-sm"
        />
        <button
          className="group relative inline-block text-sm font-medium text-white 
        focus:outline-none focus:ring active:text-white rounded-full"
          onClick={handleSubmit}
        >
          <span className="absolute inset-0 border border-current rounded-full"></span>
          <span
            className="block border border-current bg-sky-500 px-5 py-5  rounded-full
        transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"
          >
            send
          </span>
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
