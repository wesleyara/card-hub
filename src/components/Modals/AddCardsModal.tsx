import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useAuth } from "~/hooks";
import { useMarket } from "~/hooks/useMarket";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

import { useToast } from "../ui/use-toast";

interface AddCardsModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const AddCardsModal = ({ isOpen, setIsOpen }: AddCardsModalProps) => {
  const { toast } = useToast();
  const { user, handleAddCards } = useAuth();
  const { cards, isLoadingCards } = useMarket();
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const userCardIds = user?.cards.map(card => card.id) || [];
  // verifica se o botão de adicionar deve está habilitado
  const buttonEnabled = selectedCards.length > 0;

  // função responsável por selecionar ou deselecionar um card
  const handleSelectCard = (cardId: string) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter(id => id !== cardId));
    } else {
      setSelectedCards([...selectedCards, cardId]);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedCards([]);
  };

  // função responsável por adicionar as cartas selecionadas ao inventário do usuário
  const handleAction = async () => {
    if (!buttonEnabled) {
      return toast({
        title: "Erro",
        description: "Selecione ao menos um card para adicionar.",
      });
    }
    await handleAddCards(selectedCards);
    handleClose();
  };

  const renderCards = () => {
    if (isLoadingCards) {
      return <span className="text-black">Carregando...</span>;
    }

    const filteredCards = cards?.list?.filter(
      card => !userCardIds.includes(card.id),
    );

    if (filteredCards?.length === 0) {
      return <p>Nenhum card disponível para adicionar.</p>;
    }

    return filteredCards?.map(card => (
      <span
        key={card.id}
        className={`card ${
          !selectedCards.includes(card.id) &&
          selectedCards.length > 0 &&
          "opacity-50"
        }`}
      >
        <Image
          src={
            card.imageUrl ? card.imageUrl : "https://placehold.co/150x209/png"
          }
          alt={card.name || "Placeholder card"}
          width={150}
          height={209}
          className="cursor-pointer"
          onClick={() => handleSelectCard(card.id)}
        />
        <b className="text-black">{card.name || "Card sem nome"}</b>
        <span className="h-16 !overflow-auto px-2 text-center text-[14px] text-black">
          {card.description || "Card sem descrição"}
        </span>
      </span>
    ));
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="relative max-w-[768px] space-y-4 rounded-md border-2 border-black bg-white p-6">
          <button className="absolute right-4 top-4" onClick={handleClose}>
            X
          </button>
          <DialogTitle className="font-bold text-black">
            Adicionar Cartas
          </DialogTitle>
          <Description className="text-black">
            Selecione as cartas que deseja adicionar ao seu inventário.
          </Description>

          <div className="flex h-[400px] flex-wrap items-center justify-center gap-2 overflow-auto">
            {renderCards()}
          </div>

          <button
            className={`btn ${!buttonEnabled && "grayscale"}`}
            onClick={handleAction}
          >
            Adicionar
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
