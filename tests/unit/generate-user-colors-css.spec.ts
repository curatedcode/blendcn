import Color from "colorjs.io";
import { describe, expect, test } from "vitest";
import type { useColorContext } from "~/components/color-context";
import { shadcnCssVariables } from "~/components/color-field/types";
import { generateUserColorsCss } from "~/lib/colors/generate-user-colors-css";

describe("generateUserColorsCss fn output", () => {
	// Core
	test("returns light theme CSS with :root selector", () => {
		const keyValues = Object.entries(mockPaletteMappings.light).map(
			([key, value]) => ({ key, value }),
		);

		const shouldBe = [
			":root {",
			...keyValues.map(({ key, value }) => `\t--${key}: ${value};`),
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "light",
				colorFormat: "hex",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: false,
				includeScrollbarStyling: false,
			}),
		).toStrictEqual(shouldBe);
	});

	test("returns dark theme CSS with class selector when darkModeVariant is class", () => {
		const keyValues = Object.entries(mockPaletteMappings.dark).map(
			([key, value]) => ({ key, value }),
		);

		const shouldBe = [
			".dark {",
			...keyValues.map(({ key, value }) => `\t--${key}: ${value};`),
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "dark",
				colorFormat: "hex",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: false,
				darkModeVariant: "class",
				includeScrollbarStyling: false,
			}),
		).toStrictEqual(shouldBe);
	});

	test("returns dark theme CSS with data attribute selector when darkModeVariant is data-attribute", () => {
		const keyValues = Object.entries(mockPaletteMappings.dark).map(
			([key, value]) => ({ key, value }),
		);

		const shouldBe = [
			"[data-theme='dark'] {",
			...keyValues.map(({ key, value }) => `\t--${key}: ${value};`),
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "dark",
				colorFormat: "hex",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: false,
				darkModeVariant: "data-attribute",
				includeScrollbarStyling: false,
			}),
		).toStrictEqual(shouldBe);
	});

	test("returns both light and dark theme CSS when theme is both", () => {
		const lightKeyValues = Object.entries(mockPaletteMappings.light).map(
			([key, value]) => ({ key, value }),
		);
		const darkKeyValues = Object.entries(mockPaletteMappings.dark).map(
			([key, value]) => ({ key, value }),
		);

		const lightShouldBe = [
			":root {",
			...lightKeyValues.map(({ key, value }) => `\t--${key}: ${value};`),
			"}",
		].join("\n");

		const darkShouldBe = [
			".dark {",
			...darkKeyValues.map(({ key, value }) => `\t--${key}: ${value};`),
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "both",
				colorFormat: "hex",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: false,
				darkModeVariant: "class",
				includeScrollbarStyling: false,
			}),
		).toStrictEqual([lightShouldBe, darkShouldBe].join("\n\n"));
	});

	test("generates CSS variables for all shadcnCssVariables keys", () => {
		const paletteKeyValues = Object.entries(mockPaletteMappings.light).map(
			([key, value]) => ({ key, value }),
		);

		const shadcnVariablesShouldBe = [
			"@theme inline {",
			"\t--radius-sm: calc(var(--radius) - 4px);",
			"\t--radius-md: calc(var(--radius) - 2px);",
			"\t--radius-lg: var(--radius);",
			"\t--radius-xl: calc(var(--radius) + 4px);",
			...shadcnCssVariables.map((key) => `\t--color-${key}: var(--${key});`),
			"}",
		].join("\n");

		const paletteShouldBe = [
			":root {",
			"\t--radius: 0.625rem;",
			...paletteKeyValues.map(({ key, value }) => `\t--${key}: ${value};`),
			"}",
		].join("\n");

		const baseLayerShouldBe = [
			"@layer base {",
			...shadcnBaseLayerCss,
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "light",
				colorFormat: "hex",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: true,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: false,
				includeScrollbarStyling: false,
			}),
		).toStrictEqual(
			[shadcnVariablesShouldBe, paletteShouldBe, baseLayerShouldBe].join(
				"\n\n",
			),
		);
	});

	// Color format
	test("returns hex colors in lowercase when uppercaseHex is false", () => {
		const keyValues = Object.entries(mockPaletteMappings.light).map(
			([key, value]) => ({ key, value: value.toUpperCase() }),
		);

		const shouldBe = [
			":root {",
			...keyValues.map(
				({ key, value }) => `\t--${key}: ${value.toLowerCase()};`,
			),
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "light",
				colorFormat: "hex",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: false,
				includeScrollbarStyling: false,
			}),
		).toStrictEqual(shouldBe);
	});

	test("returns hex colors in uppercase when uppercaseHex is true", () => {
		const keyValues = Object.entries(mockPaletteMappings.light).map(
			([key, value]) => ({ key, value: value.toLowerCase() }),
		);

		const shouldBe = [
			":root {",
			...keyValues.map(
				({ key, value }) =>
					`\t--${key}: ${value.startsWith("#") ? value.toUpperCase() : value};`,
			),
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "light",
				colorFormat: "hex",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: true,
				includeScrollbarStyling: false,
			}),
		).toStrictEqual(shouldBe);
	});

	test("converts colors to oklch format when colorFormat is oklch", () => {
		const keyValues = Object.entries(mockPaletteMappings.light).map(
			([key, value]) => ({ key, value }),
		);

		const shouldBe = [
			":root {",
			...keyValues.map(
				({ key, value }) => `\t--${key}: ${new Color(value).to("oklch")};`,
			),
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "light",
				colorFormat: "oklch",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: false,
				includeScrollbarStyling: false,
			}),
		).toStrictEqual(shouldBe);
	});

	test("converts colors to hsl format when colorFormat is hsl", () => {
		const keyValues = Object.entries(mockPaletteMappings.light).map(
			([key, value]) => ({ key, value }),
		);

		const shouldBe = [
			":root {",
			...keyValues.map(
				({ key, value }) => `\t--${key}: ${new Color(value).to("hsl")};`,
			),
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "light",
				colorFormat: "hsl",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: false,
				includeScrollbarStyling: false,
			}),
		).toStrictEqual(shouldBe);
	});

	test("converts colors to srgb format when colorFormat is srgb", () => {
		const keyValues = Object.entries(mockPaletteMappings.light).map(
			([key, value]) => ({ key, value }),
		);

		const shouldBe = [
			":root {",
			...keyValues.map(
				({ key, value }) => `\t--${key}: ${new Color(value).to("srgb")};`,
			),
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "light",
				colorFormat: "srgb",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: false,
				includeScrollbarStyling: false,
			}),
		).toStrictEqual(shouldBe);
	});

	test("maintains original hex format when colorFormat is hex", () => {
		const keyValues = Object.entries(mockPaletteMappings.light).map(
			([key, value]) => ({ key, value }),
		);

		const shouldBe = [
			":root {",
			...keyValues.map(({ key, value }) => `\t--${key}: ${value};`),
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "light",
				colorFormat: "hex",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: false,
				includeScrollbarStyling: false,
			}),
		).toStrictEqual(shouldBe);
	});

	// Supports media query
	test("includes @supports media query when includeSupportsMediaQuery is true and colorFormat is not oklch", () => {
		const keyValues = Object.entries(mockPaletteMappings.light).map(
			([key, value]) => ({ key, value }),
		);

		const paletteShouldBe = [
			":root {",
			...keyValues.map(({ key, value }) => `\t--${key}: ${value};`),
			"}",
		].join("\n");

		const supportsMediaShouldBe = [
			"@supports (color: color(display-p3 1 1 1)) {",
			"\t@media (color-gamut: p3) {",
			"\t\t:root {",
			...keyValues.map(
				({ key, value }) =>
					`\t\t\t--${key}: ${new Color(value).to("oklch").toString()};`,
			),
			"\t\t}",
			"\t}",
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "light",
				colorFormat: "hex",
				includeSupportsMediaQuery: true,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: false,
				includeScrollbarStyling: false,
			}),
		).toStrictEqual([paletteShouldBe, supportsMediaShouldBe].join("\n\n"));
	});

	test("includes @supports media query when includeSupportsMediaQuery is true and colorFormat is not oklch", () => {
		const keyValues = Object.entries(mockPaletteMappings.light).map(
			([key, value]) => ({ key, value }),
		);

		const shouldBe = [
			":root {",
			...keyValues.map(
				({ key, value }) =>
					`\t--${key}: ${new Color(value).to("oklch").toString()};`,
			),
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "light",
				colorFormat: "oklch",
				includeSupportsMediaQuery: true,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: false,
				includeScrollbarStyling: false,
			}),
		).toStrictEqual(shouldBe);
	});

	// @theme inline variables
	test("includes @theme inline variables when includeThemeInlineVariables is true", () => {
		const keyValues = Object.entries(mockPaletteMappings.light)
			.map(([key, value]) => ({ key, value }))
			.filter((v) => !v.key.includes("scrollbar-thumb"));

		const themeInlineShouldBe = [
			"@theme inline {",
			"\t--radius-sm: calc(var(--radius) - 4px);",
			"\t--radius-md: calc(var(--radius) - 2px);",
			"\t--radius-lg: var(--radius);",
			"\t--radius-xl: calc(var(--radius) + 4px);",
			...keyValues.map(({ key }) => `\t--color-${key}: var(--${key});`),
			"}",
		].join("\n");

		const paletteShouldBe = [
			":root {",
			"\t--radius: 0.625rem;",
			...keyValues.map(({ key, value }) => `\t--${key}: ${value};`),
			"}",
		].join("\n");

		const baseLayerShouldBe = [
			"@layer base {",
			...shadcnBaseLayerCss,
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "light",
				colorFormat: "hex",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: true,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: false,
				includeScrollbarStyling: false,
			}),
		).toStrictEqual(
			[themeInlineShouldBe, paletteShouldBe, baseLayerShouldBe].join("\n\n"),
		);
	});

	// Scrollbar styling
	test("includes @layer base css styling when includeScrollbarStyling is true", () => {
		const keyValues = Object.entries(allMockPaletteMappings.light).map(
			([key, value]) => ({ key, value }),
		);

		const paletteShouldBe = [
			":root {",
			...keyValues.map(({ key, value }) => `\t--${key}: ${value};`),
			"}",
		].join("\n");

		const scrollbarBaseLayerShouldBe = [
			"@layer base {",
			...scrollbarBaseLayerCss,
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "light",
				colorFormat: "hex",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: false,
				includeScrollbarStyling: true,
			}),
		).toStrictEqual([paletteShouldBe, scrollbarBaseLayerShouldBe].join("\n\n"));
	});

	// Spacing
	test("returns CSS with tab indentation when indentation type is tab", () => {
		const keyValues = Object.entries(mockPaletteMappings.light).map(
			([key, value]) => ({ key, value }),
		);

		const shouldBe = [
			":root {",
			...keyValues.map(({ key, value }) => `\t--${key}: ${value};`),
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "light",
				colorFormat: "hex",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: false,
				includeScrollbarStyling: false,
			}),
		).toStrictEqual(shouldBe);
	});

	test("returns CSS with 2 space indentation when indentation type is space and size is 2", () => {
		const keyValues = Object.entries(mockPaletteMappings.light).map(
			([key, value]) => ({ key, value }),
		);

		const shouldBe = [
			":root {",
			...keyValues.map(({ key, value }) => `  --${key}: ${value};`),
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "light",
				colorFormat: "hex",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "space", size: 2 },
				uppercaseHex: false,
				includeScrollbarStyling: false,
			}),
		).toStrictEqual(shouldBe);
	});

	test("returns CSS with 4 space indentation when indentation type is space and size is 4", () => {
		const keyValues = Object.entries(mockPaletteMappings.light).map(
			([key, value]) => ({ key, value }),
		);

		const shouldBe = [
			":root {",
			...keyValues.map(({ key, value }) => `    --${key}: ${value};`),
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "light",
				colorFormat: "hex",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "space", size: 4 },
				uppercaseHex: false,
				includeScrollbarStyling: false,
			}),
		).toStrictEqual(shouldBe);
	});

	// Dark mode variants
	test("sets darkModeVariant to (.dark) when it's undefined for dark theme", () => {
		const keyValues = Object.entries(mockPaletteMappings.dark).map(
			([key, value]) => ({ key, value }),
		);

		const shouldBe = [
			".dark {",
			...keyValues.map(({ key, value }) => `\t--${key}: ${value};`),
			"}",
		].join("\n");

		const result = generateUserColorsCss({
			theme: "dark",
			colorFormat: "hex",
			includeSupportsMediaQuery: false,
			includeThemeInlineVariables: false,
			paletteMappings: allMockPaletteMappings,
			indentation: { type: "tab" },
			uppercaseHex: false,
			darkModeVariant: undefined,
			includeScrollbarStyling: false,
		});

		expect(result).toStrictEqual(shouldBe);
	});

	test("sets darkModeVariant to (.dark) when it's undefined for both theme", () => {
		const lightKeyValues = Object.entries(mockPaletteMappings.light).map(
			([key, value]) => ({ key, value }),
		);
		const darkKeyValues = Object.entries(mockPaletteMappings.dark).map(
			([key, value]) => ({ key, value }),
		);

		const lightShouldBe = [
			":root {",
			...lightKeyValues.map(({ key, value }) => `\t--${key}: ${value};`),
			"}",
		].join("\n");

		const darkShouldBe = [
			".dark {",
			...darkKeyValues.map(({ key, value }) => `\t--${key}: ${value};`),
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "both",
				colorFormat: "hex",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: false,
				darkModeVariant: undefined,
				includeScrollbarStyling: false,
			}),
		).toStrictEqual([lightShouldBe, darkShouldBe].join("\n\n"));
	});

	test("accepts undefined darkModeVariant for light theme only", () => {
		const keyValues = Object.entries(mockPaletteMappings.light).map(
			([key, value]) => ({ key, value }),
		);

		const shouldBe = [
			":root {",
			...keyValues.map(({ key, value }) => `\t--${key}: ${value};`),
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "light",
				colorFormat: "hex",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: false,
				darkModeVariant: undefined,
				includeScrollbarStyling: false,
			}),
		).toStrictEqual(shouldBe);
	});

	test("generates correct class selector (.dark) for class variant", () => {
		const keyValues = Object.entries(mockPaletteMappings.dark).map(
			([key, value]) => ({ key, value }),
		);

		const shouldBe = [
			".dark {",
			...keyValues.map(({ key, value }) => `\t--${key}: ${value};`),
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "dark",
				colorFormat: "hex",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: false,
				darkModeVariant: "class",
				includeScrollbarStyling: false,
			}),
		).toStrictEqual(shouldBe);
	});

	test("generates correct data attribute selector ([data-theme='dark']) for data-attribute variant", () => {
		const keyValues = Object.entries(mockPaletteMappings.dark).map(
			([key, value]) => ({ key, value }),
		);

		const shouldBe = [
			"[data-theme='dark'] {",
			...keyValues.map(({ key, value }) => `\t--${key}: ${value};`),
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "dark",
				colorFormat: "hex",
				includeSupportsMediaQuery: false,
				includeThemeInlineVariables: false,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: false,
				darkModeVariant: "data-attribute",
				includeScrollbarStyling: false,
			}),
		).toStrictEqual(shouldBe);
	});

	// Max output
	test("returns properly formatted CSS when all formatting options are enabled", () => {
		const lightKeyValues = Object.entries(allMockPaletteMappings.light).map(
			([key, value]) => ({ key, value }),
		);
		const darkKeyValues = Object.entries(allMockPaletteMappings.dark).map(
			([key, value]) => ({ key, value }),
		);

		const themeInlineShouldBe = [
			"@theme inline {",
			"\t--radius-sm: calc(var(--radius) - 4px);",
			"\t--radius-md: calc(var(--radius) - 2px);",
			"\t--radius-lg: var(--radius);",
			"\t--radius-xl: calc(var(--radius) + 4px);",
			...lightKeyValues.map(({ key }) => `\t--color-${key}: var(--${key});`),
			"}",
		].join("\n");

		const lightPaletteShouldBe = [
			":root {",
			"\t--radius: 0.625rem;",
			...lightKeyValues.map(
				({ key, value }) =>
					`\t--${key}: ${value.startsWith("#") ? value.toUpperCase() : value};`,
			),
			"}",
		].join("\n");

		const darkPaletteShouldBe = [
			".dark {",
			...darkKeyValues.map(
				({ key, value }) =>
					`\t--${key}: ${value.startsWith("#") ? value.toUpperCase() : value};`,
			),
			"}",
		].join("\n");

		const supportsMediaShouldBe = [
			"@supports (color: color(display-p3 1 1 1)) {",
			"\t@media (color-gamut: p3) {",
			"\t\t:root {",
			...lightKeyValues.map(
				({ key, value }) =>
					`\t\t\t--${key}: ${new Color(value).to("oklch").toString()};`,
			),
			"\t\t}",
			"\t\t.dark {",
			...darkKeyValues.map(
				({ key, value }) =>
					`\t\t\t--${key}: ${new Color(value).to("oklch").toString()};`,
			),
			"\t\t}",
			"\t}",
			"}",
		].join("\n");

		const baseLayerShouldBe = [
			"@layer base {",
			...shadcnBaseLayerCss,
			"",
			...scrollbarBaseLayerCss,
			"}",
		].join("\n");

		expect(
			generateUserColorsCss({
				theme: "both",
				colorFormat: "hex",
				includeSupportsMediaQuery: true,
				includeThemeInlineVariables: true,
				paletteMappings: allMockPaletteMappings,
				indentation: { type: "tab" },
				uppercaseHex: true,
				darkModeVariant: "class",
				includeScrollbarStyling: true,
			}),
		).toStrictEqual(
			[
				themeInlineShouldBe,
				lightPaletteShouldBe,
				darkPaletteShouldBe,
				supportsMediaShouldBe,
				baseLayerShouldBe,
			].join("\n\n"),
		);
	});

	// Edge cases
	test("handles invalid color values in paletteMappings", () => {
		expect(() =>
			generateUserColorsCss({
				theme: "both",
				colorFormat: "hex",
				includeSupportsMediaQuery: true,
				includeThemeInlineVariables: false,
				paletteMappings: {
					...allMockPaletteMappings,
					light: { ...allMockPaletteMappings.light, background: "" },
				},
				indentation: { type: "tab" },
				uppercaseHex: false,
				includeScrollbarStyling: false,
			}),
		).toThrowError();
	});
});

const shadcnBaseLayerCss = [
	"\t* {",
	"\t\t@apply border-border outline-ring/50;",
	"\t}",
	"",
	"\tbody {",
	"\t\t@apply bg-background text-foreground;",
	"\t}",
];

const scrollbarBaseLayerCss = [
	"\t*:not(body):not(html)::-webkit-scrollbar {",
	"\t\twidth: 10px;",
	"\t\theight: 10px;",
	"\t}",
	"",
	"\t*:not(body):not(html)::-webkit-scrollbar-track {",
	"\t\tbackground: transparent;",
	"\t\tborder-radius: inherit;",
	"\t}",
	"",
	"\t*:not(body):not(html)::-webkit-scrollbar-thumb {",
	"\t\tbackground: var(--scrollbar-thumb);",
	"\t\tborder-radius: 9999px;",
	"\t\tborder: 2px solid transparent;",
	"\t\tbackground-clip: padding-box;",
	"\t\ttransition-property: background-color;",
	"\t\ttransition-timing-function: var(--tw-ease, var(--default-transition-timing-function));",
	"\t\ttransition-duration: var(--tw-duration, var(--default-transition-duration));",
	"\t}",
	"",
	"\t*:not(body):not(html)::-webkit-scrollbar-thumb:hover {",
	"\t\tbackground: var(--scrollbar-thumb-hover);",
	"\t\tborder: 2px solid transparent;",
	"\t\tbackground-clip: padding-box;",
	"\t}",
	"",
	"\t*:not(body):not(html)::-webkit-scrollbar-thumb:active {",
	"\t\tbackground: var(--scrollbar-thumb-active);",
	"\t\tborder: 2px solid transparent;",
	"\t\tbackground-clip: padding-box;",
	"\t}",
	"",
	"\t*:not(body):not(html)::-webkit-scrollbar-corner {",
	"\t\tbackground: inherit;",
	"\t\tborder-radius: inherit;",
	"\t}",
	"",
	"\t*:not(body):not(html)::-webkit-scrollbar-button {",
	"\t\tdisplay: none;",
	"\t}",
];

const allMockPaletteMappings: ReturnType<
	typeof useColorContext
>["paletteMappings"] = {
	light: {
		background: "#e0e0e0",
		foreground: "#1c202b",
		card: "#ffffffcc",
		"card-foreground": "#1c202b",
		popover: "#c7cad1",
		"popover-foreground": "#1c202b",
		primary: "#20bbac",
		"primary-foreground": "#dadbdd",
		secondary: "#bcc0c9",
		"secondary-foreground": "#1c202b",
		muted: "#d4d6d9",
		"muted-foreground": "#373d4b",
		accent: "#7cc3b9",
		"accent-foreground": "#1c202b",
		destructive: "#ff383c",
		border: "#a8adba",
		input: "#c7cad1",
		ring: "#008e81",
		"chart-1": "#20bbac",
		"chart-2": "#7cc3b9",
		"chart-3": "#bcc0c9",
		"chart-4": "#00b0a1",
		"chart-5": "#9ba1b0",
		sidebar: "#d4d6d9",
		"sidebar-foreground": "#373d4b",
		"sidebar-primary": "#00b0a1",
		"sidebar-primary-foreground": "#1c202b",
		"sidebar-accent": "#7cc3b9",
		"sidebar-accent-foreground": "#1c202b",
		"sidebar-border": "#9ba1b0",
		"sidebar-ring": "#008e81",
		"scrollbar-thumb": "#a8adba",
		"scrollbar-thumb-hover": "#9ba1b0",
		"scrollbar-thumb-active": "#858da1",
	},
	dark: {
		background: "#0b0f19",
		foreground: "#eceef2",
		card: "rgba(0, 0, 0, 0.05)",
		"card-foreground": "#eceef2",
		popover: "#202329",
		"popover-foreground": "#eceef2",
		primary: "#00c2b2",
		"primary-foreground": "#eceef2",
		secondary: "#262a32",
		"secondary-foreground": "#eceef2",
		muted: "#17191d",
		"muted-foreground": "#acb4c8",
		accent: "#024842",
		"accent-foreground": "#eceef2",
		destructive: "#ff383c",
		border: "#353a46",
		input: "#202329",
		ring: "#127f75",
		"chart-1": "#00c2b2",
		"chart-2": "#024842",
		"chart-3": "#262a32",
		"chart-4": "#00b6a7",
		"chart-5": "#424857",
		sidebar: "#17191d",
		"sidebar-foreground": "#acb4c8",
		"sidebar-primary": "#00b6a7",
		"sidebar-primary-foreground": "#eceef2",
		"sidebar-accent": "#024842",
		"sidebar-accent-foreground": "#eceef2",
		"sidebar-border": "#424857",
		"sidebar-ring": "#127f75",
		"scrollbar-thumb": "#353a46",
		"scrollbar-thumb-hover": "#424857",
		"scrollbar-thumb-active": "#596174",
	},
};

type ExcludingScrollbarStyles = {
	[K in (typeof shadcnCssVariables)[number]]: string;
};

const mockPaletteMappings: {
	light: ExcludingScrollbarStyles;
	dark: ExcludingScrollbarStyles;
} = {
	light: {
		background: "#e0e0e0",
		foreground: "#1c202b",
		card: "#ffffffcc",
		"card-foreground": "#1c202b",
		popover: "#c7cad1",
		"popover-foreground": "#1c202b",
		primary: "#20bbac",
		"primary-foreground": "#dadbdd",
		secondary: "#bcc0c9",
		"secondary-foreground": "#1c202b",
		muted: "#d4d6d9",
		"muted-foreground": "#373d4b",
		accent: "#7cc3b9",
		"accent-foreground": "#1c202b",
		destructive: "#ff383c",
		border: "#a8adba",
		input: "#c7cad1",
		ring: "#008e81",
		"chart-1": "#20bbac",
		"chart-2": "#7cc3b9",
		"chart-3": "#bcc0c9",
		"chart-4": "#00b0a1",
		"chart-5": "#9ba1b0",
		sidebar: "#d4d6d9",
		"sidebar-foreground": "#373d4b",
		"sidebar-primary": "#00b0a1",
		"sidebar-primary-foreground": "#1c202b",
		"sidebar-accent": "#7cc3b9",
		"sidebar-accent-foreground": "#1c202b",
		"sidebar-border": "#9ba1b0",
		"sidebar-ring": "#008e81",
	},
	dark: {
		background: "#0b0f19",
		foreground: "#eceef2",
		card: "rgba(0, 0, 0, 0.05)",
		"card-foreground": "#eceef2",
		popover: "#202329",
		"popover-foreground": "#eceef2",
		primary: "#00c2b2",
		"primary-foreground": "#eceef2",
		secondary: "#262a32",
		"secondary-foreground": "#eceef2",
		muted: "#17191d",
		"muted-foreground": "#acb4c8",
		accent: "#024842",
		"accent-foreground": "#eceef2",
		destructive: "#ff383c",
		border: "#353a46",
		input: "#202329",
		ring: "#127f75",
		"chart-1": "#00c2b2",
		"chart-2": "#024842",
		"chart-3": "#262a32",
		"chart-4": "#00b6a7",
		"chart-5": "#424857",
		sidebar: "#17191d",
		"sidebar-foreground": "#acb4c8",
		"sidebar-primary": "#00b6a7",
		"sidebar-primary-foreground": "#eceef2",
		"sidebar-accent": "#024842",
		"sidebar-accent-foreground": "#eceef2",
		"sidebar-border": "#424857",
		"sidebar-ring": "#127f75",
	},
};
