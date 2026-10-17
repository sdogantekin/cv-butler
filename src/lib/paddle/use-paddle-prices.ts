import { useEffect, useState } from "react";
import type { Paddle, PricePreviewParams, PricePreviewResponse } from "@paddle/paddle-js";
import { PRICING_TIERS } from "@/lib/paddle/pricing-tiers";

export type PaddlePrices = Record<string, string>;

function getLineItems(): PricePreviewParams["items"] {
  return PRICING_TIERS.flatMap((tier) => [
    { priceId: tier.priceId.month, quantity: 1 },
    { priceId: tier.priceId.year, quantity: 1 },
  ]);
}

function getPriceAmounts(prices: PricePreviewResponse): PaddlePrices {
  return prices.data.details.lineItems.reduce<PaddlePrices>((acc, item) => {
    acc[item.price.id] = item.formattedTotals.total;
    return acc;
  }, {});
}

// `country` is the two-letter code to request prices for, or "OTHERS" — our
// own sentinel meaning "no country known; let Paddle infer it from the
// visitor's IP." Never pass "OTHERS" to Paddle itself.
export function usePaddlePrices(
  paddle: Paddle | undefined,
  country: string
): { prices: PaddlePrices; loading: boolean } {
  const [prices, setPrices] = useState<PaddlePrices>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!paddle) return;

    const params: PricePreviewParams = {
      items: getLineItems(),
      ...(country !== "OTHERS" && { address: { countryCode: country } }),
    };

    paddle.PricePreview(params).then((response) => {
      setPrices((prev) => ({ ...prev, ...getPriceAmounts(response) }));
      setLoading(false);
    });
  }, [country, paddle]);

  return { prices, loading };
}
