import  { useEffect } from 'react'
import { useScoketContext } from '../context/ScoketContext';
import useConversation from '../zustand/useConversation';

const useListenLiveMeesage = () => {
    const { socket } = useScoketContext();
    const { livemessages, setliveMessages } = useConversation();
    useEffect(() => {
      socket?.on("newliveComment", (newliveComment) => {
        newliveComment.shouldShake = true;
  
        // const sounds = new Audio(notificationsounds)
        // sounds.play()
        setliveMessages([...livemessages, newliveComment]);
      });
  
      return () => socket?.off("newliveComment");
    }, [socket, setliveMessages, livemessages]);
}

export default useListenLiveMeesage