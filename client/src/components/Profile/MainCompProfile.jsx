import { Button } from "@headlessui/react";
import {
  CircleUser,
  HeartHandshake,
  QrCode,
  Share2
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const MainCompProfile = ({ userIn }) => {
  return (
    <article className="overflow-hidden rounded-lg w-64 border shadow transition hover:shadow-lg">
      <div className="avatar  flex justify-center items-center mt-8">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={userIn?.avatar ?? "Unknown"} className="bg-amber-400" />
        </div>
      </div>

      <div className=" p-4 sm:p-6">
        <Link to={`/${userIn?.username}`}>
          <h3 className="mt-0.5 text-lg text-center text-white">
            {userIn?.name ?? "Unknown"}
          </h3>
          <h3 className="mt-0.5 text-md text-center text-white">
            {userIn?.username ?? "Unknown"}
          </h3>
        </Link>
        {/* Follow Button  */}
        <div className="flex justify-center mt-4">
          <Button
            className="inline-flex items-center gap-2 rounded-md
       bg-amber-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner
        shadow-white/10 focus:outline-none data-[hover]:bg-amber-600 data-[open]:bg-amber-700 
        data-[focus]:outline-1 data-[focus]:outline-white"
          >
            <HeartHandshake /> Follow
          </Button>
        </div>
        {/* Navigation Icon */}
        <div className="flex justify-center items-center space-x-10 mt-6">
          <Link to={`/${userIn?.username}`}>
            <CircleUser className="hover:text-amber-400 cursor-pointer" />
          </Link>
          <Share2 className="hover:text-sky-400 cursor-pointer" />
          <QrCode className="hover:text-violet-400 cursor-pointer" />
        </div>
      </div>
    </article>
  );
};

export default MainCompProfile;
