import { useAuth } from "@/components/auth/auth-provider";
import TodoLayout from "@/components/todo/todo-layout";
import { ErrorBoundary } from "@/error-boundary";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import ProfilePage from "@/pages/profile";
import RegisterPage from "@/pages/register";
import TodoListPage from "@/pages/todo-list";
import { createBrowserRouter, Navigate, Outlet } from "react-router";

// Route wrappers
const ProtectedRoute = () => {
  const { isAuth } = useAuth();
  if (!isAuth) return <Navigate to="/login" replace />;
  return <Outlet />;
};

const PublicRoute = ({ restricted = false }) => {
  const { isAuth } = useAuth();
  if (isAuth && restricted) return <Navigate to="/" replace />;
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    element: <PublicRoute restricted />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <TodoLayout />,
        children: [
          {
            path: "/todo",
            element: <TodoListPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
