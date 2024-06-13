import { useQuery } from "@tanstack/react-query";
import { api, endpoints, QueryKeyGetter } from "~/lib";
import { IUser, LoginResponse, RegisterResponse } from "~/types";
import { createContext, ReactNode, useEffect, useState } from "react";
import { getStorage, removeStorage, setStorage } from "utils-react";

type AuthContextType = {
  handleRegister: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleAddCards: (cardIds: string[]) => Promise<void>;
  handleLogout: () => void;
  user: IUser | undefined;
  isLoadingUser: boolean;
  token: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const queryKeyGetter = new QueryKeyGetter();
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

      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setToken("");
    removeStorage("token");
    location.reload();
  };

  const {
    data: user,
    isLoading: isLoadingUser,
    refetch,
  } = useQuery({
    enabled: !!token,
    queryKey: ["user"],
    queryFn: () => queryKeyGetter.requestMe(token),
  });

  useEffect(() => {
    const localToken = getStorage("token");

    if (localToken) {
      setToken(localToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        handleRegister,
        handleAddCards,
        handleLogin,
        handleLogout,
        user,
        isLoadingUser,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
