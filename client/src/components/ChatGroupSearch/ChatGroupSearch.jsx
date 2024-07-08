import { Search } from "lucide-react";
import React from "react";

const ChatGroupSearch = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 flex justify-start items-center space-x-4 mb-10 mt-2">
      <label className="input input-bordered flex items-center gap-2">
        <input type="text" className=" lg:w-96" placeholder="Search" />
      </label>
      <Search className=" cursor-pointer"/>
     
    </div>
  );
};

export default ChatGroupSearch;
