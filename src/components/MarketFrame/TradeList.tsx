import { useAuth } from "~/hooks";
import { useMarket } from "~/hooks/useMarket";

import { TradeCard } from "./TradeCard";

export const TradeList = () => {
  const { trades } = useMarket();
  const { user } = useAuth();

  const tradeLength = trades?.length || 0;

  return (
    <div className="flex w-full flex-col gap-5">
      <h3>Mercado ({tradeLength})</h3>

      <div className="flex w-full flex-col gap-5">
        <h5>Suas Trocas</h5>
        {trades
          ?.filter(val => val.user.name === user?.name)
          .map(trade => (
            <TradeCard key={trade.id} item={trade} />
          ))}
      </div>

      <div className="flex w-full flex-col gap-5">
        <h5>Todas Trocas</h5>
        {trades
          ?.filter(val => val.user.name !== user?.name)
          .map(trade => (
            <TradeCard key={trade.id} item={trade} />
          ))}
      </div>
    </div>
  );
};
