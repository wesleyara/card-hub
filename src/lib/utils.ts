import { IUser, TradesResponse } from "~/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// função responsável por retornar os ids das cartas em trade
export const idsInTrade = (
  trades: TradesResponse[] | undefined,
  user: IUser | undefined,
) => {
  const ids: string[] = [];

  if (trades) {
    trades
      .filter(item => item.user.name === user?.name)
      .forEach(trade => {
        trade.tradeCards.forEach(card => {
          if (card.type === "OFFERING") {
            ids.push(card.cardId);
          }
        });
      });
  }

  return ids;
};
