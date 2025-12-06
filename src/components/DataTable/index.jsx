import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"

const DataTable = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Ten</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Vai tro</TableHead>
            <TableHead className="text-right">Thao tac</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.role === "Quan tri vien"
                      ? "default"
                      : user.role === "Bien tap vien"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {user.role}
                </Badge>
              </TableCell>

              <TableCell className="text-right space-x-2">
                <Button size="icon" variant="outline">
                  <Pencil size={16} />
                </Button>

                <Button size="icon" variant="destructive">
                  <Trash size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center p-4 text-sm text-gray-500">
        Hien thi 1-{data.length} tren 20 ket qua
        <div className="space-x-2">
          <Button variant="outline" size="sm">1</Button>
          <Button variant="ghost" size="sm">2</Button>
          <Button variant="ghost" size="sm">3</Button>
        </div>
      </div>
    </div>
  )
}

export default DataTable
