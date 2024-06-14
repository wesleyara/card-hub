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
  const [activeTab, setActiveTab] = useState("login");

  // função responsável por atualizar o estado dos inputs
  const handleStateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStates(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // função responsável por atualizar a aba ativa
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setStates(initialState);
  };

  // função responsável por realizar a ação de login ou registro
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
      handleRegister(states.name, states.email, states.password, setActiveTab);
    }
  };

  return (
    <main className="window-width h-screen-without-header mx-auto flex items-center justify-center">
      <section className="flex h-[500px] justify-center">
        <Tabs
          onValueChange={value => handleTabChange(value)}
          defaultValue={activeTab}
          value={activeTab}
          className="window-width max-w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="registro">Registro</TabsTrigger>
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
                  <input
                    type="text"
                    name="email"
                    value={states.email}
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
                    value={states.password}
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
                  <input
                    type="text"
                    name="name"
                    value={states.name}
                    onChange={handleStateChange}
                  />
                </div>
                <div className="flex flex-col gap-2 space-y-1">
                  <label htmlFor="email" className="text-black">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={states.email}
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
                    value={states.password}
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
      </section>
    </main>
  );
};
