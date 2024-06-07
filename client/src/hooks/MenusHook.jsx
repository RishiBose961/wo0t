import React from "react";
import {
  ChefHat,
  Edit2,
  Home,
  LayoutDashboardIcon,
  MessageSquareHeart,
  User,
} from "lucide-react";

const MenusHook = () => {

  const Menus = [
    { title: "Home", path: "/", src: <Home /> },
    { title: "Create", path: "/new", src: <Edit2 /> },
    { title: "Chat", path: "/chat", src: <MessageSquareHeart /> },
    { title: "Dashboard", path: "/dashboard", src: <LayoutDashboardIcon /> },
    { title: "Profile", path: "/profile", src: <User /> },
  ];

  return { Menus };
};

export default MenusHook;
