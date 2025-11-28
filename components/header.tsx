import Link from "next/link";
import { DeployButton } from "./deploy-button";

export const Header = () => {
  return (
    <div className="fixed right-0 left-0 top-4 mx-4 rounded-xl bg-white/30 dark:bg-zinc-950/30 backdrop-blur-md shadow-lg z-50">
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex flex-row items-center gap-2 shrink-0">
          <Link href="/" className="flex items-center">
            <img
              src="https://i.ibb.co/JFwJsK86/IMG-20250128-WA0048.jpg"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Botão de Assistência com efeito hover */}
        <div className="flex flex-row items-center gap-2 shrink-0">
          <div className="transition-transform duration-200 hover:scale-105">
            <DeployButton />
          </div>
        </div>
      </div>
    </div>
  );
};
