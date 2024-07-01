import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import { useLocation } from "react-router-dom";

const useSendLiveMessage = () => {
  const [loading, setLoading] = useState(false);
  const { livemessages, setliveMessages } = useConversation();

  const location = useLocation();

  const url = location.pathname;

  // Split the URL at the last slash (/)
  const id = url.split("/").pop();

  const sendliveMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/l/live/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          livecommtext: message,
        }),
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      setliveMessages([...livemessages, data]);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendliveMessage, loading };
};

export default useSendLiveMessage;
