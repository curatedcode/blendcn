import { ScriptOnce } from "@tanstack/react-router";
import * as React from "react";

function FunctionOnce({
	children,
	param,
}: {
	children: (param: string) => void;
	param: string;
}) {
	return (
		<ScriptOnce>
			{`(${children.toString()})(${JSON.stringify(param)})`}
		</ScriptOnce>
	);
}

type ResolvedTheme = "dark" | "light";
type Theme = ResolvedTheme | "system";

interface ThemeProviderProps {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
}

interface ThemeProviderState {
	theme: Theme;
	resolvedTheme: ResolvedTheme;
	setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
	theme: "system",
	resolvedTheme: "light",
	setTheme: () => null,
};

const ThemeProviderContext =
	React.createContext<ThemeProviderState>(initialState);

const disableAnimation = () => {
	const css = document.createElement("style");
	css.appendChild(
		document.createTextNode(
			"*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}",
		),
	);
	document.head.appendChild(css);

	return () => {
		// Force restyle
		(() => window.getComputedStyle(document.body))();

		// Wait for next tick before removing
		setTimeout(() => {
			document.head.removeChild(css);
		}, 1);
	};
};

export function ThemeProvider({
	children,
	defaultTheme = "system",
	storageKey = "blendcn.theme",
}: ThemeProviderProps) {
	const [theme, setTheme] = React.useState<Theme>(defaultTheme);
	const [resolvedTheme, setResolvedTheme] =
		React.useState<ResolvedTheme>("light");

	React.useEffect(() => {
		const root = window.document.documentElement;
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		function updateTheme() {
			const enableAnimation = disableAnimation();

			root.classList.remove("light", "dark");

			const newResolvedTheme =
				theme === "system"
					? mediaQuery.matches
						? "dark"
						: "light"
					: (theme as ResolvedTheme);

			setResolvedTheme(newResolvedTheme);
			root.classList.add(newResolvedTheme);

			// Re-enable animations after applying theme
			enableAnimation();
		}

		updateTheme();
		mediaQuery.addEventListener("change", updateTheme);

		return () => mediaQuery.removeEventListener("change", updateTheme);
	}, [theme]); // storageKey doesn't affect theme updates

	const value = React.useMemo(
		() => ({
			theme,
			resolvedTheme,
			setTheme: (theme: Theme) => {
				localStorage.setItem(storageKey, theme);
				setTheme(theme);
			},
		}),
		[theme, resolvedTheme, storageKey],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Sync with localStorage after mount
	React.useEffect(() => {
		const stored = localStorage.getItem(storageKey) as Theme;
		if (stored && stored !== theme) {
			setTheme(stored);
		}
	}, []);

	return (
		<ThemeProviderContext value={value}>
			<FunctionOnce param={storageKey}>
				{(storageKey) => {
					const theme: string | null = localStorage.getItem(storageKey);

					if (
						theme === "dark" ||
						((theme === null || theme === "system") &&
							window.matchMedia("(prefers-color-scheme: dark)").matches)
					) {
						document.documentElement.classList.add("dark");
					}
				}}
			</FunctionOnce>
			{children}
		</ThemeProviderContext>
	);
}

export function useTheme() {
	const context = React.use(ThemeProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");

	return context;
}
