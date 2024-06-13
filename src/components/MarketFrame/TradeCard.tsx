import { useAuth } from "~/hooks";
import { useMarket } from "~/hooks/useMarket";
import { TradesResponse } from "~/types";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

import { useToast } from "../ui/use-toast";

interface TradeCardProps {
  item: TradesResponse;
}

export const TradeCard = ({ item }: TradeCardProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const { handleCancelTrade } = useMarket();

  const myCards = item.tradeCards.filter(card => card.type === "OFFERING");
  const theirCards = item.tradeCards.filter(card => card.type === "RECEIVING");

  const userCardsIds = user?.cards.map(card => card.id) || [];

  const isTradeOwn = item.user.name === user?.name;
  const isEnableToTrade = theirCards.every(card =>
    userCardsIds.includes(card.card.id),
  );

  const handleAction = async () => {
    if (!user) {
      return router.push("/login");
    }

    if (isTradeOwn) {
      return await handleCancelTrade(item.id);
    }

    if (!isEnableToTrade) {
      return toast({
        title: "Erro",
        description: "Você não possui todos os cards para realizar a troca.",
      });
    }

    return toast({
      title: "Atenção",
      description: "Entre em contato com o usuário para realizar a troca.",
    });
  };

  return (
    <section className="flex w-full flex-col gap-3 rounded-md border p-3">
      <h5>
        {item.user.name} {isTradeOwn && `(Você)`}
      </h5>

      <div className="flex w-full items-center justify-center gap-2 md:gap-5">
        <div className="flex w-full justify-start gap-2 overflow-x-auto">
          {myCards.map(card => (
            <span
              key={card.cardId}
              className={`relative flex h-[139px] min-w-[100px] border border-black`}
            >
              <Image
                src={
                  card.card.imageUrl
                    ? card.card.imageUrl
                    : "https://placehold.co/100x139/png"
                }
                layout="fill"
                objectFit="contain"
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
              className={`relative flex h-[139px] min-w-[100px] border border-black ${
                user && !userCardsIds.includes(card.cardId) && "grayscale"
              }`}
            >
              <Image
                src={
                  card.card.imageUrl
                    ? card.card.imageUrl
                    : "https://placehold.co/100x139/png"
                }
                layout="fill"
                objectFit="contain"
                alt={card.card.name}
              />
            </span>
          ))}
        </div>
      </div>

      <span className="flex justify-center gap-2">
        <button
          className={`btn-secondary max-w-[300px] ${
            user && !isTradeOwn && !isEnableToTrade && "!bg-opacity-50"
          }`}
          onClick={handleAction}
        >
          {!user
            ? "Faça o login"
            : isTradeOwn
            ? "Cancelar troca"
            : "Realizar troca"}
        </button>
        <button className={`btn-secondary max-w-[300px]`}>
          Veja as cartas
        </button>
      </span>
    </section>
  );
};
