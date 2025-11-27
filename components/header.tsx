"use client";

import Link from "next/link";
import { GroqIcon } from "./icons"; // opcional: remove se não usar

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between py-3 px-4">
        
        {/* LOGO + NOME (estilo ChatGPT Pro) */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold shadow">
            H
          </div>
          <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Hiriano AI
          </span>
        </div>

        {/* LINKS DO LADO DIREITO */}
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="#"
            className="text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition"
          >
            Atualizações
          </Link>
          <Link
            href="#"
            className="text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition"
          >
            Modelos
          </Link>
          <Link
            href="#"
            className="text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition"
          >
            Documentação
          </Link>

          {/* Botão estilo ChatGPT */}
          <Link
            href="#"
            className="px-4 py-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-80 transition"
          >
            Entrar
          </Link>
        </nav>
      </div>
    </header>
  );
};
