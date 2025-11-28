import Link from "next/link";
import { DeployButton } from "./deploy-button";

export const Header = () => {
  return (
    <>
      {/* Nuvem branca atrás do cabeçalho (agora estendida para baixo) */}
<div
  className="
    fixed top-0 left-0 right-0
    h-40        /* aumentei de 20 para 40 */
    bg-white/50 dark:bg-zinc-900/40
    backdrop-blur-xl
    pointer-events-none
    z-30
  "
  style={{
    maskImage: `
      linear-gradient(
        to bottom,
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,1) 35%,
        rgba(0,0,0,0) 100%
      )
    `,
  }}
/>

      {/* Cabeçalho real acima das nuvens */}
      <div
        className="fixed right-0 left-0 top-4 mx-4 rounded-xl bg-white/30 dark:bg-zinc-950/30 backdrop-blur-md shadow-lg z-50 border"
        style={{ borderColor: "#212832" }}
      >
        <div className="flex justify-between items-center py-2 px-4">
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

          {/* Botão */}
          <div className="flex flex-row items-center gap-2 shrink-0">
            <div className="transition-transform duration-200 hover:scale-105">
              <DeployButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
