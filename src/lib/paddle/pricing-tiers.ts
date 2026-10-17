export interface Tier {
  name: "Starter" | "Pro" | "Advanced";
  description: string;
  features: string[];
  priceId: { month: string; year: string };
}

// Paddle sandbox price IDs — swap for production IDs when NEXT_PUBLIC_PADDLE_ENV
// is "production". Edit name/description/features freely; priceId values must
// come from the Paddle catalog (see the `catalog-setup` skill).
export const PRICING_TIERS: Tier[] = [
  {
    name: "Starter",
    description: "For trying CV Butler out.",
    features: ["Basic ATS scoring", "1 resume profile", "Email support"],
    priceId: {
      month: "pri_01m55sxx05ca7xwxyq44kesyha",
      year: "pri_01m55sxx4hrv4gwgh94jp316b3",
    },
  },
  {
    name: "Pro",
    description: "For an active job search.",
    features: [
      "Everything in Starter",
      "Unlimited ATS scoring",
      "Job match scoring",
      "AI cover letter generation",
    ],
    priceId: {
      month: "pri_01m55sxxf45fzvxmbrm31f9ke7",
      year: "pri_01m55sxxkcwyhezvjwxas44exv",
    },
  },
  {
    name: "Advanced",
    description: "For power users and career coaches.",
    features: [
      "Everything in Pro",
      "Priority processing",
      "Multiple resume profiles",
      "Priority support",
    ],
    priceId: {
      month: "pri_01m55sxxy3ab1w0dgjzfha4m58",
      year: "pri_01m55sxybpjedswh9p7zsh210v",
    },
  },
];
