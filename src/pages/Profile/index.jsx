import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logout } from "@/service/api/auth";
import { getProfile } from "@/service/api/user";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);
  const fetchUserProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data?.data || {});
      toast.success("Lấy thông tin thành công");
    } catch (error) {
      console.log(error);
      toast.error("Lấy thông tin thất bại");
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("accessToken");
      toast.success("Đăng xuất thành công");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Đăng xuất thất bại");
    }
  };
  if (!user) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <Header title={"Hồ Sơ Của Bạn"} />

      <div className="flex justify-center mt-10">
        <div className="bg-white w-[380px] rounded-xl shadow-md p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-orange-200 rounded-full flex items-center justify-center">
              <FaUserCircle size={60} className="text-gray-700" />
            </div>
          </div>

          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500 mb-4">{user.email}</p>

          <div className="text-left text-sm space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-500">Ten</span>
              <span>{user.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span>{user.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Vai trò</span>
              <span>{user.role}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
