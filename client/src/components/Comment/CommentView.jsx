import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link, useLocation } from "react-router-dom";
const CommentView = () => {
  const location = useLocation();

  const url = location.pathname;

  // Split the URL at the last slash (/)
  const id = url.split("/").pop();

  const { ref, inView } = useInView();
  const fetchComm = async ({ pageParam }) => {
    const res = await fetch(`/api/c/posts/${id}/comments?page=${pageParam}`);
    return res.json();
  };

  const {
    isPending,
    error,
    isError,
    data: commentPost,
    fetchNextPage,
    status,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["commentPosts"],
    queryFn: fetchComm,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allpages) => {
      const nextPage = lastPage?.currentComments?.length
        ? allpages?.length + 1
        : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      {commentPost?.pages.map((item) =>
        item?.currentComments?.map((item) => (
          <>
            <div ref={ref}>
              <div class="chat chat-start mt-2">
                <div className="chat-header">
                  <Link
                    to={`/${item?.userId?.username}`}
                    className=" cursor-pointer"
                  >
                    {item?.userId?.username}{" "}
                  </Link>
                </div>
                <div class="chat-image avatar">
                  <div class="w-10 rounded-full">
                    <img
                      alt="Tailwind"
                      src={item?.userId?.avatar}
                      className=" bg-amber-400"
                    />
                  </div>
                </div>
                <div class="chat-bubble w-80">{item.commentext}</div>
              </div>
              {/* <div className="flex justify-start items-center">
              {item.pinned ? <PinIcon className=" rotate-45" /> : ""}
              <EditComment item={item} singlepostData={singlepostData} />
            </div> */}
            </div>
          </>
        ))
      )}
      {isFetchingNextPage ? <h3>Loading...</h3> : "No more comments available"}
    </>
  );
};

export default CommentView;
