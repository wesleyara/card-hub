import { useAuth } from "~/hooks";

import { TradeList } from "./TradeList";

export const MarketFrame = () => {
  const { user } = useAuth();
  return (
    <>
      <section className="window-width mx-auto flex flex-col gap-4">
        <div className="mt-10 flex flex-col gap-5">
          <p>
            Olá, <b>{user?.name || "Visitante"}</b>. Bem vindo ao mercado de
            trocas, onde você pode negociar suas cartas com outros jogadores.
          </p>
        </div>

        <TradeList />
      </section>
    </>
  );
};
