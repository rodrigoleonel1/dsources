import { Sidebar, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { categories } from "@/components/categories";
import { AppHeader } from "@/components/app-header";
import { SidebarCategories } from "@/components/sidebar-categories";
import { getSession, sessionToPublicUser } from "@/lib/auth";
import { getCachedCategoryCounts } from "@/lib/cache";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const [session, counts] = await Promise.all([getSession(), getCachedCategoryCounts()]);
  const user = sessionToPublicUser(session);

  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas">
        <SidebarCategories
          categories={categories}
          countsByCategory={counts}
          activeCategory="todas"
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
