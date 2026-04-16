import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const people = [
  "News",
  "Sports",
  "Play",
  "Elections",
  "Money",
  "Gaming",
  "Weather",
  "Watch",
  "Learning",
  "Shopping",
  "Health",
  "Travel",
  "Traffic",
  "Autos",
];

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    descriptions: "",
    category: "",
    visibility: "",
  });

  const [loading, setLoading] = useState(false);

  // 📥 Fetch existing post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/post/${id}`);
        setFormData({
          descriptions: res.data.descriptions || "",
          category: res.data.category || "",
          visibility: res.data.visibility || "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
  }, [id]);

  // ✏️ Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🚀 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`/api/post/update/${id}`, formData);
      alert("Post updated successfully ✅");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10  p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Post</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Description */}
        <input
          type="text"
          name="descriptions"
          value={formData.descriptions}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded"
        />

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>
          {people.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Visibility */}
        <select
          name="visibility"
          value={formData.visibility}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Visibility</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        {/* Button */}
        <button
          disabled={loading}
          className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default EditPage;