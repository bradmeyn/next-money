"use client";

import { useBudget } from "./useBudget";
import { type FrequencyType, FREQUENCIES } from "@/lib/constants/frequencies";
import BudgetCard from "./_components/BudgetCard";
import { formatAsCurrency } from "@/lib/utils/formatters";
import { Card } from "@/lib/components/ui/card";
import CategoryChart from "./_components/CategoryChart";
import { FrequencySelect } from "@/lib/components/ui/custom-inputs";
import { BudgetProvider } from "./BudgetContext";
export default function BudgetBuilderPage() {
  const budget = useBudget();

  const {
    incomeCategories,
    expenseCategories,
    savingsCategories,
    income,
    expenses,
    savings,
    frequency,
    setFrequency,
    setBudgetItems,
    expenseByCategory,
    totalExpenses,
    totalIncome,
    totalSavings,
  } = budget;

  return (
    <main className="flex flex-col flex-1 container text-white max-w-[1200px]">
      <div className="flex justify-between items-center mb-2">
        <h1>Budget Builder</h1>
      </div>

      <div className="max-w-xs bg-ui-900 mb-3 rounded-lg">
        <FrequencySelect
          value={frequency}
          onChange={setFrequency}
          name="frequency"
        />
      </div>

      <BudgetProvider setBudgetItems={setBudgetItems} frequency={frequency}>
        <div className="flex flex-col lg:flex-row gap-4 w-full ">
          <div className="flex-1 flex gap-4 flex-col">
            <BudgetCard budgetItems={income} categories={incomeCategories}>
              <TotalHeading
                title="Total Income"
                total={totalIncome}
                frequency={frequency}
              />
            </BudgetCard>
            <BudgetCard budgetItems={expenses} categories={expenseCategories}>
              <TotalHeading
                title="Total Expenses"
                total={totalExpenses}
                frequency={frequency}
              />
            </BudgetCard>
            <BudgetCard budgetItems={savings} categories={savingsCategories}>
              <TotalHeading
                title="Total Savings"
                total={totalSavings}
                frequency={frequency}
              />
            </BudgetCard>
          </div>

          <Card className="flex-1 p-8 max-w-[400px]">
            <h2 className="text-blue-300 font-semibold">Category Breakdown</h2>
            <CategoryChart
              chartData={expenseByCategory}
              total={totalExpenses}
            />
          </Card>
        </div>
      </BudgetProvider>
    </main>
  );
}

function TotalHeading({
  title,
  total,
  frequency,
}: {
  title: string;
  total: number;
  frequency: FrequencyType;
}) {
  return (
    <>
      <h2 className="text-blue-300 font-semibold">{title}</h2>
      <div className="flex items-baseline gap-2">
        <p
          className={`text-3xl font-semibold tracking-tight ${
            total < 0 ? "text-red-400" : ""
          }`}
        >
          {formatAsCurrency(total)}
        </p>
        <p className="text-gray-400 text-lg font-medium">
          /{FREQUENCIES[frequency].singular}
        </p>
      </div>
    </>
  );
}
