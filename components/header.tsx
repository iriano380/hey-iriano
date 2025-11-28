"use client";

import { useState } from "react";
import Link from "next/link";
import "remixicon/fonts/remixicon.css";

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 bg-white dark:bg-zinc-900 shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="Logo"
            className="h-8 w-auto"
          />
          <span className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
            Hey Hiriano
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Início
          </Link>
          <Link href="/sobre" className="hover:text-blue-600 dark:hover:text-blue-400">
            Sobre
          </Link>
          <Link href="/contacto" className="hover:text-blue-600 dark:hover:text-blue-400">
            Contacto
          </Link>
        </nav>

        {/* BOTÃO MENU MOBILE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-zinc-800 dark:text-zinc-100"
        >
          <i className={open ? "ri-close-line" : "ri-menu-line"}></i>
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white dark:bg-zinc-900 px-6 pb-4 flex flex-col gap-4 text-sm shadow-lg">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="py-2 border-b border-zinc-200 dark:border-zinc-700"
          >
            Início
          </Link>
          <Link
            href="/sobre"
            onClick={() => setOpen(false)}
            className="py-2 border-b border-zinc-200 dark:border-zinc-700"
          >
            Sobre
          </Link>
          <Link
            href="/contacto"
            onClick={() => setOpen(false)}
            className="py-2"
          >
            Contacto
          </Link>
        </div>
      )}
    </header>
  );
};
