import { useBackendApi } from "@/hooks/useBackendApi";
import { createContext, useState, useEffect } from "react";

interface AuthContextProps {
  user: UserProps | null;
  signin: (username: string, password: string) => Promise<boolean>;
  signout: () => void;
}

interface UserProps {
  _id: string,
  name: String,
  email: String,
  password: String,
  state: string,
  cep: string,
  cpf: string,
  birthDate: string,
  skills: [],
  experience: [],
  academic: [],
  bio: string,
  isContractor: boolean,
  isADM: boolean
}

export const AuthContext = createContext<AuthContextProps>(null!);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<UserProps | null>(null);

  const api = useBackendApi();

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem("authToken");
      if (storageData) {
        const data = await api.persistenceLogin(storageData);
        if (data.user) {
          setUser(data.user);
        }
      }
    };
    validateToken();
  }, []);

  const signin = async (email: string, password: string) => {
    const data = await api.login(email, password);
    if (data.user) {
      setUser(data.user);
      setToken(data.token);
      return true;
    }
  
    return false;
  };

  const signout = async () => {
    await api.logout();
    setUser(null);
    setToken("");
  };

  const setToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};