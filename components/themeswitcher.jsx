"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitch() {
  const { setTheme } = useTheme();
  return (
    <button
      aria-label="theme switch"
      className="items-center bg-white/60 ring-2 ring-blue-500 dark:bg-secondary rounded-full hover:opacity-80"
    >
      <div
        className="dark:hidden block cursor-pointer active:rotate-[270deg] transition-all duration-300   p-1.5 rounded-md focus:border-2 border-black m-[2px] focus:m-0 "
        onClick={() => setTheme("dark")}
      >
        <Moon size={20} />
      </div>
      <div
        className="hidden dark:block cursor-pointer active:-rotate-180 transition-all duration-500   p-1.5 rounded-md focus:border-2 border-black m-[2px] focus:m-0 "
        onClick={() => setTheme("light")}
      >
        <Sun size={20} />
      </div>
    </button>
  );
}
