import type { GeneratedColors } from "~/components/color-context";
import type { shadcnCssVariables } from "~/components/color-field/types";

type OutputColors = { [K in (typeof shadcnCssVariables)[number]]: string };

export function generatePaletteMappings(colors: {
	light: GeneratedColors;
	dark: GeneratedColors;
}): {
	light: OutputColors;
	dark: OutputColors;
} {
	const getMappings = (palette: GeneratedColors): OutputColors => ({
		background: palette.background,
		foreground: palette.grayScale[11],
		card: palette.graySurface,
		"card-foreground": palette.grayScale[11],
		popover: palette.grayScale[2],
		"popover-foreground": palette.grayScale[11],
		primary: palette.grayScale[8],
		"primary-foreground": palette.grayScale[0],
		secondary: palette.grayScale[3],
		"secondary-foreground": palette.grayScale[11],
		muted: palette.grayScale[1],
		"muted-foreground": palette.grayScale[10],
		accent: palette.accentScale[4],
		"accent-foreground": palette.grayScale[11],
		destructive: palette.appleRed,
		border: palette.grayScale[5],
		input: palette.grayScale[2],
		ring: palette.accentScale[7],
		"chart-1": palette.accentScale[8],
		"chart-2": palette.accentScale[4],
		"chart-3": palette.grayScale[3],
		"chart-4": palette.accentScale[9],
		"chart-5": palette.grayScale[6],
		sidebar: palette.grayScale[1],
		"sidebar-foreground": palette.grayScale[10],
		"sidebar-primary": palette.accentScale[9],
		"sidebar-primary-foreground": palette.grayScale[11],
		"sidebar-accent": palette.accentScale[4],
		"sidebar-accent-foreground": palette.grayScale[11],
		"sidebar-border": palette.grayScale[6],
		"sidebar-ring": palette.accentScale[7],
		"apple-red": palette.appleRed,
	});

	return {
		light: getMappings(colors.light),
		dark: getMappings(colors.dark),
	};
}
