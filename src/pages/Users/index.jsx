import React, { useState } from "react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/DataTable";
import { deleteUser, getAllUsers } from "@/service/api/user";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );
  //lấy danh sách tất cả người dùng từ api và hiển thị lên bảng
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    fetchAllUsers();
  }, []);
  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res.data?.data || []);
      toast.success("Lấy danh sách người dùng thành công");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Lấy danh sách người dùng thất bại");
    } finally {
      setLoading(false);
    }
  };
  // Xử lý khi nhấn nút xóa
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
        await deleteUser(id);
        toast.success("Xóa người dùng thành công");
        fetchAllUsers();
      }
    } catch (error) {
      console.log(error);
      toast.error("Xóa người dùng thất bại");
    }
  };
  // Xử lý khi nhấn nút sửa
  const handleUpdate = async (id) => {
    try {
      const user = await getUserById(id);
      setUsers(user.data?.data || {});
    } catch (error) {
      console.log(error);
      toast.error("Lấy thông tin người dùng thất bại");
    }
  };
  return (
    <div className="p-6">
      <Header title={"Danh sach nguoi dung"} />

      <div className="flex items-center gap-4 my-6">
        <Input
          placeholder="Tim theo ten hoac email"
          className="max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <DataTable
        data={filteredUsers}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Users;
