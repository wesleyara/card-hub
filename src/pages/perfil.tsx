import { LoginRequest, Meta, ProfileFrame } from "~/components";
import { useAuth } from "~/hooks";

export default function Perfil() {
  const { user } = useAuth();

  return (
    <>
      <Meta
        title="Card Hub - Perfil"
        description="Bem-vindo ao Card Hub, o ponto de encontro para todos os entusiastas de cartas colecionáveis! "
      />
      {user ? (
        <ProfileFrame />
      ) : (
        <section className="window-width h-screen-without-header mx-auto flex items-center justify-center">
          <LoginRequest />
        </section>
      )}
    </>
  );
}
