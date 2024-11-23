import GrowthInputs from "./GrowthInputs";
import GrowthResult from "./GrowthResult";
import type { GrowthScenario, GrowthResult as Result } from "../page";

type Props = {
  scenario: GrowthScenario;
  result: Result;
  updateScenario: (id: number, key: string, value: any) => void;
};

export default function GrowthScenario({
  scenario,
  result,
  updateScenario,
}: Props) {
  return (
    <section className="flex flex-col lg:flex-row gap-8">
      <aside className="max-w-[1000px] min-w-[300px]">
        <GrowthInputs scenario={scenario} updateScenario={updateScenario} />
      </aside>

      <div className="w-full flex-1">
        <GrowthResult result={result} />
      </div>
    </section>
  );
}
