import apiInstance from "./index";

export const register = async (data) => {
    return await apiInstance.post("/auth/register", data);
}

export const login = async (data) => {
    return await apiInstance.post("/auth/login", data);
}

export const refreshToken = async () => {
    return await apiInstance.post("/auth/refresh-token");
}

export const getProfile = async () => {
    return await apiInstance.get("/auth/me");
}

export const logout = async () => {
    return await apiInstance.post("/auth/logout");
}