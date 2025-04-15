"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  Building2,
  UserCog,
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  Package
} from "lucide-react";

interface SidebarProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ user, isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Standorte",
      icon: Building2,
      href: "/locations",
      active: pathname.startsWith("/locations"),
    },
    {
      label: "Ausbilder",
      icon: UserCog,
      href: "/instructors",
      active: pathname.startsWith("/instructors"),
    },
    {
      label: "Inventur",
      icon: Package,
      href: "/inventory",
      active: pathname.startsWith("/inventory"),
    },
    {
      label: "Einstellungen",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ];

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-card transition-all duration-300",
        isOpen ? "w-64" : "w-[70px]"
      )}
    >
      <div className="flex h-14 items-center px-4 py-4 border-b">
        <div className={cn("flex items-center", isOpen ? "justify-between w-full" : "justify-center")}>
          {isOpen && <h1 className="text-lg font-semibold">Verwaltung</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="h-8 w-8"
          >
            {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 px-2 py-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                route.active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <route.icon className="h-5 w-5" />
              {isOpen && <span>{route.label}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto border-t p-4">
        <Link
          href="/login"
          onClick={() => localStorage.removeItem("user")}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          )}
        >
          <LogOut className="h-5 w-5" />
          {isOpen && <span>Abmelden</span>}
        </Link>
      </div>
    </div>
  );
}