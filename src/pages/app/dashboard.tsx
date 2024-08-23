import { Helmet } from "react-helmet-async";

import { MonthOrdersAmountCard } from "@/components/dashboard/month-orders-amount-card";
import { MonthRevenueCard } from "@/components/dashboard/month-revenue-card";
import { DayOrdersAmountCard } from "@/components/dashboard/day-orders-amount-card";
import { MonthCancelledOrdersAmountCard } from "@/components/dashboard/month-cancelled-orders-amount-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { PopularProductsChart } from "@/components/dashboard/popular-products-chart";

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCancelledOrdersAmountCard />
        </div>
        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </section>
    </>
  );
}
