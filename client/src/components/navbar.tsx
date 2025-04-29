"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";

interface NavbarSimpleProps {
  siteName?: string;
}

export function NavbarSimple({ siteName = "TaskMaster" }: NavbarSimpleProps) {
  const { pathname } = useLocation();
  const isProfilePage = pathname === "/profile";
  const { logout } = useAuth();

  return (
    <header className="border-b bg-background fixed top-0 z-10 shadow-sm w-full">
      <div className="flex items-center justify-between  px-4 py-2 w-full container mx-auto ">
        <Link to="/" className="font-semibold text-lg">
          {siteName}
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            to={"/todo"}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Todo List
          </Link>
          <Link
            to="/profile"
            className={cn(
              "flex items-center justify-center h-7 w-7 rounded-full border",
              isProfilePage && "border-primary"
            )}
            aria-label="Profile"
          >
            <Avatar className="h-9 w-9">
              <AvatarFallback className="text-xs">U</AvatarFallback>
            </Avatar>
          </Link>
          <Button
            variant="destructive"
            onClick={() => {
              logout();
            }}
          >
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
}
