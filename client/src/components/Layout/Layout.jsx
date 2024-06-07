import React from "react";
import Header from "../Header/Header";
import SideHeader from "../Header/SideHeader";
import SideStory from "../Header/SideStory";
import BottomNav from "../Header/BottomNav";


const Layout = ({ children }) => {

  return (
    <>
      <div className="flex flex-auto h-screen">
        <SideHeader/>
        <div className="grow">
            <Header/>
          <div className="m-5">{children}</div>
          
        </div>
        <BottomNav/>
        <SideStory/>
      </div>
    </>
  );
};

export default Layout;