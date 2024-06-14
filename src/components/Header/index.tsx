import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useAuth } from "~/hooks";
import { routes } from "~/lib";
import { useRouter } from "next/router";
import { IoMenu } from "react-icons/io5";

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
        <Icon className="h-8 w-8 md:h-10 md:w-10" />
      </span>

      <nav>
        <ul className="hidden md:flex">
          {routes.map(route => (
            <li
              key={route.path}
              className="cursor-pointer px-4 py-2 font-bold"
              onClick={() => handleNavigate(route.path)}
            >
              {route.label}
            </li>
          ))}
          <li
            className="cursor-pointer px-4 py-2 font-bold"
            onClick={() => handleNavigate(user ? "/perfil" : "/login")}
          >
            {user ? "Perfil" : "Login"}
          </li>
        </ul>

        <span className="block md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger role="button" aria-label="menu">
              <IoMenu size={35} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[100vw]">
              <DropdownMenuLabel>Card Hub Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {routes.map(route => (
                <DropdownMenuItem
                  key={route.path}
                  onClick={() => handleNavigate(route.path)}
                >
                  {route.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem
                onClick={() => handleNavigate(user ? "/perfil" : "/login")}
              >
                {user ? "Perfil" : "Login"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </nav>
    </header>
  );
};
