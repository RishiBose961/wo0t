import React, { useEffect } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import useConversation from "../../../zustand/useConversation";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  

  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);

  return (
    <div>
      {!selectedConversation ? (
        <>
          <p>No Pick</p>
        </>
      ) : (
        <>
          <p className="text-center font-medium sm:text-left">
            {selectedConversation[0]?.username}
          </p>
          <Message />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
