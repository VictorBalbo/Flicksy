import { useAuthContext } from "@/hooks/authContext";
import { loginWithTrakt } from "@/services/TraktService";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export const Login = () => {
  const { login } = useAuthContext();
  const router = useRouter();
  
  useEffect(() => {
    const loginToTrakt = async () => {
      const token = await loginWithTrakt();
      await login(token);
      router.back();
    };
    loginToTrakt();
  }, []);

  return <></>;
};

export default Login;
