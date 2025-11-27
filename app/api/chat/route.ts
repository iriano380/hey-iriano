import { model, modelID } from "@/ai/providers";
import { weatherTool } from "@/ai/tools";
import { convertToModelMessages, stepCountIs, streamText, streamImage, UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, selectedModel, generateImage }: { 
    messages: UIMessage[]; 
    selectedModel: modelID;
    generateImage?: boolean; // nova flag
  } = await req.json();

  if (generateImage) {
    // GERAR IMAGEM
    const result = streamImage({
      model: model.imageModel(selectedModel), // modelo de imagem
      prompt: messages.map(m => m.content).join("\n"), // combina todas as mensagens como prompt
      size: "1024x1024", // ou "512x512", "256x256"
      experimental_telemetry: { isEnabled: false },
    });

    return result.toUIMessageStreamResponse({
      onError: (error) => {
        console.error(error);
        return "An error occurred while generating the image.";
      },
    });
  } else {
    // RESPOSTA DE TEXTO NORMAL
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
}
