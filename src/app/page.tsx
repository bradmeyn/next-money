import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
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

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-slate-800 to-slate-950 min-h-screen flex flex-col">
      <Header />

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
            Professional-grade financial tools to help you make smarter
            decisions with your money
          </p>
        </div>

        <LinksGrid />
        <FeatureGrid />
      </main>

      <Footer />
    </div>
  );
}

interface LinkCardProps {
  name: string;
  href: string;
  description: string;
  iconPath: string;
  index: number;
}

function LinkCard({ name, href, description, iconPath, index }: LinkCardProps) {
  return (
    <Link
      href={href}
      className="card-animate block p-6 rounded-xl bg-slate-800/50 border border-slate-700
        hover:border-brand-default hover:bg-slate-800/70 transition-all duration-300
        group w-full hover:-translate-y-1"
      style={{
        animation: "slideUp 0.4s ease-out forwards",
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
      }}
    >
      <div className="flex items-start space-x-4">
        <div
          className="mb-4 w-12 h-12 rounded-lg bg-brand-default/10 flex items-center
          justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
        >
          <svg
            className="w-6 h-6 text-brand-default"
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

const links = [
  {
    name: "Growth Calculator",
    href: "growth-calculator",
    description: "Project your investment growth with our powerful calculator",
    iconPath: "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  },
  {
    name: "Budget",
    href: "budget",
    description: "Create and manage your personal budget with ease",
    iconPath: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  },
  {
    name: "Portfolio Builder",
    href: "portfolio-builder",
    description: "Design and optimize your investment portfolio",
    iconPath: "M21 3v18M3 9h18M3 15h18M3 9a6 6 0 0 1 6-6M3 15a6 6 0 0 0 6 6",
  },
  {
    name: "Personal Tax Calculator",
    href: "personal-tax-calculator",
    description: "Estimate your tax obligations and plan accordingly",
    iconPath:
      "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  },
  {
    name: "Drawdown Calculator",
    href: "drawdown-calculator",
    description: "Plan your retirement withdrawals strategically",
    iconPath: "M21 12a9 9 0 1 1-6.219-8.56 M12 8v4l2.5 2.5",
  },
] as const;

export function LinksGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pb-24">
      {links.map((link, i) => (
        <LinkCard key={link.href} {...link} index={i} />
      ))}
    </div>
  );
}

const features = [
  {
    title: "Easy to Use",
    description:
      "Intuitive interfaces designed for both beginners and professionals",
    iconPath: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  },
  {
    title: "Real-time Calculations",
    description: "Instant results with professional-grade accuracy",
    iconPath: "M21 12a9 9 0 1 1-6.219-8.56 M12 8v4l2.5 2.5",
  },
  {
    title: "Secure & Private",
    description: "Your financial data stays in your browser",
    iconPath: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
] as const;

function FeatureGrid() {
  return (
    <div className="max-w-6xl mx-auto pb-24">
      <div className="grid md:grid-cols-3 gap-8 text-center">
        {features.map((feature) => (
          <div key={feature.title} className="p-6">
            <div className="w-12 h-12 rounded-lg bg-brand-default/10 flex items-center justify-center mx-auto mb-4">
              <Icon
                path={feature.iconPath}
                className="w-6 h-6 text-brand-default"
              />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface IconProps {
  path: string;
  className?: string;
}

function Icon({ path, className = "" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}
