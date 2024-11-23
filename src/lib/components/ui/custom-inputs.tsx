"use client";
import { useState } from "react";

import {
  formatAsCurrency,
  formatAsPercentage,
  parseCurrency,
  parsePercentage,
} from "@/lib/utils/formatters";

import { Input } from "@ui/input";
import { Label } from "@ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import {
  FREQUENCIES,
  FREQUENCY_ENUM,
  type FrequencyType,
} from "@/lib/constants/frequencies";

// Currency Input Component
interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  id?: string;
}

export function CurrencyInput({
  value,
  onChange,
  label,
  id,
}: CurrencyInputProps) {
  const [isEditing, setIsEditing] = useState(false);

  // When not editing, show formatted value
  // When editing, show raw number
  const displayValue = isEditing ? value.toString() : formatAsCurrency(value);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseCurrency(event.target.value);
    // Only update if it's a valid number
    if (!isNaN(numericValue)) {
      onChange(numericValue);
    }
  };

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        name={id}
        value={displayValue}
        onChange={handleInput}
        onFocus={(e) => {
          setIsEditing(true);
          e.currentTarget.select();
        }}
        onBlur={() => setIsEditing(false)}
      />
    </div>
  );
}

// Frequency Select Component
interface FrequencySelectProps {
  value: FrequencyType;
  onChange: (value: FrequencyType) => void;
  name?: string;
  id?: string;
  label?: string;
}

export function FrequencySelect({
  value,
  onChange,
  id = "",
  name = "",
  label = "",
}: FrequencySelectProps) {
  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Select value={value} onValueChange={onChange} name={name}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Select frequency">
            {value ? FREQUENCIES[value].label : "Select"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {FREQUENCY_ENUM.map((freq) => (
            <SelectItem key={freq} value={freq}>
              {FREQUENCIES[freq].label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// Percentage Input Component
interface PercentageInputProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  id?: string;
}

export function PercentageInput({
  value,
  onChange,
  label,
  id,
}: PercentageInputProps) {
  const [displayValue, setDisplayValue] = useState(formatAsPercentage(value));

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^\d.]/g, "");
    const numericValue = parsePercentage(rawValue);
    if (!isNaN(numericValue)) {
      onChange(numericValue);
    }
  };

  const handleBlur = () => {
    setDisplayValue(formatAsPercentage(value));
  };

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        value={displayValue}
        onChange={handleInput}
        onBlur={handleBlur}
        onFocus={(e) => e.currentTarget.select()}
      />
    </div>
  );
}
