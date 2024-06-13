import { useAuth } from "~/hooks";
import { useMarket } from "~/hooks/useMarket";
import { TradesResponse } from "~/types";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useWidth } from "utils-react";

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

  const width = useWidth();

  const userCardsIds = user?.cards.map(card => card.id) || [];

  const calculateLeft = (arrayLength: number, index: number) => {
    const reference = width > 500 ? 8 : 12 + arrayLength;

    const value = index * (width / reference / arrayLength);

    if (value > 105 * index) {
      return 105;
    }

    return value;
  };

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

      <div className="flex items-center justify-center gap-2 md:gap-5">
        <div
          style={{
            width: `${
              calculateLeft(myCards.length, myCards.length - 1) + 100
            }px`,
          }}
          className="relative"
        >
          {myCards.map((card, index) => (
            <span
              key={card.cardId}
              style={{ left: `${calculateLeft(myCards.length, index)}px` }}
              className={`${
                index !== 0 && "absolute top-0"
              }  block h-[139px] w-[100px] border border-black`}
            >
              <Image
                src={
                  card.card.imageUrl
                    ? card.card.imageUrl
                    : "https://placehold.co/100x139/png"
                }
                alt={card.card.name}
                width={100}
                height={139}
              />
            </span>
          ))}
        </div>

        <FaArrowRightArrowLeft size={30} />

        <span
          style={{
            width: `${
              calculateLeft(myCards.length, myCards.length - 1) + 100
            }px`,
          }}
          className="relative"
        >
          {theirCards.map((card, index) => (
            <Image
              style={{ left: `${calculateLeft(myCards.length, index)}px` }}
              className={`${
                index !== 0 && "absolute top-0"
              }  block h-[139px] w-[100px] border border-black ${
                user && !userCardsIds.includes(card.cardId) && "grayscale"
              }`}
              key={card.cardId}
              src={
                card.card.imageUrl
                  ? card.card.imageUrl
                  : "https://placehold.co/100x139/png"
              }
              alt={card.card.name}
              width={100}
              height={139}
            />
          ))}
        </span>
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
