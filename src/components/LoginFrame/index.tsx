import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useAuth } from "~/hooks";
import { ChangeEvent, useState } from "react";

import { useToast } from "../ui/use-toast";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export const LoginFrame = () => {
  const { toast } = useToast();
  const { handleRegister, handleLogin } = useAuth();
  const [states, setStates] = useState(initialState);

  const handleStateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStates(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTabChange = () => {
    setStates(initialState);
  };

  const handleButtonAction = (type: "login" | "register") => {
    if (type === "register" && states.name.trim() === "") {
      return toast({
        title: "Nome é obrigatório",
        description: "Por favor, preencha o campo de nome.",
      });
    }

    if (states.email.trim() === "") {
      return toast({
        title: "Email é obrigatório",
        description: "Por favor, preencha o campo de email.",
      });
    }

    if (states.password.trim() === "") {
      return toast({
        title: "Senha é obrigatória",
        description: "Por favor, preencha o campo de senha.",
      });
    }

    if (type === "login") {
      handleLogin(states.email, states.password);
    } else {
      handleRegister(states.name, states.email, states.password);
    }
  };

  return (
    <main className="window-width h-screen-without-header mx-auto flex items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger onClick={handleTabChange} value="login">
            Login
          </TabsTrigger>
          <TabsTrigger onClick={handleTabChange} value="registro">
            Registro
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Login</CardTitle>
              <CardDescription>
                Digite seu email e senha para acessar sua conta.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="flex flex-col gap-2 space-y-1">
                <label htmlFor="email" className="text-black">
                  Email
                </label>
                <input type="text" name="email" onChange={handleStateChange} />
              </div>
              <div className="flex flex-col gap-2 space-y-1">
                <label htmlFor="password" className="text-black">
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleStateChange}
                />
              </div>
            </CardContent>

            <CardFooter>
              <button
                className="btn"
                onClick={() => handleButtonAction("login")}
              >
                Login
              </button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="registro">
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Registro</CardTitle>
              <CardDescription>
                Digite seu nome, email e senha para criar uma conta.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-col gap-2 space-y-1">
                <label htmlFor="name" className="text-black">
                  Nome
                </label>
                <input type="text" name="name" onChange={handleStateChange} />
              </div>
              <div className="flex flex-col gap-2 space-y-1">
                <label htmlFor="email" className="text-black">
                  Email
                </label>
                <input
                  type="text"
                  name="password"
                  onChange={handleStateChange}
                />
              </div>
              <div className="flex flex-col gap-2 space-y-1">
                <label htmlFor="password" className="text-black">
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleStateChange}
                />
              </div>
            </CardContent>

            <CardFooter>
              <button
                className="btn"
                onClick={() => handleButtonAction("register")}
              >
                Registrar
              </button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};
