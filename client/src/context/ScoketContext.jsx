import { createContext, useContext, useEffect, useState } from "react";

import io from "socket.io-client";
import { useSelector } from "react-redux";


const SocketContext = createContext();

export const useScoketContext  = ()=>{
    return useContext(SocketContext)
}


export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);


  useEffect(() => {
    if (userInfo) {
      const socket = io("http://localhost:5000",{
        query: {
          userId: userInfo._id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userInfo]);

  return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>;
};
