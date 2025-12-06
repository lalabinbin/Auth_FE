import LoginForm from "@/components/LoginForm";
import { login } from "@/service/api/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); 
    if (!email || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);
      const res = await login({ email, password });
      const accessToken = res.data?.data?.tokens?.accessToken;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      toast.success("Login success");
      navigate("/dashboard");
    } catch (error) {
      console.log("Login error:", error.response?.data || error);
      toast.error(
        error.response?.data?.message || "Đăng nhập thất bại, vui lòng thử lại"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm
        handleLogin={handleLogin}
        loading={loading}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
}

export default Login;
