import React from "react";
import { Button } from "@headlessui/react";
import { CircleUser, HeartHandshake, QrCode, Share, Share2, User } from "lucide-react";

const MainCompProfile = () => {
  return (
    <article className="overflow-hidden rounded-lg w-64 border shadow transition hover:shadow-lg">
      <div className="avatar flex justify-center items-center mt-8">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>

      <div className=" p-4 sm:p-6">
        <a href="#">
          <h3 className="mt-0.5 text-lg text-center text-white">Name</h3>
          <h3 className="mt-0.5 text-md text-center text-white">@UserName</h3>
        </a>
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
            <CircleUser className="hover:text-amber-400 cursor-pointer"/>
            <Share2 className="hover:text-sky-400 cursor-pointer"/>
            <QrCode className="hover:text-violet-400 cursor-pointer" />
        </div>
      </div>
    </article>
  );
};

export default MainCompProfile;
