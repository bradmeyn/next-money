import { useState, useMemo } from "react";
import { FREQUENCIES, type FrequencyType } from "@constants/frequencies";
export type BudgetItem = {
  id: number;
  name: string;
  amount: number;
  category: string;
  frequency: FrequencyType;
  type: "Income" | "Expense" | "Savings";
};

export function convertToFrequency(
  amount: number,
  fromFrequency: FrequencyType,
  toFrequency: FrequencyType
) {
  const annualAmount = amount * FREQUENCIES[fromFrequency].value;
  return annualAmount / FREQUENCIES[toFrequency].value;
}

const calculateCategoryTotal = (
  items: BudgetItem[],
  category: string,
  toFrequency: FrequencyType
): number => {
  const annualTotal = items
    .filter((item) => item.category === category)
    .reduce(
      (acc, item) => acc + item.amount * FREQUENCIES[item.frequency].value,
      0
    );

  return convertToFrequency(annualTotal, "annually", toFrequency);
};

const initialBudgetItems: BudgetItem[] = [
  {
    id: 1,
    name: "Salary",
    amount: 1000,
    category: "Wages & Salary",
    frequency: "monthly",
    type: "Income",
  },
  {
    id: 2,
    name: "Bonus",
    amount: 500,
    category: "Wages & Salary",
    frequency: "annually",
    type: "Income",
  },
  {
    id: 2,
    name: "Rental Income",
    amount: 500,
    category: "Investments",
    frequency: "annually",
    type: "Income",
  },
  {
    id: 2,
    name: "Interest",
    amount: 500,
    category: "Investments",
    frequency: "annually",
    type: "Income",
  },
  {
    id: 2,
    name: "Dividends & Distributions",
    amount: 500,
    category: "Investments",
    frequency: "quarterly",
    type: "Income",
  },
  {
    id: 2,
    name: "Capital Gains",
    amount: 500,
    category: "Investments",
    frequency: "annually",
    type: "Income",
  },
  {
    id: 1,
    name: "Rent/Mortgage",
    amount: 100,
    category: "Housing & Utilities",
    frequency: "monthly",
    type: "Expense",
  },
  {
    id: 11,
    name: "Rates",
    amount: 300,
    category: "Housing & Utilities",
    frequency: "quarterly",
    type: "Expense",
  },
  {
    id: 12,
    name: "Water",
    amount: 100,
    category: "Housing & Utilities",
    frequency: "monthly",
    type: "Expense",
  },
  {
    id: 11,
    name: "Electricity & Gas",
    amount: 300,
    category: "Housing & Utilities",
    frequency: "quarterly",
    type: "Expense",
  },
  {
    id: 11,
    name: "Internet & Phone",
    amount: 120,
    category: "Housing & Utilities",
    frequency: "monthly",
    type: "Expense",
  },
  {
    id: 2,
    name: "Groceries",
    amount: 50,
    category: "Food",
    frequency: "weekly",
    type: "Expense",
  },
  {
    id: 30,
    name: "Takeaway",
    amount: 50,
    category: "Food",
    frequency: "weekly",
    type: "Expense",
  },
  {
    id: 3,
    name: "Gym Membership",
    amount: 30,
    category: "Health",
    frequency: "monthly",
    type: "Expense",
  },
  {
    id: 4,
    name: "Fuel",
    amount: 50,
    category: "Car",
    frequency: "weekly",
    type: "Expense",
  },
  {
    id: 40,
    name: "Registration",
    amount: 50,
    category: "Car",
    frequency: "weekly",
    type: "Expense",
  },
  {
    id: 41,
    name: "Insurance",
    amount: 1200,
    category: "Car",
    frequency: "annually",
    type: "Expense",
  },
  {
    id: 42,
    name: "Maintenance",
    amount: 200,
    category: "Car",
    frequency: "annually",
    type: "Expense",
  },
  {
    id: 5,
    name: "Streaming Services",
    amount: 10,
    category: "Entertainment & Leisure",
    frequency: "monthly",
    type: "Expense",
  },
  {
    id: 5,
    name: "Hobbies",
    amount: 10,
    category: "Entertainment & Leisure",
    frequency: "monthly",
    type: "Expense",
  },
  {
    id: 5,
    name: "Eating Out",
    amount: 10,
    category: "Entertainment & Leisure",
    frequency: "monthly",
    type: "Expense",
  },
  {
    id: 5,
    name: "Alcohol",
    amount: 10,
    category: "Entertainment & Leisure",
    frequency: "monthly",
    type: "Expense",
  },
  {
    id: 2,
    name: "Vacation Fund",
    amount: 50,
    category: "Cash Savings",
    frequency: "annually",
    type: "Savings",
  },
  {
    id: 3,
    name: "Retirement Fund",
    amount: 200,
    category: "Superannuation",
    frequency: "monthly",
    type: "Savings",
  },
  {
    id: 4,
    name: "ETF Portfolio",
    amount: 200,
    category: "Investments",
    frequency: "monthly",
    type: "Savings",
  },
];

export const useBudget = () => {
  const [frequency, setFrequency] = useState<FrequencyType>("monthly");
  const [budgetItems, setBudgetItems] =
    useState<BudgetItem[]>(initialBudgetItems);

  // Memoized filtered lists
  const income = useMemo(
    () => budgetItems.filter((i) => i.type === "Income"),
    [budgetItems]
  );

  const expenses = useMemo(
    () => budgetItems.filter((i) => i.type === "Expense"),
    [budgetItems]
  );

  const savings = useMemo(
    () => budgetItems.filter((i) => i.type === "Savings"),
    [budgetItems]
  );

  // Memoized categories
  const incomeCategories = useMemo(
    () => [...new Set(income.map((i) => i.category))],
    [income]
  );

  const expenseCategories = useMemo(
    () => [...new Set(expenses.map((i) => i.category))],
    [expenses]
  );

  const savingsCategories = useMemo(
    () => [...new Set(savings.map((i) => i.category))],
    [savings]
  );

  // Memoized frequency-adjusted items
  const adjustedIncome = useMemo(
    () =>
      income.map((item) => ({
        ...item,
        amount: convertToFrequency(item.amount, item.frequency, frequency),
      })),
    [income, frequency]
  );

  const adjustedExpenses = useMemo(
    () =>
      expenses.map((item) => ({
        ...item,
        amount: convertToFrequency(item.amount, item.frequency, frequency),
      })),
    [expenses, frequency]
  );

  const adjustedSavings = useMemo(
    () =>
      savings.map((item) => ({
        ...item,
        amount: convertToFrequency(item.amount, item.frequency, frequency),
      })),
    [savings, frequency]
  );

  const expenseByCategory = useMemo(
    () =>
      expenseCategories.map((category) => {
        const categoryExpenses = adjustedExpenses.filter(
          (i) => i.category === category
        );
        const total = categoryExpenses.reduce((acc, i) => acc + i.amount, 0);
        return { category, total };
      }),
    [expenseCategories, adjustedExpenses]
  );

  // Memoized totals
  const totalIncome = useMemo(
    () => adjustedIncome.reduce((acc, i) => acc + i.amount, 0),
    [adjustedIncome]
  );

  const totalExpenses = useMemo(
    () => adjustedExpenses.reduce((acc, i) => acc + i.amount, 0),
    [adjustedExpenses]
  );

  const totalSavings = useMemo(
    () => adjustedSavings.reduce((acc, i) => acc + i.amount, 0),
    [adjustedSavings]
  );

  const unallocated = useMemo(
    () => totalIncome - totalExpenses - totalSavings,
    [totalIncome, totalExpenses, totalSavings]
  );

  return {
    frequency,
    setFrequency,
    budgetItems,
    setBudgetItems,
    income,
    expenses,
    savings,
    incomeCategories,
    expenseCategories,
    savingsCategories,
    expenseByCategory,
    totalIncome,
    totalExpenses,
    totalSavings,
    unallocated,
  };
};
