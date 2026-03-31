"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronRight } from "lucide-react";
import { EnvironmentBadge } from "@/components/ui/EnvironmentBadge";
import { useProject } from "@/contexts/ProjectContext";
import { useSidebar } from "@/contexts/SidebarContext";

function HiddenIcon() {
  const { toggleMobileSidebar } = useSidebar();

  return (
    <div className="flex items-center gap-2 lg:hidden">
      <button
        onClick={toggleMobileSidebar}
        className="btn btn-ghost btn-square"
        aria-label="Open menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
  );
}

export function ProjectSelector() {
  const { currentProject, projects, loading, switchProject } = useProject();

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <span className="loading loading-spinner loading-sm"></span>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-bottom">
      <div
        tabIndex={0}
        role="button"
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1f3a5f] hover:bg-[#2b4a73] text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
          />
        </svg>

        <span className="max-w-32 truncate">
          {currentProject?.name ?? "Select Project"}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-3 w-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu max-h-80 w-64 overflow-y-auto rounded-box border border-[#2f3f55] bg-[#1b2a3c] p-2 shadow"
      >
        {projects.map((project) => (
          <li key={project.project_id}>
            <button
              className={`flex flex-col items-start rounded-lg px-2 py-1 ${
                currentProject?.project_id === project.project_id
                  ? "bg-[#2b4a73] text-white"
                  : "hover:bg-[#243754]"
              }`}
              onClick={() => {
                switchProject(project.project_id);
                (document.activeElement as HTMLElement)?.blur();
              }}
            >
              <span className="w-full truncate text-left font-medium">
                {project.name}
              </span>
              {project.description && (
                <span className="w-full truncate text-left text-xs opacity-60">
                  {project.description}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatSegment(segment: string) {
  const labelMap: Record<string, string> = {
    inbox: "Inbox",
    metrics: "Metrics",
    chip: "Chip",
    analysis: "Analysis",
    "ai-chat": "AI Chat",
    provenance: "Provenance",
    "task-knowledge": "Task Knowledge",
    workflow: "Workflow",
    execution: "Execution",
    issues: "Issues",
    knowledge: "Knowledge",
    tasks: "Tasks",
    settings: "Settings",
    admin: "Admin",
    files: "Files",
    docs: "Docs",
    "api-docs": "API Docs",
  };

  return (
    labelMap[segment] ??
    segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  );
}

export function Navbar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex h-14 items-center border-b border-[#d7dde61f] bg-[#243754] px-4 text-white">
      <HiddenIcon />

      <div className="ml-2 flex items-center gap-1 overflow-x-auto text-sm font-medium whitespace-nowrap">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md px-2 py-1 text-white/85 transition-colors hover:bg-white/5 hover:text-white"
        >
          <Home size={16} />
          <span>Home</span>
        </Link>

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <div key={href} className="flex items-center gap-1">
              <ChevronRight size={14} className="text-white/40" />

              {isLast ? (
                <span className="rounded-md px-2 py-1 text-white">
                  {formatSegment(segment)}
                </span>
              ) : (
                <Link
                  href={href}
                  className="rounded-md px-2 py-1 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {formatSegment(segment)}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <div className="ml-auto">
        <EnvironmentBadge />
      </div>
    </nav>
  );
}