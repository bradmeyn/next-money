import React from "react";
import { Button } from "@/lib/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScenarioTabsProps {
  scenarioIds: number[];
  activeScenarioId: number;
  maxScenarios?: number;
  onScenarioChange: (id: number) => void;
  addScenario: () => void;
}

export default function ScenarioTabs({
  scenarioIds,
  activeScenarioId,
  maxScenarios = 3,
  onScenarioChange,
  addScenario,
}: ScenarioTabsProps) {
  return (
    <div className="border-b border-border">
      <div className="flex items-center gap-2">
        <nav className="flex flex-1 gap-2" aria-label="Scenario tabs">
          {scenarioIds.map((id) => (
            <Button
              key={id}
              variant="ghost"
              className={cn(
                "relative h-9 rounded-none border-b-2 border-b-transparent px-4",
                activeScenarioId === id && "border-b-primary text-primary",
                "hover:text-foreground"
              )}
              onClick={() => onScenarioChange(id)}
            >
              Scenario {id}
            </Button>
          ))}

          {scenarioIds.length > 1 && (
            <Button
              variant="ghost"
              className={cn(
                "relative h-9 rounded-none border-b-2 border-b-transparent px-4",
                activeScenarioId === 0 && "border-b-primary text-primary",
                "hover:text-foreground"
              )}
              onClick={() => onScenarioChange(0)}
            >
              Compare
            </Button>
          )}
        </nav>

        {scenarioIds.length < maxScenarios && (
          <Button
            variant="ghost"
            size="icon"
            className="mb-2"
            onClick={addScenario}
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
