import Link from "next/link";
import { DeployButton } from "./deploy-button";
import { GroqIcon } from "./icons";

export const Header = () => {
  return (
    <header className="fixed top-4 left-4 right-4 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 z-50 rounded-2xl shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        {/* lado esquerdo: logo + nome */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3" aria-label="Home">
            {/* SVG do triângulo (logo) */}
            <svg
              data-testid="geist-icon"
              height={20}
              width={20}
              viewBox="0 0 16 16"
              style={{ color: "currentcolor" }}
              aria-hidden
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 1L16 15H0L8 1Z"
                fill="currentColor"
              />
            </svg>

            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 select-none">
              Hiriano
            </span>
          </Link>
        </div>

        {/* centro (flexível) */}
        <div className="flex-1" />

        {/* lado direito: ícone Groq + DeployButton */}
        <div className="flex items-center gap-3">
          <Link
            href="https://groq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
            aria-label="Groq"
          >
            <GroqIcon size={28} />
          </Link>

          <DeployButton />
        </div>
      </div>
    </header>
  );
};
