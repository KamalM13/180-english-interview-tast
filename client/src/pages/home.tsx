import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import { CheckCircle, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";

export default function HomePage() {
  const { isAuth } = useAuth();
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md mx-auto p-5 space-y-4">
        <div className="text-center ">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            180 English Todo list
          </h1>
          <p className="text-muted-foreground mt-2">
            Organize your tasks efficiently
          </p>
        </div>

        <Card className="shadow-lg border-2">
          <CardHeader className="text-center ">
            <CardTitle className="text-xl">Welcome</CardTitle>
            <CardDescription>Get started with your todo list</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 ">
            {isAuth ? (
              <div>
                <Link to="/todo" className="w-full">
                  <Button className="w-full" variant="outline">
                    <LogIn className="mr-2 h-4 w-4" />
                    Go to Todo List
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4">
                <Link to="/login">
                  <Button
                    className="w-full h-12 text-base flex items-center gap-2 cursor-pointer"
                    size="lg"
                  >
                    <LogIn className="h-5 w-5" />
                    <span>Login to your account</span>
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="outline"
                    className="w-full h-12 text-base flex items-center gap-2 cursor-pointer"
                    size="lg"
                  >
                    <UserPlus className="h-5 w-5" />
                    <span>Create new account</span>
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
