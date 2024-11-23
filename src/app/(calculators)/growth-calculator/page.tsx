"use client";

import React, { useState } from "react";

import { FREQUENCIES, type FrequencyType } from "@/lib/constants/frequencies";
import { calculateCompoundInterest } from "./helpers";
import GrowthScenario from "./_components/GrowthScenario";
import ScenarioTabs from "@components/ScenarioTabs";
import GrowthComparison from "./_components/GrowthComparison";

export interface GrowthScenario {
  id: number;
  principal: number;
  contributionAmount: number;
  contributionFrequency: FrequencyType;
  interestRate: number;
  years: number;
}

export interface GrowthResult {
  id: number;
  principal: number;
  totalContributions: number;
  totalInterest: number;
  totalValue: number;
  annualData: AnnualData[];
  years: number; // Add these
  interestRate: number; // Add these
}

interface AnnualData {
  year: number;
  startingValue: number;
  yearlyInterest: number;
  totalInterest: number;
  yearlyContribution: number;
  totalContributions: number;
  endingValue: number;
}

export interface CompoundInterestResult {
  totalValue: number;
  totalInterest: number;
  totalContributions: number;
  annualData: AnnualData[];
}

export default function GrowthCalculatorPage() {
  const [scenarios, setScenarios] = useState<GrowthScenario[]>([
    {
      id: 1,
      principal: 100000,
      contributionAmount: 1000,
      contributionFrequency: "monthly",
      interestRate: 0.08,
      years: 10,
    },
  ]);
  const [activeScenarioId, setActiveScenarioId] = useState(1);
  const scenarioIds = scenarios.map((s) => s.id);

  const results: GrowthResult[] = scenarios.map((scenario) => {
    const result = calculateCompoundInterest(
      scenario.principal,
      scenario.interestRate,
      scenario.years,
      scenario.contributionAmount,
      FREQUENCIES[scenario.contributionFrequency].value
    );

    return {
      id: scenario.id,
      principal: scenario.principal,
      totalContributions: result.totalContributions,
      totalInterest: result.totalInterest,
      totalValue: result.totalValue,
      annualData: result.annualData,
      years: scenario.years, // Add these
      interestRate: scenario.interestRate,
    };
  });

  function addScenario() {
    const newScenarioId = scenarios.length + 1;
    setScenarios([
      ...scenarios,
      {
        ...scenarios[0],
        id: newScenarioId,
      },
    ]);
    setActiveScenarioId(newScenarioId);
  }

  function updateScenario(id, key, value) {
    setScenarios((prevScenarios) =>
      prevScenarios.map((scenario) =>
        scenario.id === id ? { ...scenario, [key]: value } : scenario
      )
    );
  }
  return (
    <main className="flex flex-col flex-1 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Growth Calculator</h1>

      <ScenarioTabs
        scenarioIds={scenarioIds}
        activeScenarioId={activeScenarioId}
        maxScenarios={3}
        onScenarioChange={setActiveScenarioId}
        addScenario={addScenario}
      />

      <div className="mt-4">
        {scenarios.map((scenario, i) =>
          scenario.id === activeScenarioId ? (
            <GrowthScenario
              key={scenario.id}
              scenario={scenario}
              result={results[i]}
              updateScenario={updateScenario}
            />
          ) : null
        )}
      </div>

      {activeScenarioId === 0 && scenarios.length > 1 ? (
        <GrowthComparison scenarios={scenarios} results={results} />
      ) : null}
    </main>
  );
}
