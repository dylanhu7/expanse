"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { DropdownMenuItem } from "~/app/_components/ui/dropdown-menu";

export const ThemeMenuItem = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <DropdownMenuItem
      onClick={(e) => {
        e.preventDefault();
        setTheme(
          theme === "light" ? "dark" : theme === "dark" ? "system" : "light",
        );
      }}
      className="flex items-center justify-between"
    >
      {`${theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System"} theme`}
      {resolvedTheme === "light" ? <SunIcon /> : <MoonIcon />}
    </DropdownMenuItem>
  );
};
