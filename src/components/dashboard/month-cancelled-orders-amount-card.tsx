import { DollarSign } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amount";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function MonthCancelledOrdersAmountCard() {
  const { data, isFetching } = useQuery({
    queryFn: getMonthCanceledOrdersAmount,
    queryKey: ["metrics", "month-canceled-orders-amount"],
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {data && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {data.amount}
            </span>
            <p className="text-xs text-muted-foreground">
              {data?.diffFromLastMonth > 0 && (
                <span className="text-rose-500 dark:text-rose-400">
                  {data?.diffFromLastMonth}%
                </span>
              )}
              {data?.diffFromLastMonth <= 0 && (
                <span className="text-emerald-500 dark:text-emerald-400">
                  -{data?.diffFromLastMonth}%
                </span>
              )}{" "}
              em relação ao mês passado
            </p>
          </>
        )}
        {isFetching && <MetricCardSkeleton />}
      </CardContent>
    </Card>
  );
}
