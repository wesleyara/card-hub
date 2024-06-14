import { Meta, LoginFrame } from "~/components";
import { useAuth } from "~/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const { user } = useAuth();

  // redireciona o usuário para a página inicial caso ele esteja logado
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      <Meta
        title="Card Hub - Login"
        description="Bem-vindo ao Card Hub, o ponto de encontro para todos os entusiastas de cartas colecionáveis! "
      />
      <LoginFrame />
    </>
  );
}
