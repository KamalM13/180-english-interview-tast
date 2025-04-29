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
import { Link, useNavigate } from "react-router";

import { ArrowLeft, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import api from "@/lib/api";
import { useAuth } from "@/components/auth/auth-provider";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

interface FormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const { setUser, setIsAuth } = useAuth();
  const [, setCookie] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("Login attempt with:", data);
      const res = await api.post("/auth/login", data);

      const { user, token } = res.data;

      setCookie("access_token", token, {
        path: "/",
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
      });

      setUser(user);
      setIsAuth(true);

      toast.success("Logged in successfully");
      navigate("/todo");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  });
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-5">
      <div className="w-full max-w-md mx-auto">
        <Card className="shadow-lg border-2">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <CardTitle className="text-2xl">Login</CardTitle>
            </div>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={onSubmit}>
            <CardContent className="space-y-4 p-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="h-11"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="h-11"
                  placeholder="********"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full h-11 text-base flex items-center gap-2 cursor-pointer"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Button>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary font-medium hover:underline"
                >
                  Register
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
