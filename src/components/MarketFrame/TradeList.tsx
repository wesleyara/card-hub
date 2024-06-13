import { useMarket } from "~/hooks/useMarket";

import { TradeCard } from "./TradeCard";

export const TradeList = () => {
  const { trades } = useMarket();

  const tradeLength = trades?.length || 0;

  return (
    <div className="flex w-full flex-col gap-5">
      <h3>Mercado ({tradeLength})</h3>

      <div className="flex w-full flex-col gap-5">
        {trades?.map(trade => (
          <TradeCard key={trade.id} item={trade} />
        ))}
      </div>
    </div>
  );
};
