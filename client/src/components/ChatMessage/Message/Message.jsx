import React, { useEffect, useRef } from "react";
import Messages from "./Messages";
import useGetMessage from "../../../hooks/useGetMessage";
import useListenMessage from "../../../hooks/useListenMessage";

const Message = () => {
  const { messages, loading } = useGetMessage();
  useListenMessage();
  let height = screen?.height;

  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className="md:min-w-[450px] flex flex-col"
      style={{ height: height / 1.7 }}
    >
      <div className=" overflow-auto">
        {messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Messages message={message} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Message;
