import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { yellow } from "tailwindcss/colors";

import { ChartConfig, ChartContainer } from "../ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const chartConfig = {} satisfies ChartConfig;

const data = [
  {
    date: "10/12",
    revenue: 100,
  },
  {
    date: "11/12",
    revenue: 200,
  },
  {
    date: "12/12",
    revenue: 1000,
  },
  {
    date: "13/12",
    revenue: 500,
  },
  {
    date: "14/12",
    revenue: 600,
  },
  {
    date: "15/12",
    revenue: 400,
  },
];

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Receita no período</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[240px] w-full">
          <LineChart data={data} style={{ fontSize: 12 }}>
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
              dataKey="revenue"
              stroke={yellow[500]}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
