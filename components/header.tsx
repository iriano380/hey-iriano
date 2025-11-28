import Link from "next/link";
import { DeployButton } from "./deploy-button";
import { useEffect, useState } from "react";

export const Header = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [autoCollapsedOnce, setAutoCollapsedOnce] = useState(false);

  useEffect(() => {
    // Encolher automaticamente após 5 segundos
    const timer = setTimeout(() => {
      setCollapsed(true);
      setShowMessage(true);
      setAutoCollapsedOnce(true);
      // Esconde a mensagem depois de 4 segundos
      setTimeout(() => setShowMessage(false), 4000);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Alternar expandir/encolher ao clicar no logo
  const toggleBar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {/* Mensagem flutuante quando encolhe pela primeira vez */}
      {showMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#212832] text-white px-4 py-2 rounded-lg shadow-lg z-[60] animate-fade">
          Clique no ícone para expandir a barra
        </div>
      )}

      <div
        className="fixed right-0 left-0 top-4 mx-4 rounded-xl bg-white/30 dark:bg-zinc-950/30 backdrop-blur-md shadow-lg z-50 border transition-all duration-500 overflow-hidden"
        style={{
          borderColor: "#212832",
          width: collapsed ? "90px" : "100%",
          maxWidth: "100%",
        }}
      >
        <div className="flex items-center justify-between py-2 px-4">
          {/* LOGÓTIPO — sempre visível e mesmo tamanho */}
          <div
            className="flex items-center cursor-pointer select-none"
            onClick={toggleBar}
          >
            <img
              src="https://i.ibb.co/JFwJsK86/IMG-20250128-WA0048.jpg"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* BOTÃO — desaparece quando encolhido */}
          {!collapsed && (
            <div className="transition-transform duration-200 hover:scale-105">
              <DeployButton />
            </div>
          )}
        </div>
      </div>

      {/* Pequena animação para o aviso */}
      <style jsx>{`
        @keyframes fade {
          0% {
            opacity: 0;
            transform: translate(-50%, -10px);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0px);
          }
        }
        .animate-fade {
          animation: fade 0.4s ease-out;
        }
      `}</style>
    </>
  );
};
