import { LoginRequest, Meta, ProfileFrame } from "~/components";
import { useAuth } from "~/hooks";

export default function Perfil() {
  const { user, isLoadingUser } = useAuth();

  // renderiza o componente de acordo com o estado de carregamento do usuário
  const renderProfile = () => {
    if (isLoadingUser) {
      return (
        <section className="window-width h-screen-without-header mx-auto flex items-center justify-center">
          <h3>Carregando...</h3>
        </section>
      );
    }

    if (!user) {
      return (
        <section className="window-width h-screen-without-header mx-auto flex items-center justify-center">
          <LoginRequest />
        </section>
      );
    }

    return <ProfileFrame />;
  };

  return (
    <>
      <Meta
        title="Card Hub - Perfil"
        description="Bem-vindo ao Card Hub, o ponto de encontro para todos os entusiastas de cartas colecionáveis! "
      />
      {renderProfile()}
    </>
  );
}
