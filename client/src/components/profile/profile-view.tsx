"use client";

import type { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, UserIcon } from "lucide-react";

interface ProfileViewProps {
  user: User;
  onEdit: () => void;
}

export function ProfileView({ user, onEdit }: ProfileViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <UserIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-medium">{user.name}</h3>
            <p className="text-sm text-muted-foreground">User ID: {user._id}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p className="text-sm text-muted-foreground">{user.phone}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onEdit} className="w-full">
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
