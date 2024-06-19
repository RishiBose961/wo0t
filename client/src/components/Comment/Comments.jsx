import { Send } from "lucide-react";
import React from "react";
import CommentView from "./CommentView";

const Comments = () => {
  return (
    <div>
      <p>Comments</p>
      <div className="flex justify-start items-center space-x-2 mt-3">
        <label className="form-control w-full">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full "
          />
        </label>
        <button className="btn btn-outline btn-info rounded-2xl">
          <Send />
        </button>
      </div>
      <div
        className="flex justify-center  sm:h-[450px]  mt-3 rounded-lg overflow-hidden "
        style={{ height: `40vh` }}
      >
        <div className=" overflow-auto pb-16">
          <CommentView />
        </div>
      </div>
    </div>
  );
};

export default Comments;
