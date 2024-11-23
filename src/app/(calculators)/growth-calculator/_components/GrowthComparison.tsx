// app/growth-calculator/_components/GrowthComparison.tsx
"use client";

import { Card } from "@/lib/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatAsCurrency, formatAsPercentage } from "@/lib/utils/formatters";
import type { GrowthScenario, GrowthResult as Result } from "../page";
import { FREQUENCIES } from "@/lib/constants/frequencies";

interface ComparisonProps {
  scenarios: GrowthScenario[];
  results: Result[];
}

export default function GrowthComparison({
  scenarios,
  results,
}: ComparisonProps) {
  // Prepare chart data
  const chartData = results[0]?.annualData.map((_, index) => ({
    name: `Year ${index + 1}`,
    "Scenario 1": results[0]?.annualData[index]?.endingValue || 0,
    "Scenario 2": results[1]?.annualData[index]?.endingValue || 0,
  }));

  // Calculate annual contributions
  const getAnnualContribution = (scenario: GrowthScenario) => {
    return (
      scenario.contributionAmount *
      FREQUENCIES[scenario.contributionFrequency].value
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comparison Table */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Comparison</h2>
          <div className="space-y-4">
            <table className="w-full text-left">
              <thead>
                <tr className="text-muted-foreground text-sm">
                  <th className="py-2">Scenario</th>
                  <th>Scenario 1</th>
                  <th>Scenario 2</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-border">
                  <td className="py-3">Principle</td>
                  <td>{formatAsCurrency(scenarios[0]?.principal)}</td>
                  <td>{formatAsCurrency(scenarios[1]?.principal)}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3">Contributions (p.a.)</td>
                  <td>
                    {formatAsCurrency(getAnnualContribution(scenarios[0]))} p.a.
                  </td>
                  <td>
                    {formatAsCurrency(getAnnualContribution(scenarios[1]))} p.a.
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3">Interest (p.a.)</td>
                  <td>{formatAsPercentage(scenarios[0]?.interestRate)}</td>
                  <td>{formatAsPercentage(scenarios[1]?.interestRate)}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3">Years</td>
                  <td>{scenarios[0]?.years} years</td>
                  <td>{scenarios[1]?.years} years</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">End Value</td>
                  <td className="font-medium">
                    {formatAsCurrency(results[0]?.totalValue)}
                  </td>
                  <td className="font-medium">
                    {formatAsCurrency(results[1]?.totalValue)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Comparison Chart */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Total value</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: number) => formatAsCurrency(value)}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar
                  dataKey="Scenario 1"
                  fill="hsl(var(--cyan-500))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="Scenario 2"
                  fill="hsl(var(--pink-500))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
