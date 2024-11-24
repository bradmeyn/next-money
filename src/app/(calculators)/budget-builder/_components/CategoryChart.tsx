"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { CardContent } from "@ui/card";
import { FREQUENCIES } from "@/lib/constants/frequencies";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@ui/chart";
import { formatAsCurrency } from "@/lib/utils/formatters";
import { FrequencyType } from "@/lib/constants/frequencies";

export default function CategoryChart({
  chartData,
  total,
  frequency,
}: {
  chartData: {
    category: string;
    total: number;
  }[];
  frequency: FrequencyType;
  total: number;
}) {
  // First create the config
  const config: ChartConfig = {
    ...Object.fromEntries(
      chartData.map((item) => [
        item.category.toLowerCase().replace(/\s+/g, ""),
        {
          label: item.category,
        },
      ])
    ),
  } satisfies ChartConfig;

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
                formatter={(value, name, item) => (
                  console.log("value", value),
                  console.log("name", name),
                  console.log("item", item),
                  (
                    <>
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          backgroundColor: item?.payload.fill,
                        }}
                        className={`h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[${item.payload.fill}]`}
                      />
                      {config[name as keyof typeof config]?.label || name}
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {formatAsCurrency(+value, true)}
                      </div>
                    </>
                  )
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
                        y={(viewBox.cy || 0) - 24}
                        className="fill-muted-foreground"
                      >
                        expenses
                      </tspan>
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
                        /{FREQUENCIES[frequency].singular}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      <div className="flex flex-col justify-center gap-2 mt-2">
        {chartData.map((item, i) => (
          <div
            key={item.category}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div
                className={`h-2.5 w-2.5 shrink-0 rounded-[2px] `}
                style={{ backgroundColor: enhancedChartData[i].fill }}
              />
              <span>{item.category}</span>
            </div>
            <span className="font-mono font-medium tabular-nums text-foreground">
              {formatAsCurrency(item.total, true)}
            </span>
          </div>
        ))}
      </div>
    </CardContent>
  );
}
