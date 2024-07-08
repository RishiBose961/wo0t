import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { useScoketContext } from "../../../context/ScoketContext";
import useConversation from "../../../zustand/useConversation";

const Conversation = ({ data }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { userInfo } = useSelector((state) => state.auth);

  const friendId = data.participants?.find((m) => m !== userInfo?._id);

  const fetchSearchConvs = async () => {
    const res = await fetch(`/api/c/search?userId=${friendId}`);
    return res.json();
  };

  const {
    isPending,
    error,
    isError,
    data: fetchSearchConvData,
  } = useQuery({
    queryKey: ["fetchSearchConv", friendId],
    queryFn: fetchSearchConvs,
  });

  const { onlineUsers } = useScoketContext();

  const isOnline = onlineUsers.includes(fetchSearchConvData?._id);

  const isSelected =
    selectedConversation?.[0]?._id === fetchSearchConvData?._id;


  return (
    <div
      className={`flex justify-start items-center space-x-5 cursor-pointer rounded-2xl mt-5 ${
        isSelected ? " bg-black/80" : ""
      }`}
      onClick={() => setSelectedConversation([fetchSearchConvData, data?._id])}
    >
      <div className="avatar">
        <div
          className={` ${
            isOnline ? "ring-success" : "ring-primary"
          } ring-offset-base-100 w-12 rounded-full bg-amber-400 ring ring-offset-2`}
        >
          <img src={fetchSearchConvData?.avatar} />
        </div>
      </div>
      <div>
        <p>{fetchSearchConvData?.username}</p>
      </div>
    </div>
  );
};

export default Conversation;
