// components/Footer.tsx
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto items-center p-4 bg-neutral text-neutral-content justify-center text-ui-100">
      <div className="text-center">
        <p className="mb-2 flex items-center justify-center text-sm">
          <a
            href="https://www.github.com/bradmeyn/wealthkit"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center text-sm underline-offset-2 hover:underline"
          >
            <span>GitHub</span>
          </a>
        </p>

        <p className="text-xs">Copyright © {year} - All right reserved</p>
      </div>
    </footer>
  );
}
