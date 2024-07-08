import { useEffect, useState } from "react";
import { useScoketContext } from "../context/ScoketContext";

import useConversation from "../zustand/useConversation";

const useTypingfun = () => {
  const { socket } = useScoketContext();
  const [typingIndicator, setTypingIndicator] = useState("");
  const { setSelectedtyping } = useConversation();

  useEffect(() => {
    // Listen for 'userTyping' event
    socket?.on("userTyping", (data) => {
      setSelectedtyping(data.conversationId);
      if (data.isTyping) {
        setTypingIndicator(`is typing... `);
      } else {
        setTypingIndicator("");
      }
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket?.off("userTyping");
    };
  }, []);

  return { typingIndicator };
};

export default useTypingfun;
