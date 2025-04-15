"use client";

import { useState } from "react";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface TopNavProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function TopNav({ user, sidebarOpen, setSidebarOpen }: TopNavProps) {
  const [notifications] = useState([
    {
      id: "1",
      title: "Neuer Standort hinzugefügt",
      message: "Ein neuer Schulungsstandort wurde hinzugefügt",
      time: "vor 5 Minuten",
      read: false,
    },
    {
      id: "2",
      title: "Ausbilder-Update",
      message: "Die Zertifizierung eines Ausbilders wurde aktualisiert",
      time: "vor 1 Stunde",
      read: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center border-b bg-card px-4 lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="mr-2 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Benachrichtigungen</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start gap-1 p-3"
              >
                <div className="flex w-full justify-between">
                  <span className="font-medium">{notification.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {notification.time}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {notification.message}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs capitalize text-muted-foreground">
                  {user.role === 'admin' ? 'Administrator' : 'Ausbilder'}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mein Konto</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Einstellungen</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
            >
              Abmelden
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}