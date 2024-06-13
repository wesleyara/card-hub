import { useAuth } from "~/hooks";
import { useState } from "react";
import { delay } from "utils-react";

import { AddCardsModal, TradeCardsModal } from "../Modals";

export const Profile = () => {
  const { user, handleLogout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [cta, setCta] = useState<"addCards" | "tradeCards" | null>(null);

  const ctaOptions = {
    addCards: <AddCardsModal isOpen={isOpen} setIsOpen={setIsOpen} />,
    tradeCards: <TradeCardsModal isOpen={isOpen} setIsOpen={setIsOpen} />,
  };

  const handleAction = async (action: "addCards" | "tradeCards") => {
    setCta(action);
    await delay(200);
    setIsOpen(true);
  };

  return (
    <>
      <div className="mt-10 flex flex-col gap-5">
        <p>
          Olá, <b>{user?.name}</b>. Aqui você pode gerenciar seus cards e seu
          inventário.
        </p>

        <span className="flex flex-wrap items-center justify-center gap-2">
          <button
            className="btn-secondary md:w-[300px]"
            onClick={() => handleAction("addCards")}
          >
            Adicionar cartas
          </button>
          <button
            className="btn-secondary md:w-[300px]"
            onClick={() => handleAction("tradeCards")}
          >
            Trocar cartas
          </button>
          <button className="btn-secondary md:w-[300px]" onClick={handleLogout}>
            Sair
          </button>
        </span>
      </div>
      {isOpen && cta && <>{ctaOptions[cta]}</>}
    </>
  );
};
