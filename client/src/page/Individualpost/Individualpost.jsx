import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Comments from "../../components/Comment/Comments";

const Individualpost = () => {
  const { desc } = useParams("");

  const {
    isPending,
    error,
    isError,
    data: singlepostData,
  } = useQuery({
    queryKey: ["singlepostDatas", desc],
    queryFn: async () => {
      return await fetch(`/api/post/${desc}`).then((res) => res.json());
    },
    staleTime: 10000,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  const dataShow = singlepostData?.[0];
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {" "}
      <section className="overflow-hidden bg-black/25 rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 px-4 lg:px-10 py-24 ">
          <div className="flex flex-wrap items-center lg:w-4/5 col-span-2">
            <img
              alt="loading"
              className="h-64 w-full rounded  lg:h-96 lg:w-1/2 border"
              src={dataShow?.sourceurl}
            />
            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
              <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
                {dataShow?.category}
              </span>
              <h1 className="my-4 text-2xl font-semibold text-white">
                {dataShow?.descriptions}
              </h1>

              {/* user Information posted */}
              <div className="mt-8 border-t border-gray-300 pt-4 ">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 flex-shrink-0 rounded-full object-cover bg-amber-400"
                    src={dataShow?.postedBy?.avatar}
                    alt=""
                  />
                  <div className="ml-3 min-w-0">
                    <p className="truncate text-base font-semibold text-white">
                      {dataShow?.postedBy?.name}
                    </p>
                    <p className="truncate text-base text-gray-400">
                      {dataShow?.postedBy?.username}
                    </p>
                  </div>
                </div>
             
              </div>
              
            </div>
            
          </div>
          <Comments/>
        </div>
      </section>
    </div>
  );
};

export default Individualpost;
