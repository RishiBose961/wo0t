import React from "react";
import MenusHook from "../../hooks/MenusHook";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  const { Menus } = MenusHook();
  return (
    <div className="btm-nav h-12 lg:hidden ">
      {Menus.map((item,index) => (
        <NavLink  key={index}
          style={({ isActive }) => {
            return { backgroundColor: isActive ? "aqua" : "" };
          }}
          to={item.path}
        >
          <span className="text-lg">{item.src}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNav;
