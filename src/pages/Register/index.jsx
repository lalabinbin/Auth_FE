import LoginForm from "@/components/LoginForm"
import RegisterForm from "@/components/RegisterForm"
import React from 'react'

export function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <RegisterForm />
    </div>
  )
}

export default Register