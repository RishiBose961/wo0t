import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const GetConversationHook = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const fetchConversations = async () => {
    const res = await fetch(`/api/c/conn/${userInfo?._id}`);
    return res.json();
  };

  const {
    isPending,
    error,
    isError,
    data: conversationData,
  } = useQuery({
    queryKey: ["fetchConversation",userInfo?._id],
    queryFn: fetchConversations,
  });  

  return { conversationData,isPending,error,isError };
};

export default GetConversationHook;
