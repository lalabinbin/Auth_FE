import apiInstance from "./index";

export const getAllProjects = async () => {
    return await apiInstance.get("/projects");
};

export const getProjectById = async (id) => {
    return await apiInstance.get(`/projects/${id}`);
};

export const createProject = async (data) => {
    return await apiInstance.post("/projects", data);
};

export const updateProject = async (id, data) => {
    return await apiInstance.put(`/projects/${id}`, data);
};

export const deleteProject = async (id) => {
    return await apiInstance.delete(`/projects/${id}`);
};

