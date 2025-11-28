"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DeployButton } from "./deploy-button";
import { Menu } from "lucide-react";

export const Header = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Encolher automaticamente após 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setCollapsed(true);
      setShowHint(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const toggleBar = () => {
    setCollapsed((prev) => !prev);

    if (showHint) setShowHint(false);
  };

  return (
    <div
      className={`fixed right-0 left-0 top-4 mx-4 rounded-xl bg-white/30 
        dark:bg-zinc-950/30 backdrop-blur-md shadow-lg z-50 border 
        transition-all duration-500`}
      style={{ borderColor: "#212832" }}
    >
      <div
        className={`flex items-center py-2 px-4 transition-all duration-500 ${
          collapsed ? "justify-start" : "justify-between"
        }`}
      >
        {/* Logo – sempre visível e clicável */}
        <div
          className="flex flex-row items-center gap-2 shrink-0 cursor-pointer"
          onClick={toggleBar}
        >
          <Image
            src="https://i.ibb.co/JFwJsK86/IMG-20250128-WA0048.jpg"
            alt="Logo"
            width={45}
            height={45}
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Botão quando expandido */}
        {!collapsed && (
          <div className="flex flex-row items-center gap-2 shrink-0 transition-transform duration-200 hover:scale-105">
            <DeployButton />
          </div>
        )}

        {/* Ícone quando encolhido */}
        {collapsed && (
          <button
            onClick={toggleBar}
            className="ml-3 p-2 rounded-full hover:bg-white/20 transition"
          >
            <Menu size={22} />
          </button>
        )}
      </div>

      {/* Mensagem ao encolher pela primeira vez */}
      {collapsed && showHint && (
        <div className="absolute right-2 top-full mt-2 bg-[#212832] text-white text-sm px-3 py-1 rounded-lg shadow-lg">
          Clique no ícone para expandir a barra
        </div>
      )}
    </div>
  );
};
