import { UtensilsCrossed } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import { getDaysOrdersAmount } from "@/api/get-day-orders-amount";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function DayOrdersAmountCard() {
  const { data, isFetching } = useQuery({
    queryFn: getDaysOrdersAmount,
    queryKey: ["metrics", "day-orders-amount"],
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {data && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {data?.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-xs text-muted-foreground">
              {data.diffFromYesterday > 0 && (
                <span className="text-emerald-500 dark:text-emerald-400">
                  {data?.diffFromYesterday}%
                </span>
              )}
              {data.diffFromYesterday <= 0 && (
                <span className="text-rose-500 dark:text-rose-400">
                  {data?.diffFromYesterday}%
                </span>
              )}{" "}
              em relação à ontem
            </p>
          </>
        )}
        {isFetching && <MetricCardSkeleton />}
      </CardContent>
    </Card>
  );
}
