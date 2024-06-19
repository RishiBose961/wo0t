import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MenusHook from "../../hooks/MenusHook";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { logout } from "../../slices/authSlices";

const SideHeader = () => {
  const { Menus } = MenusHook();

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation();


  const logoutHandler = async()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout())
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="hidden lg:flex h-screen w-16 flex-col justify-between border-e ">
      <div>
        <div className="inline-flex size-16 items-center justify-center">
          <span className="grid size-10 place-content-center rounded-lg text-xs text-gray-600"></span>
        </div>

        <div>
          <div className="px-2">
            <ul className="space-y-1 text-white pt-4">
              {Menus.map((item,index) => (
                <li key={index}>
                  <NavLink
                    style={({ isActive }) => {
                      return { backgroundColor: isActive ? "aqua" : "" };
                    }}
                    to={item.path}
                    className="group relative flex justify-center mt-5 rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <span className="text-2xl">{item.src}</span>

                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      {item.title}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
        
          <button
            onClick={logoutHandler}
            className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>

            <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
              Logout
            </span>
          </button>
    
      </div>
    </div>
  );
};

export default SideHeader;
