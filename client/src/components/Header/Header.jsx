import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <header>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link to="/">
              <div className="flex justify-start space-x-3 ">
                  <img src="/icon.png" className="w-12 h-12 object-cover"/>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {userInfo ? (
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={userInfo.avatar}
                    alt="loading"
                    className="bg-amber-400"
                  />
                </div>
              </div>
            ) : (
              <div className="sm:flex sm:gap-4">
                <Link
                  className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                  to="/login"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
