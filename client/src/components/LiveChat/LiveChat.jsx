import { Radio } from "lucide-react";
import React from "react";
import useGetLiveMessage from "../../hooks/useGetLiveMessage";
import useListenLiveMeesage from "../../hooks/useListenLiveMeesage";
import LiveChatShow from "./LiveChatShow";
import LiveInputChat from "./LiveInputChat";

const LiveChat = () => {
  const { livemessages, loading } = useGetLiveMessage();

  useListenLiveMeesage();

  return (
    <div className=" border rounded-xl p-2 mt-3 mb-20 ">
      <div className="flex justify-items-center pb-1 space-x-2">
        <Radio className=" text-red-500 animate-pulse" />
        <p className=" font-mono">Live Chat</p>
      </div>

      <hr />

      {/* show All Comments */}
      <div
        className="flex justify-start  sm:h-[450px]  mt-3 rounded-lg overflow-hidden "
        style={{ height: `50vh` }}
      >
        <div className=" overflow-auto pb-16">
          <div role="alert" className="alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p className=" text-sm italic">Live Message will be avaliable for 24 hrs after that delete automatically</p>
          </div>
          {livemessages.map((i) => (
            <LiveChatShow data={i} />
          ))}

          {/* <CommentView postId={postId} /> */}
        </div>
      </div>

      {/* Input create comment */}
      <LiveInputChat />
    </div>
  );
};

export default LiveChat;
