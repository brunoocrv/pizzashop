import { BarChart, Loader2 } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";
import colors from "tailwindcss/colors";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getPopularProducts } from "@/api/get-popular-products";

const COLORS = [
  colors.sky["500"],
  colors.amber["500"],
  colors.violet["500"],
  colors.rose["500"],
  colors.emerald["500"],
];

const chartConfig = {} satisfies ChartConfig;

export function PopularProductsChart() {
  const { data } = useQuery({
    queryFn: getPopularProducts,
    queryKey: ["metrics", "popular-products"],
  });

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base font-medium">
            Produtos populares
          </CardTitle>
          <CardDescription>
            <BarChart className="h-4 w-5 text-muted-foreground" />
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {data ? (
          <ChartContainer config={chartConfig} className="h-[240px] w-full">
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="product"
                cx="50%"
                cy="50%"
                innerRadius={64}
                strokeWidth={8}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = 12 + innerRadius + (outerRadius - innerRadius);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                    >
                      {data[index].product.length > 12
                        ? data[index].product.substring(0, 12).concat("...")
                        : data[index].product}{" "}
                      ({value})
                    </text>
                  );
                }}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    className="stroke-background hover:opacity-80"
                  />
                ))}
              </Pie>
            </PieChart>
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
