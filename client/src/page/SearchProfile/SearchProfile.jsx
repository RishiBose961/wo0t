import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const SearchProfile = () => {
  const { profile} = useParams("");

  const fetchprofile = async () => {
    const res = await fetch(`/api/users/getprofilesearch/${profile}`);
    return res.json();
  };

  const {
    isPending,
    error,
    isError,
    data: profileData,
  } = useQuery({
    queryKey: ["profileDatas"],
    queryFn: fetchprofile,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  return <div>
     <section className="px-2 py-10 md:px-0">
      <div className="mx-auto max-w-4xl">
        <div className="md:flex md:items-center md:justify-center md:space-x-14">
          <div className="relative h-48 w-48 flex-shrink-0">
            <img
              className="relative h-48 w-48 rounded-full object-cover bg-amber-400"
              src={profileData?.avatar}
              alt=""
            />
          </div>

          <div className="mt-10 md:mt-0">
              <p className="text-xl text-white">
                {profileData?.name}
              </p>
            <p className="mt-2 text-lg font-semibold text-white">{profileData?.username}</p>
            {/* <p className="mt-1 text-base text-gray-600">Frontend Developer at DevUI</p> */}
          </div>
        </div>
      </div>
    </section>
  </div>;
};

export default SearchProfile;
