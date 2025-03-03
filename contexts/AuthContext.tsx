import {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  PropsWithChildren,
} from "react";
import authService from "@/services/authService";
// import { User, Preferences } from "appwrite";
import { Models } from "react-native-appwrite";

interface AuthContextValue {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    setLoading(true);
    const response = await authService.getUser();

    if (response) {
      setUser(response);
    } else {
      setUser(null);
    }

    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);

    await checkUser();

    return { succes: true };
  };

  const register = async (email: string, password: string) => {
    try {
      await authService.register(email, password);

      await login(email, password);

      return { succes: true };
    } catch (error) {
      return { errorMessage: error };
    }
  };

  const logout = async () => {
    await authService.logout();

    await checkUser();
  };

  return (
    <>
      <AuthContext.Provider value={{ user, loading, login, register, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
