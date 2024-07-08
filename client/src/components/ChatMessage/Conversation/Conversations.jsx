import React from "react";
import GetConversationHook from "../../../hooks/GetConversationHook";
import Conversation from "./Conversation";
import ChatGroupSearch from "../../ChatGroupSearch/ChatGroupSearch";

const Conversations = () => {
  //get THE CONVERSATION
  const { conversationData, isPending, error, isError } = GetConversationHook();

  if (isPending) {
    return <span>Loading</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }



  return (
    <>
    <ChatGroupSearch/>
     <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      {conversationData?.map((i, index) => (
        <Conversation key={index} data={i} />
      ))}
    </div>
    </>
   
  );
};

export default Conversations;
