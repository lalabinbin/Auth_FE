import React, { useState } from "react"
import Header from "@/components/Header"
import { Input } from "@/components/ui/input"
import DataTable from "@/components/DataTable"

const usersData = [
  { id: "#001", name: "Nguyen Van A", email: "nguyenvana@example.com", role: "Quan tri vien" },
  { id: "#002", name: "Tran Thi B", email: "tranthib@example.com", role: "Bien tap vien" },
  { id: "#003", name: "Le Van C", email: "levanc@example.com", role: "Thanh vien" },
  { id: "#004", name: "Pham Thi D", email: "phamthid@example.com", role: "Thanh vien" },
]

const Users = () => {
  const [search, setSearch] = useState("")

  const filteredUsers = usersData.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

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

      <DataTable data={filteredUsers} />
    </div>
  )
}

export default Users
