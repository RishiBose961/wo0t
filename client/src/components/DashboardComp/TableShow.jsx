import { Edit2, Trash2Icon } from "lucide-react";
import React from "react";
import useDashBoardPost from "../../hooks/DashboardHook/useDashBoardPost";
import { Link, useNavigate } from "react-router-dom";
import CountComment from "../Main/CountComment";
import axios from "axios";

const TableShow = () => {
  const { postUserData, deletePost } = useDashBoardPost();
  const navigate = useNavigate();

 const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      // 🔥 Remove instantly from UI

      // API call
      await axios.delete(`/api/post/delete/${id}`);

      // ✅ Success feedback
      alert("Post deleted successfully! ✅");

      setTimeout(() => {
        // Refresh or navigate after deletion
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Delete error:", error);

     
      alert("Delete failed ❌");
    }
  };
  return (
    <div className="overflow-x-auto mt-4">
      <table className="table w-full">
        <thead>
          <tr className="border-white">
            <th>Title</th>
            <th>Likes</th>
            <th>Comment</th>
            <th>Category</th>
            <th className="text-center">U/D</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(postUserData) &&
            postUserData.map((x) => (
              <tr key={x._id} className="border-gray-400 border-dashed">
                <td>
                  <Link to={`/read/${x._id}`}>
                    <p>{x.descriptions}</p>
                  </Link>
                </td>

                <td>
                  <p className="text-center">{x.likeCount}</p>
                </td>

                <td className="text-center">
                  <CountComment postd={x._id} />
                </td>

                <td>{x.category}</td>

                <td className="flex justify-center gap-3">
                  {/* EDIT */}
                  <button
                    onClick={() => navigate(`/edit/${x._id}`)}
                    className="bg-indigo-600 px-2 py-2 rounded-full text-white hover:bg-indigo-700"
                  >
                    <Edit2 size={16} />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(x._id)}
                    className="bg-red-600 px-2 py-2 rounded-full text-white hover:bg-red-700"
                  >
                    <Trash2Icon size={16} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableShow;