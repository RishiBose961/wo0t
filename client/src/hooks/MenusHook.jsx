import React from "react";
import {
  ChefHat,
  Edit2,
  Home,
  LayoutDashboardIcon,
  MessageSquareHeart,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";

const MenusHook = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const Menus = [
    { title: "Home", path: "/", src: <Home /> },
    { title: "Create", path: "/new", src: <Edit2 /> },
    { title: "Chat", path: "/chat", src: <MessageSquareHeart /> },
    { title: "Dashboard", path: "/dashboard", src: <LayoutDashboardIcon /> },
    { title: "Profile", path: `/${userInfo?.username}`, src: <User /> },
  ];

  return { Menus };
};

export default MenusHook;
