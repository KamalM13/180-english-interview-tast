"use client";

import { useState } from "react";
import { useProfile } from "@/hooks/use-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileForm } from "@/components/profile/profile-form";
import { ProfileView } from "@/components/profile/profile-view";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { profile, isLoading, isError } = useProfile();

  if (!profile) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-md mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load profile information. Please try again.
          </AlertDescription>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => window.location.reload()}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {isEditing ? (
        <ProfileForm user={profile} onCancel={() => setIsEditing(false)} />
      ) : (
        <ProfileView user={profile} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
}
