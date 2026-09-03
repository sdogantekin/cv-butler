import { describe, expect, it, vi } from "vitest";
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

type MockEnv = {
  LLM_PROVIDER: "anthropic" | "qwen" | "openai" | "deepseek" | "gemini";
  ANTHROPIC_API_KEY: string;
  ANTHROPIC_MODEL: string;
  QWEN_API_KEY: string | undefined;
  QWEN_BASE_URL: string | undefined;
  QWEN_MODEL: string | undefined;
  OPENAI_API_KEY: string | undefined;
  OPENAI_MODEL: string | undefined;
  DEEPSEEK_API_KEY: string | undefined;
  DEEPSEEK_BASE_URL: string;
  DEEPSEEK_MODEL: string | undefined;
  GEMINI_API_KEY: string | undefined;
  GEMINI_MODEL: string | undefined;
};

const baseEnv: MockEnv = {
  LLM_PROVIDER: "anthropic",
  ANTHROPIC_API_KEY: "test-anthropic-key",
  ANTHROPIC_MODEL: "claude-test-model",
  QWEN_API_KEY: undefined,
  QWEN_BASE_URL: undefined,
  QWEN_MODEL: undefined,
  OPENAI_API_KEY: undefined,
  OPENAI_MODEL: undefined,
  DEEPSEEK_API_KEY: undefined,
  DEEPSEEK_BASE_URL: "https://api.deepseek.com",
  DEEPSEEK_MODEL: undefined,
  GEMINI_API_KEY: undefined,
  GEMINI_MODEL: undefined,
};

let mockEnv: MockEnv = { ...baseEnv };

vi.mock("@/lib/env", () => ({
  get env() {
    return mockEnv;
  },
}));

const { getChatModel } = await import("./provider");

describe("getChatModel", () => {
  it("returns ChatAnthropic for the default (anthropic) provider", () => {
    mockEnv = { ...baseEnv, LLM_PROVIDER: "anthropic" };
    expect(getChatModel()).toBeInstanceOf(ChatAnthropic);
  });

  it("returns ChatOpenAI pointed at Qwen's endpoint when fully configured", () => {
    mockEnv = {
      ...baseEnv,
      LLM_PROVIDER: "qwen",
      QWEN_API_KEY: "qwen-key",
      QWEN_BASE_URL: "https://qwen.example.com/v1",
      QWEN_MODEL: "qwen-plus",
    };
    expect(getChatModel()).toBeInstanceOf(ChatOpenAI);
  });

  it("throws when qwen is selected but not fully configured", () => {
    mockEnv = { ...baseEnv, LLM_PROVIDER: "qwen" };
    expect(() => getChatModel()).toThrow(/QWEN_API_KEY/);
  });

  it("returns ChatOpenAI for the openai provider when configured", () => {
    mockEnv = {
      ...baseEnv,
      LLM_PROVIDER: "openai",
      OPENAI_API_KEY: "openai-key",
      OPENAI_MODEL: "gpt-test",
    };
    expect(getChatModel()).toBeInstanceOf(ChatOpenAI);
  });

  it("throws when openai is selected but not fully configured", () => {
    mockEnv = { ...baseEnv, LLM_PROVIDER: "openai" };
    expect(() => getChatModel()).toThrow(/OPENAI_API_KEY/);
  });

  it("returns ChatOpenAI pointed at DeepSeek's endpoint when configured", () => {
    mockEnv = {
      ...baseEnv,
      LLM_PROVIDER: "deepseek",
      DEEPSEEK_API_KEY: "deepseek-key",
      DEEPSEEK_MODEL: "deepseek-chat",
    };
    expect(getChatModel()).toBeInstanceOf(ChatOpenAI);
  });

  it("throws when deepseek is selected but not fully configured", () => {
    mockEnv = { ...baseEnv, LLM_PROVIDER: "deepseek" };
    expect(() => getChatModel()).toThrow(/DEEPSEEK_API_KEY/);
  });

  it("returns ChatGoogleGenerativeAI for the gemini provider when configured", () => {
    mockEnv = {
      ...baseEnv,
      LLM_PROVIDER: "gemini",
      GEMINI_API_KEY: "gemini-key",
      GEMINI_MODEL: "gemini-test-model",
    };
    expect(getChatModel()).toBeInstanceOf(ChatGoogleGenerativeAI);
  });

  it("throws when gemini is selected but not fully configured", () => {
    mockEnv = { ...baseEnv, LLM_PROVIDER: "gemini" };
    expect(() => getChatModel()).toThrow(/GEMINI_API_KEY/);
  });
});
