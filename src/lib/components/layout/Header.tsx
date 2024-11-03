// components/Header/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="py-10 h-10 relative">
      <div className="container h-full flex justify-between items-center relative">
        <div className="flex items-center gap-8 w-full">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-white font-semibold text-xl">
              Money
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-brand-light to-brand-default">
                Kit
              </span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center justify-between w-full">
            <ul className="flex gap-6 items-center">
              {/* <CalculatorsDropdown /> */}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
