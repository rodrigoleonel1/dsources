import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Audiowide } from "next/font/google";
import ThemeToggle from "@/components/theme-toggle";
import { SearchBar } from "@/components/search-bar";
import { UserMenu } from "@/components/user-menu";
import { CommandPaletteTrigger } from "@/components/command-palette-trigger";
import { NotificationsBell } from "@/components/notifications-bell";
import type { PublicUser } from "@/data/types";

const audiowide = Audiowide({ subsets: ["latin"], weight: ["400"] });

export function AppHeader({
  query = "",
  user,
}: {
  query?: string;
  user: PublicUser | null;
}) {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full shrink-0 items-center gap-1.5 border-b bg-background px-2.5 sm:gap-2 sm:px-4">
      <SidebarTrigger className="-ml-1 shrink-0" />
      <Separator orientation="vertical" className="mr-1 h-6 shrink-0 sm:mr-2" />

      <Link href="/" className="hidden shrink-0 md:block">
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5">
          <div className="flex size-8 items-center justify-center rounded-md text-white shadow-sm bg-black">
            <span
              className={`flex items-center justify-center gap-2 text-2xl ${audiowide.className} ml-1`}
            >
              d<span className="text-indigo-500 text-5xl -mt-7 -ml-3">.</span>
            </span>
          </div>
          <div className="leading-tight hidden sm:flex">
            <div className={`text-2xl ${audiowide.className}`}>Dsources</div>
          </div>
        </div>
      </Link>

      <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-1 sm:gap-2">
        <SearchBar initialQuery={query} />
        <CommandPaletteTrigger />
        <ThemeToggle />
        {user && <NotificationsBell />}
        <UserMenu user={user} />
      </div>
    </header>
  );
}
