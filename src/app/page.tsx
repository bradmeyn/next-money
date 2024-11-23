import Link from "next/link";

export const metadata = {
  title: "Wealthkit - Smart Financial Tools",
  description:
    "All the tools you need to manage your money and build wealth effectively.",
  openGraph: {
    description:
      "All the tools you need to manage your money and build wealth effectively.",
  },
  twitter: {
    creator: "@jrib_",
  },
};

import { calculators } from "@constants/calculators";

export default function HomePage() {
  return (
    <main className="flex-1 container mx-auto px-4">
      <div className="text-center max-w-4xl mx-auto pt-16 pb-24">
        <h1 className="text-4xl md:text-7xl font-light mb-6 text-white leading-tight">
          All the tools for managing your{" "}
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-default">
              money
            </span>
          </span>
        </h1>
        <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
          Professional-grade financial tools to help you make smarter decisions
          with your money
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pb-24">
        {calculators.map((calculator, i) => (
          <CalculatorCard key={calculator.href} {...calculator} index={i} />
        ))}
      </div>
    </main>
  );
}

function CalculatorCard({
  name,
  description,
  iconPath,
  href,
  index,
}: {
  name: string;
  description: string;
  iconPath: string;
  href: string;
  index: number;
}) {
  return (
    <Link
      href={href}
      className="card-animate block p-6 rounded-xl bg-ui-800/50 border border-ui-700
	hover:border-brand hover:bg-ui-800/70 transition-all duration-300
	group w-full hover:-translate-y-1"
      style={{
        animation: "slideUp 0.4s ease-out forwards",
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
      }}
    >
      <div className="flex items-start space-x-4">
        <div
          className="mb-4 w-12 h-12 rounded-lg bg-brand/10 flex items-center
		justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
        >
          <svg
            className="w-6 h-6 text-brand"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={iconPath} />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-medium text-white mb-2">{name}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </Link>
  );
}
