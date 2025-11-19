import Color from "colorjs.io";
import type { useColorContext } from "~/components/color-context";
import {
	type colorMappings,
	DEFAULT_INPUT_COLOR,
	type themeTokens,
} from "~/components/color-field/types";

/**
 * Makes sure the color is in full (6) hex code. Input type="color" accepts only that.
 */
export function formatForColorPicker(value: string) {
	return toCssFormat(
		toShortFormat(
			new Color(toCssFormat(value)).to("srgb").toString({ format: "hex" }),
		) ?? "",
	);
}

/**
 * Returns a boolean if any of the inputs text is selected
 */
export const hasSelection = (input: HTMLInputElement | null) => {
	if (input) {
		const { selectionStart, selectionEnd } = input;
		return (selectionEnd ?? 0) - (selectionStart ?? 0) > 0;
	}

	return false;
};

/**
 * Converts the input color into a more compact form.
 *
 * For hex it removes the leading pound sign and makes full (6) length.
 * Converts srgb, hsl, hwb into hex. Removes "color" wrapper on color functions.
 */
export const toShortFormat = (value: string): string | null => {
	// Make sure `toShortFormat` can parse values it has produced itself.
	value = toCssFormat(value.trim());

	// targets short (1-3) or full (6) hex color codes
	const regexp = /((?:^(?:[0-9]|[a-f]){6})|(?:^(?:[0-9]|[a-f]){1,3}))/i;
	let [hex] = value.replace(/^#/, "").match(regexp) ?? [];

	let color: Color | undefined;

	if (isColorFunction(value)) {
		try {
			color = new Color(value);

			// Convert sRGB color spaces to hex because colorjs.io formats them a bit weird.
			// and since we don’t feel strongly enough about fixing that, hex is better than weird.
			if (["srgb", "hsl", "hwb"].includes(color.spaceId)) {
				return toShortFormat(color.to("srgb").toString({ format: "hex" }));
			}

			const str = color.toString({ precision: 3 });

			// Remove the `color()` function wrapper for brevity
			return str.startsWith("color")
				? str.replace("color(", "").replace(")", "")
				: str;
		} catch {}
	}

	if (!hex) {
		return null;
	}

	hex = convertHexToLonghand(hex).replace("#", "");

	return hex.toUpperCase();
};

/**
 * Makes sure the input is in valid css format for the browser.
 *
 * @example toCssFormat("000000") => "#000000"
 */
export const toCssFormat = (value: string) => {
	if (isColorFunction(value)) {
		return value.includes("(") ? value : `color(${value})`;
	}

	if (value.startsWith("#")) {
		return value;
	}

	return `#${value}`;
};

/**
 * Return a boolean if the input is a css color function
 *
 * @example isColorFunction("hsl(214.33, 100%, 59.22%)") => true
 */
export const isColorFunction = (value: string) => {
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
};

/**
 * Formats a theme token into a user-friendly string
 *
 * @example formatCssVariable("primary-surface") => "Primary Surface"
 */
export function formatCssVariable(value: string) {
	const words = value.split("-");
	const capitalized: string[] = [];

	for (const word of words) {
		const firstLetter = word.charAt(0).toUpperCase();

		capitalized.push(`${firstLetter}${word.slice(1)}`);
	}

	return capitalized.join(" ");
}

/**
 * Remove the alpha from any hex color
 *
 * @example stripHexAlpha("#000000b3") => "#000000"
 */
export function stripHexAlpha(color: string) {
	const colorObj = new Color(color);
	colorObj.alpha = 1;

	return colorObj.to("srgb").toString({ format: "hex" });
}

/**
 * Convert any short hex, e.g. "#000" into its longer form.
 *
 * @example convertHexToLonghand("#FFF") => "#FFFFFF"
 */
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

/**
 * Updates the css variable in the stylesheet
 */
export function updateStylesheet({
	stylesheet,
	cssVariable,
	value,
	theme,
	setPaletteMappings,
}: {
	stylesheet: CSSStyleSheet;
	cssVariable: keyof typeof colorMappings;
	value: string;
	theme: "light" | "dark";
	setPaletteMappings: ReturnType<typeof useColorContext>["setPaletteMappings"];
}) {
	const selector = theme === "light" ? ":root" : ".dark";

	setPaletteMappings((prev) => {
		if (theme === "dark") {
			return {
				light: prev.light,
				dark: { ...prev.dark, [cssVariable]: value },
			};
		}
		return {
			light: { ...prev.light, [cssVariable]: value },
			dark: prev.dark,
		};
	});

	function updateRule(ruleList: CSSRuleList) {
		for (let i = 0; i < ruleList.length; i++) {
			const rule = ruleList[i];

			if (rule instanceof CSSStyleRule && rule.selectorText === selector) {
				rule.style.setProperty(`--${cssVariable}`, value);
			}

			if (rule instanceof CSSGroupingRule) {
				updateRule(rule.cssRules);
			}
		}
	}

	updateRule(stylesheet.cssRules);

	for (let i = 0; i < stylesheet.cssRules.length; i++) {
		const rule = stylesheet.cssRules[i];
		if (rule instanceof CSSSupportsRule || rule instanceof CSSMediaRule) {
			const groupRule = rule;
			for (let j = 0; j < groupRule.cssRules.length; j++) {
				const inner = groupRule.cssRules[j];
				if (inner instanceof CSSStyleRule && inner.selectorText === selector) {
					inner.style.setProperty(
						`--${cssVariable}`,
						new Color(value).toString({ format: "oklch" }),
					);
				}
			}
		}
	}
}

/**
 * Gets the css variable from the color context palette
 */
export function getColorFromPalette({
	variable,
	paletteStylesObject,
	theme,
}: {
	variable: (typeof themeTokens)[number];
	paletteStylesObject: ReturnType<
		typeof useColorContext
	>["paletteStylesObject"];
	theme: "light" | "dark";
}) {
	const scale = variable.includes("primary") ? "accentScale" : "grayScale";
	const scaleIndex = Number(variable.split("-")[1]) - 1;
	const palette = paletteStylesObject[theme];

	const formatColor = (color: string) => {
		if (color.includes("#")) {
			return convertHexToLonghand(stripHexAlpha(color));
		}
		return color;
	};

	if (variable === "primary-surface") {
		return formatColor(palette.accentSurface);
	}
	if (variable === "gray-surface") {
		return formatColor(palette.graySurface);
	}
	if (variable === "color-background") {
		return formatColor(palette.background);
	}
	if (variable === "apple-red") {
		return palette.appleRed;
	}

	const color = palette[scale][scaleIndex];
	if (!color) {
		return `#${DEFAULT_INPUT_COLOR}`;
	}

	return formatColor(color);
}
