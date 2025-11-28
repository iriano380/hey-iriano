import Link from "next/link";
import { DeployButton } from "./deploy-button";
import { useEffect, useState } from "react";

export const Header = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCollapsed(true), 7000); // 7 segundos
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-4 left-4 flex items-center rounded-xl bg-white/30 dark:bg-zinc-950/30 backdrop-blur-md shadow-lg z-50 border transition-all duration-500 overflow-hidden`}
      style={{
        borderColor: "#212832",
        width: collapsed ? "80px" : "400px", // largura animada
      }}
    >
      {/* Logo sempre visível, tamanho constante */}
      <Link href="/" className="flex items-center px-4 py-2 shrink-0">
        <img
          src="https://i.ibb.co/JFwJsK86/IMG-20250128-WA0048.jpg"
          alt="Logo"
          className="h-10 w-auto object-contain"
        />
      </Link>

      {/* Botão de assistência, visível apenas quando expandido */}
      {!collapsed && (
        <div className="flex items-center gap-2 ml-auto pr-4 transition-opacity duration-500">
          <DeployButton />
        </div>
      )}

      {/* Botão moderno de expandir, visível apenas quando colapsado */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="ml-auto mr-2 p-2 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md rounded-full hover:bg-white/70 dark:hover:bg-zinc-700 transition-colors"
        >
          <span className="text-black dark:text-white font-bold">≡</span>
        </button>
      )}
    </div>
  );
};
