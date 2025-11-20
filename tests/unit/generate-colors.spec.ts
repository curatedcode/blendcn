import { describe, expect, test } from "vitest";
import { generateColors } from "~/lib/colors/generate-colors";

describe("generateColors fn output", () => {
	test("outputs correct color values for light theme", () => {
		const colors = {
			accent: "#2A69C0",
			gray: "#E5E7EB",
			background: "#FFFFFF",
		};

		const result = generateColors({
			appearance: "light",
			accent: colors.accent,
			gray: colors.gray,
			background: colors.background,
		});

		const resultShouldBe: ReturnType<typeof generateColors> = {
			accentScale: [
				"oklch(99.4% 0.0017 257.5)",
				"oklch(98.2% 0.0071 257.5)",
				"oklch(96.1% 0.0148 257.5)",
				"oklch(93.6% 0.0289 257.5)",
				"oklch(90.4% 0.0432 257.5)",
				"oklch(86.3% 0.0586 257.5)",
				"oklch(80.8% 0.0726 257.5)",
				"oklch(73.2% 0.0963 257.5)",
				"oklch(52.7% 0.1508 257.5)",
				"oklch(48% 0.1508 257.5)",
				"oklch(52.5% 0.1508 257.5)",
				"oklch(31.6% 0.0757 257.5)",
			],
			accentScaleAlpha: [
				"color(display-p3 0.0235 0.349 0.6745 / 0.012)",
				"color(display-p3 0.0196 0.2667 0.8784 / 0.032)",
				"color(display-p3 0.0078 0.2824 0.7804 / 0.071)",
				"color(display-p3 0.0039 0.3608 0.9059 / 0.122)",
				"color(display-p3 0.0039 0.3294 0.8941 / 0.181)",
				"color(display-p3 0.0039 0.3137 0.8627 / 0.251)",
				"color(display-p3 0.0039 0.2824 0.7804 / 0.338)",
				"color(display-p3 0.0039 0.2667 0.7373 / 0.459)",
				"color(display-p3 0 0.2235 0.6471 / 0.769)",
				"color(display-p3 0 0.2078 0.6 / 0.82)",
				"color(display-p3 0 0.2235 0.6431 / 0.769)",
				"color(display-p3 0 0.0902 0.2471 / 0.887)",
			],
			accentContrast: "oklch(100% 0 0)",
			grayScale: [
				"oklch(99.1% 0.0014 264.5)",
				"oklch(98.2% 0.0029 264.5)",
				"oklch(95.5% 0.0043 264.5)",
				"oklch(93.1% 0.0058 264.5)",
				"oklch(91% 0.0073 264.5)",
				"oklch(88.7% 0.0087 264.5)",
				"oklch(85.3% 0.0087 264.5)",
				"oklch(79.3% 0.0087 264.5)",
				"oklch(64.5% 0.0087 264.5)",
				"oklch(61% 0.0087 264.5)",
				"oklch(50.3% 0.0087 264.5)",
				"oklch(24.2% 0.0087 264.5)",
			],
			grayScaleAlpha: [
				"color(display-p3 0.0235 0.0235 0.349 / 0.012)",
				"color(display-p3 0.0235 0.1608 0.4431 / 0.028)",
				"color(display-p3 0.0078 0.0667 0.2549 / 0.063)",
				"color(display-p3 0.0118 0.0902 0.251 / 0.099)",
				"color(display-p3 0.0078 0.0667 0.2235 / 0.126)",
				"color(display-p3 0.0039 0.0784 0.2039 / 0.157)",
				"color(display-p3 0 0.0588 0.1569 / 0.2)",
				"color(display-p3 0.0039 0.0314 0.1176 / 0.275)",
				"color(display-p3 0.0039 0.0275 0.0706 / 0.455)",
				"color(display-p3 0.0039 0.0196 0.0588 / 0.495)",
				"color(display-p3 0 0.0157 0.0471 / 0.616)",
				"color(display-p3 0 0.0078 0.0275 / 0.883)",
			],
			graySurface: "oklch(1 0 0 / 80%)",
			accentSurface: "color(display-p3 0.9608 0.9725 0.9961 / 0.8)",
			background: "oklch(100% 0 0)",
			appleRed: "oklch(0.5938 0.2332 24.68)",
		};

		expect(result).toStrictEqual(resultShouldBe);
	});

	test("outputs correct color values for dark theme", () => {
		const colors = {
			accent: "#3D63DD",
			gray: "#8B8D98",
			background: "#111111",
		};

		const result = generateColors({
			appearance: "dark",
			accent: colors.accent,
			gray: colors.gray,
			background: colors.background,
		});

		const resultShouldBe: ReturnType<typeof generateColors> = {
			accentScale: [
				"oklch(17.8% 0.0247 266.8)",
				"oklch(20.7% 0.0302 266.8)",
				"oklch(27.1% 0.0694 266.8)",
				"oklch(31.8% 0.0933 266.8)",
				"oklch(36.1% 0.1046 266.8)",
				"oklch(40.4% 0.1106 266.8)",
				"oklch(45% 0.1203 266.8)",
				"oklch(50.3% 0.1373 266.8)",
				"oklch(54.3% 0.1913 266.8)",
				"oklch(49.7% 0.1373 266.8)",
				"oklch(77.7% 0.1234 266.8)",
				"oklch(91.1% 0.0428 266.8)",
			],
			accentScaleAlpha: [
				"color(display-p3 0 0.0706 0.9804 / 0.043)",
				"color(display-p3 0.1176 0.3608 1 / 0.08)",
				"color(display-p3 0.2275 0.4039 1 / 0.223)",
				"color(display-p3 0.251 0.4196 1 / 0.324)",
				"color(display-p3 0.302 0.451 1 / 0.4)",
				"color(display-p3 0.3451 0.4902 1 / 0.467)",
				"color(display-p3 0.3725 0.5098 1 / 0.547)",
				"color(display-p3 0.3922 0.5255 1 / 0.652)",
				"color(display-p3 0.3176 0.451 1 / 0.824)",
				"color(display-p3 0.3843 0.5176 1 / 0.643)",
				"color(display-p3 0.6 0.702 1)",
				"color(display-p3 0.8549 0.8941 1 / 0.988)",
			],
			accentContrast: "oklch(100% 0 0)",
			grayScale: [
				"oklch(17.8% 0.0042 277.7)",
				"oklch(21.5% 0.004 277.7)",
				"oklch(25.5% 0.0055 277.7)",
				"oklch(28.4% 0.0075 277.7)",
				"oklch(31.4% 0.0089 277.7)",
				"oklch(35% 0.01 277.7)",
				"oklch(40.2% 0.0121 277.7)",
				"oklch(49.2% 0.0157 277.7)",
				"oklch(54% 0.0167 277.7)",
				"oklch(58.6% 0.0165 277.7)",
				"oklch(77% 0.0138 277.7)",
				"oklch(94.9% 0.0026 277.7)",
			],
			grayScaleAlpha: [
				"color(display-p3 0.0667 0.0667 0.9412 / 0.009)",
				"color(display-p3 0.8 0.8 0.9804 / 0.043)",
				"color(display-p3 0.851 0.898 0.9882 / 0.085)",
				"color(display-p3 0.8667 0.898 1 / 0.118)",
				"color(display-p3 0.8667 0.8941 0.9961 / 0.152)",
				"color(display-p3 0.8784 0.898 1 / 0.194)",
				"color(display-p3 0.8902 0.9059 0.9961 / 0.257)",
				"color(display-p3 0.8941 0.9059 1 / 0.37)",
				"color(display-p3 0.8902 0.9098 1 / 0.433)",
				"color(display-p3 0.9098 0.9176 1 / 0.488)",
				"color(display-p3 0.9451 0.949 1 / 0.719)",
				"color(display-p3 0.9922 0.9922 1 / 0.937)",
			],
			graySurface: "oklch(0 0 0 / 5%)",
			accentSurface: "color(display-p3 0.0706 0.1098 0.2118 / 0.5)",
			background: "oklch(17.764% 0 0)",
			appleRed: "oklch(0.5938 0.2332 24.68)",
		};

		expect(result).toStrictEqual(resultShouldBe);
	});
});
