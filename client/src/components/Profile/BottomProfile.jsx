import React from "react";
import { Link } from "react-router-dom";
import FollowUnFollowButton from "../FollowUnFollow/FollowUnFollowButton";
import { EllipsisVerticalIcon } from "lucide-react";

const BottomProfile = ({ userIn }) => {
  return (
    <div className="flex justify-between items-center">
      <article className="rounded-xl w-full p-4">
        <div className="flex items-center gap-4">
          <img
            alt=""
            src={userIn?.avatar}
            className="size-10 rounded-full object-cover bg-amber-400"
          />

          <div>
            <h3 className="text-md font-medium text-white">{userIn?.name}</h3>

            <div className="flow-root">
              <ul className="-m-1 flex flex-wrap">
                <li className="p-1 leading-none">
                  <Link
                    to={`/${userIn?.username}`}
                    className="text-xs font-medium text-gray-300"
                  >
                    {userIn?.username}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>
      <div className=" mx-1 flex justify-end items-center space-x-2">
        <FollowUnFollowButton data={userIn} />
        <EllipsisVerticalIcon />
      </div>
    </div>
  );
};

export default BottomProfile;
