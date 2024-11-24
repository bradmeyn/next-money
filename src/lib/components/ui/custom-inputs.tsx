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
  const [inputValue, setInputValue] = useState(value.toFixed(2));

  const displayValue = isEditing ? inputValue : formatAsCurrency(value, true);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    // Allow raw typing - only clean on blur
    setInputValue(newValue);
  };

  const handleBlur = () => {
    setIsEditing(false);
    const numericValue = parseCurrency(inputValue);
    if (!isNaN(numericValue)) {
      onChange(numericValue);
      setInputValue(numericValue.toFixed(2));
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditing(true);
    setInputValue(value.toFixed(2));
    e.currentTarget.select();
  };

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        name={id}
        value={displayValue}
        onChange={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
