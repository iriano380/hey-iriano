"use client";

import { DeployButton } from "./deploy-button";
import { useEffect, useState } from "react";

export const Header = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [autoCollapsedOnce, setAutoCollapsedOnce] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCollapsed(true);

      if (!autoCollapsedOnce) {
        setShowMessage(true);
        setAutoCollapsedOnce(true);

        setTimeout(() => setShowMessage(false), 4000);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [autoCollapsedOnce]);

  const toggleBar = () => {
    setCollapsed((s) => !s);
    setShowMessage(false);
  };

  return (
    <>
      {/* Mensagem */}
      {showMessage && (
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] rounded-lg px-4 py-2 text-white shadow-lg"
          style={{ backgroundColor: "#212832" }}
        >
          Clique no ícone para expandir a barra
        </div>
      )}

      {/* Header */}
      <div
        className="fixed right-0 left-0 top-4 mx-4 rounded-xl bg-white/30 dark:bg-zinc-950/30 backdrop-blur-md shadow-lg z-50 border transition-all duration-500 ease-in-out overflow-hidden"
        style={{
          borderColor: "#212832",
          width: collapsed ? "95px" : "calc(100% - 2rem)",
        }}
      >
        <div
          className={`flex items-center px-4 transition-all duration-500 ${
            collapsed ? "justify-start py-2" : "justify-between py-2"
          }`}
        >
          {/* Logo (CLICÁVEL SEM PROBLEMA) */}
          <button
            onClick={toggleBar}
            className="flex items-center cursor-pointer bg-transparent border-0 p-0"
          >
            <img
              src="https://i.ibb.co/JFwJsK86/IMG-20250128-WA0048.jpg"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          </button>

          {/* Botão (desaparece quando encolhe) */}
          {!collapsed && (
            <div className="transition-transform duration-200 hover:scale-105">
              <DeployButton />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
