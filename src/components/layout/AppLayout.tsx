"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { AnalysisSidebar } from "./AnalysisSidebar";
import { TopBanner } from "./TopBanner";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { AnalysisChatProvider } from "@/contexts/AnalysisChatContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

const PUBLIC_PATHS = ["/login"];

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const isPublicPage = PUBLIC_PATHS.includes(pathname);

  if (isPublicPage) return <>{children}</>;

  return (
    <SidebarProvider>
      <AnalysisChatProvider>
        <div className="min-h-screen bg-[#16263c] text-white">
          <TopBanner />

          <div className="pt-[74px]">
            <div className="flex min-h-[calc(100vh-74px)]">
              <Sidebar />

              <div className="flex min-w-0 flex-1 flex-col bg-[#16263c]">
                <Navbar />
                <main className="flex-1 overflow-auto bg-[#16263c]">
                  {children}
                </main>
              </div>

              <AnalysisSidebar />
            </div>
          </div>
        </div>
      </AnalysisChatProvider>
    </SidebarProvider>
  );
}