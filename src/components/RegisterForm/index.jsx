import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  return (
    <div className="w-full max-w-3xl">
      <Card className="shadow-sm">
        <CardTitle className="  border-b border-gray-200">
          <Label className="ml-6 pb-4">User management system</Label>
        </CardTitle>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Register a new account
          </CardTitle>
          <CardDescription>Create a new account for the system</CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="grid grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input placeholder="Enter name" />
              </div>

              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="email" placeholder="Enter email" />
              </div>

              <div className="grid gap-2">
                <Label>Password</Label>
                <Input type="password" placeholder="Enter password" />
              </div>

              <div className="grid gap-2">
                <Label>Role</Label>
                <select className="h-10 rounded-md border px-3 text-sm focus:outline-none">
                  <option>User</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <p className="text-sm text-blue-600 cursor-pointer hover:underline">
            You already have an account? Login
          </p>

          <Button className="bg-blue-600">Register →</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegisterForm;
