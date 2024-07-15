import { useQuery } from "@tanstack/react-query";
import React from "react";

const LiveChatShow = ({ data }) => {

  console.log(data);
  const fetchSearchConvs = async () => {
    const res = await fetch(`/api/c/search?userId=${data?.userId}`);
    return res.json();
  };

  const {
    isPending,
    error,
    isError,
    data: fetchSearchConvData,
  } = useQuery({
    queryKey: ["fetchSearchConv", data?.userId],
    queryFn: fetchSearchConvs,
  });

  if (isError) {
    return <div>error</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }


  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full bg-amber-400">
          <img
            alt="Tailwind CSS chat bubble component "
            src={fetchSearchConvData?.avatar}
          />
        </div>
      </div>
      <div className="chat-header">{fetchSearchConvData?.username}</div>
      <div className="chat-bubble w-fit">{data.livecommtext}</div>
    </div>
  );
};

export default LiveChatShow;
