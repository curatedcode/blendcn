import type { GeneratedColors } from "~/components/color-context";
import type { colorMappings } from "~/components/color-field/types";

type OutputColors = { [K in keyof typeof colorMappings]: string };

export function generatePaletteMappings(colors: {
	light: GeneratedColors;
	dark: GeneratedColors;
}): {
	light: OutputColors;
	dark: OutputColors;
} {
	return {
		light: {
			background: colors.light.background,
			foreground: colors.light.grayScale[11],
			card: colors.light.graySurface,
			"card-foreground": colors.light.grayScale[11],
			popover: colors.light.grayScale[2],
			"popover-foreground": colors.light.grayScale[11],
			primary: colors.light.accentScale[8],
			"primary-foreground": colors.light.grayScale[0],
			secondary: colors.light.grayScale[3],
			"secondary-foreground": colors.light.grayScale[11],
			muted: colors.light.grayScale[1],
			"muted-foreground": colors.light.grayScale[10],
			accent: colors.light.accentScale[4],
			"accent-foreground": colors.light.grayScale[11],
			destructive: colors.light.appleRed,
			border: colors.light.grayScale[5],
			input: colors.light.grayScale[2],
			ring: colors.light.accentScale[7],
			"chart-1": colors.light.accentScale[8],
			"chart-2": colors.light.accentScale[4],
			"chart-3": colors.light.grayScale[3],
			"chart-4": colors.light.accentScale[9],
			"chart-5": colors.light.grayScale[6],
			sidebar: colors.light.grayScale[1],
			"sidebar-foreground": colors.light.grayScale[10],
			"sidebar-primary": colors.light.accentScale[9],
			"sidebar-primary-foreground": colors.light.grayScale[11],
			"sidebar-accent": colors.light.accentScale[4],
			"sidebar-accent-foreground": colors.light.grayScale[11],
			"sidebar-border": colors.light.grayScale[6],
			"sidebar-ring": colors.light.accentScale[7],
			"scrollbar-thumb": colors.light.grayScale[5],
			"scrollbar-thumb-hover": colors.light.grayScale[6],
			"scrollbar-thumb-active": colors.light.grayScale[7],
		},
		dark: {
			background: colors.dark.background,
			foreground: colors.dark.grayScale[11],
			card: colors.dark.graySurface,
			"card-foreground": colors.dark.grayScale[11],
			popover: colors.dark.grayScale[2],
			"popover-foreground": colors.dark.grayScale[11],
			primary: colors.dark.accentScale[8],
			"primary-foreground": colors.dark.grayScale[11],
			secondary: colors.dark.grayScale[3],
			"secondary-foreground": colors.dark.grayScale[11],
			muted: colors.dark.grayScale[1],
			"muted-foreground": colors.dark.grayScale[10],
			accent: colors.dark.accentScale[4],
			"accent-foreground": colors.dark.grayScale[11],
			destructive: colors.light.appleRed,
			border: colors.dark.grayScale[5],
			input: colors.dark.grayScale[2],
			ring: colors.dark.accentScale[7],
			"chart-1": colors.dark.accentScale[8],
			"chart-2": colors.dark.accentScale[4],
			"chart-3": colors.dark.grayScale[3],
			"chart-4": colors.dark.accentScale[9],
			"chart-5": colors.dark.grayScale[6],
			sidebar: colors.dark.grayScale[1],
			"sidebar-foreground": colors.dark.grayScale[10],
			"sidebar-primary": colors.dark.accentScale[9],
			"sidebar-primary-foreground": colors.dark.grayScale[11],
			"sidebar-accent": colors.dark.accentScale[4],
			"sidebar-accent-foreground": colors.dark.grayScale[11],
			"sidebar-border": colors.dark.grayScale[6],
			"sidebar-ring": colors.dark.accentScale[7],
			"scrollbar-thumb": colors.dark.grayScale[5],
			"scrollbar-thumb-hover": colors.dark.grayScale[6],
			"scrollbar-thumb-active": colors.dark.grayScale[7],
		},
	};
}
