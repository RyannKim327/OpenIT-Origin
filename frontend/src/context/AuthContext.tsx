import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import axios from "axios";

// ackend Base URL
const API_URL = "http://127.0.0.1:8000/api/users"; // fixed to plural

// ype definitions
interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id?: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  sex?: string;
}

//ontext type
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: any }>;
  logout: () => void;
  register: (userData: any) => Promise<{ success: boolean; message?: string; error?: any }>;
  fetchUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //en management
  const setTokens = (access: string, refresh: string) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    setIsAuthenticated(true);
  };

  const clearTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  // etch user details using DRF /api/users/<id>/
  const fetchUserProfile = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");
    const userData = storedUser ? JSON.parse(storedUser) : null;

    if (!accessToken || !userData?.id) {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/${userData.id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      clearTokens();
    } finally {
      setIsLoading(false);
    }
  }, []);

  // tomatically check auth on load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) await fetchUserProfile();
      else setIsLoading(false);
    };
    checkAuth();
  }, [fetchUserProfile]);

  // OGIN — Django endpoint: /api/users/login/
  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login/`, { username, password });
      const { access, refresh, user } = response.data;

      if (access && refresh && user) {
        setTokens(access, refresh);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        return { success: true };
      }
      return { success: false, error: "Invalid response from server" };
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data || { detail: "An unexpected error occurred." },
      };
    }
  };

  // EGISTER — Django endpoint: /api/users/register/
  const register = async (userData: any) => {
    try {
      const response = await axios.post(`${API_URL}/register/`, userData);
      return {
        success: true,
        message: response.data.message || "Registration successful.",
      };
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data || { detail: "An unexpected error occurred." },
      };
    }
  };

  const logout = () => {
    clearTokens();
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    register,
    fetchUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
