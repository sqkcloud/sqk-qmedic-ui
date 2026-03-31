"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Moon, Settings, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserProfileSummary } from "./UserProfileSummary";
import { ProjectSelector } from "./Navbar";

interface TopBannerProps {
  openProfileModal?: () => void;
}

export function TopBanner({ openProfileModal }: TopBannerProps) {
  const { user, logout } = useAuth() as {
    user?: {
      username?: string | null;
      full_name?: string | null;
      system_role?: string | null;
    } | null;
    logout?: () => void | Promise<void>;
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const currentIsDark =
      savedTheme ? savedTheme === "dark" : root.classList.contains("dark");

    setIsDarkMode(currentIsDark);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const normalizedUser = user
    ? {
        username: user.username ?? undefined,
        full_name: typeof user.full_name === "string" ? user.full_name : undefined,
        system_role: user.system_role ?? undefined,
      }
    : undefined;

  const toggleDarkMode = () => {
    const root = document.documentElement;
    const nextIsDark = !isDarkMode;

    setIsDarkMode(nextIsDark);

    if (nextIsDark) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  const handleOpenSettings = () => {
    setIsMenuOpen(false);
    openProfileModal?.();
  };

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await logout?.();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[60] h-[74px] border-b border-[#d7dde61f] bg-[#1d2530] text-white">
      <div className="flex h-full items-center justify-between px-8">
        <div className="flex items-center">
          <Image
            src="/sqk-logo-white.svg"
            alt="SQK Logo"
            width={260}
            height={72}
            priority
            className="h-auto w-auto max-h-[58px]"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="min-w-[240px]">
            <ProjectSelector />
          </div>

          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-white/5"
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
            >
              <UserProfileSummary user={normalizedUser} compact />
              <ChevronDown
                size={16}
                className={`text-white/80 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#20324b] shadow-2xl">
                <div className="border-b border-white/10 px-4 py-4">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-white">
                      {normalizedUser?.username || "User"}
                    </div>
                    <div className="truncate text-xs text-white/60">
                      {normalizedUser?.full_name || ""}
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    type="button"
                    onClick={handleOpenSettings}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white transition-colors hover:bg-white/5"
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>

                  <button
                    type="button"
                    onClick={toggleDarkMode}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white transition-colors hover:bg-white/5"
                  >
                    <span className="flex items-center gap-3">
                      <Moon size={18} />
                      <span>Dark mode</span>
                    </span>
                    <span className="text-xs text-white/60">
                      {isDarkMode ? "On" : "Off"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-300 transition-colors hover:bg-white/5"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}