import { useAuth } from "~/hooks";
import { useMarket } from "~/hooks/useMarket";
import { idsInTrade } from "~/lib";
import Image from "next/image";

export const Invetory = () => {
  const { trades } = useMarket();
  const { user } = useAuth();

  const cardsLength = user?.cards.length;
  const inTrade = idsInTrade(trades, user);

  return (
    <div className="flex flex-col gap-5">
      <h3>Inventário ({cardsLength})</h3>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {user?.cards && user?.cards.length > 0 ? (
          user?.cards.map(card => (
            <span key={card.id} className="card">
              <Image
                src={
                  card.imageUrl
                    ? card.imageUrl
                    : "https://placehold.co/223x310/png"
                }
                alt={card.name || "Placeholder card"}
                width={223}
                height={310}
              />
              {inTrade.includes(card.id) && (
                <span className="absolute right-0 top-0 rounded-l-md border border-black bg-white px-3 py-1 text-[10px] text-black">
                  Em troca
                </span>
              )}
              <b className="text-black">{card.name || "Card sem nome"}</b>
              <span className="h-16 !overflow-auto px-2 text-center text-[14px] text-black">
                {card.description || "Card sem descrição"}
              </span>
            </span>
          ))
        ) : (
          <p>Você ainda não possui cards em seu inventário.</p>
        )}
      </div>
    </div>
  );
};
