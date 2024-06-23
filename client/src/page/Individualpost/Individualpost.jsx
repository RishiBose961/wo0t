import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Comments from "../../components/Comment/Comments";
import InfoPost from "./InfoPost";

const Individualpost = () => {
  const { id } = useParams("");

  const {
    isPending,
    error,
    isError,
    data: singlepostData,
  } = useQuery({
    queryKey: ["singlepostDatas", id],
    queryFn: async () => {
      return await fetch(`/api/post/${id}`).then((res) => res.json());
    },
    staleTime: 10000,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  const dataShow = singlepostData;
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className=" col-span-2">
          <InfoPost dataShow={dataShow}/>
        </div>
        <div>
          <Comments postitle={dataShow?.category} postId={dataShow?._id}/>
        </div>
      </div>
    </div>
  );
};

export default Individualpost;
