// components/chat/NewChatButton.tsx

"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

export const NewChatButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-20 left-4 z-[70]">
      {/* Botão + */}
      <button
        onClick={() => setOpen(!open)}
        className="
          p-3 
          rounded-full 
          shadow-md 
          bg-white dark:bg-zinc-900 
          border border-zinc-200 dark:border-zinc-700
          hover:bg-zinc-100 dark:hover:bg-zinc-800
          transition
        "
      >
        <Plus className="h-5 w-5 text-black dark:text-white" />
      </button>

      {/* MENU — igual ao ChatGPT */}
      {open && (
        <div
          className="
            mt-3 w-48 
            rounded-xl 
            bg-white dark:bg-zinc-900 
            shadow-xl 
            border border-zinc-200 dark:border-zinc-700
            overflow-hidden
            animate-fadeIn
          "
        >
          <button className="w-full text-left px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
            Novo chat
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
            Histórico
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
            Sugestões
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
            WhatsApp
          </button>
        </div>
      )}
    </div>
  );
};
