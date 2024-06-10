import React from "react";
import MainCompProfile from "../Profile/MainCompProfile";
import GetAllPostHook from "../../hooks/GetAllPostHook";


const MainComp = () => {
  const {postData} = GetAllPostHook()


  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      {postData?.map((i) => (
        <div className="grid grid-cols-1 lg:grid-cols-3 mb-4 gap-3">
          <div className=" col-span-2">
            <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg border">
              <img
                alt=""
                src={i.sourceurl}
                className="h-56 w-full object-cover"
              />

              <div className="p-4 sm:p-6">
                <time
                  datetime="2022-10-10"
                  className="block text-xs text-white"
                >
                  {" "}
                  {i.date}
                </time>

                <a href="#">
                  <h3 className="mt-0.5 text-lg line-clamp-1 w-96 text-white">
                   {i.descriptions}
                  </h3>
                </a>

              </div>
            </article>
          </div>
          <div className="hidden lg:flex w-fit">
              <MainCompProfile/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainComp;
