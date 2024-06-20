import React from "react";
import { useSelector } from "react-redux";

const ProfileComp = () => {
  const { userInfo } = useSelector((state) => state.auth);
 

  return (
    <section className="px-2 py-10 md:px-0">
      <div className="mx-auto max-w-4xl">
        <div className="md:flex md:items-center md:justify-center md:space-x-14">
          <div className="relative h-48 w-48 flex-shrink-0">
            <img
              className="relative h-48 w-48 rounded-full object-cover bg-amber-400"
              src={userInfo.avatar}
              alt=""
            />
          </div>

          <div className="mt-10 md:mt-0">
            <p className="mt-7 text-lg font-semibold text-white">
              {userInfo.name}
            </p>
            <p className="mt-1 text-base text-white">{userInfo.username}</p>
            <p className="mt-1 text-base text-white">{userInfo.email}</p>
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileComp;
