"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { CardContent } from "@ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@ui/chart";
import { formatAsCurrency } from "@/lib/utils/formatters";

export default function CategoryChart({
  chartData,
  total,
}: {
  chartData: {
    category: string;
    total: number;
  }[];
  total: number;
}) {
  // First create the config
  const config: ChartConfig = {
    visitors: { label: "Visitors" },
    ...Object.fromEntries(
      chartData.map((item) => [
        item.category.toLowerCase().replace(/\s+/g, ""),
        {
          label: item.category,
        },
      ])
    ),
  } satisfies ChartConfig;

  const colorClasses = [
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];

  // Transform the chart data to include fill colors
  const enhancedChartData = chartData.map((item, i) => ({
    ...item,
    fill: `hsl(var(--chart-${+i + 1}))`,
  }));

  return (
    <CardContent className="flex-1 pb-0">
      <ChartContainer
        config={config}
        className="mx-auto aspect-square max-h-[250px] w-full"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                formatter={(value, name, i) => (
                  <>
                    <div className={`"h-2.5 w-2.5 shrink-0 rounded-[2px]`} />
                    {config[name as keyof typeof config]?.label || name}
                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                      {formatAsCurrency(+value, true)}
                    </div>
                  </>
                )}
              />
            }
          />
          <Pie
            data={enhancedChartData} // Use the enhanced data with fill colors
            dataKey="total"
            nameKey="category"
            innerRadius={70}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {formatAsCurrency(total, false)}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Visitors
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </CardContent>
  );
}
