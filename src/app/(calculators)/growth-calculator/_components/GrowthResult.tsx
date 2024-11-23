"use client";

import { useState } from "react";
import { formatAsCurrency } from "@/lib/utils/formatters";
import { Card } from "@ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";
import { type GrowthResult } from "../page";
import GrowthChart from "./GrowthChart";

const tabs = ["Chart", "Table"] as const;

export default function GrowthResult({ result }: { result: GrowthResult }) {
  const { principal, totalContributions, totalInterest, totalValue } = result;
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Chart");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-3">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Start Value</p>
          <p className="text-lg md:text-xl font-semibold">
            {formatAsCurrency(principal)}
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Contributions</p>
          <p className="text-lg md:text-xl font-semibold">
            {formatAsCurrency(totalContributions)}
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Interest</p>
          <p className="text-lg md:text-xl font-semibold">
            {formatAsCurrency(totalInterest)}
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Value</p>
          <p className="text-lg md:text-xl font-semibold">
            {formatAsCurrency(totalValue)}
          </p>
        </Card>
      </div>

      <Card className="p-8">
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as (typeof tabs)[number])
          }
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg">
                Total value after {result.years} years
              </h3>
              <p className="text-3xl font-bold">
                {formatAsCurrency(
                  result.annualData[result.annualData.length - 1]
                    ?.endingValue || 0
                )}
              </p>
            </div>
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger key={tab} value={tab}>
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="space-y-6">
            <TabsContent value="Chart">
              <GrowthChart result={result} />
            </TabsContent>

            <TabsContent value="Table">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-2">Year</th>
                      <th className="text-right p-2">Starting Value</th>
                      <th className="text-right p-2">Yearly Interest</th>
                      <th className="text-right p-2">Total Interest</th>
                      <th className="text-right p-2">Yearly Contribution</th>
                      <th className="text-right p-2">Total Contributions</th>
                      <th className="text-right p-2">Ending Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.annualData.map((d) => (
                      <tr key={d.year} className="border-t">
                        <td className="p-2">{d.year}</td>
                        <td className="text-right p-2">
                          {formatAsCurrency(d.startingValue)}
                        </td>
                        <td className="text-right p-2">
                          {formatAsCurrency(d.yearlyInterest)}
                        </td>
                        <td className="text-right p-2">
                          {formatAsCurrency(d.totalInterest)}
                        </td>
                        <td className="text-right p-2">
                          {formatAsCurrency(d.yearlyContribution)}
                        </td>
                        <td className="text-right p-2">
                          {formatAsCurrency(d.totalContributions)}
                        </td>
                        <td className="text-right p-2">
                          {formatAsCurrency(d.endingValue)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}
