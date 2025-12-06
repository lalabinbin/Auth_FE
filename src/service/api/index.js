import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

//Tự động gắn Access Token vào Header trước khi gửi request
apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//Tự động refresh token khi bị lỗi 401 (token hết hạn)
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !window.location.href.includes("/Login")
    ) {
      originalRequest._retry = true;

      try {
        const res = await apiInstance.post("/auth/refresh-token");
        const newAccessToken = res.data?.data?.tokens?.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        window.location.href = "/Login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
