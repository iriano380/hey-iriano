import { model, modelID } from "@/ai/providers";
import { weatherTool } from "@/ai/tools";
import { convertToModelMessages, stepCountIs, streamText, UIMessage } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    selectedModel,
    generateImage,
    imagePrompt,
  }: { 
    messages: UIMessage[]; 
    selectedModel: modelID;
    generateImage?: boolean;
    imagePrompt?: string;
  } = await req.json();

  try {
    // Se o usuário quer gerar uma imagem
    if (generateImage && imagePrompt) {
      const imageResult = await model.image.generate({
        prompt: imagePrompt,
        size: "1024x1024",
      });

      return new Response(JSON.stringify({ type: "image", url: imageResult.url }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Caso padrão: gerar texto
    const textResult = streamText({
      model: model.languageModel(selectedModel),
      system: "Você é Hiriano, um assistente amigável.",
      messages: convertToModelMessages(messages),
      stopWhen: stepCountIs(5),
      tools: {
        getWeather: weatherTool,
      },
      experimental_telemetry: {
        isEnabled: false,
      },
    });

    return textResult.toUIMessageStreamResponse({
      sendReasoning: true,
      onError: (error) => {
        console.error(error);
        if (error instanceof Error && error.message.includes("Rate limit")) {
          return "Rate limit exceeded. Please try again later.";
        }
        return "An error occurred.";
      },
    });
  } catch (err) {
    console.error("Erro no endpoint:", err);
    return new Response(JSON.stringify({ error: "Erro ao processar a requisição." }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
