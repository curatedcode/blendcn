import Color from "colorjs.io";

export function toShortFormat(value?: string): string | null {
	if (!value) return null;

	value = toCssFormat(value.trim());
	const regexp = /((?:^(?:[0-9]|[a-f]){6})|(?:^(?:[0-9]|[a-f]){1,3}))/i;
	let [hex] = value.replace(/^#/, "").match(regexp) ?? [];
	let color: Color | undefined;

	if (isColorFunction(value)) {
		try {
			color = new Color(value);
			if (["srgb", "hsl", "hwb"].includes(color.spaceId)) {
				return toShortFormat(color.to("srgb").toString({ format: "hex" }));
			}
			const str = color.toString({ precision: 3 });
			return str.startsWith("color")
				? str.replace("color(", "").replace(")", "")
				: str;
		} catch {}
	}

	if (!hex) return null;

	switch (hex.length) {
		case 1:
			hex = hex.repeat(6);
			break;
		case 2:
			hex = hex.repeat(3);
			break;
		case 3: {
			const [r, g, b] = hex.split("");
			hex = `${r}${r}${g}${g}${b}${b}`;
		}
	}

	return hex.toUpperCase();
}

export function toCssFormat(value: string) {
	if (isColorFunction(value)) {
		return value.includes("(") ? value : `color(${value})`;
	}
	if (value.startsWith("#")) return value;
	return `#${value}`;
}

export function isColorFunction(value: string) {
	return (
		value.startsWith("a98") ||
		value.startsWith("color") ||
		value.startsWith("display-p3") ||
		value.startsWith("hsl") ||
		value.startsWith("hwb") ||
		value.startsWith("lab") ||
		value.startsWith("lch") ||
		value.startsWith("oklab") ||
		value.startsWith("oklch") ||
		value.startsWith("p3") ||
		value.startsWith("prophoto") ||
		value.startsWith("rec2020") ||
		value.startsWith("rgb") ||
		value.startsWith("srgb") ||
		value.startsWith("xyz")
	);
}

export function formatColorVariable(value: (typeof themeTokens)[number]) {
	const words = value.split("-");
	const capitalized: string[] = [];

	for (const word of words) {
		const firstLetter = word.charAt(0).toUpperCase();

		capitalized.push(`${firstLetter}${word.slice(1)}`);
	}

	return capitalized.join(" ");
}

export const DEFAULT_COLOR = "#000000";

export const paletteTokens = [
	"primary-1",
	"primary-2",
	"primary-3",
	"primary-4",
	"primary-5",
	"primary-6",
	"primary-7",
	"primary-8",
	"primary-9",
	"primary-10",
	"primary-11",
	"primary-12",
	"primary-surface",
	"gray-1",
	"gray-2",
	"gray-3",
	"gray-4",
	"gray-5",
	"gray-6",
	"gray-7",
	"gray-8",
	"gray-9",
	"gray-10",
	"gray-11",
	"gray-12",
	"gray-surface",
] as const;

export const extendedTokens = ["color-background", "apple-red"] as const;

export const themeTokens = [...paletteTokens, ...extendedTokens] as const;

export const shadcnCssVariables = [
	"background",
	"foreground",
	"card",
	"card-foreground",
	"popover",
	"popover-foreground",
	"primary",
	"primary-foreground",
	"secondary",
	"secondary-foreground",
	"muted",
	"muted-foreground",
	"accent",
	"accent-foreground",
	"destructive",
	"border",
	"input",
	"ring",
	"chart-1",
	"chart-2",
	"chart-3",
	"chart-4",
	"chart-5",
	"sidebar",
	"sidebar-foreground",
	"sidebar-primary",
	"sidebar-primary-foreground",
	"sidebar-accent",
	"sidebar-accent-foreground",
	"sidebar-border",
	"sidebar-ring",
	"apple-red",
] as const;

export const defaultColorMappings: {
	[K in (typeof shadcnCssVariables)[number]]: (typeof themeTokens)[number];
} = {
	background: "color-background",
	foreground: "gray-12",
	card: "gray-surface",
	"card-foreground": "gray-12",
	popover: "gray-3",
	"popover-foreground": "gray-12",
	primary: "primary-9",
	"primary-foreground": "gray-1",
	secondary: "gray-4",
	"secondary-foreground": "gray-12",
	muted: "gray-2",
	"muted-foreground": "gray-11",
	accent: "primary-5",
	"accent-foreground": "gray-12",
	destructive: "apple-red",
	border: "gray-6",
	input: "gray-3",
	ring: "primary-8",
	"chart-1": "primary-9",
	"chart-2": "primary-5",
	"chart-3": "gray-4",
	"chart-4": "primary-10",
	"chart-5": "gray-7",
	sidebar: "gray-2",
	"sidebar-foreground": "gray-11",
	"sidebar-primary": "primary-10",
	"sidebar-primary-foreground": "gray-12",
	"sidebar-accent": "primary-5",
	"sidebar-accent-foreground": "gray-12",
	"sidebar-border": "gray-7",
	"sidebar-ring": "primary-8",
	"apple-red": "apple-red",
} as const;

export function stripHexAlpha(color: string) {
	const colorObj = new Color(color);
	colorObj.alpha = 1;

	return colorObj.to("srgb").toString({ format: "hex" });
}

export function convertHexToLonghand(hex: string) {
	const hexBase = hex.replace("#", "");

	switch (hexBase.length) {
		case 1:
			return `#${hexBase.repeat(6)}`;
		case 2:
			return `#${hexBase.repeat(3)}`;
		case 3: {
			const [r, g, b] = hexBase.split("");
			return `#${r}${r}${g}${g}${b}${b}`;
		}
		default:
			return `#${hexBase}`;
	}
}
