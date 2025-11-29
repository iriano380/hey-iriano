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
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-3xl z-50 flex items-end gap-3">
      
      {/* Área de texto com borda */}
      <div className="flex-1 relative border border-[#212832] rounded-3xl bg-secondary/90 px-4 py-2 flex items-center gap-2">
        <ShadcnTextarea
          className="resize-none w-full bg-transparent text-white placeholder:text-zinc-400 focus:outline-none focus:ring-0 py-2 pr-10"
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

      {/* Botão de envio flutuante */}
      {status === "streaming" || status === "submitted" ? (
        <button
          type="button"
          onClick={stop}
          className="flex items-center justify-center rounded-full p-3 hover:bg-white/10 transition-colors"
        >
          <div className="animate-spin h-5 w-5 text-white">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
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
          className="flex items-center justify-center rounded-full p-3 hover:bg-white/10 transition-colors"
        >
          <ArrowUp className="h-5 w-5 text-white" />
        </button>
      )}
    </div>
  );
};
