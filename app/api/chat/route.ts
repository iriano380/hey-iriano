import { model, modelID } from "@/ai/providers";
import { weatherTool } from "@/ai/tools";
import { convertToModelMessages, stepCountIs, streamText, streamImage, UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const {
      messages,
      selectedModel,
      generateImage, // flag opcional para imagens
    }: { messages: UIMessage[]; selectedModel: modelID; generateImage?: boolean } =
      await req.json();

    // Se a flag de imagem estiver ativa
    if (generateImage) {
      const result = streamImage({
        model: model.imageModel(selectedModel),
        prompt: messages.map((m) => m.content).join("\n"),
        size: "1024x1024",
        experimental_telemetry: { isEnabled: false },
      });

      return result.toUIMessageStreamResponse({
        onError: (error) => {
          console.error("Erro ao gerar imagem:", error);
          return "Ocorreu um erro ao gerar a imagem.";
        },
      });
    }

    // Resposta de texto normal
    const result = streamText({
      model: model.languageModel(selectedModel),
      system: "você é hiriano, um assistente amigável.",
      messages: convertToModelMessages(messages),
      stopWhen: stepCountIs(5),
      tools: { getWeather: weatherTool },
      experimental_telemetry: { isEnabled: false },
    });

    return result.toUIMessageStreamResponse({
      sendReasoning: true,
      onError: (error) => {
        console.error("Erro ao gerar texto:", error);
        if (error instanceof Error && error.message.includes("Rate limit")) {
          return "Rate limit exceeded. Please try again later.";
        }
        return "Ocorreu um erro ao gerar a resposta.";
      },
    });
  } catch (err) {
    console.error("Erro geral no POST:", err);
    return new Response("Erro no servidor", { status: 500 });
  }
}
