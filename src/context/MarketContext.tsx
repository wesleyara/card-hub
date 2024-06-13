import { useQuery } from "@tanstack/react-query";
import { api } from "~/lib";
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
  const requestCards = async () => {
    try {
      const response = await api.get<CardsResponse>("/cards?rpp=100&page=1");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data: cards, isLoading: isLoadingCards } = useQuery({
    queryKey: ["cards"],
    queryFn: requestCards,
  });

  return (
    <MarketContext.Provider value={{ cards, isLoadingCards }}>
      {children}
    </MarketContext.Provider>
  );
};
