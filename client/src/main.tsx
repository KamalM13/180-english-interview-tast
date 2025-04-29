import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "@/components/auth/auth-provider";
import { RouterProvider } from "react-router";
import router from "@/App";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <CookiesProvider>
            <AuthProvider>{children}</AuthProvider>
          </CookiesProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(
  <Providers>
    <RouterProvider router={router} />
    <Toaster richColors />
  </Providers>
);
