"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/accordion";
import { BudgetItem } from "../useBudget";
import { formatAsCurrency } from "@/lib/utils/formatters";
import { Card } from "@/lib/components/ui/card";
import BudgetTable from "./BudgetTable";

interface BudgetCategoryAccordionProps {
  category: string;
  categoryTotal: number;
  children: React.ReactNode;
}

export default function BudgetCard({
  children,
  budgetItems,
  categories,
}: {
  children: React.ReactNode;
  budgetItems: BudgetItem[];
  categories: string[];
}) {
  return (
    <Card className="p-8">
      {children}
      {categories.map((category, i) => {
        const categoryItems = budgetItems.filter(
          (item) => item.category === category
        );
        const categoryTotal = categoryItems.reduce(
          (acc, item) => acc + item.amount,
          0
        );

        return (
          <BudgetCategoryAccordion
            key={category + " " + i}
            category={category}
            categoryTotal={categoryTotal}
          >
            <BudgetTable budgetItems={categoryItems} />
          </BudgetCategoryAccordion>
        );
      })}
    </Card>
  );
}

function BudgetCategoryAccordion({
  category = "",
  categoryTotal = 0,
  children,
}: BudgetCategoryAccordionProps) {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value={category}>
        <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 rounded data-[state=open]:bg-muted/50">
          <div className="flex w-full justify-between">
            <div className="text-left">
              <p className="text-sm text-muted-foreground">{category}</p>
              <p className="text-lg">
                {formatAsCurrency(categoryTotal, false)}
              </p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-2">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
