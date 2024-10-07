import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { loginUser, registerUser } from "@/service/authApi";
import { getUser } from "@/service/userApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  id: number;
  username: string;
  email: string;
  profile_image: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: {
    username: string;
    password: string;
  }) => Promise<{ success: boolean; error: string | null }>;
  register: (userData: {
    username: string;
    password: string;
    email: string;
  }) => Promise<{ success: boolean; error: string | null }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (accessToken && refreshToken) {
        try {
          const userData = await getUser();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to get user data:", error);
          // If there's an error, clear the tokens and set as unauthenticated
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const data = await loginUser(credentials);
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      setIsAuthenticated(true);
      const userData = await getUser();
      setUser(userData);
      return { success: true, error: null };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessages = Object.values(error.response.data).flat();
        return {
          success: false,
          error:
            (errorMessages[0] as string) || "An error occurred during login",
        };
      } else {
        return {
          success: false,
          error: "An unexpected error occurred",
        };
      }
    }
  };

  const register = async (userData: {
    username: string;
    password: string;
    email: string;
  }) => {
    try {
      await registerUser(userData);
      return { success: true, error: null };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessages = Object.values(error.response.data).flat();
        return {
          success: false,
          error:
            (errorMessages[0] as string) ||
            "An error occurred during registration",
        };
      } else {
        return {
          success: false,
          error: "An unexpected error occurred",
        };
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading component
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, register, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
