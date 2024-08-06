import React from "react";
import LikeCountChart from "../../components/DashboardComp/LikeCountChart";
import TableShow from "../../components/DashboardComp/TableShow";

const DashBoard = () => {
  return (
    <div className="mx-auto max-w-screen-xl">
      <div
        className="flex  sm:h-[450px]  mt-3 rounded-lg overflow-hidden "
        style={{ height: `90vh` }}
      >
        <div className=" overflow-auto pb-16 px-2">
          <LikeCountChart />

          <TableShow />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
