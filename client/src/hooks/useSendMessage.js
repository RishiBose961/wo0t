import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import { useScoketContext } from "../context/ScoketContext";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const {socket} = useScoketContext()
  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/m/sendm/${selectedConversation[0]?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          conversationId: selectedConversation[1],
        }),
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
};

export default useSendMessage;
