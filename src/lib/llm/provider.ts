import { ChatAnthropic } from "@langchain/anthropic";
import { ChatOpenAI } from "@langchain/openai";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { env } from "@/lib/env";

// Provider-agnostic: switching LLM provider is a .env change (LLM_PROVIDER),
// never a code change. v1 default is Claude; Qwen is an optional second cloud
// provider wired via an OpenAI-compatible endpoint (no first-party Qwen SDK
// exists). Adding local Ollama in v2 is one more case here.
export function getChatModel(): BaseChatModel {
  switch (env.LLM_PROVIDER) {
    case "anthropic":
      return new ChatAnthropic({
        apiKey: env.ANTHROPIC_API_KEY,
        model: env.ANTHROPIC_MODEL,
      });
    case "qwen":
      if (!env.QWEN_API_KEY || !env.QWEN_BASE_URL || !env.QWEN_MODEL) {
        throw new Error(
          "LLM_PROVIDER=qwen requires QWEN_API_KEY, QWEN_BASE_URL, and QWEN_MODEL to be set.",
        );
      }
      return new ChatOpenAI({
        apiKey: env.QWEN_API_KEY,
        model: env.QWEN_MODEL,
        configuration: { baseURL: env.QWEN_BASE_URL },
      });
    default:
      throw new Error(`Unsupported LLM_PROVIDER: ${env.LLM_PROVIDER}`);
  }
}
