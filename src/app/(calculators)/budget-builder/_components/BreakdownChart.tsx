"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@ui/chart";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface ChartData {
  income: number;
  expenses: number;
  savings: number;
}

export default function BreakdownChart({
  chartData,
}: {
  chartData: ChartData;
}) {
  // Transform single data point into array format required by recharts

  const chartConfig: ChartConfig = {
    income: { label: "Income" },
    expenses: { label: "Expenses" },
    savings: { label: "Savings" },
  };

  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={[
          {
            income: chartData.income,
            expenses: chartData.expenses,
            savings: chartData.savings,
          },
        ]}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="income" fill="hsl(var(--chart-1))" radius={4} />
        <Bar dataKey="expenses" fill="hsl(var(--chart-2))" radius={4} />
        <Bar dataKey="savings" fill="hsl(var(--chart-3))" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
