import { Sidebar, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/app-header";
import { SidebarCategories } from "@/components/sidebar-categories";
import { getSession } from "@/lib/auth";
import { toPublicUser } from "@/lib/db/users";
import { getCategories } from "@/lib/db/categories";
import { getCachedCategoryCounts } from "@/lib/cache";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const [session, categories, counts] = await Promise.all([
    getSession(),
    getCategories(),
    getCachedCategoryCounts(),
  ]);
  const user = toPublicUser(session);

  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas">
        <SidebarCategories
          categories={categories}
          activeCategory="todas"
          counts={counts}
          user={user}
        />
      </Sidebar>
      <SidebarInset>
        <AppHeader user={user} />
        <main id="main-content" className="flex-1 p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
