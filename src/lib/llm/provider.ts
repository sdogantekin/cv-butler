import { ChatAnthropic } from "@langchain/anthropic";
import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { env } from "@/lib/env";

// Provider-agnostic: switching LLM provider is a .env change (LLM_PROVIDER),
// never a code change. v1 default is Claude. Qwen and DeepSeek are wired via
// an OpenAI-compatible endpoint (no first-party SDK exists for either);
// OpenAI and Gemini use their own first-party LangChain packages. Adding
// local Ollama in v2 is one more case here.
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
    case "openai":
      if (!env.OPENAI_API_KEY || !env.OPENAI_MODEL) {
        throw new Error("LLM_PROVIDER=openai requires OPENAI_API_KEY and OPENAI_MODEL to be set.");
      }
      return new ChatOpenAI({
        apiKey: env.OPENAI_API_KEY,
        model: env.OPENAI_MODEL,
      });
    case "deepseek":
      if (!env.DEEPSEEK_API_KEY || !env.DEEPSEEK_MODEL) {
        throw new Error("LLM_PROVIDER=deepseek requires DEEPSEEK_API_KEY and DEEPSEEK_MODEL to be set.");
      }
      return new ChatOpenAI({
        apiKey: env.DEEPSEEK_API_KEY,
        model: env.DEEPSEEK_MODEL,
        configuration: { baseURL: env.DEEPSEEK_BASE_URL },
      });
    case "gemini":
      if (!env.GEMINI_API_KEY || !env.GEMINI_MODEL) {
        throw new Error("LLM_PROVIDER=gemini requires GEMINI_API_KEY and GEMINI_MODEL to be set.");
      }
      return new ChatGoogleGenerativeAI({
        apiKey: env.GEMINI_API_KEY,
        model: env.GEMINI_MODEL,
      });
    default:
      throw new Error(`Unsupported LLM_PROVIDER: ${env.LLM_PROVIDER}`);
  }
}
