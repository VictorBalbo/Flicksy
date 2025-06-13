import { TokenResponse } from "expo-auth-session";
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
  login: (token: TokenResponse) => Promise<void>;
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
      const token = await SecureStore.getItemAsync("traktAccessToken");
      console.log("Checking login status...");
      if (token) setAccessToken(token);
    };
    checkLoginStatus();
  }, []);

  const login = async (token: TokenResponse) => {
    await SecureStore.setItemAsync("traktAccessToken", token.accessToken);
    if (token.issuedAt && token.expiresIn) {
      const expiresAt = (token.issuedAt + token.expiresIn) * 1000;
      await SecureStore.setItemAsync("traktTokenExpiresAt", `${expiresAt}`);
    }
    if (token.refreshToken) {
      await SecureStore.setItemAsync("traktRefreshToken", token.refreshToken);
    }
    setAccessToken(token.accessToken);
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

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useMapContext must be used within an MapProvider");
  }
  return context;
};
