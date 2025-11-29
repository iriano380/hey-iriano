import { modelID } from "@/ai/providers";
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";
import { ModelPicker } from "./model-picker";

interface InputProps {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  status: string;
  stop: () => void;
  selectedModel: modelID;
  setSelectedModel: (model: modelID) => void;
}

export const Textarea = ({
  input,
  handleInputChange,
  isLoading,
  status,
  stop,
  selectedModel,
  setSelectedModel,
}: InputProps) => {
  return (
    <div className="w-full fixed bottom-0 left-0 right-0 px-4 pb-4 z-[60] bg-gradient-to-t from-background/80 to-background/0 backdrop-blur-md">

      {/* Modelo — estilo ChatGPT */}
      <div className="mb-2 flex justify-center">
        <ModelPicker
          setSelectedModel={setSelectedModel}
          selectedModel={selectedModel}
        />
      </div>

      {/* Caixa estilo cápsula */}
      <div className="relative max-w-3xl mx-auto">
        <ShadcnTextarea
          className="
            resize-none 
            w-full 
            bg-zinc-100 dark:bg-zinc-900 
            rounded-3xl
            py-3 pr-12 pl-4 
            shadow-sm
            border 
            border-zinc-300 dark:border-zinc-800
            focus-visible:ring-0 focus-visible:ring-offset-0
          "
          value={input}
          autoFocus
          placeholder="Envie uma mensagem…"
          // @ts-expect-error err
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (input.trim() && !isLoading) {
                // @ts-expect-error err
                const form = e.target.closest("form");
                if (form) form.requestSubmit();
              }
            }
          }}
        />

        {/* Botão enviar / stop (igual ao ChatGPT) */}
        {status === "streaming" || status === "submitted" ? (
          <button
            type="button"
            onClick={stop}
            className="
              absolute right-3 bottom-3
              p-2 rounded-full 
              bg-zinc-200 dark:bg-zinc-700
              transition
            "
          >
            <div className="animate-spin h-4 w-4">
              <svg className="h-4 w-4 text-black dark:text-white" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          </button>
        ) : (
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="
              absolute right-3 bottom-3
              p-2 rounded-full 
              bg-black dark:bg-white
              hover:opacity-80
              transition 
              disabled:bg-zinc-400 disabled:dark:bg-zinc-700
              disabled:cursor-not-allowed
            "
          >
            <ArrowUp className="h-4 w-4 text-white dark:text-black" />
          </button>
        )}
      </div>
    </div>
  );
};
