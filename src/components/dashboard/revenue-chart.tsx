import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { yellow } from "tailwindcss/colors";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import { DatePickerWithRange } from "../date-range-picker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { Label } from "../ui/label";
import { subDays } from "date-fns";
import { Loader2 } from "lucide-react";

const chartConfig = {} satisfies ChartConfig;

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { data } = useQuery({
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
    queryKey: ["metrics", "daily-revenue-in-period", dateRange],
  });

  const chartDate = useMemo(() => {
    return data?.map((item) => {
      return {
        date: item.date,
        receipt: item.receipt / 100,
      };
    });
  }, [data]);

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {data ? (
          <ChartContainer config={chartConfig} className="h-[240px] w-full">
            <LineChart data={chartDate} style={{ fontSize: 12 }}>
              <CartesianGrid vertical={false} className="stroke-muted" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }
              />
              <Line
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                stroke={yellow[500]}
              />
            </LineChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
