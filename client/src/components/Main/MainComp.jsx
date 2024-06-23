import { LineChart, MessageCircleMoreIcon, Share2 } from "lucide-react";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import GetAllPostHook from "../../hooks/GetAllPostHook";
import LikePostHook from "../../hooks/LikePostHook";
import MainCompProfile from "../Profile/MainCompProfile";
import DateTimeLeft from "./DateTimeLeft";

const MainComp = () => {
  const { postData } = GetAllPostHook();
  const { userInfo } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError("Image failed to load.");
  };

  const defaultPath = "No posts found";

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      {postData?.map((i, index) => (
        <Fragment key={index}>
          <div className="grid grid-cols-1 lg:grid-cols-3 mb-4 gap-3">
            <div className=" col-span-2">
              <article className="overflow-hidden rounded-lg border">
                {isLoading && <p>image loading</p>}
                {error && <p>{error}</p>}

                <img
                  alt=""
                  src={i.sourceurl}
                  className="h-56 w-full"
                  onLoad={handleImageLoad}
                  onError={handleError}
                />

                <div className="p-4 sm:p-6 bg-[#1D232A] rounded-b-lg">
                  <div className="badge badge-accent badge-outline mb-2">
                    {i.category}
                  </div>
                  {/* /read/${i.descriptions}`??`/read/${i._id} */}
                  <Link to={`/read/${i._id}`}>
                    <h3 className="mt-0.5 text-lg line-clamp-2 w-96 text-white">
                      {i.descriptions}
                    </h3>
                  </Link>
                  <div>
                    {i.scheduledate === "" ? (
                      <div className="flex justify-start items-center mt-4">
                        {/* <p>Publish</p> */}
                        {format(i.createdAt, "en_US")}
                      </div>
                    ) : (
                      <DateTimeLeft
                        date={i.scheduledate}
                        cretedAt={i.createdAt}
                      />
                    )}
                  </div>
                  <div className="mt-2 border-t">
                    <div className="flex justify-center items-center space-x-6 mt-4">
                      <div className="flex justify-start items-center space-x-2">
                        {userInfo ? <LikePostHook postby={i?._id} /> : ""}
                        <p>{i?.likeCount}</p>
                      </div>
                      <Link to={`/read/${i._id}`}>
                        <div className="flex justify-start items-center space-x-2">
                          <MessageCircleMoreIcon />

                          <span>5</span>
                        </div>
                      </Link>
                      <div className="flex justify-start items-center space-x-2">
                        <LineChart className="h-5 cursor-pointer" />
                        <span>5</span>
                      </div>

                      <Share2 className="h-5" />
                    </div>
                  </div>
                </div>
              </article>
            </div>
            <div className="hidden lg:flex w-fit">
              <MainCompProfile userIn={i.postedBy} />
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default MainComp;
