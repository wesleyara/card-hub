import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAuth } from "~/hooks";
import { TradesResponse } from "~/types";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

interface TradeCardsModalProps {
  item: TradesResponse;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ViewCardsModal = ({
  item,
  isOpen,
  setIsOpen,
}: TradeCardsModalProps) => {
  const { user } = useAuth();

  const userCardsIds = user?.cards.map(card => card.id) || [];
  const myCards = item.tradeCards.filter(card => card.type === "OFFERING");
  const theirCards = item.tradeCards.filter(card => card.type === "RECEIVING");

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="relative max-w-[300px] space-y-4 rounded-md border-2 border-black bg-white p-6 md:max-w-[768px]">
          <button className="absolute right-4 top-4" onClick={handleClose}>
            X
          </button>
          <DialogTitle className="font-bold text-black">
            Veja as cartas
          </DialogTitle>

          <div className="flex h-[400px] flex-wrap items-center justify-center gap-2 overflow-auto">
            <div className="flex w-full flex-col items-center justify-center gap-2 md:gap-5">
              <div className="flex w-full justify-start gap-2 overflow-x-auto">
                {myCards.map(card => (
                  <span
                    key={card.cardId}
                    className={`relative flex h-[139px] w-[100px] min-w-[100px]`}
                  >
                    <Image
                      src={
                        card.card.imageUrl
                          ? card.card.imageUrl
                          : "https://placehold.co/100x139/png"
                      }
                      width={100}
                      height={139}
                      alt={card.card.name}
                    />
                  </span>
                ))}
              </div>

              <FaArrowRightArrowLeft size={30} />

              <div className="flex w-full justify-start gap-2 overflow-x-auto">
                {theirCards.map(card => (
                  <span
                    key={card.cardId}
                    className={`relative flex h-[139px] w-[100px] min-w-[100px] ${
                      user && !userCardsIds.includes(card.cardId) && "grayscale"
                    }`}
                  >
                    <Image
                      src={
                        card.card.imageUrl
                          ? card.card.imageUrl
                          : "https://placehold.co/100x139/png"
                      }
                      width={100}
                      height={139}
                      alt={card.card.name}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
