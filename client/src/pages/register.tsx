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
import { ArrowLeft, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import api from "@/lib/api";
import { toast } from "sonner";

interface FormInputs {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormInputs>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await api.post("/auth/register", data);
      toast.success("Registration successful! Please Login to continue.");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      setError("root", {
        type: "manual",
        message: error.response?.data?.message || "Registration failed",
      });
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
              <CardTitle className="text-2xl">Register</CardTitle>
            </div>
            <CardDescription>
              Create a new account to get started
            </CardDescription>
          </CardHeader>
          <form onSubmit={onSubmit}>
            <CardContent className="space-y-4 p-4 pt-0">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="h-11"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message || "Name is required"}
                  </span>
                )}
              </div>
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
                  <span className="text-red-500 text-sm">
                    {errors.email.message || "Email is required"}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="h-11"
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must be at most 20 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, with no spaces",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message || "Password is required"}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="123-456-7890"
                  className="h-11"
                  {...register("phone", {
                    required: true,
                    pattern: {
                      value:
                        /^[+]?[0-9]{1,4}?[-.\s]?(\(?\d{1,3}?\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                      message: "Invalid phone number format",
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number must be at least 10 digits",
                    },
                    maxLength: {
                      value: 15,
                      message: "Phone number must be at most 15 digits",
                    },
                  })}
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">
                    {errors.phone.message || "Phone number is required"}
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full h-11 text-base flex items-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full border-primary" />
                ) : (
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    <span>Create Account</span>
                  </div>
                )}
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary font-medium hover:underline"
                >
                  Login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
