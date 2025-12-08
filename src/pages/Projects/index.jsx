import React, { useState } from "react";
import { createProject } from "@/service/api/projects";
import toast from "react-hot-toast";

const Projects = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      toast.error("Vui lòng điền đầy đủ thông tin dự án");
      return;
    }
    const data = { name, description, status };

    try {
      setLoading(true);
      const res = await createProject(data);
      console.log("API response:", res.data);
      toast.success("Tạo dự án thành công");
      setName("");
      setDescription("");
      setStatus("pending");
    } catch (error) {
      console.error("Create project error:", error.response || error);
      toast.error(
        error.response?.data?.message || "Tạo dự án thất bại, vui lòng thử lại"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-16 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold mb-1">Create New Project</h1>
        <p className="text-gray-500 mb-6">
          Fill in the details below to get started.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Project name
            </label>
            <input
              type="text"
              placeholder="Enter a clear and concise project name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Project Description
            </label>
            <textarea
              rows="5"
              placeholder="Provide a detailed description of the project"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              className="px-5 py-2 rounded-lg border hover:bg-gray-100"
              onClick={() => {
                setname("");
                setDescription("");
                setStatus("Not Started");
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Projects;
