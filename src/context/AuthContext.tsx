import { api, endpoints } from "~/lib";
import { IUser, LoginResponse, RegisterResponse } from "~/types";
import { createContext, ReactNode, useEffect, useState } from "react";
import { getStorage, setStorage } from "utils-react";

type AuthContextType = {
  handleRegister: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleAddCards: (cardIds: string[]) => Promise<void>;
  handleLogout: () => void;
  requestMe: (token: string) => void;
  user: IUser | null;
  token: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string>("");

  const handleRegister = async (
    name: string,
    email: string,
    password: string,
  ) => {
    try {
      await api.post<RegisterResponse>(endpoints.register, {
        name,
        email,
        password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await api.post<LoginResponse>(endpoints.login, {
        email,
        password,
      });
      setToken(response.data.token);
      setStorage("token", response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCards = async (cardIds: string[]) => {
    try {
      await api.post(
        endpoints.addCards,
        {
          cardIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      requestMe(token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken("");
  };

  const requestMe = async (token: string) => {
    try {
      const response = await api.get<IUser>(endpoints.me, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const localToken = getStorage("token");

    if (localToken) {
      setToken(localToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      requestMe(token);
    }
  }, [token]);

  useEffect(() => {
    console.log({ user });
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        handleRegister,
        handleAddCards,
        handleLogin,
        handleLogout,
        requestMe,
        user,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
