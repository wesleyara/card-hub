import { MarketFrame, Meta } from "~/components";
import { useAuth } from "~/hooks";

export default function Mercado() {
  const { isLoadingUser } = useAuth();

  const renderProfile = () => {
    if (isLoadingUser) {
      return (
        <section className="window-width h-screen-without-header mx-auto flex items-center justify-center">
          <h3>Carregando...</h3>
        </section>
      );
    }

    return <MarketFrame />;
  };

  return (
    <>
      <Meta
        title="Card Hub - Mercado"
        description="Bem-vindo ao Card Hub, o ponto de encontro para todos os entusiastas de cartas colecionáveis! "
      />
      {renderProfile()}
    </>
  );
}
