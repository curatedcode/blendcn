import Color from "colorjs.io";

export function generateRandomPalette() {
	// Random hue, medium chroma, medium-high lightness for vibrancy
	const hue = Math.floor(Math.random() * 360);
	const accent = new Color("oklch", [0.6, 0.2, hue]);

	// low chroma, middle lightness
	const gray = new Color("oklch", [0.55, 0.01, hue]);

	return {
		accent: accent.to("srgb").toString({ format: "hex" }),
		gray: gray.to("srgb").toString({ format: "hex" }),
		bgLight: "#FFFFFF",
		bgDark: "#111111",
	};
}
