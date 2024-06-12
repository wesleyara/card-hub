import { useAuth } from "~/hooks";
import { routes } from "~/lib";
import { useRouter } from "next/router";

import { Icon } from "../Icon";

export const Header = () => {
  const router = useRouter();
  const { user } = useAuth();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <header className="window-width mx-auto flex items-center justify-between py-4">
      <span className="flex items-center justify-center gap-3">
        <h2>Card Hub</h2>
        <Icon className="h-10 w-10" />
      </span>

      <nav>
        <ul className="hidden md:flex">
          {routes.map(route => (
            <li
              key={route.path}
              className="cursor-pointer px-4 py-2"
              onClick={() => handleNavigate(route.path)}
            >
              {route.label}
            </li>
          ))}
          <li
            className="cursor-pointer px-4 py-2"
            onClick={() => handleNavigate(user ? "/perfil" : "/login")}
          >
            {user ? "Perfil" : "Login"}
          </li>
        </ul>
      </nav>
    </header>
  );
};
