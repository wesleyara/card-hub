import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useAuth } from "~/hooks";
import { api } from "~/lib";
import { CardsResponse } from "~/types";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { useToast } from "../ui/use-toast";

interface AddCardsModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const AddCardsModal = ({ isOpen, setIsOpen }: AddCardsModalProps) => {
  const { toast } = useToast();
  const { user, handleAddCards } = useAuth();
  const [cards, setCards] = useState<CardsResponse>();
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const userCardIds = user?.cards.map(card => card.id) || [];

  const requestCards = async () => {
    try {
      const response = await api.get<CardsResponse>("/cards?rpp=100&page=1");
      setCards(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      requestCards();
    }
  }, [isOpen]);

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

  const handleAction = async () => {
    if (selectedCards.length === 0) {
      return toast({
        title: "Erro",
        description: "Selecione ao menos um card para adicionar.",
      });
    }
    await handleAddCards(selectedCards);
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="relative max-w-[768px] space-y-4 border bg-white p-6">
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
            {cards && cards?.list && cards.list.length > 0 ? (
              cards.list
                .filter(card => !userCardIds.includes(card.id))
                .map(card => (
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
                        card.imageUrl
                          ? card.imageUrl
                          : "https://placehold.co/150x209/png"
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
                ))
            ) : (
              <p className="text-black">Carregando...</p>
            )}
          </div>

          <button className="btn" onClick={handleAction}>
            Adicionar
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
