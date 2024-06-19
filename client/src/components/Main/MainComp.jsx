import React, { Fragment } from "react";
import MainCompProfile from "../Profile/MainCompProfile";
import GetAllPostHook from "../../hooks/GetAllPostHook";
import DateTimeLeft from "./DateTimeLeft";
import {
  LineChart,
  MessageCircleMore,
  MessageCircleMoreIcon,
  Share2,
} from "lucide-react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import LikePostHook from "../../hooks/LikePostHook";
import { useSelector } from "react-redux";


const MainComp = () => {
  const { postData } = GetAllPostHook();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      {postData?.map((i, index) => (
        <Fragment key={index}>
          <div className="grid grid-cols-1 lg:grid-cols-3 mb-4 gap-3">
            <div className=" col-span-2">
              <article className="overflow-hidden rounded-lg border">
                <img alt="" src={i.sourceurl} className="h-56 w-full" />

                <div className="p-4 sm:p-6 bg-[#1D232A] rounded-b-lg">
                  <div className="badge badge-accent badge-outline mb-2">
                    {i.category}
                  </div>
                  <Link to={`/read/${i.descriptions}`}>
                    <h3 className="mt-0.5 text-lg line-clamp-1 w-96 text-white">
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
                      <Link to={`/read/${i.descriptions}`}>
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
