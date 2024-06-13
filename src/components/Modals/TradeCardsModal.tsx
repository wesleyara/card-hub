import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useAuth } from "~/hooks";
import { useMarket } from "~/hooks/useMarket";
import { idsInTrade } from "~/lib";
import { Card } from "~/types";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

import { useToast } from "../ui/use-toast";

interface TradeCardsModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const TradeCardsModal = ({
  isOpen,
  setIsOpen,
}: TradeCardsModalProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { cards, trades, handleTradeCards } = useMarket();
  const [step, setStep] = useState<"offer" | "receive">("offer");
  const [cardsToOffer, setCardsToOffer] = useState<string[]>([]);
  const [cardsToReceive, setCardsToReceive] = useState<string[]>([]);

  const handleClose = () => {
    setCardsToOffer([]);
    setCardsToReceive([]);
    setIsOpen(false);
  };

  const handleSelectCard = (cardId: string) => {
    if (step === "offer") {
      if (cardsToOffer.includes(cardId)) {
        setCardsToOffer(cardsToOffer.filter(id => id !== cardId));
      } else {
        setCardsToOffer([...cardsToOffer, cardId]);
      }
    } else {
      if (cardsToReceive.includes(cardId)) {
        setCardsToReceive(cardsToReceive.filter(id => id !== cardId));
      } else {
        setCardsToReceive([...cardsToReceive, cardId]);
      }
    }
  };

  const renderCards = () => {
    const inTrade = idsInTrade(trades, user);
    const myCardIds = user?.cards.map(card => card.id) || [];
    const state =
      step === "offer"
        ? user?.cards.filter(val => !inTrade.includes(val.id))
        : cards?.list.filter(val => !myCardIds.includes(val.id));
    const selectedState = step === "offer" ? cardsToOffer : cardsToReceive;

    if (!state) {
      return <span className="text-black">Carregando...</span>;
    }

    return state.map((card: Card) => (
      <span
        key={card.id}
        className={`card ${
          !selectedState.includes(card.id) &&
          selectedState.length > 0 &&
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

  const handleAction = async (action: "offer" | "receive") => {
    if (action === "offer") {
      return setStep("receive");
    }

    await handleTradeCards(cardsToOffer, cardsToReceive);
    setIsOpen(false);
    toast({
      title: "Sucesso",
      description: "Cartas adicionadas para troca realizada com sucesso!",
    });
  };

  const enableButton =
    step === "offer" ? cardsToOffer.length > 0 : cardsToReceive.length > 0;

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="relative max-w-[768px] space-y-4 rounded-md border-2 border-black bg-white p-6">
          <button className="absolute right-4 top-4" onClick={handleClose}>
            X
          </button>
          <DialogTitle className="font-bold text-black">
            Trocar cartas
          </DialogTitle>
          <Description className="text-black">
            Selecione as cartas que deseja{" "}
            {step === "offer" ? "oferecer" : "receber"}.
          </Description>

          <div className="flex h-[400px] flex-wrap items-center justify-center gap-2 overflow-auto">
            {renderCards()}
          </div>

          <button
            className={`btn ${!enableButton && "grayscale"}`}
            onClick={() =>
              step === "offer" ? handleAction("offer") : handleAction("receive")
            }
          >
            {step === "offer" ? "Continuar" : "Finalizar"}
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
