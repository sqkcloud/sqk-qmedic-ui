"use client";


import { User } from "lucide-react";


interface UserProfileSummaryProps {
  user?: {
    username?: string;
    full_name?: string;
    system_role?: string;
  } | null;
  compact?: boolean;
}

export function UserProfileSummary({
  user,
}: UserProfileSummaryProps) {

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
      <User size={18} className="text-white" />
      </div>

      <div className="min-w-0 text-left">
        <div className="truncate text-sm font-semibold text-white">
          {user?.username || "User"}
        </div>
        <div className="truncate text-xs text-white/60">
          {user?.full_name || ""}
        </div>
      </div>

      {user?.system_role && (
        <span className="rounded-full bg-blue-600 hover:bg-blue-500 px-2 py-0.5 text-[11px] font-semibold text-white">
          {user.system_role}
        </span>
      )}
    </div>
  );
}