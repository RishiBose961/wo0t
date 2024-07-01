import { useEffect } from "react";
import { useScoketContext } from "../context/ScoketContext";
import useConversation from "../zustand/useConversation";
// import notificationsounds from '../assets/sounds/notification.mp3'

const useListenMessage = () => {
  const { socket } = useScoketContext();
  const { messages, setMessages } = useConversation();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;

      // const sounds = new Audio(notificationsounds)
      // sounds.play()
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useListenMessage;
