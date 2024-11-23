"use client";

import React, { useState } from "react";
import { DollarSign, Percent, Calendar, Search } from "lucide-react";
import {
  formatAsCurrency,
  parseCurrency,
  formatAsPercentage,
  parsePercentage,
} from "@/lib/utils/formatters";
import { Label } from "@/lib/components/ui/label";
import { Input } from "@/lib/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";

import { FREQUENCIES, FREQUENCY_ENUM } from "@/lib/constants/frequencies";

interface GrowthInputsProps {
  scenario: GrowthScenario;
  updateScenario: (id: number, key: string, value: any) => void;
}

export default function GrowthInputs({
  scenario,
  updateScenario,
}: GrowthInputsProps) {
  const {
    id,
    principal,
    contributionAmount,
    contributionFrequency,
    interestRate,
    years,
  } = scenario;

  const [principalInput, setPrincipalInput] = useState(
    formatAsCurrency(principal)
  );
  const [contributionInput, setContributionInput] = useState(
    formatAsCurrency(contributionAmount)
  );
  const [rateInput, setRateInput] = useState(formatAsPercentage(interestRate));
  const [searchQuery, setSearchQuery] = useState("");

  // Existing handlers...
  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setPrincipalInput(rawValue);
    const numericValue = parseCurrency(rawValue);
    updateScenario(id, "principal", numericValue);
  };

  const handlePrincipalBlur = () => {
    setPrincipalInput(formatAsCurrency(principal));
  };

  const handleContributionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setContributionInput(rawValue);
    const numericValue = parseCurrency(rawValue);
    updateScenario(id, "contributionAmount", numericValue);
  };

  const handleContributionBlur = () => {
    setContributionInput(formatAsCurrency(contributionAmount));
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setRateInput(rawValue);
    const numericValue = parsePercentage(rawValue) / 100;
    if (!isNaN(numericValue)) {
      updateScenario(id, "interestRate", numericValue);
    }
  };

  const handleRateBlur = () => {
    setRateInput(formatAsPercentage(interestRate));
  };

  return (
    <div className="space-y-3">
      {/* Search input example */}
      <div>
        <Label htmlFor="search">Search Scenarios</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            id="search"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="principal">Principal</Label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            id="principal"
            value={principalInput}
            onChange={handlePrincipalChange}
            onBlur={handlePrincipalBlur}
            className="pl-9 w-full"
            onFocus={(e) => e.target.select()}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <Label htmlFor="contributionAmount">Contributions</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="contributionAmount"
              value={contributionInput}
              onChange={handleContributionChange}
              onBlur={handleContributionBlur}
              className="pl-9 w-full"
              onFocus={(e) => e.target.select()}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="frequency">Frequency</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 z-10" />
            <Select
              value={contributionFrequency}
              onValueChange={(value) =>
                updateScenario(id, "contributionFrequency", value)
              }
            >
              <SelectTrigger className="pl-9">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                {FREQUENCY_ENUM.map((f) => (
                  <SelectItem key={f} value={f}>
                    {FREQUENCIES[f].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="interestRate">Interest Rate</Label>
        <div className="relative">
          <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            id="interestRate"
            value={rateInput}
            onChange={handleRateChange}
            onBlur={handleRateBlur}
            className="pl-9 w-full"
            onFocus={(e) => e.target.select()}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="years">Years</Label>
        <Input
          id="years"
          type="number"
          min="0"
          value={years}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value) && value >= 0) {
              updateScenario(id, "years", value);
            }
          }}
          className="w-full"
          onFocus={(e) => e.target.select()}
        />
      </div>
    </div>
  );
}
