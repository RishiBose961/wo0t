import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import React from "react";
import useConversation from "../../zustand/useConversation";

const ShowReleted = ({ dataShows,dataShowid }) => {
  
  const { setSelectedPostId } = useConversation();
  const fetchpostRelated = async () => {
    const res = await fetch(`/api/post/find/${dataShows}/${dataShowid}`);         
    return res.json();
  };

  const {
    isPending,
    error,
    isError,
    data: postRelatedData,
  } = useQuery({
    queryKey: ["postrelated", dataShows,dataShowid],
    queryFn: fetchpostRelated,
  });

  if (isPending) {
    return <span>Loading</span>
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4">
      <div className=" border-t" />
      <p className=" text-xl font-bold mb-5 mt-5">Show Related</p>
      <div className=" gap-5 grid grid-cols-1 lg:grid-cols-3">
        {Array.isArray(postRelatedData) && postRelatedData?.map((x, i) => (
          <article className="overflow-hidden  shadow transition hover:shadow-lg rounded-xl">
            <img alt="" src={x.sourceurl} className="h-56 w-full" />

            <div className="bg-black/80 p-4 sm:p-6">
              <time
                datetime={x.createdAt}
                className="block text-xs text-gray-500"
              >
                {" "}
                {x.createdAt}
              </time>

              <Link
                to={`/read/${x._id}`}
                onClick={() => setSelectedPostId(x?._id)}
              >
                <h3 className="mt-0.5 text-lg text-white line-clamp-2">
                  {x.descriptions}
                </h3>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ShowReleted;
