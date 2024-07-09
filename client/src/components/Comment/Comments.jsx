import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageSquareMore, Send } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CommentView from "./CommentView";
import SugestionComment from "./SugestionComment";
import { Link } from "react-router-dom";

const Comments = ({ postId, postitle }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isPending, setIsPending] = useState(false);
  const [inpval, setinpval] = useState({
    commentext: "",
  });

  const queryClient = useQueryClient();

  const handleResponse = async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  };

  const createComment = async () => {
    const commentData = { ...inpval };
    const response = await fetch(`/api/c/comments/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    return await handleResponse(response);
  };

  const { mutate } = useMutation({
    mutationFn: createComment,
    onMutate: () => setIsPending(true),
    onError: (error) => {
      // console.error("Mutation error:", error);
      setIsPending(false);
    },
    onSuccess: (data) => {
      // console.log("Data added successfully:", data);
      // alert("Comment added successfully!");
      queryClient.invalidateQueries(["commentPosts", postId]);
      setIsPending(false);
      resetInput();
    },
  });
  const setdata = (e) => {
    const { name, value } = e.target;
    setinpval((prev) => ({ ...prev, [name]: value }));
  };

  const addinpdata = (e) => {
    e.preventDefault();
    mutate();
  };

  const resetInput = () => {
    setinpval({ commentext: "" });
  };
  return (
    <div className=" border rounded-xl p-2 mt-4 mb-20">
      <div className="flex justify-items-center pb-1 space-x-2">
        <MessageSquareMore />
        <p className=" font-mono">Comments</p>
      </div>

      <hr />

      {/* show All Comments */}
      <div
        className="flex justify-start  sm:h-[450px]  mt-3 rounded-lg overflow-hidden "
        style={{ height: `50vh` }}
      >
        <div className=" overflow-auto pb-16">
          <CommentView postId={postId} />
        </div>
      </div>

      {/* Gemini api create comment */}
      {userInfo ? (
        <>
          <div>
            <SugestionComment setinpval={setinpval} postitle={postitle} />
          </div>
          {/* Input create comment */}
          <div className="flex justify-start items-center space-x-2 mt-3">
            <label className="form-control w-full">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full "
                onChange={setdata}
                value={inpval.commentext}
                name="commentext"
              />
            </label>
            <button
              onClick={addinpdata}
              className="btn btn-outline btn-info rounded-2xl"
            >
              <Send />
            </button>
          </div>
        </>
      ) : (
        <div className="bg-black/80 px-4 py-3 rounded-xl text-white">
          <p className="text-center text-sm font-medium ">
           Login
            <Link to='/login' className="inline-block underline">
              To Start Chat
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Comments;
