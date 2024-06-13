import { MarketContext } from "~/context";
import { useContext } from "react";

export const useMarket = () => {
  const context = useContext(MarketContext);

  return context;
};
