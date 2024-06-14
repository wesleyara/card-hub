/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useToast } from "~/components/ui/use-toast";
import { useAuth } from "~/hooks";
import { api, endpoints, QueryKeyGetter } from "~/lib";
import { CardsResponse, TradesResponse } from "~/types";
import { createContext, ReactNode } from "react";

type MarketContextType = {
  cards: CardsResponse | undefined;
  trades: TradesResponse[] | undefined;
  handleTradeCards: (
    cardsToOffer: string[],
    cardsToReceive: string[],
  ) => Promise<void>;
  handleCancelTrade: (tradeId: string) => Promise<void>;
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
  const { token } = useAuth();
  const { toast } = useToast();

  const { data: cards, isLoading: isLoadingCards } = useQuery({
    queryKey: ["cards"],
    queryFn: queryKeyGetter.requestCards,
  });

  const {
    data: trades,
    isLoading: isLoadingTrades,
    refetch,
  } = useQuery({
    queryKey: ["trades"],
    queryFn: queryKeyGetter.requestTrades,
  });

  // função responsável por realizar a troca de cartas
  const handleTradeCards = async (
    cardsToOffer: string[],
    cardsToReceive: string[],
  ) => {
    const mountedOffer = cardsToOffer.map(cardId => {
      return { cardId, type: "OFFERING" };
    });
    const mountedReceive = cardsToReceive.map(cardId => {
      return { cardId, type: "RECEIVING" };
    });
    try {
      await api.post(
        endpoints.addTrades,
        {
          cards: [...mountedOffer, ...mountedReceive],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await refetch();

      toast({
        title: "Sucesso",
        description: "Troca adicionada com sucesso.",
      });
    } catch (error: any) {
      console.error(error);

      toast({
        title: "Erro ao fazer o registro",
        description: error.response.data.message,
      });
    }
  };

  // função responsável por cancelar uma troca
  const handleCancelTrade = async (tradeId: string) => {
    try {
      await api.delete(`${endpoints.deleteTrade}/${tradeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await refetch();
      toast({
        title: "Sucesso",
        description: "Troca cancelada com sucesso.",
      });
    } catch (error: any) {
      console.error(error);

      toast({
        title: "Erro ao fazer o registro",
        description: error.response.data.message,
      });
    }
  };

  return (
    <MarketContext.Provider
      value={{
        cards,
        trades,
        handleTradeCards,
        handleCancelTrade,
        isLoadingCards,
        isLoadingTrades,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};
