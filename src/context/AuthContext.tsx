/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useToast } from "~/components/ui/use-toast";
import { api, endpoints, QueryKeyGetter } from "~/lib";
import { IUser, LoginResponse, RegisterResponse } from "~/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getStorage, removeStorage, setStorage } from "utils-react";

type AuthContextType = {
  handleRegister: (
    name: string,
    email: string,
    password: string,
    setActiveTab: Dispatch<SetStateAction<string>>,
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
  const { toast } = useToast();
  const [token, setToken] = useState<string>("");

  // função responsável por realizar o registro
  const handleRegister = async (
    name: string,
    email: string,
    password: string,
    setActiveTab: Dispatch<SetStateAction<string>>,
  ) => {
    try {
      await api.post<RegisterResponse>(endpoints.register, {
        name,
        email,
        password,
      });

      toast({
        title: "Conta criada com sucesso",
        description:
          "Sua conta foi criada com sucesso! Faça login para acessar.",
      });

      setActiveTab("login");
    } catch (error: any) {
      console.log(error.response.data.message);

      toast({
        title: "Erro ao fazer o registro",
        description: error.response.data.message,
      });
    }
  };

  // função responsável por realizar login
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await api.post<LoginResponse>(endpoints.login, {
        email,
        password,
      });
      setToken(response.data.token);
      setStorage("token", response.data.token);

      toast({
        title: "Login efetuado com sucesso",
        description: "Você foi autenticado com sucesso!",
      });
    } catch (error: any) {
      console.log(error.response.data.message);

      toast({
        title: "Erro ao fazer o login",
        description: error.response.data.message,
      });
    }
  };

  // função responsável por adicionar cartas
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

  // função responsável por realizar o logout
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

  // verifica se existe um token no local storage
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
