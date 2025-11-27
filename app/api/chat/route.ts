import { model, modelID } from "@/ai/providers";
import { weatherTool } from "@/ai/tools";
import { convertToModelMessages, stepCountIs, streamText, streamImage, UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    selectedModel,
    generateImage, // nova flag opcional para imagens
  }: { messages: UIMessage[]; selectedModel: modelID; generateImage?: boolean } =
    await req.json();

  if (generateImage) {
    // GERAR IMAGEM
    const result = streamImage({
      model: model.imageModel(selectedModel),
      prompt: messages.map((m) => m.content).join("\n"),
      size: "1024x1024", // pode mudar para "512x512" ou "256x256"
      experimental_telemetry: {
        isEnabled: false,
      },
    });

    return result.toUIMessageStreamResponse({
      onError: (error) => {
        console.error(error);
        return "Ocorreu um erro ao gerar a imagem.";
      },
    });
  }

  // RESPOSTA DE TEXTO NORMAL
  const result = streamText({
    model: model.languageModel(selectedModel),
    system: "você é hiriano, um assistente amigável.",
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5), // enable multi-step agentic flow
    tools: {
      getWeather: weatherTool,
    },
    experimental_telemetry: {
      isEnabled: false,
    },
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message.includes("Rate limit")) {
          return "Rate limit exceeded. Please try again later.";
        }
      }
      console.error(error);
      return "Ocorreu um erro.";
    },
  });
}
