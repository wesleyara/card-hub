import { useAuth } from "~/hooks";
import { useState } from "react";

import { AddCardsModal } from "../Modals";

export const Profile = () => {
  const { user, handleLogout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

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
            onClick={() => setIsOpen(true)}
          >
            Adicionar cartas
          </button>
          <button className="btn-secondary md:w-[300px]">Trocar cartas</button>
          <button className="btn-secondary md:w-[300px]" onClick={handleLogout}>
            Sair
          </button>
        </span>
      </div>
      <AddCardsModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
