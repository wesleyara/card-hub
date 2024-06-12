import { useAuth } from "~/hooks";
import { useState } from "react";

import { AddCardsModal } from "../Modals";

export const Profile = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="mt-10 flex flex-col gap-5">
        <p>
          Olá, <b>{user?.name}</b>. Aqui você pode gerenciar seus cards e seu
          inventário.
        </p>

        <span className="flex gap-2">
          <button className="btn-secondary" onClick={() => setIsOpen(true)}>
            Adicionar cards
          </button>
          <button className="btn-secondary">Trocar cards</button>
        </span>
      </div>
      <AddCardsModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
