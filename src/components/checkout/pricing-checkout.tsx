"use client";

import { useEffect, useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { env } from "@/lib/env";
import { PRICING_TIERS } from "@/lib/paddle/pricing-tiers";
import { usePaddlePrices } from "@/lib/paddle/use-paddle-prices";

type Frequency = "month" | "year";

export function PricingCheckout({
  country,
  userEmail,
}: {
  country: string;
  userEmail?: string;
}) {
  const [frequency, setFrequency] = useState<Frequency>("month");
  const [paddle, setPaddle] = useState<Paddle | undefined>();

  const { prices, loading } = usePaddlePrices(paddle, country);

  useEffect(() => {
    initializePaddle({
      token: env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
      environment: env.NEXT_PUBLIC_PADDLE_ENV,
    }).then((p) => p && setPaddle(p));
  }, []);

  function handleSubscribe(priceId: string) {
    paddle?.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      ...(userEmail && { customer: { email: userEmail } }),
      settings: {
        displayMode: "overlay",
        variant: "one-page",
        successUrl: `${window.location.origin}/dashboard`,
      },
    });
  }

  return (
    <div>
      <div className="mb-8 flex justify-center">
        <Tabs value={frequency} onValueChange={(v) => setFrequency(v as Frequency)}>
          <TabsList>
            <TabsTrigger value="month">Monthly</TabsTrigger>
            <TabsTrigger value="year">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {PRICING_TIERS.map((tier) => {
          const priceId = tier.priceId[frequency];
          const formatted = prices[priceId];
          return (
            <Card key={tier.name}>
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-5 text-3xl font-extrabold">
                  {loading || !formatted ? (
                    <span className="text-muted-foreground">...</span>
                  ) : (
                    <>
                      {formatted}
                      <span className="text-sm font-normal text-muted-foreground">
                        /{frequency}
                      </span>
                    </>
                  )}
                </p>
                <ul className="mb-6 space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm">
                      <CheckIcon size={16} className="mt-0.5 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  disabled={!paddle || !formatted}
                  onClick={() => handleSubscribe(priceId)}
                >
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
