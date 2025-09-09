"use client";

import { MoonStarIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "~/components/ui/segmented-control";

export function ThemeControlHeader() {
  const { resolvedTheme, setTheme } = useTheme();

  function handleThemeChange(value: string) {
    if (value !== "light" && value !== "dark") return;
    setTheme(value);
  }

  return (
    <div>
      <div
        className="mx-auto mt-4 mb-12 flex flex-col items-center gap-8"
        suppressHydrationWarning
      >
        <h1 className="font-display font-medium text-xl">
          Create a custom palette
        </h1>
        <SegmentedControl
          defaultValue={resolvedTheme ?? "light"}
          onValueChange={handleThemeChange}
          suppressHydrationWarning
        >
          <SegmentedControlItem value="light" suppressHydrationWarning>
            <SunIcon className="size-4" /> Light
          </SegmentedControlItem>
          <SegmentedControlItem value="dark" suppressHydrationWarning>
            <MoonStarIcon className="size-4" /> Dark
          </SegmentedControlItem>
        </SegmentedControl>
      </div>
    </div>
  );
}
