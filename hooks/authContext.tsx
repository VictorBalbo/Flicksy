import * as SecureStore from "expo-secure-store";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  accessToken: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  /// TODO: Get user data from API and set it in state

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await SecureStore.getItemAsync("accessToken");

      if (token) setAccessToken(token);
    };
    checkLoginStatus();
  }, []);

  const login = async (token: string) => {
    await SecureStore.setItemAsync("accessToken", token);
    setAccessToken(token);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
