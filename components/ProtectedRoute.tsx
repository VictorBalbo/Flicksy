import { useAuthContext } from "@/hooks/authContext";
import { useRouter } from "expo-router";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { accessToken, login } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    console.log("Access Token:", accessToken);
    if (accessToken === null) {
      router.push("/Login");
    }
  }, [accessToken, login, router]);

  return children;
};
