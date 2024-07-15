import { Edit2, Trash2Icon } from "lucide-react";
import React from "react";
import useDashBoardPost from "../../hooks/DashboardHook/useDashBoardPost";
import { Link } from "react-router-dom";
import CountComment from "../Main/CountComment";
const TableShow = () => {
  const { postUserData } = useDashBoardPost();

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className=" border-white">
            <th>Title</th>
            <th>Likes</th>
            <th>Comment</th>
            <th>Category</th>
            <th className="text-center">U/D</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {postUserData?.map((x, i) => (
            <tr className=" border-gray-400 border-dashed">
              <td>
                <Link to={`/read/${x._id}`}>
                <p>{x.descriptions}</p>
                </Link>
               
              </td>
              <td>
                <p className=" text-center">{x.likeCount}</p>
              </td>
              <td className=" text-center"><CountComment postd={x._id}/></td>
              <td>{x.category}</td>
              <th className="flex">
                <button className="btn btn-xs">
                  <Edit2/>
                </button>
                <button className="btn btn-xs">
                  <Trash2Icon/>
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableShow;
