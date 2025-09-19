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
				({ key, value }) => `\t--${key}: ${value.toUpperCase()};`,
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
		const keyValues = Object.entries(mockPaletteMappings.light).map(
			([key, value]) => ({ key, value }),
		);

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

		expect(
			generateUserColorsCss({
				theme: "dark",
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
				({ key, value }) => `\t--${key}: ${value.toUpperCase()};`,
			),
			"}",
		].join("\n");

		const darkPaletteShouldBe = [
			".dark {",
			...darkKeyValues.map(
				({ key, value }) => `\t--${key}: ${value.toUpperCase()};`,
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
	"\t\t@apply border-border outline-ring/50",
	"",
	"\tbody {",
	"\t\t@apply bg-background text-foreground",
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
		background: "#f5f5f5",
		foreground: "#1f1f1f",
		card: "#ffffffcc",
		"card-foreground": "#1f1f1f",
		popover: "#e4e4e4",
		"popover-foreground": "#1f1f1f",
		primary: "#22b573",
		"primary-foreground": "#f2f2f2",
		secondary: "#dbdbdb",
		"secondary-foreground": "#1f1f1f",
		muted: "#ededed",
		"muted-foreground": "#565656",
		accent: "#b3dcc3",
		"accent-foreground": "#1f1f1f",
		destructive: "#ff383c",
		border: "#cbcbcb",
		input: "#e4e4e4",
		ring: "#3aad73",
		"chart-1": "#22b573",
		"chart-2": "#b3dcc3",
		"chart-3": "#dbdbdb",
		"chart-4": "#31a66d",
		"chart-5": "#bfbfbf",
		sidebar: "#ededed",
		"sidebar-foreground": "#565656",
		"sidebar-primary": "#31a66d",
		"sidebar-primary-foreground": "#1f1f1f",
		"sidebar-accent": "#b3dcc3",
		"sidebar-accent-foreground": "#1f1f1f",
		"sidebar-border": "#bfbfbf",
		"sidebar-ring": "#3aad73",
		"apple-red": "#ff383c",
		"scrollbar-thumb": "#cbcbcb",
		"scrollbar-thumb-hover": "#bfbfbf",
		"scrollbar-thumb-active": "#acacac",
	},
	dark: {
		background: "#1a1a1a",
		foreground: "#eee",
		card: "rgba(0, 0, 0, 0.05)",
		"card-foreground": "#eee",
		popover: "#292929",
		"popover-foreground": "#eee",
		primary: "#36d07e",
		"primary-foreground": "#eee",
		secondary: "#2f2f2f",
		"secondary-foreground": "#eee",
		muted: "#212121",
		"muted-foreground": "#b4b4b4",
		accent: "#1e4b30",
		"accent-foreground": "#eee",
		destructive: "#ff383c",
		border: "#3e3e3e",
		input: "#292929",
		ring: "#616161",
		"chart-1": "#36d07e",
		"chart-2": "#1e4b30",
		"chart-3": "#2f2f2f",
		"chart-4": "#22c573",
		"chart-5": "#4a4a4a",
		sidebar: "#212121",
		"sidebar-foreground": "#b4b4b4",
		"sidebar-primary": "#22c573",
		"sidebar-primary-foreground": "#eee",
		"sidebar-accent": "#1e4b30",
		"sidebar-accent-foreground": "#eee",
		"sidebar-border": "#4a4a4a",
		"sidebar-ring": "#616161",
		"apple-red": "#ff383c",
		"scrollbar-thumb": "#3e3e3e",
		"scrollbar-thumb-hover": "#4a4a4a",
		"scrollbar-thumb-active": "#616161",
	},
};

type ExcludingScrollbarStyles = Omit<
	ReturnType<typeof useColorContext>["paletteMappings"]["light"],
	"scrollbar-thumb" | "scrollbar-thumb-hover" | "scrollbar-thumb-active"
>;

const mockPaletteMappings: {
	light: ExcludingScrollbarStyles;
	dark: ExcludingScrollbarStyles;
} = {
	light: {
		background: "#f5f5f5",
		foreground: "#1f1f1f",
		card: "#ffffffcc",
		"card-foreground": "#1f1f1f",
		popover: "#e4e4e4",
		"popover-foreground": "#1f1f1f",
		primary: "#22b573",
		"primary-foreground": "#f2f2f2",
		secondary: "#dbdbdb",
		"secondary-foreground": "#1f1f1f",
		muted: "#ededed",
		"muted-foreground": "#565656",
		accent: "#b3dcc3",
		"accent-foreground": "#1f1f1f",
		destructive: "#ff383c",
		border: "#cbcbcb",
		input: "#e4e4e4",
		ring: "#3aad73",
		"chart-1": "#22b573",
		"chart-2": "#b3dcc3",
		"chart-3": "#dbdbdb",
		"chart-4": "#31a66d",
		"chart-5": "#bfbfbf",
		sidebar: "#ededed",
		"sidebar-foreground": "#565656",
		"sidebar-primary": "#31a66d",
		"sidebar-primary-foreground": "#1f1f1f",
		"sidebar-accent": "#b3dcc3",
		"sidebar-accent-foreground": "#1f1f1f",
		"sidebar-border": "#bfbfbf",
		"sidebar-ring": "#3aad73",
		"apple-red": "#ff383c",
	},
	dark: {
		background: "#1a1a1a",
		foreground: "#eee",
		card: "rgba(0, 0, 0, 0.05)",
		"card-foreground": "#eee",
		popover: "#292929",
		"popover-foreground": "#eee",
		primary: "#36d07e",
		"primary-foreground": "#eee",
		secondary: "#2f2f2f",
		"secondary-foreground": "#eee",
		muted: "#212121",
		"muted-foreground": "#b4b4b4",
		accent: "#1e4b30",
		"accent-foreground": "#eee",
		destructive: "#ff383c",
		border: "#3e3e3e",
		input: "#292929",
		ring: "#616161",
		"chart-1": "#36d07e",
		"chart-2": "#1e4b30",
		"chart-3": "#2f2f2f",
		"chart-4": "#22c573",
		"chart-5": "#4a4a4a",
		sidebar: "#212121",
		"sidebar-foreground": "#b4b4b4",
		"sidebar-primary": "#22c573",
		"sidebar-primary-foreground": "#eee",
		"sidebar-accent": "#1e4b30",
		"sidebar-accent-foreground": "#eee",
		"sidebar-border": "#4a4a4a",
		"sidebar-ring": "#616161",
		"apple-red": "#ff383c",
	},
};
