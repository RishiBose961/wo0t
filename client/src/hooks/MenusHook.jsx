import {
  Edit2,
  Home,
  LayoutDashboardIcon,
  MessageSquareHeart
} from "lucide-react";
import React from "react";

const MenusHook = () => {

  const Menus = [
    { title: "Home", path: "/", src: <Home /> },
    { title: "Create", path: "/new", src: <Edit2 /> },
    { title: "Chat", path: "/chat", src: <MessageSquareHeart /> },
    { title: "Dashboard", path: "/dashboard", src: <LayoutDashboardIcon /> },

  ];

  return { Menus };
};

export default MenusHook;
