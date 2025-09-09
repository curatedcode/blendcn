"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { useColorContext } from "~/components/color-context";
import { ColorField } from "~/components/color-field";

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { copyToClipboard } from "~/lib/clipboard";

export function ColorPickerSection() {
	const { resolvedTheme } = useTheme();
	const {
		result,
		accentValue,
		setAccentValue,
		grayValue,
		setGrayValue,
		bgValue,
		setBgValue,
		getColorCss,
	} = useColorContext();

	const [copied, setCopied] = React.useState("");
	const copiedTimeoutRef = React.useRef<number | null>(null);
	const COPIED_TIMEOUT = 1500;

	// biome-ignore lint/correctness/useExhaustiveDependencies: React to copy change
	const setCopiedMessage = React.useCallback(
		(message: string) => {
			setCopied(message);
			window.clearTimeout(copiedTimeoutRef.current ?? undefined);
			copiedTimeoutRef.current = window.setTimeout(() => {
				setCopied("");
			}, COPIED_TIMEOUT);
		},
		[setCopied],
	);

	return (
		<div className="grid w-full gap-4 sm:max-w-xs md:mx-0">
			<div className="flex flex-col">
				<Label htmlFor="accent" className="mb-2">
					Accent
				</Label>
				<ColorField
					id="accent"
					value={accentValue}
					onValueChange={setAccentValue}
				/>
			</div>
			<div className="flex flex-col">
				<Label htmlFor="gray" className="mb-2">
					Gray
				</Label>
				<ColorField id="gray" value={grayValue} onValueChange={setGrayValue} />
			</div>
			<div className="flex flex-col">
				<Label htmlFor="background" className="mb-2">
					Background
				</Label>
				<ColorField
					id="background"
					value={bgValue}
					onValueChange={setBgValue}
				/>
			</div>
			<Button
				onClick={async () => {
					const css = getColorCss({
						isDarkMode: resolvedTheme === "dark",
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
					await copyToClipboard(css);
					setCopiedMessage("light");
				}}
				data-copied={copied ? true : undefined}
				className="w-full"
			>
				{copied ? "Copied" : "Copy"}
			</Button>
		</div>
	);
}
