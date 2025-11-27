import { groq } from "@ai-sdk/groq";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
  ImageModel, // ⚡ usar isso no lugar de wrapImageModel
} from "ai";

// Modelos de texto
const languageModels = {
  "kimi-k2": groq("moonshotai/kimi-k2-instruct"),
  "meta-llama/llama-4-scout-17b-16e-instruct": groq(
    "meta-llama/llama-4-scout-17b-16e-instruct"
  ),
};

// Modelos de imagem
const imageModels = {
  "dalle-mini": new ImageModel({
    model: groq("openai/dalle-mini"),
  }),
};

export const model = customProvider({
  languageModels,
  imageModels,
});

export type modelID = keyof typeof languageModels;

export const MODELS = Object.keys(languageModels);

export const defaultModel: modelID = "kimi-k2";
