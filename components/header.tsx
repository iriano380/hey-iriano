import Link from "next/link";
import { DeployButton } from "./deploy-button";
import { GroqIcon } from "./icons";

export const Header = () => {
  return (
    <div className="fixed right-0 left-0 w-full top-0 bg-white dark:bg-zinc-950">
      <div className="flex justify-between items-center p-4">
        <div className="flex flex-row items-center gap-2 shrink-0 ">
          <span className="jsx-e3e12cc6f9ad5a71 flex flex-row items-center gap-2 home-links">

            <Link
              className="text-zinc-800 dark:text-zinc-100 -translate-y-[.5px]"
              rel="noopener"
              target="_blank"
              href="https://vercel.com/"
            >
              <svg
                data-testid="geist-icon"
                height={18}
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width={18}
                style={{ color: "currentcolor" }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 1L16 15H0L8 1Z"
                  fill="currentColor"
                />
              </svg>
            </Link>

            {/* TRAÇO REMOVIDO AQUI */}

            <div className="jsx-e3e12cc6f9ad5a71 flex flex-row items-center gap-4">
              <Link className="flex flex-row items-end gap-2" target="_blank" href="https://groq.com">
                <GroqIcon size={32} />
              </Link>
            </div>

          </span>
        </div>

        <div className="flex flex-row items-center gap-2 shrink-0">
          <DeployButton />
        </div>
      </div>
    </div>
  );
};
