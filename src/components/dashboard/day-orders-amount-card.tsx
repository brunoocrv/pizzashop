import { UtensilsCrossed } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export function DayOrdersAmountCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">20</span>
        <p className="text-xs text-muted-foreground">
          <span className="text-rose-500 dark:text-rose-400">-6%</span> em
          relação à ontem
        </p>
      </CardContent>
    </Card>
  );
}
