import { useQuery } from "@tanstack/react-query";
import { QueryKeyGetter } from "~/lib";
import { CardsResponse } from "~/types";
import { createContext, ReactNode } from "react";

type MarketContextType = {
  cards: CardsResponse | undefined;
  isLoadingCards: boolean;
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

  return (
    <MarketContext.Provider value={{ cards, isLoadingCards }}>
      {children}
    </MarketContext.Provider>
  );
};
