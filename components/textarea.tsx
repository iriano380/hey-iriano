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
    <div className="fixed bottom-0 left-0 w-full bg-primary/90 backdrop-blur-md p-4 z-50 flex items-end gap-2 shadow-lg">
      <div className="flex-1 relative">
        <ShadcnTextarea
          className="resize-none w-full rounded-2xl pr-12 pt-4 pb-16 bg-secondary/90 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          value={input}
          autoFocus
          placeholder="Say something..."
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
        <ModelPicker
          setSelectedModel={setSelectedModel}
          selectedModel={selectedModel}
        />
      </div>

      {status === "streaming" || status === "submitted" ? (
        <button
          type="button"
          onClick={stop}
          className="cursor-pointer rounded-full p-3 bg-black hover:bg-zinc-800 transition-colors flex items-center justify-center shadow-md"
        >
          <div className="animate-spin h-5 w-5">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24">
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
          className="rounded-full p-3 bg-black hover:bg-zinc-800 disabled:bg-zinc-300 disabled:dark:bg-zinc-700 dark:disabled:opacity-80 disabled:cursor-not-allowed transition-colors flex items-center justify-center shadow-md"
        >
          <ArrowUp className="h-5 w-5 text-white" />
        </button>
      )}
    </div>
  );
};
