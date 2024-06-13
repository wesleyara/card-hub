import { useQuery } from "@tanstack/react-query";
import { QueryKeyGetter } from "~/lib";
import { CardsResponse, TradesResponse } from "~/types";
import { createContext, ReactNode } from "react";

type MarketContextType = {
  cards: CardsResponse | undefined;
  trades: TradesResponse[] | undefined;
  isLoadingCards: boolean;
  isLoadingTrades: boolean;
};

type MarketProviderProps = {
  children: ReactNode;
};

export const MarketContext = createContext<MarketContextType>(
  {} as MarketContextType,
);

export const MarketProvider = ({ children }: MarketProviderProps) => {
  const queryKeyGetter = new QueryKeyGetter();

  const { data: cards, isLoading: isLoadingCards } = useQuery({
    queryKey: ["cards"],
    queryFn: queryKeyGetter.requestCards,
  });

  const { data: trades, isLoading: isLoadingTrades } = useQuery({
    queryKey: ["trades"],
    queryFn: queryKeyGetter.requestTrades,
  });

  return (
    <MarketContext.Provider
      value={{ cards, trades, isLoadingCards, isLoadingTrades }}
    >
      {children}
    </MarketContext.Provider>
  );
};
