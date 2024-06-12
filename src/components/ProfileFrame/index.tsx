import { Invetory } from "./Inventory";
import { Profile } from "./Profile";

export const ProfileFrame = () => {
  return (
    <section className="window-width mx-auto flex flex-col gap-4">
      <Profile />
      <Invetory />
    </section>
  );
};
