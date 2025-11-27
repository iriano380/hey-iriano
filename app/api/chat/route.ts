import { model, modelID } from "@/ai/providers";
import { weatherTool } from "@/ai/tools";
import { convertToModelMessages, stepCountIs, streamText, UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    selectedModel,
    generateImage, // novo campo: se true, gera imagem
    imagePrompt,   // prompt para gerar a imagem
  }: { 
    messages: UIMessage[]; 
    selectedModel: modelID;
    generateImage?: boolean;
    imagePrompt?: string;
  } = await req.json();

  // Se o usuário quer gerar uma imagem
  if (generateImage && imagePrompt) {
    try {
      const imageResult = await model.languageModel(selectedModel).generateImage({
        prompt: imagePrompt,
        size: "1024x1024",
      });

      // Retorna a URL ou base64 da imagem
      return new Response(JSON.stringify({ type: "image", url: imageResult.url }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Erro ao gerar imagem:", err);
      return new Response(JSON.stringify({ error: "Erro ao gerar imagem." }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // Caso padrão: gerar texto
  const result = streamText({
    model: model.languageModel(selectedModel),
    system: "você é hiriano, um assistente amigável.",
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
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
      return "An error occurred.";
    },
  });
}
