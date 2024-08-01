import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import useDashBoardHook from "../../hooks/DashboardHook/useDashBoardHook";


const LikeCountChart = () => {
  const { likeCountPost } = useDashBoardHook();
  
  return (
    <div>
      {" "}
      <ResponsiveContainer width="" height={200}>
        <BarChart width={300} height={100} data={likeCountPost}>
          <Bar  dataKey="likeCount" fill="#8884d8" />
          <XAxis dataKey="descriptions"/>
          <YAxis />
          <Tooltip/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LikeCountChart;
