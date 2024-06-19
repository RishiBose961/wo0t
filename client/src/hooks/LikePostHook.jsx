import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const LikePostHook = ({ postby }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  //GET LIKED POSTS
  const {
    isPending: isLoading,
    error,
    isError,
    data: likepost,
  } = useQuery({
    queryKey: ["likeposts"],
    queryFn: async () => {
      return await fetch(`/api/li/getlikes`).then((res) => res.json());
    },
    staleTime: 30000,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  //LIKE THE POST
  const createLike = async () => {
    const response = await fetch(`/api/li/${postby}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userInfo?._id }), // Include follower data
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  };

  const { mutate } = useMutation({
    mutationFn: createLike,
    onMutate: () => setIsPending(true),
    onError: (error) => {
      // Handle error
      console.log(error);
      setIsPending(false);
    },
    onSuccess: (data) => {
      // Handle success
      toast.success(`${data?.message}`, {
        position: "bottom-center",
        icon: "❤",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      // console.log("Data added successfully:", data);
      queryClient.invalidateQueries(["likeposts"]);
      setIsPending(false);
    },
  });

  const handleLikeUser = () => {
    mutate();
  };
  //UNLIKE THE POST
  const uncreateLike = async () => {
    const response = await fetch(`/api/li/${postby}/unlike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userInfo?._id }), // Include follower data
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  };

  const { mutate: unlike } = useMutation({
    mutationFn: uncreateLike,
    onMutate: () => setIsPending(true),
    onError: (error) => {
      // Handle error
      console.log(error);
      setIsPending(false);
    },
    onSuccess: (data) => {
      // Handle success
      console.log("Data added successfully:", data);
      toast.success(`${data?.message}`, {
        position: "bottom-center",
        icon: "👎",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      queryClient.invalidateQueries(["likeposts"]);
      setIsPending(false);
    },
  });

  const handleunLikeUser = () => {
    unlike();
  };

  //CHECK IF USER HAS ALREADY LIKED THE POST
  const likeposts = likepost?.map((item) => item?.post)?.includes(postby);

  return (
    <div>
      <Toaster />
      <div className=" rounded-full p-1">
        {isLoading ? (
          <span className="loading loading-ring loading-xs"></span>
        ) : (
          <>
            {likeposts ? (
              isPending ? (
                <span className="loading loading-ring loading-xs"></span>
              ) : (
                <Heart
                  className="h-5 cursor-pointer fill-current  text-red-500"
                  onClick={handleunLikeUser}
                />
              )
            ) : isPending ? (
              <span className="loading loading-ring loading-xs"></span>
            ) : (
              <Heart className="h-5 cursor-pointer" onClick={handleLikeUser} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LikePostHook;
