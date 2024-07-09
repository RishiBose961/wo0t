import React from "react";

const InfoPost = ({ dataShow, isPending }) => {
  return (
    <div className="mt-4">
      {isPending? (
       
       <div className="flex justify-center items-center">
        <div className=" bg-black/80 h-10 w-10 flex justify-center rounded-full">
          <span className="loading loading-spinner loading-md"></span>
        </div>
       </div>
        
      ) : (
        <>
          <div class="rounded-lg">
            <img
              alt="content"
              class=" h-96 w-full rounded-xl"
              src={dataShow?.sourceurl}
            />
          </div>
          <p className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 w-fit font-bold text-sm text-purple-700 mt-5">
            {dataShow?.category}
          </p>
          <h2 class="title-font text-2xl font-medium text-white mt-6 mb-3">
            {dataShow?.descriptions}
          </h2>

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
        </>
      )}
    </div>
  );
};

export default InfoPost;
