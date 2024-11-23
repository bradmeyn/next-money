"use client";

import { type BudgetItem, convertToFrequency } from "../useBudget";
import { CurrencyInput, FrequencySelect } from "@ui/custom-inputs";
import { useBudgetContext } from "../BudgetContext";

import { type FrequencyType } from "@/lib/constants/frequencies";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/table";
import { formatAsCurrency } from "@/lib/utils/formatters";

interface BudgetTableProps {
  budgetItems: BudgetItem[];
}

export default function BudgetTable({ budgetItems }: BudgetTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-56">Name</TableHead>
          <TableHead className="w-40">Amount</TableHead>
          <TableHead className="min-w-[80px]">Frequency</TableHead>
          <TableHead className="text-right min-w-[80px]">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {budgetItems.map((item) => (
          <BudgetRow key={item.name} item={item} />
        ))}
      </TableBody>
    </Table>
  );
}

function BudgetRow({ item }: { item: BudgetItem }) {
  const { setBudgetItems, frequency } = useBudgetContext();

  const handleAmountChange = (newAmount: number) => {
    setBudgetItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id ? { ...prevItem, amount: newAmount } : prevItem
      )
    );
  };

  const handleFrequencyChange = (newFrequency: FrequencyType) => {
    setBudgetItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id
          ? { ...prevItem, frequency: newFrequency }
          : prevItem
      )
    );
  };

  return (
    <TableRow>
      <TableCell className="w-56">{item.name}</TableCell>
      <TableCell className="w-40">
        <CurrencyInput value={item.amount} onChange={handleAmountChange} />
      </TableCell>
      <TableCell className="w-40">
        <FrequencySelect
          value={item.frequency}
          onChange={handleFrequencyChange}
          name={`frequency-${item.id}`}
        />
      </TableCell>
      <TableCell className="text-right min-w-[80px]">
        {formatAsCurrency(
          convertToFrequency(item.amount, item.frequency, frequency)
        )}
      </TableCell>
    </TableRow>
  );
}
