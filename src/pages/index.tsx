import { Icon, Meta } from "~/components";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { useAuth } from "~/hooks";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  const handleNavigate = (path: string) => {
    router.push(path);
  };
  return (
    <>
      <Meta
        title="Card Hub - Home"
        description="Bem-vindo ao Card Hub, o ponto de encontro para todos os entusiastas de cartas colecionáveis! "
      />
      <section className="h-screen-without-header window-width mx-auto flex flex-col items-center justify-center gap-2">
        <h1 className="mt-8 flex gap-2 text-center font-bold">
          Bem-vindo ao Card Hub <Icon />
        </h1>
        <p className="mt-4 text-center">
          O ponto de encontro para todos os entusiastas de cartas colecionáveis!
          Nossa missão é fornecer uma plataforma segura e confiável para que
          você possa gerenciar sua coleção, encontrar novas cartas e conhecer
          outros colecionadores.
        </p>

        <Drawer>
          <DrawerTrigger className="btn-secondary mt-2">
            Saiba mais
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-5xl text-black">
                Dicas de navegação
              </DrawerTitle>
              <DrawerDescription className="text-xl">
                Utilize o Card Hub para gerenciar sua coleção de cartas com as
                diversas ferramentas disponíveis.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              {user ? (
                <button
                  className="btn"
                  onClick={() => handleNavigate("/perfil")}
                >
                  Veja seu perfil
                </button>
              ) : (
                <button
                  className="btn"
                  onClick={() => handleNavigate("/login")}
                >
                  Realize o login
                </button>
              )}

              <button
                className="btn"
                onClick={() => handleNavigate("/mercado")}
              >
                Veja o mercado
              </button>
              <button
                className="btn"
                onClick={() => handleNavigate(user ? "/perfil" : "/login")}
              >
                Veja seu inventário e troque cartas
              </button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </section>
    </>
  );
}
