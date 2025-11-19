import { MoonStarIcon, SunIcon } from "lucide-react";
import { motion } from "motion/react";
import * as React from "react";
import { useTheme } from "~/components/theme-provider";

export function ThemeSwitcher() {
	const { resolvedTheme, setTheme } = useTheme();

	const theme = React.useMemo(() => {
		if (resolvedTheme === "dark") return "dark";
		return "light";
	}, [resolvedTheme]);

	return (
		<div className="relative grid h-9 w-48 grid-cols-2 items-center gap-1 rounded-md border bg-muted p-0.5 font-medium text-sm shadow-xs transition-colors dark:border-input">
			<motion.div
				initial={false}
				animate={{ x: theme === "dark" ? 96 : 2 }}
				transition={{
					type: "tween",
					duration: 0.1,
				}}
				className="absolute top-0.5 left-0 flex size-5 h-[30px] w-[92px] items-center justify-center rounded-[6px] border border-border/50 bg-background dark:border-input/80 dark:bg-input/30"
			/>
			<button
				type="button"
				onClick={() => setTheme("light")}
				data-active={theme === "light" ? true : undefined}
				className="group z-1 flex h-full items-center justify-center rounded-[6px] outline-none outline-transparent transition-colors hover:not-data-active:bg-input/50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
			>
				<span className="sr-only">Light</span>
				<SunIcon className="size-4 text-foreground/50 transition-colors group-data-active:text-foreground" />
			</button>
			<button
				type="button"
				onClick={() => setTheme("dark")}
				data-active={theme === "dark" ? true : undefined}
				className="group z-1 flex h-full items-center justify-center rounded-[6px] outline-none transition-colors hover:not-data-active:bg-[color-mix(in_oklab,var(--color-background)_96%,#000)] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
			>
				<span className="sr-only">Dark</span>
				<MoonStarIcon className="size-4 text-foreground/50 transition-colors group-data-active:text-foreground" />
			</button>
		</div>
	);
}
