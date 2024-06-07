import React from "react";
import MenusHook from "../../hooks/MenusHook";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  const { Menus } = MenusHook();
  return (
    <div className="btm-nav lg:hidden ">
      {Menus.map((item) => (
        <NavLink
          style={({ isActive }) => {
            return { backgroundColor: isActive ? "aqua" : "" };
          }}
          to={item.path}
        >
          <span className="text-2xl">{item.src}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNav;
