"use client";

import { MoonStarIcon, SunIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useColorContext } from "~/components/color-context";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useIsHydrated } from "~/hooks/use-is-hydrated";
import { copyToClipboard } from "~/lib/clipboard";

export function Header() {
	const { resolvedTheme, setTheme } = useTheme();
	const [isCopied, setIsCopied] = useState(false);
	const { result, getColorCss } = useColorContext();
	const isHydrated = useIsHydrated();

	function handleThemeChange() {
		const newTheme = resolvedTheme === "light" ? "dark" : "light";
		setTheme(newTheme);
	}

	async function handleCopy(theme?: "light" | "dark" | "both") {
		const _theme = theme ?? resolvedTheme ?? "light";

		const lightCss = getColorCss({
			isDarkMode: false,
			accent: {
				contrast: result.accentContrast,
				scale: result.accentScale,
				scaleWideGamut: result.accentScaleWideGamut,
				surface: result.accentSurface,
				surfaceWideGamut: result.accentSurfaceWideGamut,
			},
			background: result.background,
			gray: {
				contrast: "#fff",
				scale: result.grayScale,
				scaleWideGamut: result.grayScaleWideGamut,
				surface: result.graySurface,
				surfaceWideGamut: result.graySurfaceWideGamut,
			},
		});
		const darkCss = getColorCss({
			isDarkMode: true,
			accent: {
				contrast: result.accentContrast,
				scale: result.accentScale,
				scaleWideGamut: result.accentScaleWideGamut,
				surface: result.accentSurface,
				surfaceWideGamut: result.accentSurfaceWideGamut,
			},
			background: result.background,
			gray: {
				contrast: "#fff",
				scale: result.grayScale,
				scaleWideGamut: result.grayScaleWideGamut,
				surface: result.graySurface,
				surfaceWideGamut: result.graySurfaceWideGamut,
			},
		});

		switch (_theme) {
			case "light":
				await copyToClipboard(lightCss);
				break;
			case "dark":
				await copyToClipboard(darkCss);
				break;
			case "both":
				await copyToClipboard(lightCss);
				await copyToClipboard(darkCss);
				break;
		}
		setIsCopied(true);
	}

	if (!isHydrated) {
		return (
			<div className="flex w-full items-center pl-3">
				<h1 className="mr-auto font-semibold text-lg">Components</h1>
				<Button variant={"outline"} size={"icon"}>
					<SunIcon />
				</Button>
				<Button variant={"outline"}>Copy</Button>
			</div>
		);
	}

	return (
		<div className="flex w-full items-center pl-3">
			<h1 className="mr-auto font-semibold text-lg">Components</h1>
			<Button
				variant={"outline"}
				size={"icon"}
				onClick={() => handleThemeChange()}
			>
				<span className="sr-only">Switch theme</span>
				<AnimatePresence>
					{resolvedTheme === "light" && (
						<motion.div
							key="light"
							initial={{ opacity: 0.6, scale: 0.6 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.6 }}
						>
							<SunIcon />
						</motion.div>
					)}
					{resolvedTheme === "dark" && (
						<motion.div
							key="dark"
							initial={{ opacity: 0.6, scale: 0.6 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.6 }}
						>
							<MoonStarIcon />
						</motion.div>
					)}
				</AnimatePresence>
			</Button>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={"outline"}>{isCopied ? "Copied" : "Copy"}</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Theme</DropdownMenuLabel>
					<DropdownMenuItem onClick={() => handleCopy()}>
						{resolvedTheme === "light" ? "Light" : "Dark"}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => handleCopy("both")}>
						Both
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
