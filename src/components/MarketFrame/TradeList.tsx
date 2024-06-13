import { useAuth } from "~/hooks";
import { useMarket } from "~/hooks/useMarket";

import { TradeCard } from "./TradeCard";

export const TradeList = () => {
  const { trades } = useMarket();
  const { user } = useAuth();

  const tradeLength = trades?.length || 0;

  const myTrades = trades?.filter(val => val.user.name === user?.name);
  const otherTrades = trades?.filter(val => val.user.name !== user?.name);

  return (
    <div className="flex w-full flex-col gap-5">
      <h3>Mercado ({tradeLength})</h3>

      <div className="flex w-full flex-col gap-5">
        <h5>Suas Trocas</h5>
        {myTrades && myTrades.length > 0 ? (
          myTrades.map(trade => <TradeCard key={trade.id} item={trade} />)
        ) : (
          <span>Você não tem trocas</span>
        )}
      </div>

      <div className="flex w-full flex-col gap-5">
        <h5>Todas Trocas</h5>
        {otherTrades && otherTrades.length > 0 ? (
          otherTrades.map(trade => <TradeCard key={trade.id} item={trade} />)
        ) : (
          <span>Não há trocas disponíveis</span>
        )}
      </div>
    </div>
  );
};
