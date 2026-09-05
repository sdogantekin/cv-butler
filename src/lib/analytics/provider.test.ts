import { afterEach, describe, expect, it, vi } from "vitest";

type MockEnv = {
  ANALYTICS_PROVIDER?: "google";
  NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;
};

let mockEnv: MockEnv = {};

vi.mock("@/lib/env", () => ({
  get env() {
    return mockEnv;
  },
}));

const { getAnalyticsConfig, trackEvent } = await import("./provider");

afterEach(() => {
  vi.unstubAllGlobals();
  mockEnv = {};
});

describe("getAnalyticsConfig", () => {
  it("returns null when ANALYTICS_PROVIDER is unset", () => {
    expect(getAnalyticsConfig()).toBeNull();
  });

  it("returns the google config when fully configured", () => {
    mockEnv = { ANALYTICS_PROVIDER: "google", NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-TEST123" };
    expect(getAnalyticsConfig()).toEqual({ provider: "google", measurementId: "G-TEST123" });
  });

  it("throws when google is selected but NEXT_PUBLIC_GA_MEASUREMENT_ID is missing", () => {
    mockEnv = { ANALYTICS_PROVIDER: "google" };
    expect(() => getAnalyticsConfig()).toThrow(/NEXT_PUBLIC_GA_MEASUREMENT_ID/);
  });
});

describe("trackEvent", () => {
  it("no-ops when analytics is unconfigured, even if window.gtag exists", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag });
    trackEvent("ats_review_completed", { score: 82 });
    expect(gtag).not.toHaveBeenCalled();
  });

  it("calls window.gtag with the expected shape when google is configured", () => {
    mockEnv = { ANALYTICS_PROVIDER: "google", NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-TEST123" };
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag });
    trackEvent("ats_review_completed", { score: 82 });
    expect(gtag).toHaveBeenCalledWith("event", "ats_review_completed", { score: 82 });
  });

  it("no-ops (not throws) if gtag.js hasn't loaded yet", () => {
    mockEnv = { ANALYTICS_PROVIDER: "google", NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-TEST123" };
    vi.stubGlobal("window", {});
    expect(() => trackEvent("ats_review_completed")).not.toThrow();
  });
});
