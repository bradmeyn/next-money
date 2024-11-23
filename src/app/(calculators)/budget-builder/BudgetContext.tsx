"use client";

import { createContext, useContext } from "react";
import { type BudgetItem } from "./useBudget";
import { FrequencyType } from "@/lib/constants/frequencies";

type BudgetContextType = {
  setBudgetItems: (items: BudgetItem[]) => void;
  frequency: FrequencyType;
};

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

type BudgetProviderProps = {
  children: React.ReactNode;
  setBudgetItems: (items: BudgetItem[]) => void;
  frequency: FrequencyType;
};

export function BudgetProvider({
  children,
  setBudgetItems,
}: BudgetProviderProps) {
  return (
    <BudgetContext.Provider
      value={{
        setBudgetItems,
        frequency: "annually",
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudgetContext() {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error("useBudgetContext must be used within a BudgetProvider");
  }
  return context;
}
