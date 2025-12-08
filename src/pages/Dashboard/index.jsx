import { deleteProject, getAllProjects } from "@/service/api/projects";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";
  const randomColor = () => {
    const colors = [
      "from-blue-400 to-indigo-600",
      "from-emerald-400 to-teal-600",
      "from-orange-400 to-yellow-500",
      "from-slate-700 to-slate-300",
      "from-gray-400 to-gray-200",
      "from-green-900 to-lime-400",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const getProjectList = async () => {
    const res = await getAllProjects();
    setProjectList(res.data.data);
  };
  useEffect(() => {
    getProjectList();
  }, []);
  const handleDeleteProject = async (projectId) => {
    try {
      const confirm = window.confirm(
        "Bạn có chắc chắn muốn xóa dự án này không?"
      );
      if (!confirm) return;
      await deleteProject(projectId);
      toast.success("Dự án đã được xóa");
      getProjectList();
    } catch (error) {
      console.log("Delete project error:", error.response?.data || error);
      toast.error(
        error.response?.data?.message || "Xóa dự án thất bại, vui lòng thử lại"
      );
    }
  };
  return (
    <div className="min-h-screen p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search projects..."
            className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />

          {isAdmin && (
            <button
              onClick={() => navigate("/projects")}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              <span className="text-xl">+</span>
              New Project
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectList.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-4h6v4m-7 4h8a2 2 0 002-2V7l-6-4-6 4v12a2 2 0 002 2z"
              />
            </svg>

            <p className="text-lg font-medium">Không có dự án nào</p>

            {isAdmin && (
              <button
                onClick={() => navigate("/projects")}
                className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Tạo dự án mới
              </button>
            )}
          </div>
        ) : (
          projectList.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition"
            >
              <div
                className={`h-40 rounded-xl bg-gradient-to-r ${randomColor()}`}
              ></div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-lg">{item.name}</h2>

                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        item.status === "pending"
                          ? "bg-red-500"
                          : item.status === "in-progress"
                          ? "bg-orange-500"
                          : item.status === "completed"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    ></span>

                    <span className="capitalize">{item.status}</span>
                  </div>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => handleDeleteProject(item._id)}
                    className="hover:cursor-pointer text-blue-500 hover:text-blue-700 
              border border-blue-200 hover:border-blue-400 
              rounded-lg px-3 py-1 text-sm transition"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
