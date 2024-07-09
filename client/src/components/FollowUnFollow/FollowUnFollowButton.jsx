import { Button } from "@headlessui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  HeartHandshake,
  MessageCircleHeartIcon,
  MessageSquareHeartIcon,
  UserCheck,
} from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const FollowUnFollowButton = ({ data: datas }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const {
    isPending: isLoading,
    error,
    isError,
    data: followbut,
  } = useQuery({
    queryKey: ["followbuts"],
    queryFn: async () => {
      return await fetch(`/api/f/getfollowing/${userInfo?._id}`).then((res) =>
        res.json()
      );
    },
    staleTime: 30000,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleResponse = async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  };

  const createFollower = async () => {
    const response = await fetch(`/api/f/follow/${datas._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ followerId: userInfo._id }), // Include follower data
    });

    const data = await handleResponse(response); // Ensure handleResponse is defined
    return data;
  };

  const { mutate } = useMutation({
    mutationFn: createFollower,
    onMutate: () => setIsPending(true),
    onError: (error) => {
      // Handle error
      console.log(error);
      setIsPending(false);
    },
    onSuccess: (data) => {
      // Handle success
      // console.log("Data added successfully:", data);
      toast.success(`${data?.message}`, {
        position: "bottom-center",
        icon: "❤",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      queryClient.invalidateQueries(["followbuts"]);
      setIsPending(false);
    },
  });

  // Usage in a component
  const handleFollowUser = () => {
    mutate();
  };

  const createunFollower = async () => {
    const response = await fetch(`/api/f/unfollow/${datas._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ followerId: userInfo._id }), // Include follower data
    });

    const data = await handleResponse(response); // Ensure handleResponse is defined
    return data;
  };

  const { mutate: unfollows } = useMutation({
    mutationFn: createunFollower,
    onMutate: () => setIsPending(true),
    onError: (error) => {
      // Handle error
      console.log(error);
      setIsPending(false);
    },
    onSuccess: (data) => {
      // Handle success
      // console.log("Data added successfully:", data);
      toast.success(`${data?.message}`, {
        position: "bottom-center",
        icon: "❤",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      queryClient.invalidateQueries(["followbuts"]);
      setIsPending(false);
    },
  });

  // Usage in a component
  const handleUnFollowUser = () => {
    unfollows();
  };

  const folo = Array.isArray(followbut)
    ? followbut.map((item) => item.following._id).includes(datas?._id)
    : false;

  return (
    <div className="flex justify-center">
      <Toaster />

      {userInfo ? (
        <>
          {" "}
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              {userInfo?._id === datas?._id ? (
                ""
              ) : (
                <>
                  {folo ? (
                    <div className="flex justify-between items-center space-x-4">
                      <Button
                        className="inline-flex items-center gap-2 rounded-xl
                bg-rose-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner
                shadow-white/10 focus:outline-none data-[hover]:bg-rose-600 data-[open]:bg-rose-700 
                  data-[focus]:outline-1 data-[focus]:outline-white"
                        onClick={handleUnFollowUser}
                      >
                        <HeartHandshake />
                      </Button>
                      <Link
                        to="/chat"
                        className=" items-center gap-2 rounded-xl hidden lg:flex
                 bg-sky-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner
                shadow-white/10 focus:outline-none data-[hover]:bg-sky-600 data-[open]:bg-sky-700 
                  data-[focus]:outline-1 data-[focus]:outline-white"
                      >
                        <MessageSquareHeartIcon />
                      </Link>
                    </div>
                  ) : (
                    <Button
                      className="inline-flex items-center gap-2 rounded-md
                  bg-amber-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner
                  shadow-white/10 focus:outline-none data-[hover]:bg-amber-600 data-[open]:bg-amber-700 
                    data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={handleFollowUser}
                    >
                      <HeartHandshake /> Follow
                    </Button>
                  )}
                </>
              )}
            </>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default FollowUnFollowButton;
