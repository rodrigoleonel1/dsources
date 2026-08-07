"use client";

import { useSidebar } from "@/components/ui/sidebar";

export function SidebarClickToClose({ children }: { children: React.ReactNode }) {
  const { setOpenMobile } = useSidebar();

  return (
    <div onClick={() => setOpenMobile(false)} role="presentation" className="contents">
      {children}
    </div>
  );
}
