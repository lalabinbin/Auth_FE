import apiInstance from "./index";

export const getProfile = async () => {
    return await apiInstance.get("/auth/me");
}

// Lấy danh sách tất cả người dùng
export const getAllUsers = async () => {
    return await apiInstance.get("/auth/getAllUser");
}

// Xóa người dùng
export const deleteUser = async (id) => {
    return await apiInstance.delete(`/auth/delete/${id}`);
}

// Sửa người dùng
export const updateUser = async (id, data) => {
    return await apiInstance.put(`/update/${id}`, data);
}

// Lấy người dùng theo id
export const getUserById = async (id) => {
    return await apiInstance.get(`/users/${id}`);
}

export default { getProfile, getAllUsers, deleteUser, updateUser, getUserById };