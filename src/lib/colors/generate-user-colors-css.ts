import Color from "colorjs.io";
import type { useColorContext } from "~/components/color-context";
import { shadcnCssVariables } from "~/components/color-field/types";

type TabIndentationType = {
	type: "tab";
};

type SpaceIndentationType = {
	type: "space";
	size: 2 | 4;
};

type IndentationType = TabIndentationType | SpaceIndentationType;

export type GenerateUserColorsCssArgs<
	T extends (typeof supportedThemes)[number]["value"],
> = {
	theme: T;
	includeSupportsMediaQuery: boolean;
	includeThemeInlineVariables: boolean;
	indentation: IndentationType;
	darkModeVariant?: T extends "dark" | "both"
		? (typeof supportedDarkVariants)[number]["value"]
		: undefined;
	uppercaseHex: boolean;
	paletteMappings: ReturnType<typeof useColorContext>["paletteMappings"];
	colorFormat: (typeof supportedColorFormats)[number]["value"];
};

export function generateUserColorsCss<
	T extends (typeof supportedThemes)[number]["value"],
>({
	theme,
	includeSupportsMediaQuery,
	includeThemeInlineVariables,
	indentation,
	darkModeVariant,
	uppercaseHex,
	paletteMappings,
	colorFormat,
}: GenerateUserColorsCssArgs<T>) {
	let darkModeSelector =
		darkModeVariant === "class"
			? ".dark"
			: darkModeVariant === "data-attribute"
				? "[data-theme='dark']"
				: null;

	if (colorFormat === "oklch" && includeSupportsMediaQuery) {
		console.warn(
			"Args combination of colorFormat='oklch' and includeSupportsMediaQuery=true produce the same output. Omitting supportsMediaQuery",
		);
	}

	if (colorFormat !== "hex" && uppercaseHex) {
		console.warn("uppercaseHex=true is only valid with colorFormat='hex'");
	}

	const selectors: { selector: string; theme: "light" | "dark" }[] = [];

	switch (theme) {
		case "light": {
			selectors.push({ selector: ":root", theme: "light" });
			break;
		}
		case "dark": {
			if (!darkModeSelector) {
				darkModeSelector = ".dark";
				console.warn("Dark mode variant is required for dark/both themes");
			}
			selectors.push({ selector: darkModeSelector, theme: "dark" });
			break;
		}
		case "both": {
			if (!darkModeSelector) {
				darkModeSelector = ".dark";
				console.warn(
					"Dark mode variant is required for dark/both themes. Defaulting to '.dark'",
				);
			}
			selectors.push({ selector: ":root", theme: "light" });
			selectors.push({ selector: darkModeSelector, theme: "dark" });
			break;
		}
	}

	// this is ugly but if we don't do it then we get our output has awkward indentation. (same for the others below)
	const colorValuesCss = selectors
		.map(({ selector, theme }) =>
			[
				`${selector} {`,
				...shadcnCssVariables.map((key) => {
					let color: string = paletteMappings[theme][key];
					if (color === "") {
						throw new Error(
							`Invalid color value for ${key} in theme ${theme}. Received: ${color}`,
						);
					}

					if (colorFormat === "hex") {
						if (uppercaseHex) {
							color = color.toUpperCase();
						} else {
							color = color.toLowerCase();
						}
					} else {
						color = new Color(color).to(colorFormat).toString();
						if (typeof color !== "string") {
							throw new Error(
								`Invalid color value for ${key} in theme ${theme}. Received '${paletteMappings[theme][key]}'`,
							);
						}
					}

					return `\t--${key}: ${color};`;
				}),
				"}",
			].join("\n"),
		)
		.join("\n\n");

	const shouldIncludeSupportsMediaQuery =
		includeSupportsMediaQuery && colorFormat !== "oklch";

	const supportsMediaQueryCss = shouldIncludeSupportsMediaQuery
		? [
				"@supports (color: color(display-p3 1 1 1)) {",
				"\t@media (color-gamut: p3) {",
				...selectors.map(({ selector, theme }) =>
					[
						`\t\t${selector} {`,
						...shadcnCssVariables.map((key) => {
							const color = new Color(paletteMappings[theme][key])
								.to("oklch")
								.toString();

							if (typeof color !== "string") {
								throw new Error(
									`Invalid color value for ${key} in theme ${theme}. Received '${paletteMappings[theme][key]}'`,
								);
							}

							return `\t\t\t--${key}: ${color};`;
						}),
						"\t\t}",
					].join("\n"),
				),
				"\t}",
				"}",
			].join("\n")
		: null;

	const themeInlineVariables = [
		"@theme inline {",
		...shadcnCssVariables.map((key) => `\t--color-${key}: var(--${key});`),
		"}",
	].join("\n");

	const cssToFormat: string[] = [
		includeThemeInlineVariables && themeInlineVariables,
		colorValuesCss,
		supportsMediaQueryCss,
	].filter((v): v is string => Boolean(v));

	return formatCode(cssToFormat.join("\n\n"), indentation);
}

function formatCode(code: string, indentation: IndentationType) {
	const lines = code.split("\n");
	const newIndentChar =
		indentation.type === "tab" ? "\t" : " ".repeat(indentation.size);

	return lines
		.map((line) => {
			if (line === "") return line;
			const trimmed = line.trimStart();
			const leadingWhitespace = line.substring(0, line.length - trimmed.length);

			const indentLevel = (leadingWhitespace.match(/\t/g) || []).length;

			return newIndentChar.repeat(indentLevel) + trimmed;
		})
		.join("\n");
}

export const supportedColorFormats = [
	{ label: "hex", value: "hex" },
	{ label: "rgb", value: "srgb" },
	{ label: "hsl", value: "hsl" },
	{ label: "oklch", value: "oklch" },
] as const;

export const supportedThemes = [
	{ label: "Light", value: "light" },
	{ label: "Dark", value: "dark" },
	{ label: "Both", value: "both" },
] as const;

export const supportedDarkVariants = [
	{ label: "Class", value: "class" },
	{ label: "Data attribute", value: "data-attribute" },
] as const;

export const supportedIndentationType = [
	{ label: "Tabs", value: "tab" },
	{ label: "Spaces", value: "space" },
] as const;

export const supportedIndentationSize = [
	{ label: 2, value: 2 },
	{ label: 4, value: 4 },
] as const;
