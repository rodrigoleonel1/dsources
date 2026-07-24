import Link from "next/link";
import { Audiowide } from "next/font/google";
import ThemeToggle from "@/components/theme-toggle";

const audiowide = Audiowide({ subsets: ["latin"], weight: ["400"] });

export function AuthShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 rounded-md px-2 py-1.5">
          <div className="flex size-8 items-center justify-center rounded-md text-white shadow-sm bg-black">
            <span className={`flex items-center justify-center gap-2 text-2xl ${audiowide.className} ml-1`}>
              d<span className="text-indigo-500 text-5xl -mt-7 -ml-3">.</span>
            </span>
          </div>
          <div className={`text-2xl ${audiowide.className}`}>Dsources</div>
        </Link>
        <ThemeToggle />
      </header>
      <main id="main-content" className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
