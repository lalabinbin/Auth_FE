import { Calendar, Home, Inbox, Search, Settings, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarProvider,
} from "@/components/ui/sidebar";
import imgReact from "@/assets/react.svg";

export function AppSidebar() {
  let user = null;

  // Lấy user từ localStorage an toàn
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch (err) {
      console.warn("Cannot parse user from localStorage:", err);
      localStorage.removeItem("user");
      user = null;
      console.log("User from localStorage:", user);

    }
  }

  const isAdmin = user?.role === "admin";

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup className="p-0">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <img src={imgReact} alt="logo" className="w-12 h-12 rounded-full" />
              <div>
                <h1 className="text-[16px] font-bold text-primary">Admin Panel</h1>
                <p className="text-[16px] text-muted-foreground mt-1">User Management</p>
              </div>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              <a
                className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors bg-primary text-primary-foreground"
                href="/"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium text-sm">Dashboard</span>
              </a>

              {isAdmin && (
                <a
                  className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-foreground hover:bg-secondary"
                  href="/users"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium text-sm">Users</span>
                </a>
              )}

              <a
                className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-foreground hover:bg-secondary"
                href="/settings"
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium text-sm">Settings</span>
              </a>

              {isAdmin && (
                <a
                  className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-foreground hover:bg-secondary"
                  href="/projects"
                >
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium text-sm">Projects</span>
                </a>
              )}

              <a
                className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-foreground hover:bg-secondary"
                href="/profile"
              >
                <Inbox className="w-5 h-5" />
                <span className="font-medium text-sm">Profile</span>
              </a>
            </nav>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}

export default AppSidebar;
