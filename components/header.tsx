"use client";

import Link from "next/link";
import { DeployButton } from "./deploy-button";
import { useEffect, useState } from "react";

export const Header = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [autoCollapsedOnce, setAutoCollapsedOnce] = useState(false);

  useEffect(() => {
    // Encolher automaticamente após 5 segundos (apenas no cliente)
    const timer = setTimeout(() => {
      setCollapsed(true);
      // mostra a mensagem só na primeira vez que encolhe automaticamente
      if (!autoCollapsedOnce) {
        setShowMessage(true);
        setAutoCollapsedOnce(true);
        // esconde a mensagem depois de 4s
        setTimeout(() => setShowMessage(false), 4000);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [autoCollapsedOnce]);

  const toggleBar = () => setCollapsed((s) => !s);

  return (
    <>
      {/* Mensagem flutuante (aparece apenas quando showMessage = true) */}
      <div
        aria-hidden={!showMessage}
        className={`fixed top-20 left-1/2 z-[60] -translate-x-1/2 rounded-lg px-4 py-2 text-white shadow-lg transition-opacity duration-300 ${
          showMessage ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "#212832" }}
      >
        Clique no ícone para expandir a barra
      </div>

      {/* Header container */}
      <div
        className="fixed right-0 left-0 top-4 mx-4 rounded-xl bg-white/30 dark:bg-zinc-950/30 backdrop-blur-md shadow-lg z-50 border transition-[width] duration-500 ease-in-out overflow-hidden"
        style={{
          borderColor: "#212832",
          width: collapsed ? "90px" : "calc(100% - 2rem)", // mx-4 -> subtrai 2rem
          maxWidth: "100%",
        }}
      >
        <div className="flex items-center justify-between py-2 px-4">
          {/* Logo: botão para acessibilidade/clicar — mantém sempre o mesmo tamanho */}
          <button
            onClick={toggleBar}
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Expandir barra" : "Recolher barra"}
            className="flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0"
          >
            <Link href="/" className="flex items-center">
              <img
                src="https://i.ibb.co/JFwJsK86/IMG-20250128-WA0048.jpg"
                alt="Logo"
                className="h-10 w-auto object-contain"
                // mantém o tamanho independentemente do estado
                style={{ height: 40 }}
              />
            </Link>
          </button>

          {/* Botão de assistência — oculto quando encolhido */}
          <div
            className={`flex items-center gap-2 transition-opacity duration-300 ${
              collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <div className="transition-transform duration-200 hover:scale-105">
              <DeployButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
